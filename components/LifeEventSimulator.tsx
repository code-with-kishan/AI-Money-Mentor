import React from "react";
import { GlassCard } from "@/components/GlassCard";

export type LifeEvent = "marriage" | "child" | "promotion" | "jobloss";

interface Props {
  onSimulate: (event: LifeEvent) => void;
  activeEvent: LifeEvent | null;
}

export const LifeEventSimulator = React.memo(function LifeEventSimulator({ onSimulate, activeEvent }: Props) {
  const events = [
    { id: "promotion", icon: "🚀", label: "Promotion", desc: "+30% Income" },
    { id: "marriage", icon: "💍", label: "Marriage", desc: "+25% Expenses" },
    { id: "child", icon: "👶", label: "Have a Child", desc: "+40% Expenses" },
    { id: "jobloss", icon: "📉", label: "Loss of Income", desc: "0% Income" },
  ];

  return (
    <GlassCard className="mt-6 mb-6">
      <h2 className="display-font text-lg font-semibold text-rose-100 mb-2">⚡ Life Event Simulator</h2>
      <p className="text-sm text-slate-400 mb-4">Click an event to see how it instantly rewires your AI financial roadmap.</p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {events.map((ev) => (
          <button
            key={ev.id}
            onClick={() => onSimulate(ev.id as LifeEvent)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
              activeEvent === ev.id 
                ? "bg-rose-500/20 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] scale-[1.02]" 
                : "bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-500"
            }`}
          >
            <span className="text-3xl mb-2">{ev.icon}</span>
            <span className="font-semibold text-slate-200 text-sm">{ev.label}</span>
            <span className="text-xs text-slate-400 mt-1">{ev.desc}</span>
          </button>
        ))}
      </div>
      
      {activeEvent && (
        <div className="mt-4 text-center">
          <button 
            onClick={() => onSimulate(null as unknown as LifeEvent)}
            className="text-xs text-slate-400 hover:text-white underline underline-offset-2 transition"
          >
            Reset Simulator
          </button>
        </div>
      )}
    </GlassCard>
  );
});
