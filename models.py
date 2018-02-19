from server import db, login

from werkzeug.security import generate_password_hash, check_password_hash

from flask_login import UserMixin

from server import db, login

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash=db.Column(db.String(128))
    recipe = db.relationship('Recipe', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

ingredients = db.Table('ingredients',
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'), primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True)
)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    ingredients = db.relationship('Ingredient', secondary=ingredients, lazy='subquery',
        backref=db.backref('pages', lazy=True))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    amount = db.Column(db.Numeric(6,2))
    unit = db.Column(db.String(5))
