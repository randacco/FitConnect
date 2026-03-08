/**
 * Cliente Prisma (Singleton)
 *
 * IMPORTANTE: No Next.js, durante o desenvolvimento (hot reload), podemos ter
 * múltiplas instâncias do PrismaClient se não tomarmos cuidado.
 * Isso pode esgotar as conexões do banco de dados.
 *
 * Este código garante que apenas UMA instância do PrismaClient seja criada
 * e reutilizada em toda a aplicação.
 *
 * Referência: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

import { PrismaClient } from '@prisma/client';

// Adiciona 'prisma' ao tipo global para poder acessá-lo
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Exporta a instância única do PrismaClient
// Em desenvolvimento: reutiliza a instância global
// Em produção: cria uma nova instância
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Em desenvolvimento, salva a instância globalmente para hot reload
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
