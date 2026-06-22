import os

from pymongo import MongoClient

from services.modelagem import garantir_indices

try:
    mongo_uri = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
    mongo_db = os.environ.get("MONGO_DB", "impactometro_db")
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=2000)

    db = client[mongo_db]

    client.server_info()
    garantir_indices(db)

    print(f"MongoDB conectado em {mongo_uri}")

except Exception:
    print("AVISO: MongoDB não detectado.")
    db = None
