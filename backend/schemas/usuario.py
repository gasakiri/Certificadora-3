from pydantic import BaseModel, Field, EmailStr

class UsuarioCadastroSchema(BaseModel):
    nome: str = Field(..., min_length=3, description="Nome completo")
    email: EmailStr = Field(..., description="Email de acesso")
    senha: str = Field(..., min_length=6, description="Senha (mín. 6 caracteres)")

class UsuarioLoginSchema(BaseModel):
    email: EmailStr = Field(..., description="Email de acesso")
    senha: str = Field(..., min_length=1, description="Senha")
