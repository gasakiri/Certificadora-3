# Impactômetro Leia Mulheres — Frontend

Este diretório contém a aplicação frontend em React para o sistema **Impactômetro Leia Mulheres**, responsável pela interface do usuário e pela comunicação com a API Flask.

## 1. Ferramentas e Tecnologias

Para executar este projeto, são necessárias as seguintes ferramentas:

* **Linguagem:** [JavaScript / React](https://react.dev/)
* **Build:** [Vite](https://vitejs.dev/)
* **Navegação:** [React Router DOM](https://reactrouter.com/)
* **Gráficos:** [Recharts](https://recharts.org/)
* **HTTP:** [Axios](https://axios-http.com/)
* **Exportação PDF:** [jsPDF](https://parall.ax/products/jspdf) e [html2canvas](https://html2canvas.hertzen.com/)
* **Ícones:** [Lucide React](https://lucide.dev/)
* **IDE Recomendada:** [Visual Studio Code](https://code.visualstudio.com/)

## Bibliotecas Complementares

* `react-router-dom`
  * Roteamento e navegação entre páginas.
* `axios`
  * Requisições HTTP para o backend.
* `recharts`
  * Visualização de dados em gráficos.
* `lucide-react`
  * Ícones e componentes visuais.
* `jspdf` e `html2canvas`
  * Geração e exportação de relatórios em PDF.
* `vite`
  * Ferramenta de build e desenvolvimento.

---

## 2. Estrutura do Projeto

```text
frontend/
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── RotaProtegida.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TipoBadge.jsx
│   │   └── Topbar.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useApi.js
│   ├── pages/
│   │   ├── Cadastro.jsx
│   │   ├── CadastroEvento.jsx
│   │   ├── Comparativos.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Eventos.jsx
│   │   ├── Exportar.jsx
│   │   ├── Impacto.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Participantes.jsx
│   │   ├── Questionarios.jsx
│   │   └── Relatorios.jsx
│   └── services/
│       └── api.js
└── .env.example
```

---

## 3. Execução Local

### Pré-requisito

* O backend Flask deve estar funcionando em `http://localhost:5000`.

### Instalar dependências

```bash
cd frontend
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

### Produção

```bash
npm run build
```

---

## 4. Variável de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `VITE_API_URL` | `http://localhost:5000` | URL base da API Flask |

---

## 5. Controle de Acesso (RBAC)

A interface do frontend gerencia a visibilidade de recursos com base no papel do usuário obtido através do token JWT:

*   **Administrador (`admin`)**:
    *   Acesso total ao sistema.
    *   Pode visualizar e navegar pelos menus de **Participantes** e **Questionários**.
    *   Visualiza botões de cadastro (ex: "Novo Evento" no Dashboard e "Cadastrar Evento" na listagem de Eventos).
*   **Espectador (`viewer`)**:
    *   Permissão de apenas leitura.
    *   Visualiza todos os Dashboards, Análise de Impacto, Relatórios PDF e páginas de Exportação de Dados.
    *   Os links de gerenciamento (Participantes, Questionários) e botões de criação ficam ocultos no menu lateral e na interface.
    *   Tentativas de acessar páginas administrativas digitando a URL diretamente no navegador são bloqueadas pela rota protegida do React Router.

### Credenciais para Teste

*   **Administrador (Demo):**
    *   **Email:** `demo@utfpr.edu.br`
    *   **Senha:** `demo123`
*   **Espectador:**
    *   Para testar como espectador, basta clicar em **Criar conta** na tela de login e registrar um novo usuário. Qualquer nova conta criada recebe automaticamente o papel de espectador.
