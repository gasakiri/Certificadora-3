# Impactômetro Leia Mulheres - Backend (Entrega Parcial)

Este diretório contém a API backend para o sistema **Impactômetro Leia Mulheres**, desenvolvida para a quantificação do impacto social do projeto de extensão.

## 1. Ferramentas e Tecnologias

Para compilar e executar este projeto, são necessárias as seguintes ferramentas:

*   **Linguagem:** [Python 3.11+](https://www.python.org/downloads/)
*   **Framework Web:** [Flask 3.1.3](https://flask.palletsprojects.com/)
*   **Banco de Dados:** [MongoDB Community Server 7.0+](https://www.mongodb.com/try/download/community)
*   **IDE Recomendada:** [Visual Studio Code](https://code.visualstudio.com/)
*   **Bibliotecas Complementares:**
    *   `pymongo`: Driver de conexão com MongoDB.
    *   `flasgger`: Documentação automática via Swagger UI.
    *   `pydantic`: Validação robusta de dados e schemas.

## 2. Roteiro de Instalação e Execução

### Passo 1: Configurar a Base de Dados (MongoDB)
1.  Baixe e instale o MongoDB Community Server através do link acima.
2.  Inicie o serviço do MongoDB em sua máquina local (porta padrão: 27017).
3.  O sistema criará automaticamente o banco `impactometro_db` ao receber a primeira requisição.

### Passo 2: Preparar o Ambiente Python
1.  Clone o repositório e navegue até a pasta `/backend`.
2.  Crie um ambiente virtual:
    ```bash
    python -m venv venv
    ```
3.  Ative o ambiente virtual:
    *   **Linux/macOS:** `source venv/bin/activate`
    *   **Windows:** `venv\Scripts\activate`
4.  Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```

### Passo 3: Executar a Aplicação
1.  Com o ambiente virtual ativo, execute:
    ```bash
    python app.py
    ```
2.  A API estará disponível em `http://localhost:5000`.

## 3. Roteiro de Testes

### Apresentação das Funcionalidades
*   **Módulo de Coleta (RF1/RF2):** Permite o registro de eventos e a submissão de questionários de impacto com validação rigorosa de dados.
*   **Documentação Interativa (Swagger):** Interface visual para testar todos os endpoints.

### Como Testar
1.  Acesse a documentação interativa em: `http://localhost:5000/apidocs/`.
2.  **Teste de Eventos (RF1):** 
    *   Clique em `POST /api/eventos` -> `Try it out`.
    *   Envie o JSON de exemplo e verifique a resposta `201 Created`.
3.  **Teste de Questionários (RF2):**
    *   Clique em `POST /api/questionarios` -> `Try it out`.
    *   Envie as respostas e verifique o registro do impacto.

## 4. Vídeo de Demonstração
O link para o vídeo com a instalação das ferramentas e execução do sistema pode ser encontrado abaixo:
*   [Link para o Vídeo no YouTube] (Substituir pelo link real após a gravação)

---
**Equipe:** 
-Gabriel Augusto Morisaki Rita 
-Kalvin Koiti Ishii 
-Matheus Roberto Ernandes 
-Stéffane Leal Silva Santos 
**Objetivo:** Mensurar cientificamente o impacto social do projeto Leia Mulheres.
