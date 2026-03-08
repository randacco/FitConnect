/**
 * API de Treino por ID - GET /api/treinos/[id]
 *
 * FASE 0: Buscar detalhes de um treino específico
 * - Usado na página de reserva para mostrar detalhes completos
 * - Retorna: dados do treino ou 404 se não encontrado
 *
 * MELHORIAS FUTURAS (FASE 1+):
 * - Incluir dados completos do personal e academia (com FKs)
 * - Verificar disponibilidade em tempo real
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Buscar treino pelo ID
    const treino = await prisma.treino.findUnique({
      where: { id: params.id },
    });

    // 2. Verificar se treino existe
    if (!treino) {
      return NextResponse.json(
        { error: 'Treino não encontrado' },
        { status: 404 }
      );
    }

    // 3. Retornar treino
    return NextResponse.json({ treino });
  } catch (error) {
    console.error('Erro ao buscar treino:', error);

    return NextResponse.json(
      { error: 'Erro interno ao buscar treino' },
      { status: 500 }
    );
  }
}
