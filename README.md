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

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do app

- **Landing** (`/`) — Apresentação e links para busca, login e cadastro (aluno, personal, academia).
- **Busca** (`/busca`) — Listagem de treinos com filtros (preço máximo, data) e ordenação (data, preço, avaliação).
- **Login** (`/login`) e **Cadastro** (`/cadastro`) — Autenticação simulada (sessionStorage).
- **Reserva** (`/reserva/[id]`) — Confirmação de reserva e explicação do pagamento split.
- **Dashboard** (`/dashboard`) — Painel por perfil:
  - **Aluno**: início, agenda, buscar treinos, gastos.
  - **Personal**: início, agenda, academias (marketplace), avaliações.
  - **Academia**: início, reservas, espaços, financeiro.

Dados iniciais são mock em `src/data/mock.ts`. Para produção, basta conectar a uma API e banco de dados.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (ícones)

---

Projeto Integrador IV — Centro Universitário Senac — 2025.
