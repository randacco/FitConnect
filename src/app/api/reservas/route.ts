/**
 * API de Reservas
 *
 * GET /api/reservas - Listar minhas reservas
 * POST /api/reservas - Criar nova reserva
 *
 * FASE 0: Funcionalidade básica
 * - Apenas alunos podem criar reservas
 * - Um treino pode ter apenas uma reserva ativa
 * - Ao reservar, treino muda status para "reservado"
 *
 * MELHORIAS FUTURAS:
 * - FASE 2: Gerar QR Code ao criar reserva
 * - FASE 2: Criar registro de pagamento simulado
 * - Cancelamento de reservas (DELETE)
 * - Notificações para personal e academia
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

/**
 * GET /api/reservas - Listar minhas reservas
 *
 * Retorna todas as reservas do usuário logado, incluindo dados do treino.
 */
export async function GET() {
  try {
    // 1. Verificar autenticação
    const userId = await getSession();
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autenticado. Faça login primeiro.' },
        { status: 401 }
      );
    }

    // 2. Buscar reservas do usuário, incluindo dados do treino
    const reservas = await prisma.reserva.findMany({
      where: { alunoId: userId },
      include: {
        treino: true, // Incluir todos os dados do treino
      },
      orderBy: {
        createdAt: 'desc', // Mais recentes primeiro
      },
    });

    // 3. Retornar reservas
    return NextResponse.json({ reservas });
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);

    return NextResponse.json(
      { error: 'Erro interno ao buscar reservas' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reservas - Criar nova reserva
 *
 * Body: { treinoId: string }
 *
 * Fluxo:
 * 1. Verifica se usuário está autenticado
 * 2. Verifica se treino existe e está disponível
 * 3. Cria reserva
 * 4. Atualiza status do treino para "reservado"
 * 5. Retorna reserva criada com dados do treino
 */
export async function POST(request: Request) {
  try {
    // 1. Verificar autenticação
    const userId = await getSession();
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autenticado. Faça login primeiro.' },
        { status: 401 }
      );
    }

    // 2. Extrair treinoId do body
    const body = await request.json();
    const { treinoId } = body;

    if (!treinoId) {
      return NextResponse.json(
        { error: 'treinoId é obrigatório' },
        { status: 400 }
      );
    }

    // 3. Verificar se treino existe e está disponível
    const treino = await prisma.treino.findUnique({
      where: { id: treinoId },
    });

    if (!treino) {
      return NextResponse.json(
        { error: 'Treino não encontrado' },
        { status: 404 }
      );
    }

    if (treino.status !== 'disponivel') {
      return NextResponse.json(
        { error: 'Treino não está mais disponível' },
        { status: 400 }
      );
    }

    // 4. Criar reserva e atualizar treino em uma transação
    // TRANSAÇÃO garante que ou AMBOS acontecem, ou NENHUM acontece
    // Evita inconsistência (reserva criada mas treino ainda disponível)
    const [reserva] = await prisma.$transaction([
      // Criar reserva
      prisma.reserva.create({
        data: {
          treinoId,
          alunoId: userId,
          status: 'confirmada',
        },
        include: {
          treino: true, // Incluir dados do treino na resposta
        },
      }),
      // Atualizar status do treino
      prisma.treino.update({
        where: { id: treinoId },
        data: { status: 'reservado' },
      }),
    ]);

    // 5. Retornar reserva criada
    return NextResponse.json(
      {
        message: 'Reserva criada com sucesso',
        reserva,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar reserva:', error);

    // Verificar se erro é de unique constraint (treino já reservado)
    if ((error as any).code === 'P2002') {
      return NextResponse.json(
        { error: 'Treino já foi reservado por outro aluno' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno ao criar reserva' },
      { status: 500 }
    );
  }
}
