"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Dumbbell, MapPin, Star, Calendar } from "lucide-react";
import { treinosMock } from "@/data/mock";

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
  const treino = treinosMock.find((t) => t.id === params.id);

  if (!treino) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Treino não encontrado.</p>
          <Link href="/busca" className="mt-2 inline-block text-brand-600">
            Voltar à busca
          </Link>
        </div>
      </div>
    );
  }

  function handleConfirmar() {
    // MVP: simula reserva e redireciona
    alert(
      "Reserva simulada! No app completo: pagamento split (personal + academia + taxa) e QR Code de acesso seriam gerados."
    );
    router.push("/dashboard");
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

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {treino.personal.nome}
            </h2>
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="h-4 w-4 fill-current" />
              <span>{treino.personal.rating}</span>
            </div>
          </div>
          <p className="mt-2 flex items-center gap-2 text-slate-600">
            <MapPin className="h-4 w-4" />
            {treino.academia.nome} — {treino.academia.endereco}
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
              className="flex-1 rounded-lg bg-brand-600 py-2 font-medium text-white hover:bg-brand-700"
            >
              Confirmar e pagar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
