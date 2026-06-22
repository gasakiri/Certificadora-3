def migrar_questionarios_momento(db):
    for questionario in db.questionarios.find(
        {"momento": {"$exists": False}},
        {"_id": 1, "respostas.momento": 1},
    ):
        momento = questionario.get("respostas", {}).get("momento", "depois")
        if momento not in ("antes", "depois"):
            momento = "depois"

        db.questionarios.update_one(
            {"_id": questionario["_id"]},
            {
                "$set": {"momento": momento},
                "$unset": {"respostas.momento": ""},
            },
        )


def garantir_indices(db):
    """Cria indices da modelagem MongoDB usada pelo backend."""
    migrar_questionarios_momento(db)

    db.participantes.create_index("email", unique=True)
    db.usuarios.create_index("email", unique=True)
    db.eventos.create_index([("data", 1), ("tipo", 1)])
    db.participacoes.create_index(
        [("participante_id", 1), ("evento_id", 1)],
        unique=True,
    )
    db.questionarios.create_index(
        [("participante_id", 1), ("evento_id", 1), ("momento", 1)],
        unique=True,
    )
    db.questionarios.create_index([("evento_id", 1), ("momento", 1)])
