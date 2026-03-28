import { runStructuredAgent } from "@/lib/agents/base";
import { z } from "zod";
import { DecisionAgentOutput } from "./decisionAgent";

const explanationSchema = z.object({
  explanations: z.array(z.object({
    month: z.number().int(),
    whyThisDecision: z.string()
  }))
});

export type ExplanationAgentOutput = z.infer<typeof explanationSchema>;

export async function explanationAgent(roadmap: DecisionAgentOutput): Promise<ExplanationAgentOutput> {
  const fallback: ExplanationAgentOutput = {
    explanations: roadmap.roadmap.map(r => ({
      month: r.month,
      whyThisDecision: "This is a standard best practice to build a solid financial foundation and manage risk."
    }))
  };

  const prompt = `You are a Transparency and Explainability Agent for an AI Financial Advisor.
Your job is to look at the financial roadmap and explain "Why this decision?" for EVERY step, so the user trusts the AI.
Keep explanations under two sentences, very clear and convincing.

Roadmap decisions:
${JSON.stringify(roadmap, null, 2)}

Only output the requested JSON format.`;

  return runStructuredAgent(explanationSchema, prompt, fallback);
}
