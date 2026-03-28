

import { isAiEnabled, chatWithOpenRouter } from "@/lib/agents/base";
import { getOfflineBotResponse } from "@/lib/offlineBotKnowledge";
import { ChatMessage } from "@/lib/types";


export async function runChatRoute(messages: ChatMessage[]) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const lastUserMessage = lastUser?.content || "";
  // Try to extract user name from previous messages if present
  const userName = messages.find((m) => m.role === "user" && m.content.toLowerCase().includes("my name is "))?.content.split("my name is ")[1]?.split(" ")[0]?.trim();

  if (!isAiEnabled()) {
    return {
      response: getOfflineBotResponse(lastUserMessage, userName),
    };
  }

  const prompt = `You are AI Money Mentor for Indian users. Keep responses concise, practical, and compliant.\nUser message: ${lastUserMessage}`;

  try {
    const response = await chatWithOpenRouter(prompt);
    return { response };
  } catch (err) {
    console.error("[OpenRouter Chat Error]:", err);
    return {
      response: getOfflineBotResponse(lastUserMessage, userName),
    };
  }
}


