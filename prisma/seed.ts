/**
 * Seed do banco de dados - FASE 0
 *
 * Popula o banco com dados de exemplo para testes:
 * - Treinos disponíveis (baseados nos mocks antigos)
 * - Nenhum usuário pré-cadastrado (usuários criam conta via /cadastro)
 *
 * Como rodar:
 * npx prisma db seed
 *
 * Como resetar e re-seed:
 * npx prisma migrate reset
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// No Prisma 7, não precisa passar nada se a DATABASE_URL está configurada no .env
// e o datasource está configurado no prisma.config.ts
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (opcional, mas útil para re-seed)
  await prisma.reserva.deleteMany();
  await prisma.treino.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Dados antigos limpos');

  // ============================================================
  // CRIAR TREINOS DISPONÍVEIS
  // ============================================================
  // Baseado nos mocks antigos de src/data/mock.ts
  // Treinos para os próximos dias com diferentes personais e academias

  const treinos = [
    // Personal: Rafael Monteiro
    {
      personalNome: "Rafael Monteiro",
      personalRating: 4.9,
      academiaNome: "Academia Fit Life",
      academiaEndereco: "Rua das Flores, 100 - São Paulo, SP",
      academiaRating: 4.8,
      dataHora: new Date("2025-03-10T08:00:00"),
      valorTotal: 165, // 120 personal + 45 academia
      status: "disponivel"
    },
    {
      personalNome: "Rafael Monteiro",
      personalRating: 4.9,
      academiaNome: "Academia Fit Life",
      academiaEndereco: "Rua das Flores, 100 - São Paulo, SP",
      academiaRating: 4.8,
      dataHora: new Date("2025-03-10T10:00:00"),
      valorTotal: 165,
      status: "disponivel"
    },
    {
      personalNome: "Rafael Monteiro",
      personalRating: 4.9,
      academiaNome: "Espaço Corpo & Mente",
      academiaEndereco: "Av. Paulista, 500 - São Paulo, SP",
      academiaRating: 4.6,
      dataHora: new Date("2025-03-11T08:00:00"),
      valorTotal: 175, // 120 personal + 55 academia
      status: "disponivel"
    },

    // Personal: Ana Costa
    {
      personalNome: "Ana Costa",
      personalRating: 4.7,
      academiaNome: "Academia Fit Life",
      academiaEndereco: "Rua das Flores, 100 - São Paulo, SP",
      academiaRating: 4.8,
      dataHora: new Date("2025-03-10T14:00:00"),
      valorTotal: 145, // 100 personal + 45 academia
      status: "disponivel"
    },
    {
      personalNome: "Ana Costa",
      personalRating: 4.7,
      academiaNome: "Academia Movimento",
      academiaEndereco: "Rua Augusta, 200 - São Paulo, SP",
      academiaRating: 4.9,
      dataHora: new Date("2025-03-11T10:00:00"),
      valorTotal: 150, // 100 personal + 50 academia
      status: "disponivel"
    },
    {
      personalNome: "Ana Costa",
      personalRating: 4.7,
      academiaNome: "Academia Movimento",
      academiaEndereco: "Rua Augusta, 200 - São Paulo, SP",
      academiaRating: 4.9,
      dataHora: new Date("2025-03-11T16:00:00"),
      valorTotal: 150,
      status: "disponivel"
    },

    // Personal: Carlos Silva
    {
      personalNome: "Carlos Silva",
      personalRating: 4.8,
      academiaNome: "Espaço Corpo & Mente",
      academiaEndereco: "Av. Paulista, 500 - São Paulo, SP",
      academiaRating: 4.6,
      dataHora: new Date("2025-03-10T16:00:00"),
      valorTotal: 185, // 130 personal + 55 academia
      status: "disponivel"
    },
    {
      personalNome: "Carlos Silva",
      personalRating: 4.8,
      academiaNome: "Academia Movimento",
      academiaEndereco: "Rua Augusta, 200 - São Paulo, SP",
      academiaRating: 4.9,
      dataHora: new Date("2025-03-11T14:00:00"),
      valorTotal: 180, // 130 personal + 50 academia
      status: "disponivel"
    },
    {
      personalNome: "Carlos Silva",
      personalRating: 4.8,
      academiaNome: "Espaço Corpo & Mente",
      academiaEndereco: "Av. Paulista, 500 - São Paulo, SP",
      academiaRating: 4.6,
      dataHora: new Date("2025-03-12T08:00:00"),
      valorTotal: 185,
      status: "disponivel"
    },

    // Mais alguns treinos para ter variedade
    {
      personalNome: "Rafael Monteiro",
      personalRating: 4.9,
      academiaNome: "Academia Fit Life",
      academiaEndereco: "Rua das Flores, 100 - São Paulo, SP",
      academiaRating: 4.8,
      dataHora: new Date("2025-03-12T10:00:00"),
      valorTotal: 165,
      status: "disponivel"
    },
    {
      personalNome: "Ana Costa",
      personalRating: 4.7,
      academiaNome: "Academia Fit Life",
      academiaEndereco: "Rua das Flores, 100 - São Paulo, SP",
      academiaRating: 4.8,
      dataHora: new Date("2025-03-12T14:00:00"),
      valorTotal: 145,
      status: "disponivel"
    },
    {
      personalNome: "Carlos Silva",
      personalRating: 4.8,
      academiaNome: "Academia Movimento",
      academiaEndereco: "Rua Augusta, 200 - São Paulo, SP",
      academiaRating: 4.9,
      dataHora: new Date("2025-03-12T16:00:00"),
      valorTotal: 180,
      status: "disponivel"
    }
  ];

  // Criar todos os treinos no banco
  await prisma.treino.createMany({
    data: treinos
  });

  console.log(`✅ ${treinos.length} treinos criados`);

  // ============================================================
  // ESTATÍSTICAS
  // ============================================================
  const totalTreinos = await prisma.treino.count();
  const totalUsers = await prisma.user.count();
  const totalReservas = await prisma.reserva.count();

  console.log('\n📊 Estatísticas do banco:');
  console.log(`   - Usuários: ${totalUsers}`);
  console.log(`   - Treinos: ${totalTreinos}`);
  console.log(`   - Reservas: ${totalReservas}`);
  console.log('\n✨ Seed concluído com sucesso!');
  console.log('\n💡 Dica: Acesse http://localhost:5555 com "npx prisma studio" para visualizar os dados\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
