"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { GlassCard } from "@/components/GlassCard";
import { MoneyCounter } from "@/components/MoneyCounter";
import { PageShell } from "@/components/PageShell";
import { Skeleton } from "@/components/Skeleton";
import { loadDemo, orchestrateFinance } from "@/lib/apiClient";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoadmapTimeline, RoadmapStep } from "@/components/RoadmapTimeline";
import { DashboardHero } from "@/components/DashboardHero";
import { SmartAlerts } from "@/components/SmartAlerts";
import { useGsapContext } from "@/components/hooks/useGsapContext";

// Dynamic imports for secondary dashboard features
const LifeEventSimulator = dynamic(() => import("@/components/LifeEventSimulator").then(mod => mod.LifeEventSimulator), { ssr: false });
const GuidedDemo = dynamic(() => import("@/components/GuidedDemo").then(mod => mod.GuidedDemo), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type DashboardData = {
  user: { name: string; salary: number; expenses: number; age: number };
  financialData: { investments: number };
  analysis: {
    score: number;
    savingsRate: number;
    emergencyMonths: number;
    insights: string[];
    recommendations: string[];
  };
  roadmap?: RoadmapStep[];
  impact?: {
    savingsImprovementPct: number;
    taxSaved: number;
    wealthIncreaseProjection: number;
  };
  alerts?: Array<{
    id: string;
    type: "warning" | "info" | "success" | "critical";
    title: string;
    message: string;
    icon: string;
    action?: { label: string; href: string };
  }>;
};

// --- Memoized Sub-components ---

const KPISection = React.memo(({ data, monthlyIncome, monthlyExpense, monthlySavings }: any) => {
  const scoreColor = data.analysis.score >= 80 ? "text-emerald-200" : data.analysis.score >= 60 ? "text-cyan-200" : "text-amber-200";
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <GlassCard data-dashboard-card className="relative overflow-hidden">
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">Money Health Score</p>
          <p className={`display-font mt-3 text-6xl font-black ${scoreColor}`}>{data.analysis.score}</p>
          <div className="mt-4 space-y-1.5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-700"
                style={{ width: `${Math.min(data.analysis.score, 100)}%` }}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard data-dashboard-card>
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">Monthly Surplus</p>
          <MoneyCounter value={monthlySavings} className="display-font mt-3 block text-4xl font-black text-white" />
          <div className="mt-3 flex gap-4 text-[10px] uppercase tracking-widest font-bold">
            <span className="text-slate-500">Rate: <span className="text-cyan-400">{data.analysis.savingsRate}%</span></span>
            <span className="text-slate-500">Runway: <span className="text-emerald-400">{data.analysis.emergencyMonths}M</span></span>
          </div>
        </GlassCard>

        <GlassCard data-dashboard-card>
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">Invested Assets</p>
          <MoneyCounter value={data.financialData.investments} className="display-font mt-3 block text-4xl font-black text-white" />
          <p className="mt-3 text-[10px] uppercase tracking-widest font-bold text-slate-500">
             Target APR: <span className="text-blue-400">11.2% p.a.</span>
          </p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Income", val: monthlyIncome, color: "text-blue-200", sub: "Gross salary / 12" },
          { label: "Expenses", val: monthlyExpense, color: "text-rose-300", sub: `${((monthlyExpense/monthlyIncome)*100).toFixed(0)}% of income` },
          { label: "Savings", val: monthlySavings, color: "text-emerald-300", sub: `${((monthlySavings/monthlyIncome)*100).toFixed(0)}% of income` }
        ].map(kpi => (
          <GlassCard key={kpi.label} data-dashboard-card>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{kpi.label}</p>
            <MoneyCounter value={kpi.val} className={`display-font mt-2 block text-2xl font-black ${kpi.color}`} />
            <p className="mt-1 text-[10px] text-slate-500 uppercase tracking-tighter">{kpi.sub}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
});
KPISection.displayName = "KPISection";

const InsightsSection = React.memo(({ insights, recommendations }: { insights: string[], recommendations: string[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <GlassCard data-dashboard-card className="bg-cyan-500/5 border-cyan-500/10">
      <h2 className="display-font text-sm font-black text-cyan-200 uppercase tracking-widest mb-4 flex items-center gap-2">
         <span className="text-xl">💡</span> AI Intelligence Insights
      </h2>
      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-slate-950/40 border border-white/5 text-xs text-slate-300 leading-relaxed group hover:border-cyan-500/20 transition-all">
            {insight}
          </div>
        ))}
      </div>
    </GlassCard>

    <GlassCard data-dashboard-card className="bg-emerald-500/5 border-emerald-500/10">
      <h2 className="display-font text-sm font-black text-emerald-200 uppercase tracking-widest mb-4 flex items-center gap-2">
         <span className="text-xl">🎯</span> 90-Day Priority Actions
      </h2>
      <div className="space-y-3">
        {recommendations.map((item, idx) => (
          <li key={idx} className="list-none group flex gap-3 rounded-xl border border-white/5 bg-slate-950/40 p-3 items-center group hover:border-emerald-500/20 transition-all">
            <span className="text-emerald-400 text-xs font-bold">✓</span>
            <span className="text-xs text-slate-300">{item}</span>
          </li>
        ))}
      </div>
    </GlassCard>
  </div>
));
InsightsSection.displayName = "InsightsSection";

const ImpactSection = React.memo(({ impact }: any) => (
  <GlassCard data-dashboard-card className="mt-6 border-blue-500/20 bg-blue-500/5">
    <h2 className="display-font text-sm font-black text-purple-200 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
      <span className="text-xl">🚀</span> Wealth Impact Projection
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {[
        { 
          label: "Tax Optimization", 
          val: `₹${impact.taxSaved.toLocaleString("en-IN")}`, 
          color: "text-emerald-400", 
          border: "border-emerald-500/20",
          sub: "Optimized vs Standard" 
        },
        { 
          label: "Wealth Gain", 
          val: `₹${impact.wealthIncreaseProjection.toLocaleString("en-IN")}`, 
          color: "text-cyan-400", 
          border: "border-cyan-500/20",
          sub: "Alpha Projection" 
        },
        { 
          label: "Efficiency Boost", 
          val: `+${impact.savingsImprovementPct}%`, 
          color: "text-purple-400", 
          border: "border-purple-500/20",
          sub: "Systemic Improvement" 
        }
      ].map(box => (
        <div key={box.label} className={`relative p-5 rounded-2xl bg-slate-950/60 border ${box.border} group hover:scale-[1.02] transition-transform cursor-default`}>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{box.label}</p>
          <p className={`text-3xl font-black mt-2 ${box.color}`}>{box.val}</p>
          <div className="mt-3 pt-3 border-t border-white/5 text-[9px] uppercase tracking-tighter text-slate-500">
             {box.sub}
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
));
ImpactSection.displayName = "ImpactSection";

const DashboardPage = React.memo(function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [baseProfile, setBaseProfile] = useState<DashboardData | null>(null);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let active = true;
    const bootstrap = async () => {
      try {
        const userRaw = localStorage.getItem("user");
        const userData = userRaw ? JSON.parse(userRaw) : null;
        const displayName = userData?.name || "Investor";

        const profileRaw = localStorage.getItem("userProfile");
        const userProfile = profileRaw ? JSON.parse(profileRaw) : null;
        let demoData = null;

        if (userProfile) {
          demoData = {
            user: {
              name: displayName,
              salary: Number(userProfile.income) * 12,
              expenses: Math.round(Number(userProfile.income) * 0.6),
              age: Number(userProfile.age),
            },
            financialData: { investments: Math.round(Number(userProfile.income) * 8) },
            analysis: { score: 70, savingsRate: 0, emergencyMonths: 0, insights: [], recommendations: [] },
          };
        } else {
          demoData = await loadDemo();
        }
        
        if (!active) return;
        if (!demoData) throw new Error("Load failed");
        
        if (displayName && displayName !== "Investor") demoData.user.name = displayName;
        setBaseProfile(demoData as DashboardData);
        runOrchestration(demoData as DashboardData);
      } catch (err) {
        if (active) setError("System initialisation failure.");
      }
    };
    bootstrap();
    return () => { active = false; };
  }, []);

  const runOrchestration = async (profileData: DashboardData, eventModifier?: string | null) => {
    try {
      let modSalary = profileData.user.salary;
      let modExpenses = profileData.user.expenses;

      if (eventModifier === "promotion") modSalary *= 1.3;
      if (eventModifier === "marriage") modExpenses *= 1.25;
      if (eventModifier === "child") modExpenses *= 1.4;
      if (eventModifier === "jobloss") modSalary = 0;

      const results = await orchestrateFinance({
        name: profileData.user.name,
        age: profileData.user.age,
        salary: modSalary,
        expenses: modExpenses,
        investments: profileData.financialData.investments,
        monthlySavings: Math.max(modSalary / 12 - modExpenses, 0),
      });

      setData({ 
        ...profileData, 
        user: { ...profileData.user, salary: modSalary, expenses: modExpenses },
        analysis: results.analysis as DashboardData["analysis"], 
        roadmap: results.roadmap as DashboardData["roadmap"], 
        impact: results.impact 
      });
    } catch (err) {
      console.error("Orchestration error", err);
    }
  };

  useGsapContext(dashboardRef, () => {
    if (!data || !dashboardRef.current) return;
    const cards = Array.from(dashboardRef.current.querySelectorAll("[data-dashboard-card]"));
    gsap.fromTo(
      cards,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.5, ease: "power2.out", lazy: true, overwrite: "auto" }
    );
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }, [data]);

  const stats = useMemo(() => {
    if (!data) return { income: 0, expense: 0, savings: 0 };
    const income = data.user.salary / 12;
    const expense = data.user.expenses;
    const savings = Math.max(income - expense, 0);
    return { income, expense, savings };
  }, [data]);

  return (
    <PageShell title="Money Command Center" subtitle="Track your financial health and get AI-powered recommendations.">
      {error && <p className="mb-5 text-xs text-rose-300 font-bold">⚠️ {error}</p>}
      
      {showDemo && <GuidedDemo onComplete={() => setShowDemo(false)} />}

      <div className="mb-8 flex justify-end">
         <button 
           onClick={() => setShowDemo(true)}
           className="relative flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 transition hover:bg-blue-500/20 active:scale-95"
         >
           <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
           Guided Intelligence Tour
         </button>
      </div>
      
      {data && <DashboardHero userName={data.user.name} />}

      {!data && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, i) => (
            <GlassCard key={i}><Skeleton className="h-4 w-32" /><Skeleton className="mt-4 h-12 w-24" /><Skeleton className="mt-3 h-4 w-40" /></GlassCard>
          ))}
        </div>
      )}

      {data && (
        <div ref={dashboardRef} className="space-y-6">
          <LifeEventSimulator onSimulate={(ev: any) => { setActiveEvent(ev); runOrchestration(baseProfile!, ev); }} activeEvent={activeEvent as any} />
          
          <KPISection data={data} monthlyIncome={stats.income} monthlyExpense={stats.expense} monthlySavings={stats.savings} />
          
          <div data-dashboard-card>
            <h2 className="display-font text-[10px] font-black text-amber-100 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
               <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" /> Intelligence Alerts
            </h2>
            <SmartAlerts externalAlerts={data.alerts} />
          </div>

          <InsightsSection insights={data.analysis.insights} recommendations={data.analysis.recommendations} />

          {data.roadmap && (
             <div data-dashboard-card>
               <h2 className="display-font text-[10px] font-black text-blue-100 uppercase tracking-[0.3em] mb-6">Autonomous Roadmap</h2>
               <RoadmapTimeline roadmap={data.roadmap} />
             </div>
          )}

          {data.impact && <ImpactSection impact={data.impact} />}
        </div>
      )}
    </PageShell>
  );
});

export default DashboardPage;
