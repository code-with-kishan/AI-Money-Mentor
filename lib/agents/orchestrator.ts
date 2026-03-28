import { AnalyzeInput } from "@/lib/types";
import { dataAgent } from "./dataAgent";
import { analysisAgent } from "./analysisAgent";
import { decisionAgent } from "./decisionAgent";
import { explanationAgent } from "./explanationAgent";

interface OrchestratorAnalysis {
  savingsRate: number;
  emergencyMonths: number;
  insights: string[];
  recommendations: string[];
}

interface OrchestratorAlert {
  id: string;
  type: "warning" | "info" | "success" | "critical";
  title: string;
  message: string;
  action?: { label: string; href: string };
  icon: string;
}

export async function runOrchestrator(payload: AnalyzeInput) {
  // Agent 1: Data Agent
  const dataResult = await dataAgent(payload);
  
  // Agent 2: Analysis Agent
  const analysisResult = await analysisAgent(payload) as unknown as OrchestratorAnalysis;
  
  // Combine context for decision
  const context = `Data Overview: ${JSON.stringify(dataResult)}\nAnalysis: ${JSON.stringify(analysisResult)}`;
  
  // Agent 3: Decision Agent (Roadmap)
  const decisionResult = await decisionAgent(context);
  
  // Agent 4: Explanation Agent
  const explanationResult = await explanationAgent(decisionResult);
  
  // Step 15: Portfolio-Aware Alerts
  const alerts: OrchestratorAlert[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((analysisResult as any).savingsRate < 20) {
    alerts.push({
      id: "sr-low",
      type: "warning",
      icon: "📉",
      title: "Savings Rate Below Optimal",
      message: `Your savings rate is ${analysisResult.savingsRate}%. We recommend pushing it above 25% for faster goal achievement.`,
      action: { label: "View Roadmap", href: "#roadmap" }
    });
  }
  
  // Simulated Portfolio Alert (Portfolio-aware)
  if (payload.investments > payload.salary * 10) {
     alerts.push({
      id: "port-risk",
      type: "info",
      icon: "⚖️",
      title: "Portfolio Rebalancing Due",
      message: "Your investment corpus has grown significantly. AI suggests a tax-efficient rebalancing to lock in gains.",
      action: { label: "X-Ray Now", href: "/portfolio" }
    });
  }

  // Step 18: Edge Case - Mixed Tax Regime Detection
  const taxRegimeAdvice = payload.salary > 1500000 
    ? "New Regime (Section 115BAC) is highly optimized for your bracket."
    : "Old Regime might be better if you utilize 80C and 80D fully.";
  
  // Interweave explanation into roadmap
  const roadmapWithExplanations = decisionResult.roadmap.map(step => {
    const explosion = explanationResult.explanations.find(e => e.month === step.month);
    return {
      ...step,
      whyThisDecision: explosion?.whyThisDecision || "This aligns with fundamental financial principles."
    };
  });
  
  // Step 10: Impact Model calculations
  const savingsImprovementPct = 15;
  const taxSaved = payload.salary > 1500000 ? 52500 : 12500; // rough impact projection
  const wealthIncreaseProjection = dataResult.totalInvestments * 0.12 * 10; // Simple 10-year projection base

  return {
    data: dataResult,
    analysis: analysisResult,
    roadmap: roadmapWithExplanations,
    alerts,
    taxAdvice: taxRegimeAdvice,
    impact: {
      savingsImprovementPct,
      taxSaved,
      wealthIncreaseProjection: Math.round(wealthIncreaseProjection)
    }
  };
}
