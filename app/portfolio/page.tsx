"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { GlassCard } from "@/components/GlassCard";
import { PageShell } from "@/components/PageShell";
import { LoaderDots, SectionSkeleton, Skeleton } from "@/components/Skeleton";
import { analyzePortfolio, PortfolioApiOutput } from "@/lib/apiClient";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "@/components/hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamic Imports for Charts
const BasePieChart = dynamic(() => import("@/components/charts/BasePieChart").then(mod => mod.BasePieChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[280px] w-full rounded-xl" />,
});

const BaseBarChart = dynamic(() => import("@/components/charts/BaseBarChart").then(mod => mod.BaseBarChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full rounded-xl" />,
});

const CATEGORY_COLORS: Record<string, string> = {
  Equity: "#5a8cff",
  Debt: "#4bd5ff",
  Gold: "#fbbf24",
  "Crypto": "#f472b6",
  "Real Estate": "#34d399",
  "Forex": "#a78bfa",
};

function getInitialPortfolioJson() {
  const profileRaw = typeof window !== "undefined" ? localStorage.getItem("userProfile") : null;
  if (profileRaw) {
    const profile = JSON.parse(profileRaw);
    const income = Number(profile.income) || 60000;
    return JSON.stringify({
      holdings: [
        { asset: "Nifty 50 ETF", amount: Math.round(income * 2.5), category: "Equity" },
        { asset: "PPF", amount: Math.round(income * 1.2), category: "Debt" },
        { asset: "Gold ETF", amount: Math.round(income * 0.8), category: "Gold" },
      ],
    }, null, 2);
  }
  return `{
    "holdings": [
      { "asset": "Nifty 50 ETF", "amount": 220000, "category": "Equity" },
      { "asset": "PPF", "amount": 120000, "category": "Debt" },
      { "asset": "Gold ETF", "amount": 80000, "category": "Gold" }
    ]
  }`;
}

