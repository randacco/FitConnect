import Link from "next/link";
import { Dumbbell, MapPin, Calendar, CreditCard, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <header className="border-b border-brand-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-brand-600" />
            <span className="text-xl font-bold text-brand-800">
              FitnessConnect
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/busca"
              className="text-slate-600 hover:text-brand-600 transition"
            >
              Buscar treinos
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 transition"
            >
              Entrar
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Conectando{" "}
            <span className="text-brand-600">alunos</span>,{" "}
            <span className="text-brand-600">personais</span> e{" "}
            <span className="text-brand-600">academias</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Agende treinos personalizados sem mensalidade fixa. Academias
            monetizam horários ociosos, personais encontram espaços e alunos, e
            você treina com flexibilidade e custo-benefício.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/busca"
              className="rounded-xl bg-brand-600 px-6 py-3 text-lg font-medium text-white shadow-lg hover:bg-brand-700 transition"
            >
              Buscar treinos perto de mim
            </Link>
            <Link
              href="/cadastro"
              className="rounded-xl border-2 border-brand-600 px-6 py-3 text-lg font-medium text-brand-600 hover:bg-brand-50 transition"
            >
              Criar conta
            </Link>
          </div>
        </section>

        <section className="border-t border-brand-100 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Como funciona
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: MapPin,
                  title: "Busca e geolocalização",
                  text: "Encontre personais e academias parceiras próximas a você.",
                },
                {
                  icon: Calendar,
                  title: "Agenda integrada",
                  text: "Horários do personal sincronizados com vagas da academia.",
                },
                {
                  icon: Star,
                  title: "Avaliações",
                  text: "Rating para personais, alunos e instalações.",
                },
                {
                  icon: CreditCard,
                  title: "Pagamento split",
                  text: "Um único pagamento; a plataforma reparte para personal, academia e taxa.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6"
                >
                  <Icon className="h-10 w-10 text-brand-600" />
                  <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Para quem é o FitnessConnect?
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-3xl">👤</span>
                <h3 className="mt-2 font-semibold text-slate-900">Alunos</h3>
                <p className="mt-1 text-slate-600">
                  Flexibilidade de horário e local, sem contratos longos. Controle total dos gastos.
                </p>
                <Link
                  href="/cadastro?tipo=aluno"
                  className="mt-4 inline-block text-brand-600 font-medium hover:underline"
                >
                  Criar conta como aluno →
                </Link>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-3xl">💪</span>
                <h3 className="mt-2 font-semibold text-slate-900">
                  Personal trainers
                </h3>
                <p className="mt-1 text-slate-600">
                  Encontre espaços disponíveis, novos alunos e gerencie agenda e pagamentos.
                </p>
                <Link
                  href="/cadastro?tipo=personal"
                  className="mt-4 inline-block text-brand-600 font-medium hover:underline"
                >
                  Cadastrar como personal →
                </Link>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-3xl">🏋️</span>
                <h3 className="mt-2 font-semibold text-slate-900">Academias</h3>
                <p className="mt-1 text-slate-600">
                  Monetize horários ociosos, controle acesso e receba com split automático.
                </p>
                <Link
                  href="/cadastro?tipo=academia"
                  className="mt-4 inline-block text-brand-600 font-medium hover:underline"
                >
                  Cadastrar academia →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-slate-600">
          <p>FitnessConnect — Projeto Integrador IV — Senac 2025</p>
        </div>
      </footer>
    </div>
  );
}
