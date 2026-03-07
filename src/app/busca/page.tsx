"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dumbbell, MapPin, Star, Calendar, Filter, LogOut } from "lucide-react";

// Tipo de treino retornado pela API
// FASE 0: dados do personal/academia salvos diretamente no treino
interface TreinoDB {
  id: string;
  personalNome: string;
  personalRating: number;
  academiaNome: string;
  academiaEndereco: string;
  academiaRating: number;
  dataHora: string;
  duracaoMinutos: number;
  valorTotal: number;
  status: string;
}

// Tipo de usuário retornado pela API
interface UserDB {
  id: string;
  email: string;
  nome: string;
  tipo: string;
}

function formatDataHora(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BuscaPage() {
  const router = useRouter();

  // Estados dos filtros
  const [filtroPrecoMax, setFiltroPrecoMax] = useState<number | "">("");
  const [filtroData, setFiltroData] = useState("");
  const [ordenarPor, setOrdenarPor] = useState<"preco" | "data" | "rating">("data");

  // Estados da API - Treinos
  const [treinos, setTreinos] = useState<TreinoDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados da API - Usuário (para verificar autenticação)
  const [user, setUser] = useState<UserDB | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // FASE 0: Verificar se usuário está autenticado (opcional para página de busca)
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  // FASE 0: Buscar treinos da API sempre que filtros mudarem
  useEffect(() => {
    async function fetchTreinos() {
      setLoading(true);
      setError("");

      try {
        // Construir query params baseado nos filtros
        const params = new URLSearchParams();

        if (filtroPrecoMax !== "") {
          params.set("precoMax", filtroPrecoMax.toString());
        }

        if (filtroData) {
          params.set("data", filtroData);
        }

        if (ordenarPor) {
          params.set("ordenar", ordenarPor);
        }

        // Chamar API de treinos
        const res = await fetch(`/api/treinos?${params}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Erro ao buscar treinos");
          setTreinos([]);
        } else {
          setTreinos(data.treinos);
        }
      } catch (err) {
        console.error("Erro ao buscar treinos:", err);
        setError("Erro de conexão. Tente novamente.");
        setTreinos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTreinos();
  }, [filtroPrecoMax, filtroData, ordenarPor]); // Re-buscar quando filtros mudarem

  // Handler de logout
  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="h-7 w-7 text-brand-600" />
            <span className="font-bold text-brand-800">FitnessConnect</span>
          </Link>

          {/* Se ainda está verificando autenticação, não mostrar nada */}
          {!checkingAuth && (
            <nav className="flex items-center gap-4">
              {user ? (
                // Usuário logado: mostrar nome, link para dashboard e logout
                <>
                  <Link href="/dashboard" className="text-slate-600 hover:text-brand-600">
                    Dashboard
                  </Link>
                  <span className="text-sm text-slate-600">
                    {user.nome}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </>
              ) : (
                // Usuário não logado: mostrar Início e Entrar
                <>
                  <Link href="/" className="text-slate-600 hover:text-brand-600">
                    Início
                  </Link>
                  <Link href="/login" className="text-brand-600 font-medium">
                    Entrar
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Buscar treinos por geolocalização
        </h1>
        <p className="mt-1 text-slate-600">
          Encontre personais e academias parceiras próximas a você.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-500" />
            <span className="font-medium text-slate-700">Filtros</span>
          </div>
          <label className="flex items-center gap-2">
            <span className="text-slate-600">Preço máx. (R$)</span>
            <input
              type="number"
              min="0"
              step="10"
              value={filtroPrecoMax}
              onChange={(e) =>
                setFiltroPrecoMax(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-24 rounded-lg border border-slate-300 px-2 py-1"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-slate-600">Data</span>
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="rounded-lg border border-slate-300 px-2 py-1"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-slate-600">Ordenar</span>
            <select
              value={ordenarPor}
              onChange={(e) =>
                setOrdenarPor(e.target.value as "preco" | "data" | "rating")
              }
              className="rounded-lg border border-slate-300 px-2 py-1"
            >
              <option value="data">Data</option>
              <option value="preco">Menor preço</option>
              <option value="rating">Melhor avaliação</option>
            </select>
          </label>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mt-8 text-center">
            <p className="text-slate-600">Buscando treinos disponíveis...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="mt-8 rounded-lg bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Treinos list */}
        {!loading && !error && (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {treinos.map((treino) => (
                <div
                  key={treino.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {treino.personalNome}
                      </h3>
                      <p className="flex items-center gap-1 text-sm text-slate-600">
                        <MapPin className="h-4 w-4" />
                        {treino.academiaNome}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-600">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">
                        {treino.personalRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {formatDataHora(treino.dataHora)}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-brand-600">
                    R$ {treino.valorTotal.toFixed(2)}
                  </p>
                  <Link
                    href={`/reserva/${treino.id}`}
                    className="mt-4 block w-full rounded-lg bg-brand-600 py-2 text-center text-white hover:bg-brand-700"
                  >
                    Reservar
                  </Link>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {treinos.length === 0 && (
              <p className="mt-8 text-center text-slate-500">
                Nenhum treino encontrado com os filtros. Tente alterar data ou preço
                máximo.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
