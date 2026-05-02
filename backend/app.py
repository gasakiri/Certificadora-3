from flask import Flask, jsonify, request
from pymongo import MongoClient
from flasgger import Swagger
from pydantic import BaseModel, Field, ValidationError
from typing import Dict, Any

app = Flask(__name__)
swagger = Swagger(app)

# Configuração do MongoDB
try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=2000)
    db = client.impactometro_db
    # Teste de conexão
    client.server_info()
except Exception:
    print("AVISO: MongoDB não detectado. A API funcionará apenas em modo de demonstração.")
    db = None

# --- Schemas de Validação (Pydantic) ---

class EventoSchema(BaseModel):
    nome: str = Field(..., min_length=3, description="Nome do evento literário")
    data: str = Field(..., description="Data do evento (AAAA-MM-DD)")
    local: str = Field(..., description="Local de realização")
    autoras: list = Field(default=[], description="Lista de autoras abordadas")

class QuestionarioSchema(BaseModel):
    participante_id: str = Field(..., description="ID único do participante")
    respostas: Dict[str, Any] = Field(..., description="Dicionário com as respostas do impacto")

# --- Rotas ---

@app.route("/")
def index():
    """Boas-vindas à API
    ---
    responses:
      200:
        description: Retorna uma mensagem de sucesso
    """
    return jsonify({"status": "online", "message": "Impactômetro Leia Mulheres API"}), 200

@app.route("/api/eventos", methods=["POST"])
def criar_evento():
    """Registrar um novo evento (RF1)
    ---
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
            autoras:
              type: array
              items:
                type: string
              example: ["Helena Kolody", "Alice Ruiz"]
    responses:
      201:
        description: Evento criado com sucesso
      400:
        description: Dados inválidos
      500:
        description: Erro no servidor ou banco de dados
    """
    try:
        raw_data = request.get_json()
        evento = EventoSchema(**raw_data)
        
        if db is not None:
            result = db.eventos.insert_one(evento.model_dump())
            return jsonify({"message": "Evento salvo com sucesso!", "id": str(result.inserted_id)}), 201
        else:
            return jsonify({"message": "[DEMO] Dados validados, mas MongoDB offline", "data": evento.model_dump()}), 201
            
    except ValidationError as e:
        return jsonify({"message": "Erro de validação", "errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"message": "Erro interno", "error": str(e)}), 500

@app.route("/api/questionarios", methods=["POST"])
def submeter_questionario():
    """Submeter questionário de impacto (RF2)
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: Questionario
          required:
            - participante_id
            - respostas
          properties:
            participante_id:
              type: string
              example: "user_99"
            respostas:
              type: object
              example: {"percepcao_inicial": 3, "interesse_tecnologia": 5, "comentario": "Adorei o evento!"}
    responses:
      201:
        description: Questionário processado com sucesso
      400:
        description: Erro nos dados enviados
    """
    try:
        raw_data = request.get_json()
        quest = QuestionarioSchema(**raw_data)
        
        if db is not None:
            result = db.questionarios.insert_one(quest.model_dump())
            return jsonify({"message": "Impacto registrado!", "id": str(result.inserted_id)}), 201
        else:
            return jsonify({"message": "[DEMO] Impacto validado, mas MongoDB offline", "data": quest.model_dump()}), 201
            
    except ValidationError as e:
        return jsonify({"message": "Erro de validação", "errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"message": "Erro interno", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
