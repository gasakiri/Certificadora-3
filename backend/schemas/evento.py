from pydantic import BaseModel, Field
from typing import List, Dict


class EventoSchema(BaseModel):
    nome: str = Field(..., min_length=3, description="Nome do evento")

    data: str = Field(..., description="Data do evento")

    local: str = Field(..., description="Local do evento")

    livros: List[Dict] = Field(default=[], description="Livros e autoras discutidos")
