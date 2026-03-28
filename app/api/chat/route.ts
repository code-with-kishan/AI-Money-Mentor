import { connectToDatabase } from "@/lib/mongodb";
import { ChatHistory } from "@/models/ChatHistory";
import { runChatRoute } from "@/routes/chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await runChatRoute(body.messages ?? []);

    try {
      await connectToDatabase();
      await ChatHistory.create({
        messages: [...(body.messages ?? []), { role: "assistant", content: result.response }],
      });
    } catch (dbError) {
      console.warn("/api/chat persistence skipped:", dbError);
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("/api/chat failed:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
