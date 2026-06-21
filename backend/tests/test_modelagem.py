import unittest

from schemas.evento import EventoSchema
from schemas.questionario import QuestionarioSchema
from services.modelagem import garantir_indices


class ColecaoFake:
    def __init__(self):
        self.indices = []

    def find(self, *args, **kwargs):
        return []

    def update_one(self, *args, **kwargs):
        return None

    def create_index(self, campos, unique=False):
        self.indices.append((campos, unique))


class DbFake:
    def __init__(self):
        self.participantes = ColecaoFake()
        self.usuarios = ColecaoFake()
        self.eventos = ColecaoFake()
        self.participacoes = ColecaoFake()
        self.questionarios = ColecaoFake()


class TestModelagem(unittest.TestCase):
    def test_evento_schema_guarda_tipo_com_default(self):
        evento = EventoSchema(
            nome="Roda de Conversa - Autoras",
            data="2026-05-20",
            local="UTFPR",
            livros=[],
        )

        self.assertEqual(evento.tipo, "Roda de Conversa")

    def test_questionario_schema_separa_momento_antes_depois(self):
        questionario = QuestionarioSchema(
            participante_id="p1",
            evento_id="e1",
            momento="antes",
            respostas={"engajamento": 4},
        )

        self.assertEqual(questionario.momento, "antes")

    def test_modelagem_cria_indice_unico_para_questionario_por_momento(self):
        db = DbFake()

        garantir_indices(db)

        self.assertIn(
            (
                [("participante_id", 1), ("evento_id", 1), ("momento", 1)],
                True,
            ),
            db.questionarios.indices,
        )


if __name__ == "__main__":
    unittest.main()
