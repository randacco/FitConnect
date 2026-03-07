/**
 * API de Logout - POST /api/auth/logout
 *
 * FASE 0: Implementação básica
 * - Remove cookie de sessão
 * - Retorna: sucesso
 *
 * MELHORIAS FUTURAS (FASE 1):
 * - Invalidar JWT em blacklist (Redis)
 * - Log de logout para auditoria
 * - Notificar outros dispositivos (sessões múltiplas)
 */

import { NextResponse } from 'next/server';
import { destroySession } from '@/lib/session';

export async function POST() {
  try {
    // 1. Destruir sessão (remover cookie)
    await destroySession();

    // 2. Retornar sucesso
    return NextResponse.json({
      message: 'Logout realizado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);

    return NextResponse.json(
      { error: 'Erro interno ao fazer logout' },
      { status: 500 }
    );
  }
}
