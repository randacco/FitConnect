"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Dumbbell, MapPin, Star, Calendar, Filter } from "lucide-react";
import { treinosMock } from "@/data/mock";
import type { Treino } from "@/types";

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

export default function BuscaPage() {
  const [filtroPrecoMax, setFiltroPrecoMax] = useState<number | "">("");
  const [filtroData, setFiltroData] = useState("");
  const [ordenarPor, setOrdenarPor] = useState<"preco" | "data" | "rating">(
    "data"
  );

  const treinosFiltrados = useMemo(() => {
    let list: Treino[] = [...treinosMock].filter((t) => t.status === "disponivel");
    if (filtroPrecoMax !== "") {
      list = list.filter((t) => t.valorTotal <= Number(filtroPrecoMax));
    }
    if (filtroData) {
      list = list.filter((t) => t.dataHora.startsWith(filtroData));
    }
    if (ordenarPor === "preco") {
      list.sort((a, b) => a.valorTotal - b.valorTotal);
    } else if (ordenarPor === "data") {
      list.sort(
        (a, b) =>
          new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
      );
    } else {
      list.sort((a, b) => b.personal.rating - a.personal.rating);
    }
    return list;
  }, [filtroPrecoMax, filtroData, ordenarPor]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="h-7 w-7 text-brand-600" />
            <span className="font-bold text-brand-800">FitnessConnect</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-slate-600 hover:text-brand-600">
              Início
            </Link>
            <Link href="/login" className="text-brand-600 font-medium">
              Entrar
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Buscar treinos por geolocalização
        </h1>
        <p className="mt-1 text-slate-600">
          Encontre personais e academias parceiras próximas a você.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-500" />
            <span className="font-medium text-slate-700">Filtros</span>
          </div>
          <label className="flex items-center gap-2">
            <span className="text-slate-600">Preço máx. (R$)</span>
            <input
              type="number"
              min="0"
              step="10"
              value={filtroPrecoMax}
              onChange={(e) =>
                setFiltroPrecoMax(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-24 rounded-lg border border-slate-300 px-2 py-1"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-slate-600">Data</span>
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="rounded-lg border border-slate-300 px-2 py-1"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-slate-600">Ordenar</span>
            <select
              value={ordenarPor}
              onChange={(e) =>
                setOrdenarPor(e.target.value as "preco" | "data" | "rating")
              }
              className="rounded-lg border border-slate-300 px-2 py-1"
            >
              <option value="data">Data</option>
              <option value="preco">Menor preço</option>
              <option value="rating">Melhor avaliação</option>
            </select>
          </label>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {treinosFiltrados.map((treino) => (
            <div
              key={treino.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {treino.personal.nome}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    {treino.academia.nome}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">
                    {treino.personal.rating}
                  </span>
                </div>
              </div>
              <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                {formatDataHora(treino.dataHora)}
              </p>
              <p className="mt-2 text-lg font-semibold text-brand-600">
                R$ {treino.valorTotal.toFixed(2)}
              </p>
              <Link
                href={`/reserva/${treino.id}`}
                className="mt-4 block w-full rounded-lg bg-brand-600 py-2 text-center text-white hover:bg-brand-700"
              >
                Reservar
              </Link>
            </div>
          ))}
        </div>

        {treinosFiltrados.length === 0 && (
          <p className="mt-8 text-center text-slate-500">
            Nenhum treino encontrado com os filtros. Tente alterar data ou preço
            máximo.
          </p>
        )}
      </main>
    </div>
  );
}
