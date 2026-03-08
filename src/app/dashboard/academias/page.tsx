"use client";

import { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";

interface AcademiaPersonalDB {
  nome: string;
  endereco: string;
  rating: number;
  treinosDisponiveis: number;
  valorMedioSessao: number;
}

export default function AcademiasPage() {
  const [academias, setAcademias] = useState<AcademiaPersonalDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAcademias() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/personal/academias");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Erro ao buscar academias");
          setAcademias([]);
        } else {
          setAcademias(data.academias || []);
        }
      } catch (err) {
        console.error("Erro ao buscar academias:", err);
        setError("Erro de conexao. Tente novamente.");
        setAcademias([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAcademias();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Marketplace de academias
      </h1>
      <p className="mt-1 text-slate-600">
        Espaços disponíveis para agendar seus treinos com alunos.
      </p>

      {loading && (
        <div className="mt-6 text-center">
          <p className="text-slate-600">Carregando academias...</p>
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {academias.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600 sm:col-span-2">
              Nenhuma academia encontrada para o seu perfil neste momento.
            </p>
          ) : (
            academias.map((ac) => (
              <div
                key={`${ac.nome}-${ac.endereco}`}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-slate-900">{ac.nome}</h3>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">{ac.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  {ac.endereco}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Horarios disponiveis: {ac.treinosDisponiveis}
                </p>
                <p className="mt-2 text-lg font-semibold text-brand-600">
                  Ticket medio: R$ {ac.valorMedioSessao.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
