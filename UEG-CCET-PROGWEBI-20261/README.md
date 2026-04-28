# Todo Backend API (NestJS)

Este é um projeto simples de gerenciamento de tarefas (To-Do List) desenvolvido como parte da disciplina de Programação Web I.

## 🚀 Tecnologias Utilizadas
- **NestJS**: Framework Node.js progressivo.
- **TypeORM**: ORM para persistência de dados.
- **SQLite**: Banco de dados relacional leve (desenvolvimento).
- **Swagger (OpenAPI 3)**: Documentação interativa da API.
- **Class Validator**: Validação de dados de entrada.

## 📋 Funcionalidades
- Criar tarefas com título e descrição.
- Listar todas as tarefas (com filtro por status).
- Buscar tarefa por ID.
- Atualizar título, descrição e status.
- Alternar status de conclusão via PATCH.
- Excluir tarefas.

## 🛠️ Como Executar

### Pré-requisitos
- Node.js (v24.15.0 ou superior recomendado)
- npm

### Instalação
1. Instale as dependências:
   ```bash
   npm install
   ```

### Execução
1. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run start:dev
   ```
2. O servidor estará disponível em `http://localhost:3000`.

## 📖 Documentação (Swagger)
A documentação interativa da API pode ser acessada em:
`http://localhost:3000/api`

## 🏗️ Arquitetura
O projeto segue princípios de **Clean Code** e **SRP (Single Responsibility Principle)**, com a seguinte estrutura:
- `src/tasks/entities`: Definição do modelo de dados.
- `src/tasks/dto`: Validação dos dados de entrada.
- `src/tasks/tasks.service.ts`: Lógica de negócio.
- `src/tasks/tasks.controller.ts`: Endpoints e documentação Swagger.

## 📄 Licença
Este projeto é para fins educacionais.
