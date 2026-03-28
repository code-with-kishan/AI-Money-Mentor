import { SipInput } from "@/lib/types";
import { calculateSip } from "@/utils/finance";

export function runSipRoute(input: SipInput) {
  return calculateSip(input);
}
