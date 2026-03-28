import { runStructuredAgent } from "@/lib/agents/base";
import { z } from "zod";

const decisionSchema = z.object({
  roadmap: z.array(z.object({
    month: z.number().int().min(1).max(12),
    action: z.string(),
    category: z.enum(["SIP", "Asset Allocation", "Insurance", "Emergency Fund", "Debt", "Other"]),
    estimatedAmount: z.number()
  }))
});

export type DecisionAgentOutput = z.infer<typeof decisionSchema>;

export async function decisionAgent(analysisContext: string): Promise<DecisionAgentOutput> {
  const fallback: DecisionAgentOutput = {
    roadmap: [
      {
        month: 1,
        action: "Establish emergency fund base",
        category: "Emergency Fund",
        estimatedAmount: 50000
      },
      {
        month: 2,
        action: "Purchase term and health insurance",
        category: "Insurance",
        estimatedAmount: 15000
      },
      {
        month: 3,
        action: "Start SIP in Index Fund",
        category: "SIP",
        estimatedAmount: 10000
      }
    ]
  };

  const prompt = `You are an elite Financial Decision Agent.
Based on the following analysis context about a user, generate a practical 3-month to 12-month dynamic financial roadmap.
Always include steps for SIP, Asset Allocation, Insurance, and Emergency Fund.
Make it actionable.

Context:
${analysisContext}

Only output the requested JSON format.`;

  return runStructuredAgent(decisionSchema, prompt, fallback);
}
