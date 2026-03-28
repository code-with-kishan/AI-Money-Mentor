import { runPortfolioRoute } from "@/routes/portfolio";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await runPortfolioRoute(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("/api/portfolio failed", error);
    return NextResponse.json({ error: "Failed to analyze portfolio." }, { status: 500 });
  }
}
