/**
 * API de Avaliacoes do Personal - GET /api/personal/avaliacoes
 *
 * FASE 0: Consolidado simples da reputacao com base nos treinos e reservas
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
      select: {
        personalRating: true,
        status: true,
        reservas: {
          select: { id: true },
        },
      },
    });

    const totalTreinos = treinos.length;
    const totalReservas = treinos.reduce(
      (acc, treino) => acc + treino.reservas.length,
      0
    );
    const mediaRating =
      totalTreinos > 0
        ? treinos.reduce((acc, treino) => acc + treino.personalRating, 0) /
          totalTreinos
        : 0;
    const treinosRealizados = treinos.filter(
      (treino) => treino.status === 'realizado'
    ).length;

    return NextResponse.json({
      resumo: {
        mediaRating,
        totalTreinos,
        totalReservas,
        treinosRealizados,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar avaliacoes do personal:', error);

    return NextResponse.json(
      { error: 'Erro interno ao buscar avaliacoes do personal' },
      { status: 500 }
    );
  }
}
