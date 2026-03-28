import { simulationAgent } from "@/lib/agents/simulationAgent";
import { SimulateInput } from "@/lib/types";
import { buildSimulation } from "@/utils/finance";

export async function runSimulateRoute(input: SimulateInput) {
  const simulation = buildSimulation(input);
  const advisory = await simulationAgent(input, simulation);

  return {
    ...simulation,
    narrative: advisory.narrative,
    milestones: advisory.milestones,
  };
}
