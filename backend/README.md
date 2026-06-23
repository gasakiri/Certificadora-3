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

* `PyJWT`
  * Geração e verificação de tokens JWT para autenticação.

* `bcrypt`
  * Hash seguro de senhas.

* `pytest`
  * Execução de testes unitários.

---

## 2. Estrutura do Projeto

```text
backend/
├── app.py
├── banco.py
├── criar_admin.py
├── seed_demo.py
├── Dockerfile
├── docker-compose.yml
├── pytest.ini
├── requirements.txt
├── routes/
│   ├── auth.py
│   ├── eventos.py
│   ├── participantes.py
│   ├── participacoes.py
│   └── questionarios.py
├── schemas/
│   ├── evento.py
│   ├── participacao.py
│   ├── participante.py
│   ├── questionario.py
│   └── usuario.py
├── services/
│   └── modelagem.py
└── tests/
    ├── test_modelagem.py
    └── test_questionarios.py
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

## 5. Controle de Acesso (RBAC)

O backend do Impactômetro implementa um controle de acesso baseado em papéis (RBAC):
*   **Administrador (`admin`)**: Possui permissões totais para ler e registrar/editar dados (eventos, participantes, questionários, etc.).
*   **Espectador (`viewer`)**: Possui permissão apenas para leitura (visualizar dashboards, relatórios e métricas de impacto). Qualquer tentativa de registro ou alteração sem permissão apropriada retornará `403 Forbidden`.

### Usuário Demo Padrão
O sistema inicializa um usuário demo que possui privilégios de **administrador**:
*   **Email:** `demo@utfpr.edu.br`
*   **Senha:** `demo123`

### Criando Novos Administradores via CLI
Para criar um novo usuário com papel de administrador diretamente no banco de dados, com o ambiente virtual ativo, execute:
```bash
python criar_admin.py
```
*Nota: Novas contas registradas via tela de cadastro ou na rota `/api/auth/cadastro` recebem papel de **espectador** por padrão.*

---

## 6. Roteiro de Testes

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
2. **Teste de Autenticação e Perfis (Importante):**
   * Por padrão, novas contas criadas em `POST /api/auth/cadastro` recebem o papel de **espectador** (`viewer`) e **não podem** cadastrar eventos ou participantes (retornam `403 Forbidden`).
   * Para testar a API com permissão de escrita, faça login com a conta de **Administrador Demo** enviando o email `demo@utfpr.edu.br` e senha `demo123` na rota `POST /api/auth/login`.
   * Copie o `token` retornado.
   * Cole o token no campo de autenticação (Header `Authorization: Bearer <token>`) para autorizar as requisições protegidas.
3. **Teste de Eventos (RF1 - Requer Admin):**
   * Clique em `POST /api/eventos` -> `Try it out`.
   * Envie o JSON de exemplo e verifique a resposta `201 Created`.
   * Para listar os eventos, use `GET /api/eventos` -> `Try it out` -> `Execute`. Copie o `_id` gerado para usar nos próximos passos.
4. **Teste de Participantes (Requer Admin):**
   * Clique em `POST /api/participantes` -> `Try it out`.
   * Envie o JSON com os dados e verifique a resposta `201 Created`. Copie o `id` gerado.
5. **Teste de Participações (Requer Admin):**
   * Clique em `POST /api/participacoes` -> `Try it out`.
   * No JSON de exemplo, substitua os campos pelos IDs copiados nos passos 3 e 4. Verifique a resposta `201 Created`.
6. **Teste de Questionários (RF2 - Requer Admin):**
   * Clique em `POST /api/questionarios` -> `Try it out`.
   * Utilize os mesmos IDs para vincular as respostas ao evento e verifique o registro do impacto com a resposta `201 Created`.

---

## 7. Testes Unitários

Os testes cobrem a modelagem do banco, schemas e as rotas principais. O `pytest.ini` já configura o `pythonpath` para que os módulos do backend sejam encontrados corretamente.

### Executar os testes

Na pasta `/backend`, com o ambiente virtual ativo:

```bash
pytest
```

Ou com saída detalhada:

```bash
pytest -v
```

### Testes existentes

| Arquivo | Teste | O que verifica |
|---|---|---|
| `test_modelagem.py` | `test_evento_schema_guarda_tipo_com_default` | Campo `tipo` do `EventoSchema` assume `"Roda de Conversa"` por padrão |
| `test_modelagem.py` | `test_questionario_schema_separa_momento_antes_depois` | Campo `momento` do `QuestionarioSchema` aceita `"antes"` e `"depois"` |
| `test_modelagem.py` | `test_modelagem_cria_indice_unico_para_questionario_por_momento` | `garantir_indices` cria índice único em `(participante_id, evento_id, momento)` |
| `test_questionarios.py` | `test_submeter_questionario_usa_momento_na_chave_do_upsert` | Rota `POST /api/questionarios` usa `momento` como chave de upsert no MongoDB |

> Os testes usam fakes (mocks manuais) no lugar do MongoDB, portanto não é necessário ter o banco ativo para executá-los.

---

## 8. Vídeo de Demonstração

O link para o vídeo com a instalação das ferramentas e execução do sistema pode ser encontrado abaixo:

* https://youtu.be/1zPjqhj1e7k

---

## 9. Equipe

* Gabriel Augusto Morisaki Rita
* Kalvin Koiti Ishii
* Matheus Roberto Ernandes
* Stéffane Leal Silva Santos

---

## 10. Objetivo do Projeto

Mensurar cientificamente o impacto social do projeto de extensão **Leia Mulheres**, utilizando coleta estruturada de dados, indicadores de percepção social e análise de engajamento.
