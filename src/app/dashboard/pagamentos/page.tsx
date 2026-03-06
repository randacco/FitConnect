"use client";

import { CreditCard } from "lucide-react";

export default function PagamentosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Gastos</h1>
      <p className="mt-1 text-slate-600">
        Controle financeiro dos seus treinos. Alertas mensais conforme o PDF.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center gap-4">
          <CreditCard className="h-12 w-12 text-brand-600" />
          <div>
            <p className="font-semibold text-slate-900">Resumo do mês</p>
            <p className="text-2xl font-bold text-brand-600">R$ 0,00</p>
            <p className="text-sm text-slate-500">
              Nenhum gasto registrado neste mês.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        No app completo, cada reserva apareceria aqui com valor único pago e
        split (personal + academia + taxa da plataforma).
      </p>
    </div>
  );
}
