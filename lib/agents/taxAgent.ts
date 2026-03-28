import { TaxInput, TaxOutput } from "@/lib/types";
import { runStructuredAgent } from "@/lib/agents/base";
import { z } from "zod";

const taxSchema = z.object({
  summary: z.string(),
  actions: z.array(z.string()).min(2).max(5),
  whyThisDecision: z.string(),
});

export async function taxAgent(input: TaxInput, output: TaxOutput) {
  const fallback = {
    summary: `The ${output.betterRegime.toUpperCase()} regime appears better with estimated savings of INR ${output.taxSaving.toLocaleString("en-IN")}.`,
    actions: [
      "Review 80C and NPS contributions before final filing.",
      "Use old regime only if deductions are consistently high.",
      "Re-evaluate tax choice every financial year.",
    ],
    whyThisDecision: `Choosing the ${output.betterRegime} regime mechanically results in a lower final tax outgo of INR ${output.taxSaving.toLocaleString("en-IN")}.`
  };

  const prompt = `You are an Indian tax planning agent.
Input: ${JSON.stringify(input)}
Computed result: ${JSON.stringify(output)}
Give one summary and practical actions.`;

  return runStructuredAgent(taxSchema, prompt, fallback);
}
