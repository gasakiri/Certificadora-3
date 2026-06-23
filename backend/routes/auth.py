import os
import jwt
import bcrypt
from datetime import datetime, timedelta, timezone
from flask import Blueprint, jsonify, request
from pydantic import ValidationError
from banco import db
from schemas.usuario import UsuarioCadastroSchema, UsuarioLoginSchema

auth_bp = Blueprint("auth", __name__)

SECRET_KEY = os.environ.get("JWT_SECRET", "impactometro-leia-mulheres-secret-2026")
TOKEN_EXPIRY_HOURS = 24


def gerar_token(user_id: str, nome: str, email: str, papel: str = "viewer") -> str:
    payload = {
        "sub": user_id,
        "nome": nome,
        "email": email,
        "papel": papel,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(hours=TOKEN_EXPIRY_HOURS),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def verificar_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def token_requerido(f):
    """Decorator para proteger rotas que exigem autenticação."""
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"message": "Token não fornecido"}), 401
        token = auth_header.split(" ", 1)[1]
        payload = verificar_token(token)
        if payload is None:
            return jsonify({"message": "Token inválido ou expirado"}), 401
        request.usuario = payload
        return f(*args, **kwargs)
    return decorated


def admin_requerido(f):
    """Decorator para proteger rotas exclusivas de administradores."""
    from functools import wraps
    @wraps(f)
    @token_requerido
    def decorated(*args, **kwargs):
        if request.usuario.get("papel") != "admin":
            return jsonify({"message": "Acesso negado: privilégios de administrador requeridos"}), 403
        return f(*args, **kwargs)
    return decorated


# ── POST /api/auth/cadastro ──────────────────────────────────
@auth_bp.route("/api/auth/cadastro", methods=["POST"])
def cadastro():
    """Cadastrar novo usuário administrador
    ---
    tags:
      - Auth
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: UsuarioCadastro
          required: [nome, email, senha]
          properties:
            nome:
              type: string
              example: "Stéffane Leal"
            email:
              type: string
              example: "steffane@utfpr.edu.br"
            senha:
              type: string
              example: "senha123"
    responses:
      201:
        description: Usuário criado com sucesso
      409:
        description: Email já cadastrado
    """
    try:
        raw = request.get_json()
        dados = UsuarioCadastroSchema(**raw)

        senha_hash = bcrypt.hashpw(dados.senha.encode(), bcrypt.gensalt()).decode()

        if db is not None:
            existente = db.usuarios.find_one({"email": dados.email})
            if existente:
                return jsonify({"message": "Email já cadastrado"}), 409

            result = db.usuarios.insert_one({
                "nome": dados.nome,
                "email": dados.email,
                "senha_hash": senha_hash,
                "papel": "viewer",
                "criado_em": datetime.now(timezone.utc).isoformat(),
            })
            user_id = str(result.inserted_id)
        else:
            # Modo demo — sem banco
            user_id = "demo-user-id"

        token = gerar_token(user_id, dados.nome, dados.email, "viewer")
        return jsonify({
            "message": "Usuário criado com sucesso!",
            "token": token,
            "usuario": {"id": user_id, "nome": dados.nome, "email": dados.email, "papel": "viewer"},
        }), 201

    except ValidationError as e:
        return jsonify({"message": "Erro de validação", "errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"message": "Erro interno", "error": str(e)}), 500


# ── POST /api/auth/login ─────────────────────────────────────
@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    """Login de usuário
    ---
    tags:
      - Auth
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: UsuarioLogin
          required: [email, senha]
          properties:
            email:
              type: string
              example: "steffane@utfpr.edu.br"
            senha:
              type: string
              example: "senha123"
    responses:
      200:
        description: Login bem-sucedido, retorna JWT
      401:
        description: Credenciais inválidas
    """
    try:
        raw = request.get_json()
        dados = UsuarioLoginSchema(**raw)

        # Permite login demo independente do banco estar conectado
        if dados.email == "demo@utfpr.edu.br" and dados.senha == "demo123":
            user_id = "demo-id"
            nome = "Usuário Demo"
            papel = "admin"
        elif db is not None:
            usuario = db.usuarios.find_one({"email": dados.email})
            if not usuario:
                return jsonify({"message": "Email ou senha incorretos"}), 401

            senha_ok = bcrypt.checkpw(dados.senha.encode(), usuario["senha_hash"].encode())
            if not senha_ok:
                return jsonify({"message": "Email ou senha incorretos"}), 401

            user_id = str(usuario["_id"])
            nome = usuario["nome"]
            papel = usuario.get("papel", "viewer")
        else:
            return jsonify({"message": "Modo demo: use demo@utfpr.edu.br / demo123"}), 401

        token = gerar_token(user_id, nome, dados.email, papel)
        return jsonify({
            "message": "Login realizado com sucesso!",
            "token": token,
            "usuario": {"id": user_id, "nome": nome, "email": dados.email, "papel": papel},
        }), 200

    except ValidationError as e:
        return jsonify({"message": "Erro de validação", "errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"message": "Erro interno", "error": str(e)}), 500


# ── GET /api/auth/me ─────────────────────────────────────────
@auth_bp.route("/api/auth/me", methods=["GET"])
@token_requerido
def me():
    """Retorna dados do usuário autenticado
    ---
    tags:
      - Auth
    security:
      - Bearer: []
    responses:
      200:
        description: Dados do usuário
      401:
        description: Não autenticado
    """
    return jsonify({"usuario": request.usuario}), 200
