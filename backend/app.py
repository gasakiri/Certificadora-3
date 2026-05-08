from flask import Flask, jsonify
from flasgger import Swagger

from routes.eventos import eventos_bp
from routes.questionarios import questionarios_bp

app = Flask(__name__)

swagger = Swagger(app)

app.register_blueprint(eventos_bp)

app.register_blueprint(questionarios_bp)


@app.route("/")
def index():

    return jsonify({"status": "online", "message": "Impactômetro Leia Mulheres API"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
