from flask import Blueprint, jsonify, request
from pydantic import ValidationError
from banco import db
from schemas.participacao import ParticipacaoSchema

participacoes_bp = Blueprint("participacoes", __name__)


@participacoes_bp.route("/api/participacoes", methods=["POST"])
def registrar_participacao():
    """Registrar participação em evento
    ---
    tags:
      - Participações

    parameters:
      - name: body
        in: body
        required: true

        schema:
          id: Participacao

          required:
            - participante_id
            - evento_id

          properties:
            participante_id:
              type: string
              example: "69fde0fb83fd5de6f521a3b6"

            evento_id:
              type: string
              example: "69fde0fb83fd5de6f521a3b6"

    responses:
      201:
        description: Participação registrada com sucesso

      400:
        description: Erro de validação
    """

    try:
        raw_data = request.get_json()
        participacao = ParticipacaoSchema(**raw_data)
        dados = participacao.model_dump()

        if db is not None:
            db.participacoes.update_one(
                {
                    "participante_id": dados["participante_id"],
                    "evento_id": dados["evento_id"],
                },
                {"$set": dados},
                upsert=True,
            )
            return jsonify({"message": "Participação registrada!"}), 201
        else:
            return jsonify({"message": "[DEMO] Participação validada, sem banco", "data": dados}), 201

    except ValidationError as e:
        return jsonify({"message": "Erro de validação", "errors": e.errors()}), 400

    except Exception as e:
        return jsonify({"message": "Erro interno", "error": str(e)}), 500
