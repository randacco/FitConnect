"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dumbbell } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // MVP: simula login e redireciona para dashboard aluno
    if (email && senha) {
      sessionStorage.setItem(
        "fitconnect_user",
        JSON.stringify({
          email,
          nome: "Usuário Demo",
          tipo: "aluno",
          id: "demo-1",
        })
      );
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-brand-100 bg-white p-8 shadow-lg">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <Dumbbell className="h-8 w-8 text-brand-600" />
          <span className="text-xl font-bold text-brand-800">
            FitnessConnect
          </span>
        </Link>
        <h1 className="text-center text-xl font-bold text-slate-900">Entrar</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 py-2 font-medium text-white hover:bg-brand-700"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          Não tem conta?{" "}
          <Link href="/cadastro" className="text-brand-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
