from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=2000)
db = client.impactometro_db

if db.eventos.count_documents({}) == 0:
    db.eventos.insert_many([
        {
            "nome": "Roda de Conversa - Autoras Paranaenses",
            "data": "2026-05-20",
            "local": "UTFPR",
            "participantes": 45,
            "livros": [{"titulo": "A Hora da Estrela", "autora": "Clarice Lispector"}]
        },
        {
            "nome": "Minicurso - Escrita Criativa",
            "data": "2026-06-10",
            "local": "Online",
            "participantes": 120,
            "livros": []
        }
    ])

    eventos = list(db.eventos.find())
    ev1_id = str(eventos[0]["_id"])
    ev2_id = str(eventos[1]["_id"])

    quest = []
    for i in range(10):
        quest.append({
            "evento_id": ev1_id,
            "participante_id": f"p1_{i}",
            "respostas": {
                "engajamento": 4, "aprendizado": 5, "identificacao_autoras": 4, "interesse_tecnologia": 3, "percepcao_impacto": 5
            }
        })
    for i in range(15):
        quest.append({
            "evento_id": ev2_id,
            "participante_id": f"p2_{i}",
            "respostas": {
                "engajamento": 5, "aprendizado": 4, "identificacao_autoras": 5, "interesse_tecnologia": 5, "percepcao_impacto": 4
            }
        })
    
    db.questionarios.insert_many(quest)
    print("Banco de dados populado com sucesso com dados DEMO!")
else:
    print("O banco já possui dados. Nenhuma ação necessária.")
