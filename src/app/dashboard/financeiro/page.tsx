"use client";

import { CreditCard } from "lucide-react";

export default function FinanceiroPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard financeiro</h1>
      <p className="mt-1 text-slate-600">
        Receita gerada pelo aluguel de horários. Pagamento com split automático
        (PDF).
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center gap-4">
          <CreditCard className="h-12 w-12 text-brand-600" />
          <div>
            <p className="font-semibold text-slate-900">Receita do mês</p>
            <p className="text-2xl font-bold text-brand-600">R$ 0,00</p>
            <p className="text-sm text-slate-500">
              Pagamento antecipado pelo aluno; repasse automático para a academia
              (split).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
