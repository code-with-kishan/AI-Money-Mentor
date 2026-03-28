import { runTaxRoute } from "@/routes/tax";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await runTaxRoute(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("/api/tax failed", error);
    return NextResponse.json({ error: "Failed to calculate tax." }, { status: 500 });
  }
}
