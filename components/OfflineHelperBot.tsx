"use client";

import {
  getOfflineBotResponse,
  offlineBotQuickReplies,
  offlineBotWelcome,
} from "@/lib/offlineBotKnowledge";
import { FormEvent, useMemo, useState } from "react";

type BotMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function OfflineHelperBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: createId(),
      role: "bot",
      text: offlineBotWelcome,
    },
  ]);

  const hasUnreadHint = useMemo(() => messages.length === 1 && !isOpen, [isOpen, messages.length]);

  const pushMessage = (role: BotMessage["role"], text: string) => {
    setMessages((prev) => [...prev, { id: createId(), role, text }]);
  };

  const handleAsk = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    pushMessage("user", cleanQuestion);
    pushMessage("bot", getOfflineBotResponse(cleanQuestion));
    setInput("");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAsk(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="glass mb-3 flex h-112 w-80 flex-col overflow-hidden rounded-3xl border border-blue-200/20 shadow-2xl sm:w-92">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="display-font text-sm font-semibold text-slate-100">Mento Offline Helper</p>
              <p className="text-xs text-slate-300/80">No API required</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-white/20 px-2 py-1 text-xs text-slate-200 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-linear-to-r from-blue-300 to-cyan-300 text-slate-900"
                    : "border border-white/10 bg-slate-900/70 text-slate-100"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {offlineBotQuickReplies.slice(0, 3).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAsk(item)}
                  className="rounded-full border border-blue-200/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-100 hover:bg-blue-500/20"
                >
                  {item}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask how to use this app..."
                className="premium-input flex-1 py-2 text-sm"
              />
              <button type="submit" className="premium-button px-3 py-2 text-sm">
                Ask
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-blue-400 via-cyan-300 to-emerald-300 text-2xl shadow-[0_12px_32px_rgba(62,161,255,0.45)] transition hover:scale-105"
        aria-label="Open offline helper chatbot"
      >
        {isOpen ? "x" : "😊"}
        {hasUnreadHint && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-bold text-slate-900">
            !
          </span>
        )}
      </button>
    </div>
  );
}
