/**
 * API de Usuário Atual - GET /api/auth/me
 *
 * FASE 0: Implementação básica
 * - Lê sessão do cookie
 * - Busca dados do usuário no banco
 * - Retorna: dados do usuário logado
 * - Retorna 401 se não estiver autenticado
 *
 * MELHORIAS FUTURAS (FASE 1):
 * - Validar JWT ao invés de apenas ler cookie
 * - Cache de dados do usuário (Redis)
 * - Incluir dados relacionados (perfil completo de personal/academia)
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    // 1. Obter userId da sessão
    const userId = await getSession();

    // 2. Verificar se está autenticado
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autenticado. Faça login primeiro.' },
        { status: 401 }
      );
    }

    // 3. Buscar dados do usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nome: true,
        tipo: true,
        createdAt: true,
        // Não retornar senha!
      },
    });

    // 4. Verificar se usuário ainda existe (pode ter sido deletado)
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // 5. Retornar dados do usuário
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);

    return NextResponse.json(
      { error: 'Erro interno ao buscar dados do usuário' },
      { status: 500 }
    );
  }
}
