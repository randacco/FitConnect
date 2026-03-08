# FitnessConnect (FitConnect)

Plataforma web do **Projeto Integrador IV** — Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseados na Web (Senac).

## Visão do produto

O FitnessConnect é uma aplicação web responsiva que conecta **alunos**, **personal trainers** e **academias**:

- **Alunos**: buscam treinos por geolocalização, filtros (preço, data), avaliam personais e academias, pagam em um único valor (pay-per-use).
- **Personais**: encontram espaços em academias parceiras, gerenciam agenda, recebem pagamento via split e têm perfil com certificações e avaliações.
- **Academias**: cadastram horários disponíveis (marketplace de espaços), controlam acesso (ex.: QR Code), recebem repasse automático (split).

## Funcionalidades (conforme PDF)

1. **Busca e geolocalização** — Encontrar personais e academias parceiras próximas.
2. **Gestão de agenda integrada** — Sincronização de horários do personal com vagas da academia.
3. **Marketplace de espaços** — Cadastro de infraestrutura e valores por parte das academias.
4. **Sistema de avaliação** — Rating para personais, alunos e instalações.
5. **Pagamento split** — Um único pagamento do aluno; a plataforma divide automaticamente (personal + academia + taxa de serviço).

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
- **Login** (`/login`) e **Cadastro** (`/cadastro`) — Autenticação simulada (sessionStorage).
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

- **FASE 0 (MVP Mínimo)**: Backend funcional + jornada do aluno - CONCLUÍDO
- **FASE 1 (Segurança)**: Bcrypt, JWT, middleware, validação
- **FASE 2 (Features Completas)**: Avaliações, QR Code, pagamento, upload, geolocalização

---

Projeto Integrador IV — Centro Universitário Senac — 2025.
