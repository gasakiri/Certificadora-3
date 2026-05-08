from flask import Blueprint, jsonify, request
from pydantic import ValidationError

from banco import db
from schemas.participante import ParticipanteSchema

participantes_bp = Blueprint("participantes", __name__)


@participantes_bp.route("/api/participantes", methods=["POST"])
def criar_participante():
    """Cadastrar participante
    ---
    tags:
      - Participantes

    parameters:
      - name: body
        in: body
        required: true

        schema:
          id: Participante

          required:
            - nome
            - curso
            - email

          properties:
            nome:
              type: string
              example: "Sara Alves"

            curso:
              type: string
              example: "Engenharia de Computação"

            email:
              type: string
              example: "saraalves@utfpr.edu.br"

    responses:
      201:
        description: Participante criado com sucesso

      400:
        description: Erro de validação
    """

    try:
        raw_data = request.get_json()

        participante = ParticipanteSchema(**raw_data)

        result = db.participantes.insert_one(participante.model_dump())

        return jsonify(
            {"message": "Participante criado!", "id": str(result.inserted_id)}
        ), 201

    except ValidationError as e:
        return jsonify({"message": "Erro de validação", "errors": e.errors()}), 400

    except Exception as e:
        return jsonify({"message": "Erro interno", "error": str(e)}), 500
