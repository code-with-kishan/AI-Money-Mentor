import { runSimulateRoute } from "@/routes/simulate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await runSimulateRoute(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("/api/simulate failed", error);
    return NextResponse.json({ error: "Failed to run simulation." }, { status: 500 });
  }
}
