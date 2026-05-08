from pydantic import BaseModel, Field, EmailStr

class ParticipanteSchema(BaseModel):
    nome: str = Field(..., min_length=3, description="Nome do participante")

    curso: str = Field(..., description="Curso do participante")

    email: EmailStr = Field(..., description="Email do participante")