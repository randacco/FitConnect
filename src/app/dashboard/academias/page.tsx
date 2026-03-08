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
  const [selectedAcademia, setSelectedAcademia] =
    useState<AcademiaPersonalDB | null>(null);
  const [dataHora, setDataHora] = useState("");
  const [valorTotal, setValorTotal] = useState(0);
  const [duracaoMinutos, setDuracaoMinutos] = useState(60);
  const [savingTreino, setSavingTreino] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

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

      {selectedAcademia && (
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/40 p-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Criar treino em {selectedAcademia.nome}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{selectedAcademia.endereco}</p>

          <form
            className="mt-4 grid gap-3 sm:grid-cols-3"
            onSubmit={async (e) => {
              e.preventDefault();
              setSaveMessage("");
              setSavingTreino(true);

              try {
                const res = await fetch("/api/personal/treinos", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    academiaNome: selectedAcademia.nome,
                    academiaEndereco: selectedAcademia.endereco,
                    academiaRating: selectedAcademia.rating,
                    dataHora,
                    valorTotal,
                    duracaoMinutos,
                  }),
                });

                const data = await res.json();

                if (!res.ok) {
                  setSaveMessage(data.error || "Erro ao criar treino");
                } else {
                  setSaveMessage("Treino criado com sucesso! Veja em Agenda.");
                  setSelectedAcademia(null);
                  setDataHora("");
                  setValorTotal(0);
                  setDuracaoMinutos(60);
                }
              } catch (err) {
                console.error("Erro ao criar treino:", err);
                setSaveMessage("Erro de conexao ao criar treino.");
              } finally {
                setSavingTreino(false);
              }
            }}
          >
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Data e hora
              <input
                type="datetime-local"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
                required
                className="rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Valor (R$)
              <input
                type="number"
                min={1}
                step="0.01"
                value={valorTotal || ""}
                onChange={(e) => setValorTotal(Number(e.target.value))}
                required
                className="rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Duracao (min)
              <input
                type="number"
                min={15}
                step={15}
                value={duracaoMinutos}
                onChange={(e) => setDuracaoMinutos(Number(e.target.value))}
                required
                className="rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <div className="sm:col-span-3 flex gap-2">
              <button
                type="submit"
                disabled={savingTreino}
                className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
              >
                {savingTreino ? "Salvando..." : "Criar treino"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedAcademia(null);
                  setSaveMessage("");
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {saveMessage && (
        <div className="mt-4 rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
          {saveMessage}
        </div>
      )}

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
                <button
                  className="mt-3 rounded-lg bg-brand-600 px-3 py-2 text-sm text-white hover:bg-brand-700"
                  onClick={() => {
                    setSelectedAcademia(ac);
                    setValorTotal(Number(ac.valorMedioSessao.toFixed(2)));
                    setSaveMessage("");
                  }}
                >
                  Criar treino nesta academia
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
