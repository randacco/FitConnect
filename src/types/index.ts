export type TipoUsuario = "aluno" | "personal" | "academia";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  avatar?: string;
}

export interface Academia {
  id: string;
  nome: string;
  endereco: string;
  lat: number;
  lng: number;
  rating: number;
  avaliacoes: number;
  imagem?: string;
  regras?: string;
  valorHora: number;
}

export interface Personal {
  id: string;
  nome: string;
  certificacoes?: string[];
  rating: number;
  avaliacoes: number;
  valorSessao: number;
  avatar?: string;
  academiasIds: string[];
}

export interface Treino {
  id: string;
  personal: Personal;
  academia: Academia;
  dataHora: string;
  duracaoMinutos: number;
  valorTotal: number;
  status: "disponivel" | "reservado" | "realizado" | "cancelado";
  alunoId?: string;
}

export interface Reserva {
  id: string;
  treino: Treino;
  alunoId: string;
  status: "pendente" | "confirmada" | "realizada" | "cancelada";
  qrCode?: string;
  avaliacao?: number;
}
