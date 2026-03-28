import { portfolioAgent } from "@/lib/agents/portfolioAgent";
import { PortfolioInput, PortfolioOutput } from "@/lib/types";

export async function runPortfolioRoute(input: PortfolioInput) {
  const totalValue = input.holdings.reduce((sum, h) => sum + h.amount, 0);
  const categorySplit = input.holdings.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const equityShare = totalValue > 0 ? ((categorySplit.Equity || 0) / totalValue) * 100 : 0;
  const riskLevel = equityShare > 75 ? "high" : equityShare > 45 ? "moderate" : "low";

  const base: PortfolioOutput = {
    totalValue,
    categorySplit,
    riskLevel,
    notes: [],
  };

  const ai = await portfolioAgent(input, base);

  return {
    ...base,
    ...ai,
  };
}
