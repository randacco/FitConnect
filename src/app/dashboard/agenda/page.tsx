"use client";

import { Calendar, MapPin } from "lucide-react";
import { treinosMock } from "@/data/mock";

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

export default function AgendaPage() {
  const meusTreinos = treinosMock.filter((t) => t.status === "reservado").slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Minha agenda</h1>
      <p className="mt-1 text-slate-600">
        Próximos treinos e histórico de reservas.
      </p>

      <div className="mt-6 space-y-4">
        {meusTreinos.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
            Nenhum treino agendado.{" "}
            <a href="/busca" className="text-brand-600 hover:underline">
              Buscar treinos
            </a>
          </p>
        ) : (
          meusTreinos.map((t) => (
            <div
              key={t.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
            >
              <div>
                <p className="font-semibold text-slate-900">{t.personal.nome}</p>
                <p className="flex items-center gap-1 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  {t.academia.nome}
                </p>
                <p className="flex items-center gap-1 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  {formatDataHora(t.dataHora)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-brand-600">
                  R$ {t.valorTotal.toFixed(2)}
                </p>
                <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                  Confirmado
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
