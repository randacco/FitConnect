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
  // Estados da API
  const [reservas, setReservas] = useState<ReservaDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FASE 0: Buscar reservas da API ao carregar a página
  useEffect(() => {
    async function fetchReservas() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/reservas");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Erro ao buscar reservas");
          setReservas([]);
        } else {
          setReservas(data.reservas);
        }
      } catch (err) {
        console.error("Erro ao buscar reservas:", err);
        setError("Erro de conexão. Tente novamente.");
        setReservas([]);
      } finally {
        setLoading(false);
      }
    }

    fetchReservas();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Minha agenda</h1>
      <p className="mt-1 text-slate-600">
        Próximos treinos e histórico de reservas.
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

      {/* Reservas list */}
      {!loading && !error && (
        <div className="mt-6 space-y-4">
          {reservas.length === 0 ? (
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
