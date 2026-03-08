/**
 * API de Agenda do Personal - GET /api/personal/agenda
 *
 * FASE 0: Jornada do personal com dados reais
 * - Apenas usuarios do tipo "personal" podem acessar
 * - Lista treinos do personal logado com status e reservas associadas
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const userId = await getSession();

    if (!userId) {
      return NextResponse.json(
        { error: 'Nao autenticado. Faca login primeiro.' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nome: true,
        tipo: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    if (user.tipo !== 'personal') {
      return NextResponse.json(
        { error: 'Acesso permitido apenas para personal trainers' },
        { status: 403 }
      );
    }

    const treinos = await prisma.treino.findMany({
      where: { personalNome: user.nome },
      include: {
        reservas: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            aluno: {
              select: {
                nome: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        dataHora: 'asc',
      },
    });

    return NextResponse.json({ treinos });
  } catch (error) {
    console.error('Erro ao buscar agenda do personal:', error);

    return NextResponse.json(
      { error: 'Erro interno ao buscar agenda do personal' },
      { status: 500 }
    );
  }
}
