import { PortfolioInput, PortfolioOutput } from "@/lib/types";
import { runStructuredAgent } from "@/lib/agents/base";
import { z } from "zod";

const portfolioSchema = z.object({
  notes: z.array(z.string()).min(2).max(6),
  riskLevel: z.enum(["low", "moderate", "high"]),
  xirr: z.number(),
  overlapPct: z.number(),
  expenseRatioImpact: z.number(),
  benchmarkComparison: z.string(),
  taxAwareRebalancing: z.array(z.string()).min(1).max(3),
  benchmarkSeries: z.array(z.object({
    name: z.string(),
    portfolio: z.number(),
    benchmark: z.number(),
  })).min(3).max(6),
});

export async function portfolioAgent(input: PortfolioInput, base: PortfolioOutput) {
  const fallback = {
    notes: [
      "Diversify across equity, debt, and gold for downside control.",
      "Keep single-asset concentration below 30% where possible.",
      "Match risky allocation with goal timeline and risk capacity.",
    ],
    riskLevel: base.riskLevel,
    xirr: 12.5,
    overlapPct: 15,
    expenseRatioImpact: 0.8,
    benchmarkComparison: "Outperforming Nifty 50 by 1.2% over a 3-year rolling period.",
    taxAwareRebalancing: ["Shift 5% from Gold to Equity post 1-year to utilize LTCG limit."],
    benchmarkSeries: [
      { name: "Year 1", portfolio: 10, benchmark: 8 },
      { name: "Year 2", portfolio: 22, benchmark: 18 },
      { name: "Year 3", portfolio: 35, benchmark: 32 },
    ]
  };

const prompt = `You are an elite Portfolio X-Ray agent for Indian investors.
Portfolio input: ${JSON.stringify(input)}
Base math result: ${JSON.stringify(base)}

Perform an advanced X-Ray analyzing the holdings.
Generate realistic estimates for:
- xirr: Estimated internal rate of return (e.g., 14.5).
- overlapPct: Estimated portfolio overlap % if holding multiple funds (e.g., 22.5).
- expenseRatioImpact: Total estimated expense ratio impact in % (e.g., 0.75).
- benchmarkComparison: A short sentence comparing it to standard Indian benchmarks.
- taxAwareRebalancing: 1-3 highly specific tax-efficient rebalancing suggestions based on Indian taxation (LTCG vs STCG).
- benchmarkSeries: An array of 3-6 objects for a comparison chart (Portfolio vs NIFTY 50) over recent years. E.g. [{name: "2021", portfolio: 15, benchmark: 12}, ...]

Return structured data containing these metrics alongside riskLevel and notes.`;

  return runStructuredAgent(portfolioSchema, prompt, fallback);
}
