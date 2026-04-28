# Arquitetura do Projeto: Todo Backend

Este documento descreve a arquitetura técnica e as decisões de design para o Gerenciador de Tarefas construído com NestJS.

## 1. Stack Tecnológica
- **Framework:** [NestJS](https://nestjs.com/) (Node.js framework for scalable server-side applications)
- **Linguagem:** TypeScript
- **ORM:** [TypeORM](https://typeorm.io/)
- **Banco de Dados:** SQLite (Desenvolvimento)
- **Documentação API:** OpenAPI 3 (Swagger)
- **Validação:** class-validator e class-transformer

## 2. Padrões de Design e Princípios
O projeto segue os princípios de **Clean Code** e **SOLID**, com foco especial no:
- **SRP (Single Responsibility Principle):** Cada componente (Controller, Service, Entity) tem uma única responsabilidade.
- **Layered Architecture:** Separação clara entre a camada de transporte (HTTP/Controllers), lógica de negócio (Services) e persistência (Entities/Repositories).
- **Dependency Injection:** Utilizada nativamente pelo NestJS para desacoplar as classes.

## 3. Estrutura de Camadas

### 3.1. Camada de Controller (`.controller.ts`)
- Responsável por receber as requisições HTTP.
- Valida a entrada básica via Pipes.
- Define a documentação Swagger (Decorators).
- Não contém lógica de negócio.

### 3.2. Camada de Serviço (`.service.ts`)
- Onde reside a lógica de negócio principal.
- Orquestra as operações de persistência.
- Trata exceções específicas de negócio (ex: TaskNotFoundException).

### 3.3. Camada de Persistência (Entities & Repositories)
- `task.entity.ts`: Representa a tabela no banco de dados.
- Repositórios (TypeORM): Abstraem o acesso aos dados.

### 3.4. Data Transfer Objects (DTOs)
- Define o formato dos dados que entram e saem da API.
- Contém regras de validação (min/max length, types).

## 4. Diagrama de Fluxo (Simplificado)
`Client -> Controller (Validation) -> Service (Business Logic) -> Repository (Database)`

## 5. Documentação da API
A API é documentada automaticamente via Swagger, acessível em `/api` quando o servidor está em execução. Ela descreve todos os modelos de dados e possíveis códigos de retorno.
