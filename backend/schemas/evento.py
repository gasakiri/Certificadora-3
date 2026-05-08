from pydantic import BaseModel, Field
from typing import List, Dict
from datetime import date

class EventoSchema(BaseModel):
    nome: str = Field(..., min_length=3, description="Nome do evento")

    data: date = Field(..., description="Data do evento (AAAA-MM-DD)")

    local: str = Field(..., description="Local do evento")

    livros: List[Dict] = Field(default=[], description="Livros e autoras discutidos")
