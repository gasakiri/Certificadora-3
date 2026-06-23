import os
import sys
import getpass
from datetime import datetime, timezone
import bcrypt

from banco import db

def validar_senha(senha: str) -> str | None:
    if len(senha) < 6:
        return "A senha deve ter no mínimo 6 caracteres."
    return None

def coletar_dados_interativo():
    print("=== Criação de Administrador ===")
    nome = input("Nome completo: ").strip()
    while len(nome) < 3:
        print("O nome deve ter no mínimo 3 caracteres.")
        nome = input("Nome completo: ").strip()

    email = input("Email: ").strip()

    senha = getpass.getpass("Senha (mín. 6 caracteres): ")
    erro = validar_senha(senha)
    while erro:
        print(erro)
        senha = getpass.getpass("Senha (mín. 6 caracteres): ")
        erro = validar_senha(senha)

    confirmar = getpass.getpass("Confirme a senha: ")
    while confirmar != senha:
        print("As senhas não coincidem.")
        confirmar = getpass.getpass("Confirme a senha: ")

    return nome, email, senha

def main():
    if db is None:
        print("ERRO: não foi possível conectar ao MongoDB. Verifique se o banco está rodando.")
        sys.exit(1)

    nome, email, senha = coletar_dados_interativo()

    existente = db.usuarios.find_one({"email": email})
    if existente:
        print(f"\nJá existe um usuário com o email '{email}'.")
        if existente.get("papel") == "admin":
            print("Esse usuário já é administrador. Nada a fazer.")
        else:
            resp = input("Deseja promovê-lo a administrador? (s/N): ").strip().lower()
            if resp == "s":
                db.usuarios.update_one({"_id": existente["_id"]}, {"$set": {"papel": "admin"}})
                print("Usuário promovido a administrador com sucesso!")
            else:
                print("Operação cancelada.")
        return

    senha_hash = bcrypt.hashpw(senha.encode(), bcrypt.gensalt()).decode()

    result = db.usuarios.insert_one({
        "nome": nome,
        "email": email,
        "senha_hash": senha_hash,
        "papel": "admin",
        "criado_em": datetime.now(timezone.utc).isoformat(),
        "criado_por": "script_manual",
    })

    print(f"\nAdministrador criado com sucesso! ID: {result.inserted_id}")
    print(f"Email: {email}")
    print("Use essas credenciais para acessar as permissões de cadastro no sistema.")

if __name__ == "__main__":
    main()
