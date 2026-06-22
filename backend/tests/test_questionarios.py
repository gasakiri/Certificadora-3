import unittest
from unittest.mock import patch

from app import app
from routes import questionarios as questionarios_route


class ParticipacoesFake:
    def find_one(self, filtro):
        return {"participante_id": filtro["participante_id"], "evento_id": filtro["evento_id"]}


class QuestionariosFake:
    def __init__(self):
        self.filtro = None
        self.update = None

    def update_one(self, filtro, update, upsert=False):
        self.filtro = filtro
        self.update = update
        self.upsert = upsert


class DbFake:
    def __init__(self):
        self.participacoes = ParticipacoesFake()
        self.questionarios = QuestionariosFake()


class TestQuestionarios(unittest.TestCase):
    def test_submeter_questionario_usa_momento_na_chave_do_upsert(self):
        db = DbFake()

        with patch.object(questionarios_route, "db", db):
            response = app.test_client().post(
                "/api/questionarios",
                json={
                    "participante_id": "p1",
                    "evento_id": "e1",
                    "momento": "antes",
                    "respostas": {"engajamento": 4},
                },
            )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            db.questionarios.filtro,
            {
                "participante_id": "p1",
                "evento_id": "e1",
                "momento": "antes",
            },
        )
        self.assertEqual(db.questionarios.update["$set"]["momento"], "antes")
        self.assertTrue(db.questionarios.upsert)


if __name__ == "__main__":
    unittest.main()
