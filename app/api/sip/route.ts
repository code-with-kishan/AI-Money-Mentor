import { runSipRoute } from "@/routes/sip";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = runSipRoute(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("/api/sip failed", error);
    return NextResponse.json({ error: "Failed to calculate SIP." }, { status: 500 });
  }
}
