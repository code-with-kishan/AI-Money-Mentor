import { PageShell } from "@/components/PageShell";
import { GlassCard } from "@/components/GlassCard";

export default function ArchitecturePage() {
  return (
    <PageShell 
      title="System Architecture" 
      subtitle="Deep dive into the multi-agent orchestration and data flow of AI Money Mentor."
    >
      <div className="space-y-8">
        <GlassCard>
          <h2 className="display-font text-xl font-bold text-cyan-100 mb-6">🤖 Multi-Agent Orchestration Flow</h2>
          <div className="relative p-8 rounded-2xl bg-slate-950/50 border border-slate-800 overflow-x-auto">
            <div className="flex flex-col items-center space-y-8 min-w-[600px]">
              
              {/* Data Agent */}
              <div className="flex flex-col items-center">
                <div className="px-6 py-4 rounded-xl bg-blue-500/10 border border-blue-500/40 text-blue-200 text-center w-64 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <span className="block text-xs font-bold uppercase tracking-tighter text-blue-400">Agent 1</span>
                  <span className="font-bold">Data Agent</span>
                  <p className="text-[10px] mt-1 text-slate-400">Sanitizes & structures raw inputs</p>
                </div>
                <div className="h-8 w-px bg-linear-to-b from-blue-500/50 to-purple-500/50 my-2" />
              </div>

              {/* Analysis Agent */}
              <div className="flex flex-col items-center">
                <div className="px-6 py-4 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-200 text-center w-64 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                  <span className="block text-xs font-bold uppercase tracking-tighter text-purple-400">Agent 2</span>
                  <span className="font-bold">Analysis Agent</span>
                  <p className="text-[10px] mt-1 text-slate-400">Detects gaps & trends</p>
                </div>
                <div className="h-8 w-px bg-linear-to-b from-purple-500/50 to-emerald-500/50 my-2" />
              </div>

              {/* Decision Agent */}
              <div className="flex flex-col items-center">
                <div className="px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 text-center w-64 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <span className="block text-xs font-bold uppercase tracking-tighter text-emerald-400">Agent 3</span>
                  <span className="font-bold">Decision Agent</span>
                  <p className="text-[10px] mt-1 text-slate-400">Generates Dynamic Roadmap</p>
                </div>
                <div className="h-8 w-px bg-linear-to-b from-emerald-500/50 to-amber-500/50 my-2" />
              </div>

              {/* Explanation Agent */}
              <div className="flex flex-col items-center">
                <div className="px-6 py-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-center w-64 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                  <span className="block text-xs font-bold uppercase tracking-tighter text-amber-400">Agent 4</span>
                  <span className="font-bold">Explanation Agent</span>
                  <p className="text-[10px] mt-1 text-slate-400">Rationale & Traceability layer</p>
                </div>
              </div>

              {/* Flow Lines */}
              <div className="absolute top-0 left-1/2 -ml-32 h-full w-[2px] bg-linear-to-b from-blue-500/20 via-purple-500/20 to-amber-500/20 -z-10" />
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="font-bold text-slate-200 mb-3">📡 Data Flow</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-cyan-400">→</span>
                <span>User input triggers **Orchestrator** (Sequential Chain)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">→</span>
                <span>State is passed between agents via structured JSON</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">→</span>
                <span>Final payload interweaves Decisions + Explanations</span>
              </li>
            </ul>
          </GlassCard>

          <GlassCard>
            <h3 className="font-bold text-slate-200 mb-3">🛡️ Guardrails & Safety</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-rose-400">✓</span>
                <span>Structured Output Verification (Zod)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-rose-400">✓</span>
                <span>Fallback Mode for API failures</span>
              </li>
              <li className="flex gap-2">
                <span className="text-rose-400">✓</span>
                <span>Explainability Layer for transparency</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}
