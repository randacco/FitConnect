import type { Academia, Personal, Treino } from "@/types";

export const academiasMock: Academia[] = [
  {
    id: "ac1",
    nome: "Academia Fit Life",
    endereco: "Rua das Flores, 100 - São Paulo, SP",
    lat: -23.5505,
    lng: -46.6333,
    rating: 4.8,
    avaliacoes: 124,
    valorHora: 45,
  },
  {
    id: "ac2",
    nome: "Espaço Corpo & Mente",
    endereco: "Av. Paulista, 500 - São Paulo, SP",
    lat: -23.5615,
    lng: -46.6559,
    rating: 4.6,
    avaliacoes: 89,
    valorHora: 55,
  },
  {
    id: "ac3",
    nome: "Academia Movimento",
    endereco: "Rua Augusta, 200 - São Paulo, SP",
    lat: -23.5489,
    lng: -46.6388,
    rating: 4.9,
    avaliacoes: 201,
    valorHora: 50,
  },
];

export const personaisMock: Personal[] = [
  {
    id: "p1",
    nome: "Rafael Monteiro",
    certificacoes: ["CREF 12345", "Nutrição esportiva"],
    rating: 4.9,
    avaliacoes: 67,
    valorSessao: 120,
    academiasIds: ["ac1", "ac2"],
  },
  {
    id: "p2",
    nome: "Ana Costa",
    certificacoes: ["CREF 67890", "Pilates"],
    rating: 4.7,
    avaliacoes: 43,
    valorSessao: 100,
    academiasIds: ["ac1", "ac3"],
  },
  {
    id: "p3",
    nome: "Carlos Silva",
    certificacoes: ["CREF 11111", "CrossFit L1"],
    rating: 4.8,
    avaliacoes: 89,
    valorSessao: 130,
    academiasIds: ["ac2", "ac3"],
  },
];

function buildTreinos(): Treino[] {
  const treinos: Treino[] = [];
  const datas = ["2025-03-01", "2025-03-02", "2025-03-03"];
  const horarios = ["08:00", "10:00", "14:00", "16:00"];
  personaisMock.forEach((personal, pi) => {
    personal.academiasIds.forEach((acid) => {
      const academia = academiasMock.find((a) => a.id === acid)!;
      datas.forEach((data, di) => {
        horarios.slice(0, 2 + (pi + di) % 2).forEach((hora, hi) => {
          treinos.push({
            id: `t-${pi}-${acid}-${di}-${hi}`,
            personal,
            academia,
            dataHora: `${data}T${hora}:00`,
            duracaoMinutos: 60,
            valorTotal: personal.valorSessao + academia.valorHora,
            status: hi === 0 && di === 0 ? "reservado" : "disponivel",
          });
        });
      });
    });
  });
  return treinos;
}

export const treinosMock = buildTreinos();
