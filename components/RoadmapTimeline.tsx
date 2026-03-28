import { GlassCard } from "@/components/GlassCard";
import { useState } from "react";

export type RoadmapStep = {
  month: number;
  action: string;
  category: string;
  estimatedAmount: number;
  whyThisDecision: string;
};

export function RoadmapTimeline({ roadmap }: { roadmap: RoadmapStep[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!roadmap || roadmap.length === 0) return null;

  return (
    <GlassCard className="mt-6">
      <h2 className="display-font text-lg font-semibold text-cyan-100">📅 Month-by-Month AI Roadmap</h2>
      <p className="text-sm text-slate-400 mb-6">Click on any step to understand why this decision was made.</p>
      
      <div className="space-y-4 border-l-2 border-slate-700/50 ml-3 pl-6 relative">
        {roadmap.map((step, index) => {
          const isExpanded = expanded === index;
          return (
            <div key={index} className="relative group cursor-pointer" onClick={() => setExpanded(isExpanded ? null : index)}>
              {/* Timeline Dot */}
              <div className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-900 bg-cyan-400 transition-transform group-hover:scale-125" />
              
              <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4 transition-all hover:border-cyan-500/30 hover:bg-slate-800/80">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 mr-3">
                      Month {step.month}
                    </span>
                    <span className="text-xs rounded-full bg-slate-800 px-2 py-1 text-slate-300">
                      {step.category}
                    </span>
                  </div>
                  <div className="text-emerald-400 font-mono text-sm">
                    Est: ₹{step.estimatedAmount.toLocaleString("en-IN")}
                  </div>
                </div>
                
                <p className="mt-2 text-slate-200">{step.action}</p>
                
                {/* Explainability Layer Toggle */}
                <div className={`mt-3 overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="rounded border border-indigo-500/20 bg-indigo-500/10 p-3 text-sm text-indigo-200 border-l-4 border-l-indigo-500">
                    <span className="font-semibold block mb-1">🤖 Why this decision?</span>
                    {step.whyThisDecision}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
