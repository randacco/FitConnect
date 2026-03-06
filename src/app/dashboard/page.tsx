"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, CreditCard, Star } from "lucide-react";
import type { Usuario } from "@/types";

export default function DashboardPage() {
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const raw =
      typeof window !== "undefined" &&
      sessionStorage.getItem("fitconnect_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  if (!user) return null;

  const isAluno = user.tipo === "aluno";
  const isPersonal = user.tipo === "personal";
  const isAcademia = user.tipo === "academia";

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Olá, {user.nome.split(" ")[0]}!
      </h1>
      <p className="mt-1 text-slate-600">
        {isAluno &&
          "Acompanhe seus treinos agendados e gastos no painel financeiro."}
        {isPersonal &&
          "Gerencie sua agenda, reservas e avaliações em um só lugar."}
        {isAcademia &&
          "Acompanhe reservas, ocupação e receita dos horários."}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {isAluno && (
          <>
            <Link
              href="/dashboard/agenda"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <Calendar className="h-10 w-10 text-brand-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Minha agenda</h3>
                <p className="text-sm text-slate-600">
                  Próximos treinos e histórico
                </p>
              </div>
            </Link>
            <Link
              href="/busca"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <MapPin className="h-10 w-10 text-brand-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Buscar treinos</h3>
                <p className="text-sm text-slate-600">
                  Por localização e filtros
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard/pagamentos"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <CreditCard className="h-10 w-10 text-brand-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Gastos</h3>
                <p className="text-sm text-slate-600">
                  Controle financeiro mensal
                </p>
              </div>
            </Link>
          </>
        )}
        {isPersonal && (
          <>
            <Link
              href="/dashboard/agenda"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <Calendar className="h-10 w-10 text-brand-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Agenda</h3>
                <p className="text-sm text-slate-600">
                  Horários e reservas com alunos
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard/academias"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <MapPin className="h-10 w-10 text-brand-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Academias</h3>
                <p className="text-sm text-slate-600">
                  Espaços disponíveis para treino
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard/avaliacoes"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <Star className="h-10 w-10 text-brand-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Avaliações</h3>
                <p className="text-sm text-slate-600">
                  Reputação e feedback
                </p>
              </div>
            </Link>
          </>
        )}
        {isAcademia && (
          <>
            <Link
              href="/dashboard/agenda"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <Calendar className="h-10 w-10 text-brand-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Reservas</h3>
                <p className="text-sm text-slate-600">
                  Reservas feitas por personais
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard/espacos"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <MapPin className="h-10 w-10 text-brand-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Espaços</h3>
                <p className="text-sm text-slate-600">
                  Cadastro e horários disponíveis
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard/financeiro"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <CreditCard className="h-10 w-10 text-brand-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Financeiro</h3>
                <p className="text-sm text-slate-600">
                  Receita e split automático
                </p>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
