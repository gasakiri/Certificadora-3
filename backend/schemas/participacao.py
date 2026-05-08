from pydantic import BaseModel, Field


class ParticipacaoSchema(BaseModel):
    evento_id: str = Field(..., description="ID do evento")

    participante_id: str = Field(..., description="ID do participante")

    presente: bool = Field(default=True, description="Confirma presença no evento")
