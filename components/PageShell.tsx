import { MainNav } from "@/components/MainNav";
import { ReactNode } from "react";

type PageShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen px-5 sm:px-8 lg:px-12">
      <MainNav />
      <main className="mx-auto w-full max-w-7xl pb-14">
        <section className="mb-7">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-200/70">Fintech Workspace</p>
          <h1 className="display-font mt-2 text-3xl font-bold text-slate-100 sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-(--text-muted) sm:text-base">{subtitle}</p>
        </section>
        {children}
        <footer className="mt-16 border-t border-slate-800/50 pt-8 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 max-w-md text-center md:text-left">
              ⚠️ **Compliance Guardrail**: AI-generated financial guidance, not licensed advice. 
              Consult a certified professional before making significant decisions.
            </p>
            <a 
              href="/architecture" 
              className="text-xs font-semibold uppercase tracking-widest text-cyan-500/80 hover:text-cyan-400 transition"
            >
              View System Architecture →
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
