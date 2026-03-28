import { AnalyzeInput } from "@/lib/types";
import { runStructuredAgent } from "@/lib/agents/base";
import { z } from "zod";

const dataSchema = z.object({
  sanitizedName: z.string(),
  ageGroup: z.string(),
  monthlyIncome: z.number(),
  monthlyExpenses: z.number(),
  monthlySavings: z.number(),
  totalInvestments: z.number(),
  financialHealthStatus: z.enum(["critical", "poor", "fair", "good", "excellent"]),
  dataQuality: z.string()
});

export type DataAgentOutput = z.infer<typeof dataSchema>;

export async function dataAgent(rawPayload: Partial<AnalyzeInput>): Promise<DataAgentOutput> {
  const fallback: DataAgentOutput = {
    sanitizedName: rawPayload.name || "User",
    ageGroup: (rawPayload.age || 30) < 25 ? "young_adult" : (rawPayload.age || 30) < 40 ? "adult" : "senior",
    monthlyIncome: (rawPayload.salary || 0) / 12,
    monthlyExpenses: rawPayload.expenses || 0,
    monthlySavings: rawPayload.monthlySavings || 0,
    totalInvestments: rawPayload.investments || 0,
    financialHealthStatus: "fair",
    dataQuality: "Fallback data generated."
  };

  const payloadString = JSON.stringify(rawPayload);
  
  const prompt = `You are a strict data processing agent.
Your job is to structure raw user financial data into sanitized metrics.
Input Payload: ${payloadString}
Output ONLY the structured JSON data as requested by the schema.`;

  return runStructuredAgent(dataSchema, prompt, fallback);
}
