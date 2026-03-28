import { taxAgent } from "@/lib/agents/taxAgent";
import { TaxInput } from "@/lib/types";
import { calculateTaxIndia } from "@/utils/finance";

export async function runTaxRoute(input: TaxInput) {
  const tax = calculateTaxIndia(input);
  const advisory = await taxAgent(input, tax);

  return {
    ...tax,
    summary: advisory.summary,
    actions: advisory.actions,
  };
}
