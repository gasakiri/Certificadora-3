from pydantic import BaseModel, Field
from typing import Dict, Any


class QuestionarioSchema(BaseModel):
    participante_id: str = Field(..., description="ID do participante")

    evento_id: str = Field(..., description="ID do evento")

    respostas: Dict[str, Any] = Field(..., description="Respostas do questionário")
