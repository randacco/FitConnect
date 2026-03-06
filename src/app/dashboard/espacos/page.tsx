"use client";

import { MapPin, Calendar } from "lucide-react";

export default function EspacosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Espaços e horários</h1>
      <p className="mt-1 text-slate-600">
        Cadastre horários disponíveis para personais alugarem. Marketplace de
        espaços (PDF).
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-slate-600">
          Aqui a academia define: horários disponíveis, valores por hora,
          capacidade e regras internas. As reservas feitas por personais
          aparecem na agenda e o controle de acesso pode ser via QR Code.
        </p>
      </div>
    </div>
  );
}
