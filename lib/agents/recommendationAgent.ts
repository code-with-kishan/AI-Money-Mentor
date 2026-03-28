import { AnalyzeOutput } from "@/lib/types";
import { runStructuredAgent } from "@/lib/agents/base";
import { z } from "zod";

const recommendationSchema = z.object({
  priorityActions: z.array(z.string()).min(3).max(6),
});

export async function recommendationAgent(analysis: AnalyzeOutput) {
  const fallback = {
    priorityActions: [
      "Set automated SIP to at least 25% of monthly take-home.",
      "Create an emergency reserve equal to 6 months of expenses.",
      "Review insurance coverage and nominee data this month.",
    ],
  };

  const prompt = `You are a recommendation agent for personal finance.
Given analysis JSON ${JSON.stringify(analysis)}
Return top practical next actions for the next 90 days.`;

  return runStructuredAgent(recommendationSchema, prompt, fallback);
}
