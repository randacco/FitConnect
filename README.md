# FitnessConnect (FitConnect)

Plataforma web do **Projeto Integrador IV** — Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseados na Web (Senac).


## Integrantes do projeto


- Ana Carolina Silva Biscalchin [[ana-biscalchin](https://github.com/ana-biscalchin)]
- Henrique Lilge Birriel [[randacco](https://github.com/randacco)]
- Jeferson Oliveira Dos Santos [[jefersonsantos-globant](https://github.com/jefersonsantos-globant)]
- Leonardo Sheldow Dos Santos Brito [[leonardosheldow1808](https://github.com/leonardosheldow1808)]
- Natally Ferreira Almeida Do Amaral
- Rodrigo Pinto Do Amaral Lopes [[Rodrigo-Amaral1](https://github.com/Rodrigo-Amaral1)]


## Índice

- [Integrantes do projeto](#integrantes-do-projeto)
- [Documentação do desenvolvimento do projeto](#documentação-do-desenvolvimento-do-projeto)
- [Vídeo da entrega](#vídeo-da-entrega)
- [Visão do produto](#visão-do-produto)
- [Funcionalidades](#funcionalidades)
- [Requisitos técnicos](#requisitos-técnicos)
- [Como rodar](#como-rodar)
- [Estrutura do app](#estrutura-do-app)
- [Stack](#stack)
- [API endpoints](#api-endpoints)
- [Desenvolvimento em fases](#desenvolvimento-em-fases)

## Documentação do desenvolvimento do projeto

O projeto foi desenvolvido a partir de um documento colaborativo, disponível em PDF localizado no repositório, detalhando todos os processos envolvidos para a criação do software:

- [Ler documentação do desenvolvimento (PDF)](./doc/Projeto Integrador IV - DESENVOLVIMENTO DE SISTEMAS ORIENTADO A DISPOSITIVOS MÓVEIS E BASEADOS NA WEB-1.pdf)

## Vídeo da entrega

O vídeo de demonstração está disponível no próprio repositório:

- [Assistir demonstração (MP4)](./video/demo-fitconnect.mp4)


## Visão do produto

O FitnessConnect é uma aplicação web responsiva que conecta **alunos**, **personal trainers** e **academias**:

- **Alunos**: buscam treinos por geolocalização, filtros (preço, data), avaliam personais e academias, pagam em um único valor (pay-per-use)
- **Personais**: encontram espaços em academias parceiras, gerenciam agenda, recebem pagamento via split e têm perfil com certificações e avaliações
- **Academias**: cadastram horários disponíveis (marketplace de espaços), controlam acesso (ex.: QR Code), recebem repasse automático (split)

## Funcionalidades

1. **Busca e geolocalização** — encontrar personais e academias parceiras próximas
2. **Gestão de agenda integrada** — sincronização de horários do personal com vagas da academia
3. **Marketplace de espaços** — cadastro de infraestrutura e valores por parte das academias
4. **Sistema de avaliação** — rating para personais, alunos e instalações
5. **Pagamento split** — um único pagamento do aluno; a plataforma divide automaticamente (personal + academia + taxa de serviço)

## Prova de conceito (2a etapa)

Para a segunda etapa, a POC foi definida com foco em validar a jornada principal de reserva de treino e, adicionalmente, revisar a jornada do personal trainer em escopo funcional parcial.

### POC implementada (funcional)

- Cadastro e login por perfil (`aluno`, `personal`, `academia`)
- Busca de treinos com filtros (preço, data e ordenação)
- Detalhe do treino e reserva
- Agenda de reservas via API

### Jornada do personal trainer (Rafael "Rafa" Monteiro) - revisitada

**Objetivo da persona**

- Preencher horários ociosos, encontrar espaços para atender alunos e aumentar visibilidade profissional.

**Passos da jornada**

1. Acessa o sistema e autentica como `personal`
2. Consulta agenda e acompanha reservas
3. Visualiza academias disponíveis no marketplace
4. Acompanha reputação em avaliações
5. Organiza sua rotina para aceitar novas reservas

**Dores que a jornada ataca**

- Dificuldade de encontrar academias para atendimento externo
- Agenda e operação descentralizadas
- Baixa visibilidade para captar novos alunos

**Status atual na entrega**

- Implementado: autenticação por perfil, painel do personal com agenda, academias e avaliações.
- Parcial (próxima fase): fluxo completo de aceite de reserva pelo personal, avaliações persistidas e repasse financeiro/split real.

## Requisitos técnicos

- **Software**: navegador atualizado (Chrome, Firefox, Safari, Edge, ou equivalente) e conexão estável com a Internet
- **Hardware**: qualquer dispositivo com Internet (computador, tablet ou smartphone); não é necessária instalação local

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

Acesse [http://localhost:3000](http://localhost:3000)

### 4. (Opcional) visualizar dados do banco
```bash
npx prisma studio
```

Acesse [http://localhost:5555](http://localhost:5555) para ver os dados no navegador

## Estrutura do app

- **Landing** (`/`) — apresentação e links para busca, login e cadastro (aluno, personal, academia)
- **Busca** (`/busca`) — listagem de treinos com filtros (preço máximo, data) e ordenação (data, preço, avaliação)
- **Login** (`/login`) e **Cadastro** (`/cadastro`) — autenticação via API com cookie HTTP-only de sessão
- **Reserva** (`/reserva/[id]`) — confirmação de reserva e explicação do pagamento split
- **Dashboard** (`/dashboard`) — painel por perfil:
  - **Aluno**: início, agenda, buscar treinos, gastos
  - **Personal**: início, agenda, academias (marketplace), avaliações
  - **Academia**: início, reservas, espaços, financeiro

## Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite + Prisma ORM
- **Autenticação**: Cookies HTTP-only (FASE 0) → JWT (FASE 1)

## API Endpoints

### Autenticação
- `POST /api/auth/register` - criar conta
- `POST /api/auth/login` - fazer login
- `GET /api/auth/me` - dados do usuário logado
- `POST /api/auth/logout` - fazer logout

### Treinos
- `GET /api/treinos` - listar treinos (com filtros: ?precoMax=150&data=2025-03-10&ordenar=preco)
- `GET /api/treinos/[id]` - buscar treino por ID

### Reservas
- `GET /api/reservas` - listar minhas reservas
- `POST /api/reservas` - criar nova reserva (body: {treinoId})

## Desenvolvimento em fases

Este projeto está sendo desenvolvido em 3 fases incrementais.
Para a entrega da segunda etapa do projeto integrador, estaremos focados em executar a FASE 0, porém deixamos documentadas abaixo as fases seguintes com as possíveis melhorias:

- **FASE 0 (MVP Mínimo)**: backend funcional + jornada principal de reserva + jornada do personal em escopo parcial - CONCLUÍDO
- **FASE 1 (Segurança)**: bcrypt, JWT, middleware, validação
- **FASE 2 (Features Completas)**: avaliações, QR Code, pagamento, upload, geolocalização

---

Projeto Integrador IV — Centro Universitário Senac — 2025
