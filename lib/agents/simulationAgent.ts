import { SimulateInput, SimulateOutput } from "@/lib/types";
import { runStructuredAgent } from "@/lib/agents/base";
import { z } from "zod";

const simulationSchema = z.object({
  narrative: z.string(),
  milestones: z.array(z.string()).min(2).max(5),
});

export async function simulationAgent(input: SimulateInput, output: SimulateOutput) {
  const fallback = {
    narrative: `Projected corpus may reach INR ${output.finalCorpus.toLocaleString("en-IN")} in ${input.years} years at ${input.annualReturnRate}% expected annual return.`,
    milestones: [
      "Increase monthly contribution by 10% annually to accelerate corpus growth.",
      "Review equity-debt allocation every 12 months.",
      "Use goal-based buckets for education, house, and retirement.",
    ],
  };

  const prompt = `You are a wealth simulation coach.
Input: ${JSON.stringify(input)}
Projection: ${JSON.stringify(output)}
Create a concise narrative and milestone bullets.`;

  return runStructuredAgent(simulationSchema, prompt, fallback);
}
