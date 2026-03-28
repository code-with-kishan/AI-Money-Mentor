import { AnalyzeInput } from "@/lib/types";
import { runStructuredAgent } from "@/lib/agents/base";
import { z } from "zod";

const analysisSchema = z.object({
  insights: z.array(z.string()).min(3).max(5),
  recommendations: z.array(z.string()).min(3).max(6),
  riskFlags: z.array(z.string()).min(1).max(5),
});

export async function analysisAgent(payload: AnalyzeInput) {
  const savingsRate = payload.salary > 0 ? (payload.monthlySavings / (payload.salary / 12)) * 100 : 0;

  const fallback = {
    insights: [
      `Savings rate is ${savingsRate.toFixed(1)}% based on salary vs monthly surplus.`,
      `Expense to income ratio is ${((payload.expenses * 12) / payload.salary * 100).toFixed(1)}%.`,
      `Current investment corpus is INR ${payload.investments.toLocaleString("en-IN")}.`,
    ],
    recommendations: [
      "Automate SIP on salary day to avoid cashflow leakage.",
      "Maintain 6 months emergency fund in liquid/debt mix.",
      "Use term + health insurance before increasing equity allocation.",
    ],
    riskFlags: [
      payload.expenses > payload.salary / 12 * 0.8 ? "High monthly burn rate" : "Moderate spend profile"],
  };

  const prompt = `You are an India-focused financial analysis agent.
Input JSON: ${JSON.stringify(payload)}
Return practical, concise insights and recommendations in India context.`;

  return runStructuredAgent(analysisSchema, prompt, fallback);
}
