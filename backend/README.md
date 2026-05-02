# Impactômetro Leia Mulheres - Backend

Este diretório contém a API backend para o sistema "Impactômetro Leia Mulheres", desenvolvida com Flask e integrada ao MongoDB.

## Requisitos

- Python 3.x
- MongoDB (rodando localmente ou em um servidor remoto)

## Como Configurar

1.  **Crie e ative um ambiente virtual:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate
    ```

2.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Inicie o servidor Flask:**
    ```bash
    python app.py
    ```

## Endpoints da API

- `GET /`: Mensagem de boas-vindas.
- `POST /api/eventos`: Registra um novo evento (RF1).
- `POST /api/questionarios`: Submete um novo questionário de impacto (RF2).

## Considerações de Deploy

O backend Flask requer um servidor que suporte Python e um banco de dados MongoDB. O **GitHub Pages não suporta este tipo de aplicação backend.** Considere serviços como Heroku, Railway ou Render para hospedar esta parte do sistema.
