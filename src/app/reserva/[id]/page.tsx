"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Dumbbell, MapPin, Star, Calendar } from "lucide-react";

// Tipo de treino retornado pela API
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

function formatDataHora(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ReservaPage() {
  const params = useParams();
  const router = useRouter();

  // Estados da API
  const [treino, setTreino] = useState<TreinoDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reservando, setReservando] = useState(false);

  // FASE 0: Buscar treino da API ao carregar a página
  useEffect(() => {
    async function fetchTreino() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/treinos/${params.id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Treino não encontrado");
          setTreino(null);
        } else {
          setTreino(data.treino);
        }
      } catch (err) {
        console.error("Erro ao buscar treino:", err);
        setError("Erro de conexão. Tente novamente.");
        setTreino(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTreino();
  }, [params.id]);

  // FASE 0: Criar reserva via API
  async function handleConfirmar() {
    if (!treino) return;

    setReservando(true);
    setError("");

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treinoId: treino.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Se não autenticado, redirecionar para login
        if (res.status === 401) {
          alert("Você precisa fazer login para reservar um treino.");
          router.push(`/login`);
          return;
        }

        setError(data.error || "Erro ao criar reserva");
        setReservando(false);
        return;
      }

      // Reserva criada com sucesso!
      alert("Reserva confirmada com sucesso! Confira na sua agenda.");
      router.push("/dashboard/agenda");
      router.refresh();
    } catch (err) {
      console.error("Erro ao criar reserva:", err);
      setError("Erro de conexão. Tente novamente.");
      setReservando(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Carregando detalhes do treino...</p>
      </div>
    );
  }

  // Error state / Treino não encontrado
  if (error || !treino) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">{error || "Treino não encontrado."}</p>
          <Link href="/busca" className="mt-2 inline-block text-brand-600">
            Voltar à busca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link href="/busca" className="flex items-center gap-2">
            <Dumbbell className="h-7 w-7 text-brand-600" />
            <span className="font-bold text-brand-800">FitnessConnect</span>
          </Link>
          <Link href="/login" className="text-brand-600 font-medium">
            Entrar para reservar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Confirmar reserva</h1>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {treino.personalNome}
            </h2>
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="h-4 w-4 fill-current" />
              <span>{treino.personalRating.toFixed(1)}</span>
            </div>
          </div>
          <p className="mt-2 flex items-center gap-2 text-slate-600">
            <MapPin className="h-4 w-4" />
            {treino.academiaNome} — {treino.academiaEndereco}
          </p>
          <p className="mt-2 flex items-center gap-2 text-slate-600">
            <Calendar className="h-4 w-4" />
            {formatDataHora(treino.dataHora)} ({treino.duracaoMinutos} min)
          </p>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">
              Pagamento único. A plataforma reparte automaticamente para o
              personal, a academia e a taxa de serviço (split).
            </p>
            <p className="mt-2 text-2xl font-bold text-brand-600">
              R$ {treino.valorTotal.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href="/busca"
              className="flex-1 rounded-lg border border-slate-300 py-2 text-center font-medium text-slate-700 hover:bg-slate-50"
            >
              Voltar
            </Link>
            <button
              onClick={handleConfirmar}
              disabled={reservando}
              className="flex-1 rounded-lg bg-brand-600 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {reservando ? "Confirmando..." : "Confirmar e pagar"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
