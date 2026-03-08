/**
 * API de Treinos do Personal - POST /api/personal/treinos
 *
 * Permite que um personal logado publique um novo treino em uma academia disponivel.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

interface CreateTreinoBody {
  academiaNome?: string;
  academiaEndereco?: string;
  academiaRating?: number;
  dataHora?: string;
  valorTotal?: number;
  duracaoMinutos?: number;
}

export async function POST(request: Request) {
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

    const body = (await request.json()) as CreateTreinoBody;
    const academiaNome = body.academiaNome?.trim();
    const academiaEndereco = body.academiaEndereco?.trim();
    const dataHoraStr = body.dataHora;
    const valorTotal = Number(body.valorTotal);
    const duracaoMinutos = Number(body.duracaoMinutos ?? 60);

    if (!academiaNome || !academiaEndereco || !dataHoraStr || !Number.isFinite(valorTotal)) {
      return NextResponse.json(
        {
          error:
            'academiaNome, academiaEndereco, dataHora e valorTotal sao obrigatorios',
        },
        { status: 400 }
      );
    }

    if (valorTotal <= 0 || duracaoMinutos <= 0) {
      return NextResponse.json(
        { error: 'valorTotal e duracaoMinutos devem ser maiores que zero' },
        { status: 400 }
      );
    }

    const dataHora = new Date(dataHoraStr);
    if (Number.isNaN(dataHora.getTime())) {
      return NextResponse.json(
        { error: 'dataHora invalida' },
        { status: 400 }
      );
    }

    // Academia disponivel = existe ao menos um treino disponivel para esse local.
    const academiaDisponivel = await prisma.treino.findFirst({
      where: {
        academiaNome,
        academiaEndereco,
        status: 'disponivel',
      },
      select: {
        academiaRating: true,
      },
    });

    if (!academiaDisponivel) {
      return NextResponse.json(
        { error: 'Academia nao esta disponivel para novos treinos no momento' },
        { status: 400 }
      );
    }

    // Aproveita o historico do personal para manter nota coerente na vitrine.
    const ultimoTreinoPersonal = await prisma.treino.findFirst({
      where: { personalNome: user.nome },
      orderBy: { createdAt: 'desc' },
      select: { personalRating: true },
    });

    const treino = await prisma.treino.create({
      data: {
        personalNome: user.nome,
        personalRating: ultimoTreinoPersonal?.personalRating ?? 4.7,
        academiaNome,
        academiaEndereco,
        academiaRating: body.academiaRating ?? academiaDisponivel.academiaRating,
        dataHora,
        duracaoMinutos,
        valorTotal,
        status: 'disponivel',
      },
    });

    return NextResponse.json(
      { message: 'Treino criado com sucesso', treino },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar treino do personal:', error);

    return NextResponse.json(
      { error: 'Erro interno ao criar treino' },
      { status: 500 }
    );
  }
}
