/**
 * Helpers de Sessão - FASE 0 (Autenticação Simplificada)
 *
 * IMPORTANTE: Esta é uma implementação SIMPLES usando cookies do Next.js.
 * - Senha SEM hash (texto puro no banco) ❌
 * - Sessão SEM JWT (apenas userId no cookie) ❌
 *
 * FASE 1 irá substituir por:
 * - Bcrypt para hash de senhas ✅
 * - JWT para tokens de autenticação ✅
 * - Middleware robusto de proteção ✅
 *
 * Por enquanto, foco é ter a jornada funcional de ponta a ponta.
 */

import { cookies } from 'next/headers';

// Nome do cookie de sessão
const SESSION_COOKIE_NAME = 'fitconnect_session';

/**
 * Cria uma sessão para o usuário
 *
 * Salva o userId em um cookie HTTP-only que expira em 7 dias.
 * HTTP-only: JavaScript do cliente não pode acessar (mais seguro)
 *
 * @param userId - ID do usuário logado
 */
export async function createSession(userId: string): Promise<void> {
  cookies().set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true, // Não acessível via JavaScript do navegador
    secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
    sameSite: 'lax', // Proteção contra CSRF
    maxAge: 60 * 60 * 24 * 7, // 7 dias em segundos
    path: '/', // Cookie válido para toda a aplicação
  });
}

/**
 * Obtém o userId da sessão atual
 *
 * Lê o cookie de sessão e retorna o userId, ou undefined se não estiver logado.
 *
 * @returns userId ou undefined
 */
export async function getSession(): Promise<string | undefined> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  return sessionCookie?.value;
}

/**
 * Destrói a sessão do usuário (logout)
 *
 * Remove o cookie de sessão.
 */
export async function destroySession(): Promise<void> {
  cookies().delete(SESSION_COOKIE_NAME);
}