const PortfolioPage = React.memo(function PortfolioPage() {
  const [jsonText, setJsonText] = useState(getInitialPortfolioJson());
  const [result, setResult] = useState<PortfolioApiOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const riskMeterRef = useRef<HTMLDivElement | null>(null);
  const chartsRef = useRef<HTMLDivElement | null>(null);

  const runAnalysis = async () => {
    try {
      setError(null);
      setLoading(true);
      const payload = JSON.parse(jsonText);
      const data = await analyzePortfolio(payload);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Invalid JSON or API error.");
    } finally {
      setLoading(false);
    }
  };

  useGsapContext(chartsRef, () => {
    if (!result || !chartsRef.current) return;
    const cards = Array.from(chartsRef.current.querySelectorAll('[data-chart-card]'));
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", lazy: true, overwrite: "auto" }
    );
  }, [result]);

  const chartData = React.useMemo(() => result
    ? Object.entries(result.categorySplit).map(([name, value]) => ({
        name,
        value: value as number,
      }))
    : [], [result]);

  const getRiskColor = (level: string) => {
    if (level === "low") return "#34d399";
    if (level === "moderate") return "#fbbf24";
    return "#f87171";
  };

  const getRiskPercentage = (level: string) => {
    if (level === "low") return 35;
    if (level === "moderate") return 60;
    return 85;
  };

  return (
    <PageShell title="Portfolio Analyzer" subtitle="Upload or paste portfolio JSON and get real-time allocation insights with AI recommendations.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <GlassCard>
          <p className="mb-3 text-xs uppercase tracking-widest text-slate-400">Portfolio Input</p>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="premium-input h-72 text-xs"
            placeholder='{ "holdings": [{ "asset": "...", "amount": 0, "category": "..." }] }'
          />
          <button onClick={runAnalysis} disabled={loading} className="premium-button mt-3 w-full px-4 py-2">
            {loading ? "Analyzing..." : "Analyze Portfolio"}
          </button>
          {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
        </GlassCard>

        <div ref={chartsRef} className="space-y-4">
          {!result && !loading && (
            <GlassCard>
              <p className="text-sm text-slate-300/85">
                📊 Enter your portfolio JSON above to see allocation breakdown, risk assessment, and AI recommendations.
              </p>
            </GlassCard>
          )}

          {loading && (
            <GlassCard>
              <SectionSkeleton titleWidth="w-40" lines={4} />
              <LoaderDots label="Analyzing your portfolio" />
            </GlassCard>
          )}

          {result && (
            <>
              {/* Pie Chart */}
              <GlassCard data-chart-card>
                <p className="mb-3 text-xs uppercase tracking-widest text-slate-400">Asset Allocation</p>
                <BasePieChart 
                  data={chartData} 
                  colors={CATEGORY_COLORS} 
                  totalValue={result.totalValue} 
                />
              </GlassCard>

              {/* Risk Meter & Total Value */}
              <GlassCard data-chart-card>
                <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">Risk Assessment</p>
                <p className="mb-4 text-3xl font-bold text-blue-200">
                  ₹{result.totalValue.toLocaleString("en-IN")}
                </p>

                <div className="space-y-2">
                  <div className="items-center justify-between flex">
                    <span className="text-sm text-slate-300">Risk Level</span>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold uppercase"
                      style={{
                        backgroundColor: `${getRiskColor(result.riskLevel)}20`,
                        color: getRiskColor(result.riskLevel),
                      }}
                    >
                      {result.riskLevel}
                    </span>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${getRiskPercentage(result.riskLevel)}%`,
                        backgroundColor: getRiskColor(result.riskLevel),
                      }}
                      ref={riskMeterRef}
                    />
                  </div>
                  <p className="text-xs text-slate-400">Low ← Risk → High</p>
                </div>
              </GlassCard>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Est. XIRR", val: result.xirr + "%", color: "text-emerald-400" },
                  { label: "Portfolio Overlap", val: result.overlapPct + "%", color: "text-rose-400" },
                  { label: "Est. Expense Ratio", val: result.expenseRatioImpact + "%", color: "text-cyan-400" }
                ].map(m => (
                  <div key={m.label} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <p className="text-xs text-slate-400 uppercase tracking-widest">{m.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${m.color}`}>{m.val}</p>
                  </div>
                ))}
              </div>

              {/* Benchmark Comparison Chart */}
              <GlassCard data-chart-card>
                <p className="mb-3 text-xs uppercase tracking-widest text-slate-400">Portfolio vs Benchmark (NIFTY 50)</p>
                <BaseBarChart 
                  data={result.benchmarkSeries} 
                  bars={[
                    { key: "portfolio", name: "Your Portfolio", color: "#60a5fa" },
                    { key: "benchmark", name: "NIFTY 50", color: "#94a3b8" }
                  ]}
                  yAxisFormatter={(v) => `${v}%`}
                />
                <div className="mt-4 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                  <p className="text-sm text-blue-200">
                    <span className="font-bold">AI Insight:</span> {result.benchmarkComparison}
                  </p>
                </div>
              </GlassCard>

              {/* AI Insights Lists */}
              {[
                { title: "⚖️ Tax-Aware Rebalancing Suggestions", items: result.taxAwareRebalancing, color: "text-emerald-400", symbol: "⚡" },
                { title: "💡 General Recommendations", items: result.notes, color: "text-cyan-400", symbol: "→" }
              ].map(section => section.items && section.items.length > 0 && (
                <GlassCard key={section.title} data-chart-card>
                  <p className="mb-3 text-xs uppercase tracking-widest text-slate-400">{section.title}</p>
                  <ul className="space-y-2">
                    {section.items.map((note, index) => (
                      <li key={index} className="flex gap-2 text-sm text-slate-200">
                        <span className={section.color}>{section.symbol}</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
});

export default PortfolioPage;
