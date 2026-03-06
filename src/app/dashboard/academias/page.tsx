"use client";

import { MapPin, Star } from "lucide-react";
import { academiasMock } from "@/data/mock";

export default function AcademiasPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Marketplace de academias
      </h1>
      <p className="mt-1 text-slate-600">
        Espaços disponíveis para agendar seus treinos com alunos.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {academiasMock.map((ac) => (
          <div
            key={ac.id}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-slate-900">{ac.nome}</h3>
              <div className="flex items-center gap-1 text-amber-600">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">{ac.rating}</span>
              </div>
            </div>
            <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
              <MapPin className="h-4 w-4" />
              {ac.endereco}
            </p>
            <p className="mt-2 text-lg font-semibold text-brand-600">
              R$ {ac.valorHora}/hora
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
