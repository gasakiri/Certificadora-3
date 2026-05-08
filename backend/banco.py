from pymongo import MongoClient

try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=2000)

    db = client.impactometro_db

    client.server_info()

    print("MongoDB conectado!")

except Exception:
    print("AVISO: MongoDB não detectado.")
    db = None
