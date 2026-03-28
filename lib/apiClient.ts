import { ChatMessage, SipOutput, TaxOutput } from "@/lib/types";

export type TaxApiOutput = TaxOutput & {
  summary: string;
  actions: string[];
  whyThisDecision: string;
};

export type SimulateApiOutput = {
  finalCorpus: number;
  projections: Array<{ year: number; value: number }>;
  narrative: string;
  milestones: string[];
};

export type PortfolioApiOutput = {
  totalValue: number;
  categorySplit: Record<string, number>;
  riskLevel: "low" | "moderate" | "high";
  notes: string[];
  xirr: number;
  overlapPct: number;
  expenseRatioImpact: number;
  benchmarkComparison: string;
  taxAwareRebalancing: string[];
  benchmarkSeries: { name: string; portfolio: number; benchmark: number }[];
};

export type OrchestratorOutput = {
  data: Record<string, unknown>; 
  analysis: Record<string, unknown>;
  roadmap: Record<string, unknown>[];
  impact: {
    savingsImprovementPct: number;
    taxSaved: number;
    wealthIncreaseProjection: number;
  };
};

/**
 * Lightweight request deduplication Map.
 * Prevents multiple identical in-flight requests.
 */
const inFlightRequests = new Map<string, Promise<any>>();

async function postJSON<T>(url: string, payload: unknown): Promise<T> {
  const requestKey = `${url}:${JSON.stringify(payload)}`;
  
  if (inFlightRequests.has(requestKey)) {
    return inFlightRequests.get(requestKey) as Promise<T>;
  }

  const requestPromise = (async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return await response.json();
    } finally {
      // Small delay before clearing to ensure micro-tasks finish
      setTimeout(() => inFlightRequests.delete(requestKey), 100);
    }
  })();

  inFlightRequests.set(requestKey, requestPromise);
  return requestPromise as Promise<T>;
}

export function analyzeFinance(payload: unknown) {
  return postJSON<{
    score: number;
    savingsRate: number;
    emergencyMonths: number;
    insights: string[];
    recommendations: string[];
  }>("/api/analyze", payload);
}

export function orchestrateFinance(payload: unknown) {
  return postJSON<OrchestratorOutput>("/api/orchestrate", payload);
}

export function sendChat(messages: ChatMessage[]) {
  return postJSON<{ response: string }>("/api/chat", { messages });
}

export function calculateSip(payload: unknown) {
  return postJSON<SipOutput>("/api/sip", payload);
}

export function calculateTax(payload: unknown) {
  return postJSON<TaxApiOutput>("/api/tax", payload);
}

export function simulateFuture(payload: unknown) {
  return postJSON<SimulateApiOutput>("/api/simulate", payload);
}

export function analyzePortfolio(payload: unknown) {
  return postJSON<PortfolioApiOutput>("/api/portfolio", payload);
}

export async function loadDemo() {
  const response = await fetch("/api/demo");
  if (!response.ok) {
    throw new Error("Failed to load demo profile");
  }
  return response.json();
}
