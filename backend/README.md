# Impactômetro Leia Mulheres - Backend

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

* `flask-cors`

  * Gerenciamento de políticas de CORS para comunicação segura com o frontend React.

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

1. Acesse a documentação interativa em: `http://localhost:5000/apidocs/`.
2. **Teste de Eventos (RF1):**
   * Clique em `POST /api/eventos` -> `Try it out`.
   * Envie o JSON de exemplo e verifique a resposta `201 Created`.
   * Para listar os eventos, use `GET /api/eventos` -> `Try it out` -> `Execute`. Copie o `_id` gerado para usar nos próximos passos.
3. **Teste de Participantes:**
   * Clique em `POST /api/participantes` -> `Try it out`.
   * Envie o JSON com os dados e verifique a resposta `201 Created`. Copie o `id` gerado.
4. **Teste de Participações:**
   * Clique em `POST /api/participacoes` -> `Try it out`.
   * No JSON de exemplo, substitua os campos pelos IDs copiados nos passos 2 e 3. Verifique a resposta `201 Created`.
5. **Teste de Questionários (RF2):**
   * Clique em `POST /api/questionarios` -> `Try it out`.
   * Utilize os mesmos IDs para vincular as respostas ao evento e verifique o registro do impacto com a resposta `201 Created`.

---

## 6. Vídeo de Demonstração

O link para o vídeo com a instalação das ferramentas e execução do sistema pode ser encontrado abaixo:

* https://youtu.be/1zPjqhj1e7k

---

## 7. Equipe

* Gabriel Augusto Morisaki Rita
* Kalvin Koiti Ishii
* Matheus Roberto Ernandes
* Stéffane Leal Silva Santos

---

## 8. Objetivo do Projeto

Mensurar cientificamente o impacto social do projeto de extensão **Leia Mulheres**, utilizando coleta estruturada de dados, indicadores de percepção social e análise de engajamento.
