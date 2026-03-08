/**
 * API de Academias do Personal - GET /api/personal/academias
 *
 * FASE 0: Marketplace de academias com base nos treinos do personal logado
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

interface AcademiaResumo {
  nome: string;
  endereco: string;
  rating: number;
  treinosDisponiveis: number;
  valorMedioSessao: number;
}

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
        academiaNome: true,
        academiaEndereco: true,
        academiaRating: true,
        valorTotal: true,
        status: true,
      },
    });

    const mapaAcademias = new Map<string, AcademiaResumo>();

    for (const treino of treinos) {
      const key = `${treino.academiaNome}::${treino.academiaEndereco}`;
      const existente = mapaAcademias.get(key);

      if (!existente) {
        mapaAcademias.set(key, {
          nome: treino.academiaNome,
          endereco: treino.academiaEndereco,
          rating: treino.academiaRating,
          treinosDisponiveis: treino.status === 'disponivel' ? 1 : 0,
          valorMedioSessao: treino.valorTotal,
        });
        continue;
      }

      existente.treinosDisponiveis += treino.status === 'disponivel' ? 1 : 0;
      existente.valorMedioSessao =
        (existente.valorMedioSessao + treino.valorTotal) / 2;
      existente.rating = Math.max(existente.rating, treino.academiaRating);
    }

    const academias = Array.from(mapaAcademias.values()).sort((a, b) =>
      b.rating - a.rating
    );

    return NextResponse.json({ academias });
  } catch (error) {
    console.error('Erro ao buscar academias do personal:', error);

    return NextResponse.json(
      { error: 'Erro interno ao buscar academias do personal' },
      { status: 500 }
    );
  }
}
