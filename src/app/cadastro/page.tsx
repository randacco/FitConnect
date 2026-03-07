"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Dumbbell } from "lucide-react";
import type { TipoUsuario } from "@/types";

function CadastroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get("tipo") as TipoUsuario | null;
  const [tipo, setTipo] = useState<TipoUsuario>(tipoParam || "aluno");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FASE 0: Cadastro integrado com backend
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Chamar API de registro
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, tipo }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta");
        setLoading(false);
        return;
      }

      // Cadastro bem-sucedido! Sessão já criada automaticamente
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Erro ao criar conta:", err);
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4">
      <div className="mx-auto max-w-md rounded-2xl border border-brand-100 bg-white p-8 shadow-lg">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <Dumbbell className="h-8 w-8 text-brand-600" />
          <span className="text-xl font-bold text-brand-800">
            FitnessConnect
          </span>
        </Link>
        <h1 className="text-center text-xl font-bold text-slate-900">
          Criar conta
        </h1>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-4 flex gap-2 rounded-lg bg-slate-100 p-1">
          {(["aluno", "personal", "academia"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className={`flex-1 rounded-md py-2 text-sm font-medium capitalize ${
                tipo === t ? "bg-white text-brand-600 shadow" : "text-slate-600"
              }`}
            >
              {t === "aluno" ? "Aluno" : t === "personal" ? "Personal" : "Academia"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Nome {tipo === "academia" ? "da academia" : "completo"}
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-600 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Criando conta..." : "Cadastrar"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          Já tem conta?{" "}
          <Link href="/login" className="text-brand-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-50 flex items-center justify-center">Carregando...</div>}>
      <CadastroForm />
    </Suspense>
  );
}
