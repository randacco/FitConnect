/**
 * API de Registro de Usuário - POST /api/auth/register
 *
 * FASE 0: Implementação básica
 * - Recebe: { email, nome, senha, tipo }
 * - Valida: campos obrigatórios e email único
 * - Cria usuário no banco (senha SEM hash - FASE 1 adicionará bcrypt)
 * - Cria sessão automaticamente (auto-login após cadastro)
 * - Retorna: dados do usuário criado
 *
 * MELHORIAS FUTURAS (FASE 1):
 * - Adicionar hash bcrypt para senhas
 * - Validação com Zod (type-safe)
 * - Rate limiting
 * - Confirmação de email
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    // 1. Extrair dados do corpo da requisição
    const body = await request.json();
    const { email, nome, senha, tipo } = body;

    // 2. Validar campos obrigatórios
    if (!email || !nome || !senha || !tipo) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios: email, nome, senha, tipo' },
        { status: 400 }
      );
    }

    // 3. Validar tipo de usuário
    if (!['aluno', 'personal', 'academia'].includes(tipo)) {
      return NextResponse.json(
        { error: 'Tipo de usuário inválido. Use: aluno, personal ou academia' },
        { status: 400 }
      );
    }

    // 4. Verificar se email já está cadastrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado. Tente fazer login.' },
        { status: 400 }
      );
    }

    // 5. Criar usuário no banco de dados
    // ATENÇÃO: Senha em texto puro! Fase 1 adicionará bcrypt.hash(senha, 10)
    const user = await prisma.user.create({
      data: {
        email,
        nome,
        senha, // ⚠️ TEXTO PURO - NÃO SEGURO - apenas para MVP rápido
        tipo,
      },
      // Retornar apenas campos seguros (sem a senha)
      select: {
        id: true,
        email: true,
        nome: true,
        tipo: true,
        createdAt: true,
      },
    });

    // 6. Criar sessão automaticamente (auto-login)
    await createSession(user.id);

    // 7. Retornar sucesso com dados do usuário
    return NextResponse.json(
      {
        message: 'Usuário criado com sucesso',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log do erro no servidor (não expor detalhes ao cliente)
    console.error('Erro ao criar usuário:', error);

    return NextResponse.json(
      { error: 'Erro interno ao criar conta. Tente novamente.' },
      { status: 500 }
    );
  }
}
