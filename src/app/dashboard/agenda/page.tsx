"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

// Tipo de reserva retornado pela API (com join de treino)
interface ReservaDB {
  id: string;
  status: string;
  createdAt: string;
  treino: {
    id: string;
    personalNome: string;
    personalRating: number;
    academiaNome: string;
    academiaEndereco: string;
    dataHora: string;
    duracaoMinutos: number;
    valorTotal: number;
  };
}

interface UserDB {
  id: string;
  nome: string;
  email: string;
  tipo: string;
}

interface TreinoPersonalDB {
  id: string;
  status: string;
  dataHora: string;
  duracaoMinutos: number;
  valorTotal: number;
  academiaNome: string;
  academiaEndereco: string;
  reservas: {
    id: string;
    status: string;
    aluno: {
      nome: string;
      email: string;
    };
  }[];
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

export default function AgendaPage() {
  // Estados da API (aluno)
  const [reservas, setReservas] = useState<ReservaDB[]>([]);

  // Estados da API (personal)
  const [treinosPersonal, setTreinosPersonal] = useState<TreinoPersonalDB[]>([]);

  // Estado de perfil
  const [user, setUser] = useState<UserDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FASE 0: Buscar reservas da API ao carregar a página
  useEffect(() => {
    async function fetchAgenda() {
      setLoading(true);
      setError("");

      try {
        const meRes = await fetch("/api/auth/me");

        if (!meRes.ok) {
          setError("Nao autenticado. Faca login para acessar a agenda.");
          setReservas([]);
          setTreinosPersonal([]);
          return;
        }

        const meData = await meRes.json();
        const userData = meData.user as UserDB;
        setUser(userData);

        if (userData.tipo === "personal") {
          const res = await fetch("/api/personal/agenda");
          const data = await res.json();

          if (!res.ok) {
            setError(data.error || "Erro ao buscar agenda do personal");
            setTreinosPersonal([]);
            setReservas([]);
          } else {
            setTreinosPersonal(data.treinos || []);
            setReservas([]);
          }

          return;
        }

        const res = await fetch("/api/reservas");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Erro ao buscar reservas");
          setReservas([]);
          setTreinosPersonal([]);
        } else {
          setReservas(data.reservas);
          setTreinosPersonal([]);
        }
      } catch (err) {
        console.error("Erro ao buscar agenda:", err);
        setError("Erro de conexão. Tente novamente.");
        setReservas([]);
        setTreinosPersonal([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAgenda();
  }, []);

  const isPersonal = user?.tipo === "personal";

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        {isPersonal ? "Agenda do personal" : "Minha agenda"}
      </h1>
      <p className="mt-1 text-slate-600">
        {isPersonal
          ? "Acompanhe seus horarios e reservas de alunos."
          : "Proximos treinos e historico de reservas."}
      </p>

      {/* Loading state */}
      {loading && (
        <div className="mt-6 text-center">
          <p className="text-slate-600">Carregando suas reservas...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Lista da agenda (aluno/personal) */}
      {!loading && !error && (
        <div className="mt-6 space-y-4">
          {isPersonal ? (
            treinosPersonal.length === 0 ? (
              <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
                Nenhum treino vinculado ao seu perfil no momento.
              </p>
            ) : (
              treinosPersonal.map((treino) => (
                <div
                  key={treino.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {treino.reservas[0]?.aluno?.nome || "Horario sem aluno"}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-slate-600">
                      <MapPin className="h-4 w-4" />
                      {treino.academiaNome}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />
                      {formatDataHora(treino.dataHora)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-brand-600">
                      R$ {treino.valorTotal.toFixed(2)}
                    </p>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                        treino.status === "reservado"
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {treino.status === "reservado"
                        ? "Com reserva"
                        : "Disponivel"}
                    </span>
                  </div>
                </div>
              ))
            )
          ) : reservas.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
              Nenhum treino agendado.{" "}
              <Link href="/busca" className="text-brand-600 hover:underline">
                Buscar treinos
              </Link>
            </p>
          ) : (
            reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {reserva.treino.personalNome}
                  </p>
                  <p className="flex items-center gap-1 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    {reserva.treino.academiaNome}
                  </p>
                  <p className="flex items-center gap-1 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {formatDataHora(reserva.treino.dataHora)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-brand-600">
                    R$ {reserva.treino.valorTotal.toFixed(2)}
                  </p>
                  <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                    {reserva.status === "confirmada" ? "Confirmada" : reserva.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
