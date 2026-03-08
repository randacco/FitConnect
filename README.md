# FitnessConnect (FitConnect)

Plataforma web do **Projeto Integrador IV** — Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseados na Web (Senac).


## Integrantes do Projeto


- Ana Carolina Silva Biscalchin
- Henrique Lilge Birriel
- Jeferson Oliveira Dos Santos
- Leonardo Sheldow Dos Santos Brito
- Natally Ferreira Almeida Do Amaral
- Rodrigo Pinto Do Amaral Lopes


## Índice

- [Integrantes do Projeto](#integrantes-do-projeto)
- [Vídeo da Entrega](#vídeo-da-entrega)
- [Visão do produto](#visão-do-produto)
- [Funcionalidades](#funcionalidades-conforme-pdf)
- [Requisitos técnicos](#requisitos-técnicos-pdf)
- [Como rodar](#como-rodar)
- [Estrutura do app](#estrutura-do-app)
- [Stack](#stack)
- [API Endpoints](#api-endpoints)
- [Desenvolvimento em Fases](#desenvolvimento-em-fases)

- Ana Carolina Silva Biscalchin
- Henrique Lilge Birriel
- Jeferson Oliveira Dos Santos
- Leonardo Sheldow Dos Santos Brito
- Natally Ferreira Almeida Do Amaral
- Rodrigo Pinto Do Amaral Lopes

## Vídeo da Entrega

O vídeo de demonstração está disponível no próprio repositório:

- [Assistir demonstração (MP4)](./video/demo-fitconnect.mp4)

> Coloque o arquivo em `video/demo-fitconnect.mp4` para manter o link funcionando no GitHub.

## Visão do produto

O FitnessConnect é uma aplicação web responsiva que conecta **alunos**, **personal trainers** e **academias**:

- **Alunos**: buscam treinos por geolocalização, filtros (preço, data), avaliam personais e academias, pagam em um único valor (pay-per-use).
- **Personais**: encontram espaços em academias parceiras, gerenciam agenda, recebem pagamento via split e têm perfil com certificações e avaliações.
- **Academias**: cadastram horários disponíveis (marketplace de espaços), controlam acesso (ex.: QR Code), recebem repasse automático (split).

## Funcionalidades 

1. **Busca e geolocalização** — Encontrar personais e academias parceiras próximas.
2. **Gestão de agenda integrada** — Sincronização de horários do personal com vagas da academia.
3. **Marketplace de espaços** — Cadastro de infraestrutura e valores por parte das academias.
4. **Sistema de avaliação** — Rating para personais, alunos e instalações.
5. **Pagamento split** — Um único pagamento do aluno; a plataforma divide automaticamente (personal + academia + taxa de serviço).

## Prova de conceito (2a etapa)

Para a segunda etapa, a POC foi definida com foco em validar a jornada principal de reserva de treino e, adicionalmente, revisar a jornada do personal trainer em escopo funcional parcial.

### POC implementada (funcional)

- Cadastro e login por perfil (`aluno`, `personal`, `academia`)
- Busca de treinos com filtros (preco, data e ordenacao)
- Detalhe do treino e reserva
- Agenda de reservas via API

### Jornada do personal trainer (Rafael "Rafa" Monteiro) - revisitada

**Objetivo da persona**

- Preencher horarios ociosos, encontrar espacos para atender alunos e aumentar visibilidade profissional.

**Passos da jornada**

1. Acessa o sistema e autentica como `personal`.
2. Consulta agenda e acompanha reservas.
3. Visualiza academias disponiveis no marketplace.
4. Acompanha reputacao em avaliacoes.
5. Organiza sua rotina para aceitar novas reservas.

**Dores que a jornada ataca**

- Dificuldade de encontrar academias para atendimento externo.
- Agenda e operacao descentralizadas.
- Baixa visibilidade para captar novos alunos.

**Status atual na entrega**

- Implementado: autenticacao por perfil, painel do personal com agenda, academias e avaliacoes.
- Parcial (proxima fase): fluxo completo de aceite de reserva pelo personal, avaliacoes persistidas e repasse financeiro/split real.

## Requisitos técnicos (PDF)

- **Software**: navegador atualizado (Chrome, Firefox, Safari ou Edge) e conexão estável com a internet.
- **Hardware**: qualquer dispositivo com internet (computador, tablet ou smartphone); não é necessária instalação local.

## Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados
```bash
# Gerar Prisma Client
npx prisma generate

# Rodar migrations (criar tabelas)
npx prisma migrate dev

# Popular banco com dados de exemplo
npx prisma db seed
```

### 3. Rodar aplicação
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### 4. (Opcional) Visualizar dados do banco
```bash
npx prisma studio
```

Acesse [http://localhost:5555](http://localhost:5555) para ver os dados no navegador.

## Estrutura do app

- **Landing** (`/`) — Apresentação e links para busca, login e cadastro (aluno, personal, academia).
- **Busca** (`/busca`) — Listagem de treinos com filtros (preço máximo, data) e ordenação (data, preço, avaliação).
- **Login** (`/login`) e **Cadastro** (`/cadastro`) — Autenticacao via API com cookie HTTP-only de sessao.
- **Reserva** (`/reserva/[id]`) — Confirmação de reserva e explicação do pagamento split.
- **Dashboard** (`/dashboard`) — Painel por perfil:
  - **Aluno**: início, agenda, buscar treinos, gastos.
  - **Personal**: início, agenda, academias (marketplace), avaliações.
  - **Academia**: início, reservas, espaços, financeiro.

## Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite + Prisma ORM
- **Autenticação**: Cookies HTTP-only (FASE 0) → JWT (FASE 1)

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Dados do usuário logado
- `POST /api/auth/logout` - Fazer logout

### Treinos
- `GET /api/treinos` - Listar treinos (com filtros: ?precoMax=150&data=2025-03-10&ordenar=preco)
- `GET /api/treinos/[id]` - Buscar treino por ID

### Reservas
- `GET /api/reservas` - Listar minhas reservas
- `POST /api/reservas` - Criar nova reserva (body: {treinoId})

## Desenvolvimento em Fases

Este projeto está sendo desenvolvido em 3 fases incrementais. Para a entrega da segunda etapa do projeto integrador, estaremos focados em executar a FASE 0, porém deixamos documentadas abaixo as fases seguintes com as possíveis melhorias:

- **FASE 0 (MVP Mínimo)**: Backend funcional + jornada principal de reserva + jornada do personal em escopo parcial - CONCLUÍDO
- **FASE 1 (Segurança)**: Bcrypt, JWT, middleware, validação
- **FASE 2 (Features Completas)**: Avaliações, QR Code, pagamento, upload, geolocalização

---

Projeto Integrador IV — Centro Universitário Senac — 2025.
