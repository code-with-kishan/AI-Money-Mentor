"use client";

import { GlassCard } from "@/components/GlassCard";
import { PageShell } from "@/components/PageShell";
import { LoaderDots, SectionSkeleton } from "@/components/Skeleton";
import { calculateTax, TaxApiOutput } from "@/lib/apiClient";
import { FormEvent, useState } from "react";

export default function TaxOptimizerPage() {
  const [form, setForm] = useState({ annualSalary: 1800000, deductions: 220000 });
  const [result, setResult] = useState<TaxApiOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await calculateTax(form);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="Tax Optimizer" subtitle="Compare old vs new tax regime with actionable AI suggestions.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <GlassCard>
          <form onSubmit={submit} className="space-y-3">
            <label className="block text-sm">Annual Salary (INR)
              <input
                type="number"
                value={form.annualSalary}
                onChange={(e) => setForm({ ...form, annualSalary: Number(e.target.value) })}
                className="premium-input mt-1"
              />
            </label>
            <label className="block text-sm">Total Deductions (INR)
              <input
                type="number"
                value={form.deductions}
                onChange={(e) => setForm({ ...form, deductions: Number(e.target.value) })}
                className="premium-input mt-1"
              />
            </label>
            <button type="submit" disabled={loading} className="premium-button px-4 py-2">
              {loading ? "Optimizing..." : "Optimize Tax"}
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          {!result && !loading && <p className="text-sm text-slate-300/85">Run optimization to compare tax regimes.</p>}
          {loading && (
            <div className="space-y-3">
              <SectionSkeleton titleWidth="w-48" lines={4} />
              <LoaderDots label="Crunching tax slabs" />
            </div>
          )}
          {result && (
            <div className="space-y-4 text-sm mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <h3 className="font-bold text-cyan-300 mb-2">Old Regime</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span className="text-slate-400">Gross:</span> <span>₹{result.breakdown?.oldRegime.grossIncome.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Deductions:</span> <span className="text-emerald-300">-₹{result.breakdown?.oldRegime.totalDeductions.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between border-t border-slate-700 pt-1"><span className="text-slate-300">Taxable:</span> <span>₹{result.breakdown?.oldRegime.taxableIncome.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between border-b border-slate-700 pb-1"><span className="text-slate-400">Tax + Cess:</span> <span>₹{result.breakdown?.oldRegime.taxBeforeCess.toLocaleString("en-IN")} + ₹{result.breakdown?.oldRegime.cess.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between font-bold pt-1"><span className="text-slate-200">Final Tax:</span> <span className="text-rose-300">₹{result.breakdown?.oldRegime.finalTax.toLocaleString("en-IN")}</span></div>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <h3 className="font-bold text-cyan-300 mb-2">New Regime</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span className="text-slate-400">Gross:</span> <span>₹{result.breakdown?.newRegime.grossIncome.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Deductions:</span> <span className="text-emerald-300">-₹{result.breakdown?.newRegime.totalDeductions.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between border-t border-slate-700 pt-1"><span className="text-slate-300">Taxable:</span> <span>₹{result.breakdown?.newRegime.taxableIncome.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between border-b border-slate-700 pb-1"><span className="text-slate-400">Tax + Cess:</span> <span>₹{result.breakdown?.newRegime.taxBeforeCess.toLocaleString("en-IN")} + ₹{result.breakdown?.newRegime.cess.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between font-bold pt-1"><span className="text-slate-200">Final Tax:</span> <span className="text-rose-300">₹{result.breakdown?.newRegime.finalTax.toLocaleString("en-IN")}</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/30">
                <p>Better Regime: <strong className="text-emerald-400 uppercase tracking-widest">{result.betterRegime}</strong></p>
                <p>Estimated Saving: <strong className="text-emerald-400">₹{result.taxSaving.toLocaleString("en-IN")}</strong></p>
                
                <div className="mt-3 rounded border border-indigo-500/20 bg-indigo-500/10 p-3 text-indigo-200 border-l-4 border-l-indigo-500">
                  <span className="font-semibold block mb-1">🤖 Why this decision?</span>
                  {result.whyThisDecision}
                </div>
              </div>

              <p className="pt-2 text-slate-200/90">{result.summary}</p>
              <ul className="list-disc pl-5 text-slate-300/85">
                {result.actions.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </GlassCard>
      </div>
    </PageShell>
  );
}
