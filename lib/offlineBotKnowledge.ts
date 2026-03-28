export type OfflineBotRule = {
  keywords: string[];
  response: string;
};

export const offlineBotWelcome =
  "Hi, I am Mento, your offline guide. Ask me how to use dashboard, chat, goal planner, tax optimizer, portfolio, or future simulator.";

export const offlineBotQuickReplies = [
  "Hi",
  "How to use dashboard",
  "How to use chat",
  "How to use SIP planner",
  "How to use tax optimizer",
  "How to use portfolio page",
  "How to use future simulator",
] as const;

// Add more finance, SIP, investment, and banking Q&A, with personalization support
export const offlineBotRules: OfflineBotRule[] = [
    {
      keywords: ["sip", "systematic investment plan", "monthly investment"],
      response:
        "A SIP (Systematic Investment Plan) lets you invest a fixed amount regularly in mutual funds. It helps build wealth over time with the power of compounding. You can start with as little as ₹500 per month."
    },
    {
      keywords: ["investment", "invest", "best investment", "where to invest"],
      response:
        "For most people, a mix of equity mutual funds, fixed deposits, and PPF is a good start. Diversify your investments and review them yearly."
    },
    {
      keywords: ["bank", "bank account", "open account", "which bank"],
      response:
        "Choose a bank with good digital services, low fees, and a wide ATM network. Compare interest rates and customer reviews before opening an account."
    },
    {
      keywords: ["finance", "financial planning", "money help", "help"],
      response:
        "I can help you with budgeting, saving, investing, tax planning, and more. Ask me anything about personal finance!"
    },
    {
      keywords: ["health", "wealth", "money health", "financial health"],
      response:
        "Financial health means having control over your daily finances, being prepared for emergencies, and planning for future goals."
    },
  {
    keywords: ["hi", "hello", "hey"],
    response:
      "Hello there. I can guide you through every page of this app even without internet. Try asking: how to use dashboard.",
  },
  {
    keywords: ["dashboard", "money health", "score"],
    response:
      "Dashboard shows your Money Health Score, monthly savings, investment snapshot, AI insights, and 90-day action plan. Click Try Demo first on home page if no data appears.",
  },
  {
    keywords: ["chat", "ai chat", "mentor"],
    response:
      "Chat page works like a financial assistant. Type your question and hit Send. If OpenAI key is not set, it still responds using demo mode guidance.",
  },
  {
    keywords: ["sip", "goal planner", "planner"],
    response:
      "Goal Planner calculates SIP maturity. Fill monthly amount, expected return, and years. You will see invested amount, estimated returns, and final maturity.",
  },
  {
    keywords: ["tax", "tax optimizer", "old regime", "new regime"],
    response:
      "Tax Optimizer compares old vs new Indian tax regime. Enter annual salary and deductions to get tax values, better regime, and recommended actions.",
  },
  {
    keywords: ["portfolio", "json", "holdings"],
    response:
      "Portfolio page accepts JSON holdings. Paste sample data, click Analyze Portfolio, and view total value, category split, risk level, and notes.",
  },
  {
    keywords: ["future", "simulator", "projection", "wealth"],
    response:
      "Future Simulator uses sliders for corpus, monthly contribution, return rate, and years. It recalculates growth graph and milestones instantly.",
  },
  {
    keywords: ["demo", "try demo"],
    response:
      "Use Try Demo on the home page. It seeds a sample user profile and loads analytics quickly even if MongoDB is not configured.",
  },
  {
    keywords: ["offline", "without api", "no api"],
    response:
      "I am fully offline. My answers come from pre-stored help content in the app code, with zero API calls required.",
  },
];

// Accept userName for personalization
export function getOfflineBotResponse(input: string, userName?: string): string {
  const normalized = input.toLowerCase().trim();

  if (!normalized) {
    return userName
      ? `Type any question, ${userName}, and I will help with page usage and feature guidance.`
      : "Type any question and I will help with page usage and feature guidance.";
  }

  const matchedRule = offlineBotRules.find((rule) => rule.keywords.some((keyword) => normalized.includes(keyword)));
  if (matchedRule) {
    // Personalize if userName is provided
    if (userName) {
      return `${userName}, ${matchedRule.response}`;
    }
    return matchedRule.response;
  }

  return userName
    ? `${userName}, I can help with dashboard, chat, SIP planner, tax optimizer, portfolio, future simulator, and demo flow. Try asking one of those.`
    : "I can help with dashboard, chat, SIP planner, tax optimizer, portfolio, future simulator, and demo flow. Try asking one of those.";
}
