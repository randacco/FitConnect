/**
 * API de Login - POST /api/auth/login
 *
 * FASE 0: Implementação básica
 * - Recebe: { email, senha }
 * - Busca usuário no banco por email
 * - Compara senha (texto puro - FASE 1 usará bcrypt.compare)
 * - Cria sessão se credenciais válidas
 * - Retorna: dados do usuário
 *
 * MELHORIAS FUTURAS (FASE 1):
 * - Usar bcrypt.compare para comparar senhas hasheadas
 * - Retornar JWT ao invés de apenas criar sessão
 * - Rate limiting para prevenir brute force
 * - Log de tentativas de login
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    // 1. Extrair credenciais do corpo da requisição
    const body = await request.json();
    const { email, senha } = body;

    // 2. Validar campos obrigatórios
    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // 3. Buscar usuário no banco por email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 4. Verificar se usuário existe e senha está correta
    // ATENÇÃO: Comparação direta de strings (senha em texto puro)
    // FASE 1: usar bcrypt.compare(senha, user.senha)
    if (!user || user.senha !== senha) {
      // Mensagem genérica por segurança (não revelar se email existe)
      return NextResponse.json(
        { error: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    // 5. Criar sessão
    await createSession(user.id);

    // 6. Retornar sucesso com dados do usuário (sem senha!)
    return NextResponse.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        tipo: user.tipo,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);

    return NextResponse.json(
      { error: 'Erro interno ao fazer login. Tente novamente.' },
      { status: 500 }
    );
  }
}
