# Impactômetro Leia Mulheres - Backend (Entrega Parcial)

Este diretório contém a API backend para o sistema **Impactômetro Leia Mulheres**, desenvolvida para a quantificação do impacto social do projeto de extensão.

## 1. Ferramentas e Tecnologias

Para compilar e executar este projeto, são necessárias as seguintes ferramentas:

* **Linguagem:** [Python 3.11+](https://www.python.org/downloads/)
* **Framework Web:** [Flask 3.1.3](https://flask.palletsprojects.com/)
* **Banco de Dados:** [MongoDB Community Server 7.0+](https://www.mongodb.com/try/download/community)
* **Containerização:** [Docker](https://www.docker.com/)
* **IDE Recomendada:** [Visual Studio Code](https://code.visualstudio.com/)

## Bibliotecas Complementares

* `pymongo`

  * Driver de conexão com MongoDB.

* `flasgger`

  * Documentação automática via Swagger UI.

* `pydantic`

  * Validação robusta de dados e schemas.

* `email-validator`

  * Validação de emails utilizando `EmailStr`.

---

## 2. Estrutura do Projeto

```text id="jlwm1"
backend/
├── app.py
├── banco.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── routes/
│   ├── eventos.py
│   ├── participantes.py
│   ├── participacoes.py
│   └── questionarios.py
└── schemas/
    ├── evento.py
    ├── participante.py
    ├── participacao.py
    └── questionario.py
```

---

## 3. Execução com Docker

O sistema pode ser executado completamente via Docker, sem necessidade de instalar manualmente Python ou MongoDB.

### Requisitos

* Docker
* Docker Compose

### Executar o Sistema

Na pasta `/backend`, execute:

```bash id="’wini2"
docker compose up --build
```

A API ficará disponível em:

```text id="’wini3"
http://localhost:5000/apidocs/
```

### Encerrar Containers

```bash id="’wini4"
docker compose down
```

### Observações

* O MongoDB é executado internamente via Docker;
* Os dados persistem utilizando Docker Volumes;
* O Swagger pode ser acessado normalmente pelo navegador.

---

## 4. Roteiro de Instalação e Execução Manual

### Passo 1: Configurar a Base de Dados (MongoDB)

1. Baixe e instale o MongoDB Community Server através do link acima.
2. Inicie o serviço do MongoDB em sua máquina local (porta padrão: 27017).
3. O sistema criará automaticamente o banco `impactometro_db`.

### Passo 2: Preparar o Ambiente Python

1. Clone o repositório e navegue até a pasta `/backend`.

2. Crie um ambiente virtual:

```bash id="’wini5"
python -m venv venv
```

3. Ative o ambiente virtual:

* **Linux/macOS:** `source venv/bin/activate`
* **Windows:** `venv\Scripts\activate`

4. Instale as dependências:

```bash id="’wini6"
pip install -r requirements.txt
```

### Passo 3: Executar a Aplicação

1. Com o ambiente virtual ativo, execute:

```bash id="’wini7"
python app.py
```

2. A API estará disponível em `http://localhost:5000`.

---

## 5. Roteiro de Testes

### Apresentação das Funcionalidades

* **Módulo de Coleta (RF1/RF2):**

  * Registro de eventos;
  * Cadastro de participantes;
  * Registro de participações;
  * Submissão de questionários de impacto;
  * Validação rigorosa de dados.

* **Documentação Interativa (Swagger):**

  * Interface visual para testar todos os endpoints.

### Como Testar

1. Acesse a documentação interativa em:
   `http://localhost:5000/apidocs/`

---

### Teste de Eventos

#### Criar Evento

Endpoint:

```text id="’wini8"
POST /api/eventos
```

Exemplo:

```json id="’wini9"
{
  "nome": "Leia Mulheres Maio",
  "data": "2026-05-20",
  "local": "UTFPR Cornélio Procópio",
  "livros": [
    {
      "titulo": "A Hora da Estrela",
      "autora": "Clarice Lispector"
    }
  ]
}
```

---

#### Listar Eventos

Endpoint:

```text id="’wini10"
GET /api/eventos
```

Retorna todos os eventos cadastrados no banco.

---

### Teste de Participantes

Endpoint:

```text id="’wini11"
POST /api/participantes
```

Exemplo:

```json id="’wini12"
{
  "nome": "Maria",
  "curso": "Engenharia de Computação",
  "email": "maria@utfpr.edu.br"
}
```

---

### Teste de Participações

Endpoint:

```text id="’wini13"
POST /api/participacoes
```

Exemplo:

```json id="’wini14"
{
  "participante_id": "ID_DO_PARTICIPANTE",
  "evento_id": "ID_DO_EVENTO"
}
```

---

### Teste de Questionários

Endpoint:

```text id="’wini15"
POST /api/questionarios
```

Exemplo:

```json id="’wini16"
{
  "participante_id": "ID_DO_PARTICIPANTE",
  "evento_id": "ID_DO_EVENTO",
  "respostas": {
    "interesse_tecnologia": 5,
    "percepcao_inicial": 4,
    "comentario": "Evento excelente"
  }
}
```

---

## 6. Vídeo de Demonstração

O link para o vídeo com a instalação das ferramentas e execução do sistema pode ser encontrado abaixo:

* [Link para o Vídeo no YouTube]

---

## 7. Equipe

* Gabriel Augusto Morisaki Rita
* Kalvin Koiti Ishii
* Matheus Roberto Ernandes
* Stéffane Leal Silva Santos

---

## 8. Objetivo do Projeto

Mensurar cientificamente o impacto social do projeto de extensão **Leia Mulheres**, utilizando coleta estruturada de dados, indicadores de percepção social e análise de engajamento.
