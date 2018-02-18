from flask import Flask, render_template, request, jsonify

app=Flask(__name__,
        static_url_path='',
        static_folder="static/build",
            template_folder="static/build")

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/new_recipe', methods=['POST'])
def newPost():
    return jsonify({'response': 'came through'}), 200

if __name__== "__main__":
    app.run()
