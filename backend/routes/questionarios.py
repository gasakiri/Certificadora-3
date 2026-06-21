from flask import Blueprint, jsonify, request
from pydantic import ValidationError
from banco import db
from schemas.questionario import QuestionarioSchema

questionarios_bp = Blueprint("questionarios", __name__)


@questionarios_bp.route("/api/questionarios", methods=["POST"])
def submeter_questionario():
    """Submeter questionário de impacto (RF2)
    ---
    tags:
      - Questionários
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: Questionario
          required:
            - participante_id
            - evento_id
            - respostas
          properties:
            participante_id:
              type: string
              example: "69fde0fb83fd5de6f521a3b6"
            evento_id:
              type: string
              example: "69fde0fb83fd5de6f521a3b6"
            respostas:
              type: object
              example:
                interesse_tecnologia: 5
                percepcao_inicial: 4
                comentario: "Evento excelente"
    responses:
      201:
        description: Questionário processado com sucesso
      400:
        description: Erro nos dados enviados
    """
    try:
        raw_data = request.get_json()
        quest = QuestionarioSchema(**raw_data)
        dados = quest.model_dump()
        if db is not None:
            participacao = db.participacoes.find_one(
                {
                    "participante_id": dados["participante_id"],
                    "evento_id": dados["evento_id"],
                }
            )

            if not participacao:
                return jsonify({"message": "Participante não pertence ao evento"}), 403

            db.questionarios.update_one(
                {
                    "participante_id": dados["participante_id"],
                    "evento_id": dados["evento_id"],
                },
                {"$set": dados},
                upsert=True,
            )
            return jsonify({"message": "Questionário salvo ou atualizado!"}), 201
        else:
            return jsonify(
                {
                    "message": "[DEMO] Impacto validado, mas MongoDB offline",
                    "data": dados,
                }
            ), 201
    except ValidationError as e:
        return jsonify({"message": "Erro de validação", "errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"message": "Erro interno", "error": str(e)}), 500


@questionarios_bp.route("/api/questionarios", methods=["GET"])
def listar_questionarios():
    """Listar todos os questionários cadastrados
    ---
    tags:
      - Questionários
    responses:
      200:
        description: Lista de questionários
    """
    if db is not None:
        questionarios = list(db.questionarios.find({}, {"_id": 1, "participante_id": 1, "evento_id": 1, "respostas": 1}))
        for quest in questionarios:
            quest["_id"] = str(quest["_id"])
        return jsonify(questionarios), 200
    else:
        questionarios = []
        for i in range(10):
            questionarios.append({
                "_id": f"demo_q_ev1_{i}",
                "evento_id": "demo_ev_1",
                "respostas": {
                    "engajamento": 4,
                    "aprendizado": 5,
                    "identificacao_autoras": 4,
                    "interesse_tecnologia": 3,
                    "percepcao_impacto": 5
                }
            })
        for i in range(15):
            questionarios.append({
                "_id": f"demo_q_ev2_{i}",
                "evento_id": "demo_ev_2",
                "respostas": {
                    "engajamento": 5,
                    "aprendizado": 4,
                    "identificacao_autoras": 5,
                    "interesse_tecnologia": 5,
                    "percepcao_impacto": 4
                }
            })
        return jsonify(questionarios), 200
