"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface ResumoAvaliacaoDB {
  mediaRating: number;
  totalTreinos: number;
  totalReservas: number;
  treinosRealizados: number;
}

export default function AvaliacoesPage() {
  const [resumo, setResumo] = useState<ResumoAvaliacaoDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAvaliacoes() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/personal/avaliacoes");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Erro ao buscar avaliacoes");
          setResumo(null);
        } else {
          setResumo(data.resumo);
        }
      } catch (err) {
        console.error("Erro ao buscar avaliacoes:", err);
        setError("Erro de conexao. Tente novamente.");
        setResumo(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAvaliacoes();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Avaliações</h1>
      <p className="mt-1 text-slate-600">
        Sua reputação e feedback dos alunos (personais) ou avaliações recebidas.
      </p>

      {loading && (
        <div className="mt-6 text-center">
          <p className="text-slate-600">Carregando avaliacoes...</p>
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && resumo && (
        <>
          <div className="mt-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <Star className="h-12 w-12 text-amber-500 fill-amber-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {resumo.mediaRating > 0 ? resumo.mediaRating.toFixed(1) : "-"}
              </p>
              <p className="text-sm text-slate-500">
                Reputacao media com base nos treinos cadastrados.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Treinos cadastrados</p>
              <p className="text-xl font-semibold text-slate-900">
                {resumo.totalTreinos}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Reservas recebidas</p>
              <p className="text-xl font-semibold text-slate-900">
                {resumo.totalReservas}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Treinos realizados</p>
              <p className="text-xl font-semibold text-slate-900">
                {resumo.treinosRealizados}
              </p>
            </div>
          </div>
        </>
      )}

      <p className="mt-4 text-sm text-slate-500">
        Conforme o PDF: rating para personais, alunos e instalações; perfil com
        certificações e avaliações verificadas.
      </p>
    </div>
  );
}
