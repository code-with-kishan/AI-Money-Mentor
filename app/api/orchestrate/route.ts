import { NextRequest, NextResponse } from "next/server";
import { runOrchestrator } from "@/lib/agents/orchestrator";
import { AnalyzeInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeInput = await req.json();
    
    // Orchestrate agents
    const orchestratorResult = await runOrchestrator(body);

    return NextResponse.json(orchestratorResult);
  } catch (error) {
    console.error("/api/orchestrate failed", error);
    return NextResponse.json({ error: "Failed to run agent orchestration." }, { status: 500 });
  }
}
