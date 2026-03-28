"use client";

import { GlassCard } from "@/components/GlassCard";
import { PageShell } from "@/components/PageShell";
import { LoaderDots, SectionSkeleton } from "@/components/Skeleton";
import { calculateSip } from "@/lib/apiClient";
import { SipOutput } from "@/lib/types";
import { FormEvent, useState } from "react";

export default function GoalPlannerPage() {
  const [form, setForm] = useState({
    monthlyInvestment: 15000,
    annualReturnRate: 12,
    years: 10,
  });
  const [result, setResult] = useState<SipOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await calculateSip(form);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="Goal Planner" subtitle="Input your SIP assumptions and get a real maturity projection.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <GlassCard>
          <form onSubmit={submit} className="space-y-3">
            <label className="block text-sm">Monthly SIP (INR)
              <input
                type="number"
                value={form.monthlyInvestment}
                onChange={(e) => setForm({ ...form, monthlyInvestment: Number(e.target.value) })}
                className="premium-input mt-1"
              />
            </label>
            <label className="block text-sm">Expected Return (% p.a.)
              <input
                type="number"
                value={form.annualReturnRate}
                onChange={(e) => setForm({ ...form, annualReturnRate: Number(e.target.value) })}
                className="premium-input mt-1"
              />
            </label>
            <label className="block text-sm">Duration (years)
              <input
                type="number"
                value={form.years}
                onChange={(e) => setForm({ ...form, years: Number(e.target.value) })}
                className="premium-input mt-1"
              />
            </label>
            <button type="submit" disabled={loading} className="premium-button px-4 py-2">
              {loading ? "Calculating..." : "Calculate SIP"}
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          {!result && !loading && <p className="text-sm text-slate-300/85">Run a calculation to view results.</p>}
          {loading && (
            <div className="space-y-3">
              <SectionSkeleton titleWidth="w-44" lines={3} />
              <LoaderDots label="Computing SIP projection" />
            </div>
          )}
          {result && (
            <div className="space-y-2 text-sm">
              <p>Invested Amount: <strong>INR {result.investedAmount.toLocaleString("en-IN")}</strong></p>
              <p>Estimated Returns: <strong>INR {result.estimatedReturns.toLocaleString("en-IN")}</strong></p>
              <p>Maturity Amount: <strong>INR {result.maturityAmount.toLocaleString("en-IN")}</strong></p>
            </div>
          )}
        </GlassCard>
      </div>
    </PageShell>
  );
}
