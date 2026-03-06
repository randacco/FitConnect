"use client";

import { Star } from "lucide-react";

export default function AvaliacoesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Avaliações</h1>
      <p className="mt-1 text-slate-600">
        Sua reputação e feedback dos alunos (personais) ou avaliações recebidas.
      </p>

      <div className="mt-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <Star className="h-12 w-12 text-amber-500 fill-amber-500" />
        <div>
          <p className="text-2xl font-bold text-slate-900">—</p>
          <p className="text-sm text-slate-500">Nenhuma avaliação ainda.</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Conforme o PDF: rating para personais, alunos e instalações; perfil com
        certificações e avaliações verificadas.
      </p>
    </div>
  );
}
