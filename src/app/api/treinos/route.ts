/**
 * API de Treinos - GET /api/treinos
 *
 * FASE 0: Listagem de treinos disponíveis com filtros
 * - Query params:
 *   - precoMax: filtra treinos com valor até X
 *   - data: filtra treinos em uma data específica (YYYY-MM-DD)
 *   - ordenar: "data" | "preco" | "rating" (padrão: data)
 *
 * MELHORIAS FUTURAS:
 * - FASE 1: Filtro por personalId, academiaId
 * - FASE 2: Filtro por distância (geolocalização)
 * - Paginação para listas grandes
 * - Cache de resultados
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // 1. Extrair query params
    const { searchParams } = new URL(request.url);
    const precoMax = searchParams.get('precoMax');
    const data = searchParams.get('data');
    const ordenar = searchParams.get('ordenar') || 'data';

    // 2. Construir filtros dinamicamente
    const where: any = {
      status: 'disponivel', // Apenas treinos disponíveis
    };

    // Filtro de preço máximo
    if (precoMax) {
      const precoMaxNum = parseFloat(precoMax);
      if (!isNaN(precoMaxNum) && precoMaxNum > 0) {
        where.valorTotal = {
          lte: precoMaxNum, // Less than or equal (menor ou igual)
        };
      }
    }

    // Filtro de data (busca treinos naquele dia)
    if (data) {
      try {
        const dataInicio = new Date(data + 'T00:00:00');
        const dataFim = new Date(data + 'T23:59:59');

        where.dataHora = {
          gte: dataInicio, // Greater than or equal
          lte: dataFim,
        };
      } catch (error) {
        // Data inválida, ignorar filtro
        console.warn('Data inválida fornecida:', data);
      }
    }

    // 3. Definir ordenação
    let orderBy: any = { dataHora: 'asc' }; // Padrão: mais próximos primeiro

    if (ordenar === 'preco') {
      orderBy = { valorTotal: 'asc' }; // Menor preço primeiro
    } else if (ordenar === 'rating') {
      orderBy = { personalRating: 'desc' }; // Melhor avaliação primeiro
    }

    // 4. Buscar treinos no banco
    const treinos = await prisma.treino.findMany({
      where,
      orderBy,
    });

    // 5. Retornar treinos
    return NextResponse.json({ treinos });
  } catch (error) {
    console.error('Erro ao buscar treinos:', error);

    return NextResponse.json(
      { error: 'Erro interno ao buscar treinos' },
      { status: 500 }
    );
  }
}
