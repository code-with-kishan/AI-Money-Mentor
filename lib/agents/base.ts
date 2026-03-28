
import { z } from "zod";
const apiKey = process.env.OPENROUTER_API_KEY;
const model = process.env.OPENROUTER_MODEL || "openrouter-model-name";

export function isAiEnabled() {
  return Boolean(apiKey);
}


/**
 * Call OpenRouter API directly.
 */
async function callOpenRouter(prompt: string): Promise<string> {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 2048,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenRouter API ${res.status}: ${errBody}`);
  }

  const data = await res.json();
  // OpenRouter returns choices[0].message.content
  return data.choices?.[0]?.message?.content || "";
}

/**
 * Call Gemini and parse structured JSON output.
 * Falls back to the provided default if AI is disabled or fails.
 */
export async function runStructuredAgent<T extends z.ZodTypeAny>(
  schema: T,
  prompt: string,
  fallback: z.infer<T>,
): Promise<z.infer<T>> {
  if (!isAiEnabled()) return fallback;

  try {
    const jsonPrompt = prompt + "\n\nRespond ONLY with valid JSON, no markdown fences or extra text.";
    const raw = await callOpenRouter(jsonPrompt);

    // Strip any markdown code fences the model might add
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(cleaned);
    return schema.parse(parsed) as z.infer<T>;
  } catch (error) {
    console.error("AI agent failed, returning fallback:", error);
    return fallback;
  }
}

/**
 * Simple text chat with OpenRouter — returns raw text response.
 */
export async function chatWithOpenRouter(prompt: string): Promise<string> {
  return callOpenRouter(prompt);
}
