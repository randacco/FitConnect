"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dumbbell,
  LayoutDashboard,
  Calendar,
  MapPin,
  CreditCard,
  Star,
  LogOut,
} from "lucide-react";

// Tipo simplificado de usuário retornado pela API
interface UserDB {
  id: string;
  email: string;
  nome: string;
  tipo: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Estados da API
  const [user, setUser] = useState<UserDB | null>(null);
  const [loading, setLoading] = useState(true);

  // FASE 0: Buscar usuário logado da API
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);

      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          // Não autenticado, redirecionar para login
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  // FASE 0: Logout via API
  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      // Mesmo com erro, redirecionar
      router.push("/");
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Carregando...</p>
      </div>
    );
  }

  // Não autenticado (não deveria chegar aqui pois useEffect redireciona)
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600">Faça login para acessar o painel.</p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-white"
          >
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  const navAluno = [
    { href: "/dashboard", label: "Início", icon: LayoutDashboard },
    { href: "/dashboard/agenda", label: "Minha agenda", icon: Calendar },
    { href: "/busca", label: "Buscar treinos", icon: MapPin },
    { href: "/dashboard/pagamentos", label: "Gastos", icon: CreditCard },
  ];
  const navPersonal = [
    { href: "/dashboard", label: "Início", icon: LayoutDashboard },
    { href: "/dashboard/agenda", label: "Agenda", icon: Calendar },
    { href: "/dashboard/academias", label: "Academias", icon: MapPin },
    { href: "/dashboard/avaliacoes", label: "Avaliações", icon: Star },
  ];
  const navAcademia = [
    { href: "/dashboard", label: "Início", icon: LayoutDashboard },
    { href: "/dashboard/agenda", label: "Reservas", icon: Calendar },
    { href: "/dashboard/espacos", label: "Espaços", icon: MapPin },
    { href: "/dashboard/financeiro", label: "Financeiro", icon: CreditCard },
  ];

  const nav =
    user.tipo === "aluno"
      ? navAluno
      : user.tipo === "personal"
        ? navPersonal
        : navAcademia;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Dumbbell className="h-7 w-7 text-brand-600" />
            <span className="font-bold text-brand-800">FitnessConnect</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {user.nome} ({user.tipo})
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
        <aside className="w-52 shrink-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <nav className="space-y-1">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  pathname === href ||
                  (href !== "/dashboard" && pathname.startsWith(href))
                    ? "bg-brand-100 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
