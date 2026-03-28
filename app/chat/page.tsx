"use client";

import { GlassCard } from "@/components/GlassCard";
import { PageShell } from "@/components/PageShell";
import { LoaderDots } from "@/components/Skeleton";
import { sendChat } from "@/lib/apiClient";
import { ChatMessage } from "@/lib/types";
import { FormEvent, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am your AI Money Mentor. Ask me about SIP, tax, savings, or portfolio strategy.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Animate messages on arrival
  useEffect(() => {
    if (!containerRef.current) return;
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      gsap.fromTo(
        lastMessage,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const nextMessages = [...messages, { role: "user" as const, content: input.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const result = await sendChat(nextMessages);
      // Simulate typing effect
      const typedMessage = { role: "assistant" as const, content: result.response };
      
      // Add empty message first, then fill
      setMessages([...nextMessages, typedMessage]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "Unable to contact AI backend. Please check API setup." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell 
      title="AI Finance Chat" 
      subtitle="ChatGPT-like assistant powered by advanced financial AI. Ask about investments, taxes, budgeting, and more."
    >
      <GlassCard className="flex flex-col h-[75vh] max-h-[75vh]">
        <div className="mb-4 flex-1 space-y-4 overflow-y-auto pr-2" ref={containerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm transition ${
                  message.role === "user"
                    ? "bg-linear-to-r from-blue-500 to-cyan-400 text-slate-950 font-medium"
                    : "border border-white/10 bg-slate-900/70 text-slate-100"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="mb-1 flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-cyan-400"></span>
                    <span className="text-xs text-slate-400">AI Money Mentor</span>
                  </div>
                )}
                <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[75%] space-y-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-cyan-400"></span>
                  <span className="text-xs text-slate-400">AI is thinking</span>
                </div>
                <LoaderDots label="" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 border-t border-slate-700 pt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about savings, taxes, investments, SIP..."
            className="premium-input flex-1 text-sm"
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="premium-button px-5 py-3 text-sm font-semibold disabled:opacity-60"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>

        {/* Quick Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Explain SIP",
            "Tax saving tips",
            "Emergency fund",
            "Portfolio tips"
          ].map((suggest) => (
            <button
              key={suggest}
              onClick={() => setInput(suggest)}
              className="rounded-full border border-blue-300/30 bg-blue-400/10 px-3 py-1 text-xs text-blue-200 hover:border-blue-300/60 hover:bg-blue-400/20 transition"
              disabled={loading}
            >
              {suggest}
            </button>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
