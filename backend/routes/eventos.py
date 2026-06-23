from flask import Blueprint, jsonify, request
from pydantic import ValidationError

from banco import db
from schemas.evento import EventoSchema
from routes.auth import admin_requerido, token_requerido

eventos_bp = Blueprint("eventos", __name__)


@eventos_bp.route("/api/eventos", methods=["POST"])
@admin_requerido
def criar_evento():
    """Registrar um novo evento (RF1)
    ---
    tags:
    - Eventos

    parameters:
    - name: body
      in: body
      required: true

      schema:
        id: Evento

        required:
          - nome
          - data
          - local

        properties:
          nome:
            type: string
            example: "Roda de Conversa - Autoras Paranaenses"

          data:
            type: string
            example: "2026-05-20"

          local:
            type: string
            example: "UTFPR Cornélio Procópio"

          tipo:
            type: string
            example: "Roda de Conversa"

          livros:
            type: array

            items:
              type: object

            example:
              - titulo: "A Hora da Estrela"
                autora: "Clarice Lispector"

              - titulo: "Quarto de Despejo"
                autora: "Carolina Maria de Jesus"

    responses:
      201:
        description: Evento criado com sucesso

      400:
        description: Dados inválidos
    """

    try:
        raw_data = request.get_json()

        evento = EventoSchema(**raw_data)

        if db is not None:
            dados = evento.model_dump()

            dados["data"] = str(dados["data"])

            result = db.eventos.insert_one(dados)

            return jsonify(
                {"message": "Evento salvo com sucesso!", "id": str(result.inserted_id)}
            ), 201

        else:
            return jsonify(
                {
                    "message": "[DEMO] Dados validados, mas MongoDB offline",
                    "data": evento.model_dump(),
                }
            ), 201

    except ValidationError as e:
        return jsonify({"message": "Erro de validação", "errors": e.errors()}), 400

    except Exception as e:
        return jsonify({"message": "Erro interno", "error": str(e)}), 500

@eventos_bp.route("/api/eventos", methods=["GET"])
@token_requerido
def listar_eventos():
    """Listar todos os eventos cadastrados
    ---
    tags:
      - Eventos
    responses:
      200:
        description: Lista de eventos
    """
    if db is not None:
        eventos = list(db.eventos.find({}, {"_id": 1, "nome": 1, "tipo": 1, "data": 1, "local": 1, "livros": 1, "participantes": 1}))
        # Convertendo o ObjectId do Mongo para string para evitar erro no JSON
        for ev in eventos:
            ev["_id"] = str(ev["_id"])
            ev.setdefault("tipo", "Roda de Conversa")
        return jsonify(eventos), 200
    else:
        return jsonify([
            {
                "_id": "demo_ev_1",
                "nome": "[DEMO] Roda de Conversa - Autoras",
                "tipo": "Roda de Conversa",
                "data": "2026-05-20",
                "local": "UTFPR",
                "participantes": 45,
                "livros": [{"titulo": "A Hora da Estrela", "autora": "Clarice Lispector"}]
            },
            {
                "_id": "demo_ev_2",
                "nome": "[DEMO] Minicurso - Escrita Criativa",
                "tipo": "Minicurso",
                "data": "2026-06-10",
                "local": "Online",
                "participantes": 120,
                "livros": []
            }
        ]), 200
