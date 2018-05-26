import os
from datetime import datetime, timedelta

#Import Flask
from flask import Flask, render_template, request, jsonify, json, Response, g

from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired

#import stuff for database
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

#Import stuff for security
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, LoginManager, login_required

#Import configurations for flask
from config import Config

#Define flask app
app=Flask(__name__,
        static_url_path='',
        static_folder="static/build",
            template_folder="static/build")

#import configurations for flask
app.config.from_object(Config)

#define login_manager
login = LoginManager(app)
login.init_app(app)

#Define database and Migrate
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#Define models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash=db.Column(db.String(128))
    token_expiration = db.Column(db.DateTime)
    recipe = db.relationship('Recipe', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, expiration=600):
        print("gemeroinnin alussa: " + str(self.username))
        self.token_expiration = (datetime.utcnow() + timedelta(seconds=600))
        print("tokenin expiration: " + str(self.token_expiration))
        s= Serializer(app.config['SECRET_KEY'], expires_in= expiration)
        return s.dumps({ 'id': self.id })

    def revoke_auth_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)

    @staticmethod
    def verify_auth_token(token):
        print("verify_token alussa")
        s= Serializer(app.config['SECRET_KEY'])
        try:
            data= s.loads(token)
        except SignatureExpired:
            return None
        except BadSignature:
            return None
        user= User.query.get(data['id'])
        print("ongelmakohta expiration: " + str(User.query.get(data['id']).token_expiration))
        print("ongelmakohta utc: " + str(datetime.utcnow()))
        if (User.query.get(data['id']).token_expiration < datetime.utcnow()):
            print("aikavertailu ei toiminut")
            return None
        g.user = user
        print("palauttaa userin")
        return user


ingredients = db.Table('ingredients',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), nullable=False),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'), nullable=False),
    db.PrimaryKeyConstraint('recipe_id', 'ingredient_id'))

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    ingredients = db.relationship('Ingredient', secondary=ingredients,
        backref='recipe')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Recipe {}>'.format(self.name)

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    amount = db.Column(db.Numeric(6,2))
    unit = db.Column(db.String(5))

    def __repr__(self):
        return '<Ingredient {}>'.format(self.name)


@login.request_loader
def load_user(request):
    try:
        token=request.args.get('token')
        if token is not None:
            print("verifioimassa tokenia loaderissa")
            user=User.verify_auth_token(token)
            if user:
                g.user= user
                return user
        else:
            req_data= request.get_json()
            #token= request.args.get("token")
            #token= request.json['token']
            if 'token' in req_data:
                token= req_data['token'] 
                user= User.verify_auth_token(token)
                print("user is: {}".format(user))
                if user:
                    g.user= user
                    return user
                else:
                    return None
            if 'username' in req_data and 'password' in req_data:
                username= req_data["username"]
                password= req_data["password"]
                print("username: {}".format(username))
                print("password: {}".format(password))
                #username= request.json['username']
                #password= request.json['password']
                if username is not None and password is not None:
                    user=User.query.filter_by(username=username).first()
                if not user or not user.check_password(password):
                    return None
                else:
                    g.user= user
                    return user
    except:
        return None
    return None


#Below are routes
#****************************************************************

#serve REACT index.html
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/signIn", methods=["POST"])
@login_required
def signIn():
    token= g.user.generate_auth_token(600)
    db.session.commit()
    return jsonify({'token': token.decode('ascii'),
                    'validyTime': 600})

@app.route("/signOut", methods=["GET"])
@login_required
def signOut():
    g.user.revoke_auth_token()
    db.session.commit()
    return jsonify({'message': 'token revoked'}), 200


#return recipes 
@app.route('/recipes', methods=['GET'])
@login_required
def recipes():
    payload= {'recipes':[], 'currentRecipe':-1}
    recipes= Recipe.query.all()
    for recipe in recipes:
        ingredients= recipe.ingredients
        data={'name': recipe.name}
        for ingredient in ingredients:
            data[ingredient.name]= float(ingredient.amount)
        payload['recipes'].append(data)
    #print(payload)
    return jsonify({'recipes': payload}), 200
    #return Response(json.dumps(payload),  mimetype='application/json')

#Save new recipe
@app.route('/new_recipe', methods=['POST'])
@login_required
def newRecipe():
    user=User.query.get(1)
    if not request.json or not 'name' in request.json:
        abort(400)
    recipe_name=request.json['name']
    recipe=Recipe(name=recipe_name, user_id=user.id)
    db.session.add(recipe)
    db.session.commit()
    for key in request.json.keys():
        if key != 'name' and key != 'token':
            key= Ingredient(name=key, amount=request.json[key], unit="g")
            db.session.add(key)
            db.session.commit()
            recipe.ingredients.append(key)
            db.session.commit()
            print(str(recipe.ingredients))
    return jsonify({'response': 'done'}), 200


#Define main to run the server
if __name__== "__main__":
    app.run(debug=True)
