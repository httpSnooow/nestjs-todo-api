# Especificação Técnica: Gerenciador de Tarefas (To-Do List)

Este documento descreve as operações e requisitos técnicos para o backend do sistema de gerenciamento de tarefas.

## 1. Visão Geral
O sistema consiste em uma API RESTful para gerenciar uma lista de tarefas, permitindo a criação, leitura, atualização e exclusão de itens (CRUD).

## 2. Modelo de Dados

### Tarefa (Task)
| Campo         | Tipo      | Descrição                                      |
| :------------ | :-------- | :--------------------------------------------- |
| `id`          | UUID/Int  | Identificador único da tarefa                  |
| `title`       | String    | Título da tarefa (obrigatório, min 3 chars)    |
| `description` | String    | Descrição detalhada da tarefa (opcional)       |
| `completed`   | Boolean   | Status de conclusão (default: false)           |
| `createdAt`   | DateTime  | Data/hora de criação                           |
| `updatedAt`   | DateTime  | Data/hora da última atualização                |

## 3. Endpoints da API (Operações)

### 3.1. Listar Tarefas
- **Endpoint:** `GET /tasks`
- **Descrição:** Retorna todas as tarefas cadastradas.
- **Filtros (Opcional):** `?completed=true` ou `?completed=false`
- **Resposta de Sucesso:** `200 OK` (Array de Tarefas)

### 3.2. Buscar Tarefa por ID
- **Endpoint:** `GET /tasks/:id`
- **Descrição:** Retorna os detalhes de uma tarefa específica.
- **Resposta de Sucesso:** `200 OK` (Objeto Tarefa)
- **Resposta de Erro:** `404 Not Found`

### 3.3. Criar Tarefa
- **Endpoint:** `POST /tasks`
- **Corpo da Requisição:**
  ```json
  {
    "title": "Comprar leite",
    "description": "Ir ao mercado e comprar 2 litros de leite desnatado"
  }
  ```
- **Resposta de Sucesso:** `201 Created` (Objeto Tarefa com ID gerado)
- **Resposta de Erro:** `400 Bad Request` (Se faltar título)

### 3.4. Atualizar Tarefa (Geral)
- **Endpoint:** `PUT /tasks/:id`
- **Descrição:** Atualiza todos os campos de uma tarefa existente.
- **Corpo da Requisição:** Campos `title`, `description`, `completed`.
- **Resposta de Sucesso:** `200 OK`
- **Resposta de Erro:** `404 Not Found` ou `400 Bad Request`

### 3.5. Atualizar Status (Parcial)
- **Endpoint:** `PATCH /tasks/:id/status`
- **Descrição:** Alterna apenas o estado de conclusão da tarefa.
- **Corpo da Requisição:** `{"completed": boolean}`
- **Resposta de Sucesso:** `200 OK`

### 3.6. Excluir Tarefa
- **Endpoint:** `DELETE /tasks/:id`
- **Descrição:** Remove uma tarefa permanentemente.
- **Resposta de Sucesso:** `204 No Content`
- **Resposta de Erro:** `404 Not Found`

## 4. Requisitos Não Funcionais (Sugestões)
- **Persistência:** Banco de dados relacional (SQLite para desenvolvimento, PostgreSQL para produção).
- **Validação:** 
  - Garantir que o título:
    - não seja vazio.
    - E tenha pelo menos três caracteres.
    - O tamanho máximo do título de 200 caracteres
  - Garantir que a descrição 
    - Quando preenchida tenha mais de 5 caracteres e menos de 500
- **Logs:** Registrar operações de escrita (CUD).
- **CORS:** Habilitar para permitir acesso do frontend.
