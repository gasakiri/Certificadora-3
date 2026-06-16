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
              example: "Seu Nome"

            curso:
              type: string
              example: "Engenharia de Computação"

            email:
              type: string
              example: "email@gmail.com"

    responses:
      201:
        description: Participante criado com sucesso

      400:
        description: Erro de validação
    """

    try:
        raw_data = request.get_json()

        participante = ParticipanteSchema(**raw_data)
        
        dados = participante.model_dump()

        if db is not None:
            usuario_existente = db.participantes.find_one({"email": dados["email"]})
            if usuario_existente:
                return jsonify({"message": "Participante já cadastrado!", "id": str(usuario_existente["_id"])}), 409
            
            result = db.participantes.insert_one(dados)
            return jsonify({"message": "Participante criado!", "id": str(result.inserted_id)}), 201
        else:
            return jsonify({"message": "[DEMO] Validação OK, sem banco ativo", "data": dados}), 201

    except ValidationError as e:
        return jsonify({"message": "Erro de validação", "errors": e.errors()}), 400

    except Exception as e:
        return jsonify({"message": "Erro interno", "error": str(e)}), 500
