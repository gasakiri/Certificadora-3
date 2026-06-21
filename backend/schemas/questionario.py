from pydantic import BaseModel, Field
from typing import Dict, Any
from typing import Literal


class QuestionarioSchema(BaseModel):
    participante_id: str = Field(..., description="ID do participante")

    evento_id: str = Field(..., description="ID do evento")

    momento: Literal["antes", "depois"] = Field(default="depois", description="Momento de aplicação do questionário")

    respostas: Dict[str, Any] = Field(..., description="Respostas do questionário")
