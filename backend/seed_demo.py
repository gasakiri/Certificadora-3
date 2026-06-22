import os

from pymongo import MongoClient

client = MongoClient(os.environ.get("MONGO_URI", "mongodb://localhost:27017/"), serverSelectionTimeoutMS=2000)
db = client[os.environ.get("MONGO_DB", "impactometro_db")]

if db.eventos.count_documents({}) == 0:
    db.eventos.insert_many([
        {
            "nome": "Roda de Conversa - Autoras Paranaenses",
            "tipo": "Roda de Conversa",
            "data": "2026-05-20",
            "local": "UTFPR",
            "livros": [{"titulo": "A Hora da Estrela", "autora": "Clarice Lispector"}]
        },
        {
            "nome": "Minicurso - Escrita Criativa",
            "tipo": "Minicurso",
            "data": "2026-06-10",
            "local": "Online",
            "livros": []
        }
    ])

    eventos = list(db.eventos.find())
    ev1_id = str(eventos[0]["_id"])
    ev2_id = str(eventos[1]["_id"])

    participantes = []
    participacoes = []
    quest = []
    for i in range(10):
        participante_id = f"demo_p_ev1_{i}"
        participantes.append({
            "_id": participante_id,
            "nome": f"Participante Demo {i + 1}",
            "curso": "Engenharia de Computação",
            "email": f"demo.ev1.{i}@utfpr.edu.br",
        })
        participacoes.append({
            "evento_id": ev1_id,
            "participante_id": participante_id,
            "presente": True,
        })
        quest.append({
            "evento_id": ev1_id,
            "participante_id": participante_id,
            "momento": "antes",
            "respostas": {
                "engajamento": 3, "aprendizado": 3, "identificacao_autoras": 3, "interesse_tecnologia": 2, "percepcao_impacto": 3
            }
        })
        quest.append({
            "evento_id": ev1_id,
            "participante_id": participante_id,
            "momento": "depois",
            "respostas": {
                "engajamento": 4, "aprendizado": 5, "identificacao_autoras": 4, "interesse_tecnologia": 3, "percepcao_impacto": 5
            }
        })
    for i in range(15):
        participante_id = f"demo_p_ev2_{i}"
        participantes.append({
            "_id": participante_id,
            "nome": f"Participante Demo {i + 11}",
            "curso": "Tecnologia em Análise e Desenvolvimento de Sistemas",
            "email": f"demo.ev2.{i}@utfpr.edu.br",
        })
        participacoes.append({
            "evento_id": ev2_id,
            "participante_id": participante_id,
            "presente": True,
        })
        quest.append({
            "evento_id": ev2_id,
            "participante_id": participante_id,
            "momento": "antes",
            "respostas": {
                "engajamento": 3, "aprendizado": 3, "identificacao_autoras": 4, "interesse_tecnologia": 3, "percepcao_impacto": 3
            }
        })
        quest.append({
            "evento_id": ev2_id,
            "participante_id": participante_id,
            "momento": "depois",
            "respostas": {
                "engajamento": 5, "aprendizado": 4, "identificacao_autoras": 5, "interesse_tecnologia": 5, "percepcao_impacto": 4
            }
        })

    db.participantes.insert_many(participantes)
    db.participacoes.insert_many(participacoes)
    db.questionarios.insert_many(quest)
    print("Banco de dados populado com sucesso com dados DEMO!")
else:
    print("O banco já possui dados. Nenhuma ação necessária.")
