import { analysisAgent } from "@/lib/agents/analysisAgent";
import { recommendationAgent } from "@/lib/agents/recommendationAgent";
import { AnalyzeInput, AnalyzeOutput } from "@/lib/types";
import { calculateSavingsRate } from "@/utils/finance";

export async function runAnalyzeRoute(payload: AnalyzeInput): Promise<AnalyzeOutput> {
  const savingsRate = calculateSavingsRate(payload.monthlySavings, payload.salary);
  const emergencyMonths = payload.expenses > 0 ? Number((payload.investments / payload.expenses).toFixed(1)) : 0;

  // Score combines savings behavior, emergency readiness, and fixed expense pressure.
  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        40 +
          savingsRate * 1.2 +
          Math.min(emergencyMonths * 3, 25) -
          Math.max(((payload.expenses * 12) / payload.salary) * 18 - 8, 0),
      ),
    ),
  );

  const ai = await analysisAgent(payload);

  const output: AnalyzeOutput = {
    score,
    savingsRate,
    emergencyMonths,
    insights: ai.insights,
    recommendations: ai.recommendations,
  };

  const recommendationPack = await recommendationAgent(output);

  return {
    ...output,
    recommendations: recommendationPack.priorityActions,
  };
}
