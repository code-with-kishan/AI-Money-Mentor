"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { GlassCard } from "@/components/GlassCard";
import { MoneyCounter } from "@/components/MoneyCounter";
import { PageShell } from "@/components/PageShell";
import { LoaderDots, SectionSkeleton, Skeleton } from "@/components/Skeleton";
import { SimulateApiOutput, simulateFuture } from "@/lib/apiClient";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "@/components/hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamic Import for AreaChart
const BaseAreaChart = dynamic(() => import("@/components/charts/BaseAreaChart").then(mod => mod.BaseAreaChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[320px] w-full rounded-xl" />,
});

type Scenario = "conservative" | "moderate" | "aggressive";

const SCENARIOS: Record<Scenario, { rate: number; color: string; label: string; description: string }> = {
  conservative: { rate: 8, color: "#34d399", label: "Conservative", description: "Safe, steady growth" },
  moderate: { rate: 11, color: "#5a8cff", label: "Moderate", description: "Balanced approach" },
  aggressive: { rate: 14, color: "#f97316", label: "Aggressive", description: "Higher risk, higher rewards" },
};

const FutureSimulatorPage = React.memo(function FutureSimulatorPage() {
  const [input, setInput] = useState({
    currentCorpus: 600000,
    monthlyContribution: 25000,
    years: 15,
  });

  const [scenarios, setScenarios] = useState<Record<Scenario, SimulateApiOutput | null>>({
    conservative: null,
    moderate: null,
    aggressive: null,
  });

  const [activeScenario, setActiveScenario] = useState<Scenario>("moderate");
  const [loading, setLoading] = useState(false);
  const chartsRef = useRef<HTMLDivElement | null>(null);

  // Calculate all scenarios
  useEffect(() => {
    let active = true;
    const run = async () => {
      setLoading(true);
      try {
        const results: Record<Scenario, SimulateApiOutput | null> = {
          conservative: null,
          moderate: null,
          aggressive: null,
        };

        for (const [scenario, config] of Object.entries(SCENARIOS)) {
          const data = await simulateFuture({
            ...input,
            annualReturnRate: config.rate,
          });
          if (active) results[scenario as Scenario] = data;
        }

        if (active) setScenarios(results);
      } finally {
        if (active) setLoading(false);
      }
    };

    run();
    return () => { active = false; };
  }, [input]);

  useGsapContext(chartsRef, () => {
    if (!chartsRef.current) return;
    gsap.fromTo(
      chartsRef.current,
      { opacity: 0.6, scale: 0.99 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" }
    );
  }, [activeScenario]);

  const currentResult = scenarios[activeScenario];
  
  const totalInvested = useMemo(() => 
    input.currentCorpus + input.monthlyContribution * 12 * input.years,
  [input]);

  return (
    <PageShell 
      title="Future Wealth Simulator" 
      subtitle="Explore multiple investment scenarios with real-time wealth projections."
    >
      <div className="space-y-5">
        {/* Input Controls */}
        <GlassCard>
          <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Simulation Parameters</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { label: "Current Corpus", val: `₹${input.currentCorpus.toLocaleString("en-IN")}`, key: "currentCorpus", min: 0, max: 5000000, step: 50000, color: "text-cyan-300" },
              { label: "Monthly Contribution", val: `₹${input.monthlyContribution.toLocaleString("en-IN")}`, key: "monthlyContribution", min: 1000, max: 200000, step: 1000, color: "text-emerald-300" },
              { label: "Time Horizon", val: `${input.years} years`, key: "years", min: 1, max: 35, step: 1, color: "text-blue-300" }
            ].map(ctrl => (
              <div key={ctrl.key}>
                <label className="mb-3 block text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  {ctrl.label}: <span className={ctrl.color}>{ctrl.val}</span>
                </label>
                <input
                  type="range"
                  min={ctrl.min}
                  max={ctrl.max}
                  step={ctrl.step}
                  value={(input as any)[ctrl.key]}
                  onChange={(e) => setInput({ ...input, [ctrl.key]: Number(e.target.value) })}
                  className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Scenario Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.entries(SCENARIOS) as [Scenario, typeof SCENARIOS["conservative"]][]).map(([scenario, config]) => {
            const result = scenarios[scenario];
            return (
              <button
                key={scenario}
                onClick={() => setActiveScenario(scenario)}
                className={`relative group rounded-3xl border-2 transition-all p-0.5 ${
                  activeScenario === scenario
                    ? "border-blue-500/50 bg-blue-500/5 shadow-lg shadow-blue-500/10"
                    : "border-white/5 bg-slate-900/40 hover:border-white/10"
                }`}
              >
                <GlassCard className="!bg-transparent border-0 h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black" style={{ color: config.color }}>
                    {config.label}
                  </p>
                  <p className="mt-3 text-xs text-slate-400 line-clamp-2">{config.description}</p>
                  <p className="mt-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target: {config.rate}% p.a.</p>
                  
                  {result && (
                    <div className="mt-5 border-t border-white/5 pt-4">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Final Corpus</p>
                      <p className="text-xl font-black text-white">
                        ₹{(result.finalCorpus / 10000000).toFixed(2)} Cr
                      </p>
                    </div>
                  )}

                  {loading && !result && (
                    <div className="mt-5 h-12 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-ping" />
                    </div>
                  )}
                </GlassCard>
              </button>
            );
          })}
        </div>

        {/* Chart & Results */}
        {currentResult && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Main Chart */}
            <div ref={chartsRef} className="lg:col-span-2">
              <GlassCard>
                <p className="mb-6 text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">
                  Growth Projection — {SCENARIOS[activeScenario].label} Path
                </p>
                <BaseAreaChart 
                  data={currentResult.projections} 
                  dataKey="value" 
                  xAxisKey="year" 
                  height={320}
                  gradientColor={SCENARIOS[activeScenario].color} 
                  strokeColor={SCENARIOS[activeScenario].color}
                />
                <p className="mt-6 text-sm leading-relaxed text-slate-300/80 bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-blue-400 font-bold mr-2">AI Narrative:</span>
                  {currentResult.narrative}
                </p>
              </GlassCard>
            </div>

            {/* Summary & Milestones */}
            <GlassCard>
              <p className="mb-6 text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">Wealth Breakdown</p>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Final Wealth</p>
                  <MoneyCounter
                    value={currentResult.finalCorpus}
                    className="display-font block text-3xl font-black text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Invested</p>
                    <p className="text-sm font-bold text-slate-300">
                      ₹{totalInvested.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Gains</p>
                    <p className="text-sm font-bold text-emerald-400">
                      ₹{(currentResult.finalCorpus - totalInvested).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Key Milestones</p>
                  <ul className="space-y-3">
                    {currentResult.milestones.map((milestone, i) => (
                      <li key={i} className="flex gap-3 text-xs text-slate-300 items-start">
                        <span className="text-blue-400 mt-1">★</span> 
                        <span className="flex-1">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {loading && !currentResult && (
          <GlassCard>
            <SectionSkeleton titleWidth="w-52" lines={3} />
            <LoaderDots label="Calculating wealth projections..." />
          </GlassCard>
        )}
      </div>
    </PageShell>
  );
});

export default FutureSimulatorPage;
