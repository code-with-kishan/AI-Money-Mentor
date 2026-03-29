# 💰 AI Money Mentor — Smart Financial Advisor for India

> **Your personal AI-powered wealth companion.** Calculate SIPs, optimize taxes, analyze portfolios, and plan your financial future—all with beautiful animations and AI guidance. Built for India, powered by Next.js and LangChain.

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![LangChain](https://img.shields.io/badge/LangChain-AI%20Agents-orange?style=flat-square)](https://js.langchain.com/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-CSS%204-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-333333?style=flat-square)](https://gsap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 🎯 What Can You Do With AI Money Mentor?

### For Users
- 💰 **Check Your Financial Health** — Get a Money Health Score with actionable insights
- 🎯 **Plan SIP Goals** — Calculate exactly how much you'll have in 5, 10, or 20 years
- 📊 **Optimize Your Taxes** — Compare old vs new tax regimes and save thousands
- 🎨 **Analyze Your Portfolio** — Get AI recommendations for rebalancing and diversification
- 🚀 **Project Your Wealth** — See 3 scenarios (conservative/moderate/aggressive)
- 💬 **Ask an AI Advisor** — Chat with an AI about any financial question
- 📱 **Track Expenses** — Categorize spending and see where your money goes
- 👥 **Build Net Worth** — Track assets and liabilities over time
- 🎮 **Earn Badges & Levels** — Gamified financial wellness journey

### Key Features

| Feature | What It Does | Example |
|---------|-------------|---------|
| **Money Health Score** | Analyzes your income, savings, and goals to give you a score (0-100) | "Your score is 72/100 — excellent emergency fund! 👍" |
| **SIP Calculator** | Calculates exactly how much you'll save monthly for a goal | Invest ₹15,000/month at 12% returns for 10 years = ₹27,83,742 |
| **Tax Optimizer** | Compares old and new income tax regimes for India (2024-25) | "New regime saves you ₹1,20,000 this year!" |
| **Portfolio X-Ray** | Analyzes your stock/mutual fund holdings for overlap and risk | "Your portfolio has 3 overlapping mutual funds — consider consolidating" |
| **Wealth Projector** | Shows your projected net worth over time | "At your current rate, you'll have ₹1 Crore in 12 years" |
| **AI Chat Advisor** | Talk to an AI about finance, investments, and goals | Ask: "How much should I invest monthly?" Get personalized advice |
| **Smart Alerts** | Notifications about taxes, savings, and opportunities | "Your emergency fund is below 6 months — build it up!" |
| **Offline Mode** | Fully functional without internet — uses pre-trained AI responses | Works on flights, bad WiFi, anywhere |
| **Demo Mode** | Try everything without setting up — one click! | Click "Try Demo" → see sample profile with all features |

---

## 🏗️ How It's Built (Technical Overview)

### Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interfaces                         │
│  Landing → Dashboard → Chat → Tax → SIP → Portfolio         │
│                   (Next.js Pages)                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              API Layer (Next.js Routes)                     │
│  /api/analyze  /api/chat  /api/tax  /api/sip                │
│  /api/portfolio  /api/simulate  /api/demo                   │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
    ┌─────────────┐      ┌──────────────────┐
    │  Business   │      │  AI Agents       │
    │  Logic      │      │  (LangChain)     │
    │  (routes/)  │      │                  │
    │             │      │ • Analysis       │
    │ • Calcs     │      │ • Chat           │
    │ • Rules     │      │ • Tax Advisory   │
    │ • Pipelines │      │ • Portfolio X    │
    └──────┬──────┘      └────────┬─────────┘
           │                      │
           └──────────┬───────────┘
                      ▼
         ┌──────────────────────────┐
         │  MongoDB Database        │
         │                          │
         │ • User Profiles          │
         │ • Financial Data         │
         │ • Chat History           │
         └──────────────────────────┘
```

### Tech Stack

**Frontend** — What users see and interact with:
- **Next.js 16** — Fast React framework with built-in API routes
- **React 19** — UI component library
- **Tailwind CSS 4** — Beautiful styling system
- **GSAP 3.14** — Smooth animations and scroll effects
- **Recharts** — Interactive charts and graphs
- **Lenis** — Buttery smooth scrolling

**Backend** — Server-side logic:
- **Next.js API Routes** — Serverless functions (no separate server needed)
- **LangChain** — Framework for building AI-powered applications
- **Zod** — Type safety and data validation
- **JWT** — Secure authentication

**AI & Language Models** — The "brain":
- **OpenRouter API** — Unified LLM interface (could be Claude, GPT-4, etc.)
- **LangChain Agents** — Structured AI that outputs JSON instead of rambling text
- **Fallback Mode** — Pre-trained responses if API is unavailable

**Database** — Data storage:
- **MongoDB** — Flexible NoSQL database
- **Mongoose** — Schema validation and ORM
- **MongoDB Atlas** — Cloud hosting (optional, app works offline too)

---

## 📁 Project Structure Explained

```
ai-money-mentor/
│
├── 📄 README.md, SETUP.md, QUICKSTART.md
│   └─ Documentation (you are here!)
│
├── 📁 app/
│   ├── 📁 api/                          # Backend endpoints
│   │   ├── analyze/route.ts             # Calculates financial health
│   │   ├── chat/route.ts                # Chat responses
│   │   ├── demo/route.ts                # Demo data
│   │   ├── sip/route.ts                 # SIP calculations
│   │   ├── tax/route.ts                 # Tax comparisons
│   │   ├── portfolio/route.ts           # Portfolio analysis
│   │   └── simulate/route.ts            # Wealth projections
│   │
│   ├── 📁 [feature-pages]/              # User-facing pages
│   │   ├── dashboard/page.tsx           # Main dashboard
│   │   ├── chat/page.tsx                # Chat interface
│   │   ├── tax-optimizer/page.tsx       # Tax comparison UI
│   │   ├── goal-planner/page.tsx        # SIP calculator UI
│   │   ├── portfolio/page.tsx           # Portfolio analyzer UI
│   │   ├── future-simulator/page.tsx    # Wealth projection UI
│   │   ├── expense-tracker/page.tsx     # Spending dashboard
│   │   └── net-worth-tracker/page.tsx   # Assets & liabilities
│   │
│   ├── globals.css                      # Global styles + custom animations
│   ├── layout.tsx                       # Root layout (fonts, providers)
│   └── page.tsx                         # Landing page (home)
│
├── 📁 components/
│   ├── HeroSection.tsx                  # Landing hero with animations
│   ├── MainNav.tsx                      # Navigation bar
│   ├── SmartAlerts.tsx                  # Alert notifications
│   ├── GamificationPanel.tsx            # Badges & XP progress
│   ├── MoneyCounter.tsx                 # Animated number display
│   ├── OfflineHelperBot.tsx             # Offline chatbot
│   ├── PageShell.tsx                    # Page wrapper/layout
│   ├── GlassCard.tsx                    # Glassmorphic card component
│   ├── AnimatedCoinsSection.tsx         # 3D coin animations
│   ├── RoadmapTimeline.tsx              # Step-by-step planning
│   ├── LifeEventSimulator.tsx           # "What if" scenario tool
│   ├── charts/
│   │   ├── BaseAreaChart.tsx            # Wealth growth chart
│   │   ├── BasePieChart.tsx             # Breakdown charts
│   │   └── BaseBarChart.tsx             # Comparison charts
│   └── hooks/
│       └── useGsapContext.ts            # Animation helper hook
│
├── 📁 lib/
│   ├── agents/                          # AI agents (the "brain")
│   │   ├── base.ts                      # Base agent setup
│   │   ├── analysisAgent.ts             # Financial analysis AI
│   │   ├── taxAgent.ts                  # Tax advisory AI
│   │   ├── portfolioAgent.ts            # Portfolio recommendation AI
│   │   ├── simulationAgent.ts           # Narrative generator AI
│   │   ├── recommendationAgent.ts       # Action items AI
│   │   └── orchestrator.ts              # Coordinates all agents
│   │
│   ├── apiClient.ts                     # Frontend API helper
│   ├── mongodb.ts                       # Database connection
│   ├── types.ts                         # TypeScript interfaces
│   ├── demoData.ts                      # Sample user data
│   └── offlineBotKnowledge.ts           # Offline FAQ responses
│
├── 📁 models/                           # Database schemas (define what data looks like)
│   ├── User.ts                          # User profile model
│   ├── FinancialData.ts                 # Financial records model
│   └── ChatHistory.ts                   # Chat messages model
│
├── 📁 routes/                           # Business logic (independent of frameworks)
│   ├── analyze.ts                       # Financial analysis logic
│   ├── chat.ts                          # Chat response logic
│   ├── demo.ts                          # Demo data seeding
│   ├── tax.ts                           # Tax calculation logic
│   ├── portfolio.ts                     # Portfolio analysis logic
│   ├── simulate.ts                      # Wealth simulation logic
│   └── sip.ts                           # SIP calculation logic
│
├── 📁 utils/
│   └── finance.ts                       # Core math functions
│
├── 📁 public/
│   └── data/mock-portfolio.json         # Example portfolio for testing
│
├── 📁 animations/
│   └── landingAnimations.ts             # GSAP animation sequences
│
├── 🔧 Configuration Files
│   ├── package.json                     # Dependencies & scripts
│   ├── tsconfig.json                    # TypeScript config
│   ├── next.config.ts                   # Next.js config (Vercel optimized)
│   ├── tailwind.config.mjs              # Tailwind CSS config
│   ├── postcss.config.mjs               # PostCSS config
│   ├── eslint.config.mjs                # Code quality config
│   └── vercel.json                      # Vercel deployment config
│
└── 📝 Environment Files
    ├── .env                             # Your local config (KEEP PRIVATE!)
    ├── .env.example                     # Template (safe to share)
    └── .env.vercel.example              # Production template
```

### What Goes Where?

- **If it's a page users navigate to** → Put it in `app/`
- **If it's an API endpoint** → Put it in `app/api/`
- **If it's a reusable visual component** → Put it in `components/`
- **If it's pure logic/calculations** → Put it in `routes/` or `utils/`
- **If it's AI/LLM stuff** → Put it in `lib/agents/`
- **If it's database-related** → Put it in `models/`

---

## 🤖 How AI Agents Work (The Smart Part)

AI Money Mentor doesn't just ask ChatGPT a question and get rambling text. Instead, it uses **structured agents** that:

1. **Accept specific inputs** — Name, age, salary, investments, etc.
2. **Process with AI** — LangChain sends instructions to LLM with examples
3. **Return structured JSON** — Not text, but data (scores, insights, actions)
4. **Validate with Zod** — Ensures the AI gave us good data, not garbage
5. **Fallback gracefully** — If API fails, uses pre-trained responses

### The 8 Specialized Agents

Each agent is like hiring a specialist for one job:

| Agent | Specialization | Input | Output |
|-------|---|---|---|
| **analysisAgent** | Financial Health Scoring | Name, age, salary, expenses, investments | Health score (0-100), insights, risks |
| **taxAgent** | Income Tax Optimization | Annual salary, deductions | Old vs new regime, tax savings, advice |
| **portfolioAgent** | Investment Recommendations | Holdings (stocks/funds), amounts | Risk classification, XIRR, overlap%, rebalancing tips |
| **simulationAgent** | Wealth Projection Narrative | Corpus, monthly contribution, years, returns | Story of how wealth grows with milestones |
| **recommendationAgent** | Action Items | Analysis output | Top 3-6 priorities for next 90 days |
| **dataAgent** | Data Validation | Raw user input | Cleaned, validated, structured data |
| **decisionAgent** | Strategic Planning | Validated data + context | Financial roadmap with priorities |
| **explanationAgent** | Humanization | Technical roadmap steps | Easy-to-understand explanations |

**Example**: When you load the dashboard, here's what happens:
```
1. User Profile Loaded
2. analysisAgent runs → "This person is 35, earns ₹25L, saves 40%"
3. Returns: { "score": 78, "healthStatus": "Good", "insights": [...] }
4. recommendationAgent runs → "Top priorities: Build emergency fund, optimize tax filing"
5. Returns: { "actions": [...], "impact": "₹1.2L saved yearly" }
6. decisionAgent creates roadmap → "Month 1: Emergency fund, Month 2: Tax filing, Month 3: Rebalance portfolio"
7. Dashboard displays everything with beautiful cards and animations
```

---

## 📊 Core Calculations (The Math Part)

### SIP Formula
When you invest monthly and get compound returns:
```
M = P × [((1+i)^n - 1) / i] × (1+i)

Where:
  M = Maturity amount (what you'll have)
  P = Monthly investment
  i = Monthly interest rate (annual ÷ 12)
  n = Total months
```

**Example**: Invest ₹10,000/month at 12% annual return for 10 years:
```
M = 10,000 × [((1.01)^120 - 1) / 0.01] × 1.01
  = 10,000 × 205.88
  = ₹20,58,800 (roughly your investment will grow to this)
```

### Tax Calculation
India has two tax "regimes" you can choose from each year:

**Old Regime** (with ₹50,000 standard deduction):
```
₹0 - ₹2.5L:      0% tax        (pay nothing)
₹2.5L - ₹5L:     5% tax        (₹12,500 max)
₹5L - ₹10L:      20% tax       (₹1,00,000 max)
₹10L+:           30% tax
```

**New Regime** (with ₹75,000 standard deduction):
```
₹0 - ₹3L:        0% tax        (pay nothing)
₹3L - ₹6L:       5% tax        (₹15,000 max)
₹6L - ₹9L:       10% tax       (₹30,000 max)
₹9L+:            Higher rates
```

→ AI Money Mentor calculates both and tells you which saves more money!

### Portfolio Risk Classification
```
Equity allocation ≤ 45%   → LOW risk (conservative, stable)
Equity allocation 45-75%  → MODERATE risk (balanced growth)
Equity allocation > 75%   → HIGH risk (aggressive, volatile)
```

---

## ⚡ Getting Started (5 Minutes)

### Option 1: Try Without Installing (Demo Mode)
1. Visit the live app (or run locally)
2. Click **"Try Demo"**
3. Explore all features with sample data
4. No setup needed! ✨

### Option 2: Local Development

**Prerequisites**:
- Node.js ≥ 18.x ([Download](https://nodejs.org/))
- MongoDB running ([Setup Guide](https://www.mongodb.com/docs/manual/installation/))
- (Optional) OpenRouter API key ([Get it](https://openrouter.ai/))

**Steps**:

```bash
# 1. Clone or navigate to project
cd /Users/macbook/Code/AI\ Money\ Mentor

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# Edit .env.local with your MongoDB URI and optional API keys
# For local MongoDB: MONGODB_URI=mongodb://127.0.0.1:27017/ai-money-mentor

# 4. Start development server
npm run dev

# 5. Open browser and visit
# → http://localhost:3000
```

**What's next?**
- Click **"Try Demo"** to see sample data
- Or go to Profile Setup to enter your own financial info
- Explore Dashboard, Chat, Tax Optimizer, etc.

---

## 🚀 Deploy to Vercel (Live to the Internet)

**AI Money Mentor is optimized for Vercel.** Here's the super quick version:

1. **Push code to GitHub** — `git push origin main`
2. **Go to Vercel.com** — Click "New Project"
3. **Import your repo** — Select `ai-money-mentor`
4. **Add environment variables**:
   - `MONGODB_URI` — Get from MongoDB Atlas ([Guide](./VERCEL_DEPLOYMENT_GUIDE.md))
   - `OPENROUTER_API_KEY` — Get from OpenRouter ([Optional](https://openrouter.ai/))
5. **Click Deploy** — Done! Your app is live in 2 minutes

**Full step-by-step guide**: See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) 📖

**Deployment checklist**: Use [VERCEL_DEPLOYMENT_CHECKLIST.md](./VERCEL_DEPLOYMENT_CHECKLIST.md) to track progress ✅

---

## 🎮 How to Use Each Feature

### Dashboard — Your Financial Hub
- **Money Health Score**: 0-100 score based on income, savings, emergency fund
- **Insights**: AI-generated tips relevant to your situation
- **Alerts**: Smart notifications about taxes, opportunities, goals
- **Roadmap**: Your 90-day financial action plan
- **Wealth Tracker**: See your net worth grow over time

### AI Chat — Ask Anything
- "Should I invest in mutual funds or stocks?"
- "How do I optimize my taxes?"
- "What's the best way to build emergency fund?"
- Get personalized, AI-powered advice instantly
- Chat history is saved to your profile

### SIP Calculator (Goal Planner)
- Enter monthly investment amount
- Set expected annual return (historically 8-14% for equities)
- Choose time period (5, 10, 20 years)
- See exact amount you'll have at maturity
- Useful for planning: house down payment, child education, retirement

### Tax Optimizer
- Enter annual salary and deductions
- See old vs new regime comparison
- Understand tax savings
- Get AI advice on which regime is better for you

### Portfolio Analyzer
- Paste your holdings (stocks, mutual funds, bonds)
- Get instant analysis:
  - Total portfolio value
  - Risk level (conservative/moderate/aggressive)
  - Overlap detection (same companies in multiple funds?)
  - Recommended rebalancing
  - Tax-aware suggestions

### Future Simulator
- Set current savings and monthly investment
- See wealth grow in 3 scenarios (conservative/moderate/aggressive)
- Visual charts with projections
- AI narrative explaining your wealth journey

### Expense Tracker
- Log daily expenses
- Categorize spending (food, entertainment, transport, etc.)
- See where money is going
- Monthly/yearly summaries

### Net Worth Tracker
- Add all assets (savings, investments, property, vehicles)
- Add all liabilities (loans, credit card debt)
- Calculate net worth = assets - liabilities
- Track progress over time

---

## 📚 Documentation

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [README.md](./README.md) | Overview (start here) | 10 min |
| [QUICKSTART.md](./QUICKSTART.md) | Fast 5-min setup | 5 min |
| [SETUP.md](./SETUP.md) | Detailed setup with troubleshooting | 20 min |
| [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) | Deploy to production | 15 min |
| [VERCEL_DEPLOYMENT_CHECKLIST.md](./VERCEL_DEPLOYMENT_CHECKLIST.md) | Track deployment progress | 5 min |
| [API_REFERENCE.md](./API_REFERENCE.md) | All endpoints documented | 10 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Project statistics & highlights | 5 min |

---

## 🔍 Understanding the Codebase

### Key Patterns Used

**Component Structure** — All React components follow this pattern:
```tsx
// components/Example.tsx
import { useGsapContext } from "@/lib/hooks/useGsapContext";

export default function Example() {
  const { scope, isReady } = useGsapContext();
  
  return (
    <div ref={scope}>
      {/* Your component */}
    </div>
  );
}
```

**API Endpoint Structure** — All endpoints follow this pattern:
```tsx
// app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Validate input
    // Process request
    // Call AI agent or calculate
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

**Agent Pattern** — All agents follow this structure:
```tsx
// lib/agents/exampleAgent.ts
import { z } from "zod";
import { llm } from "@/lib/agents/base";

const OutputSchema = z.object({
  result: z.string(),
  confidence: z.number(),
});

export async function exampleAgent(input: InputType) {
  const prompt = `You are an expert. ${JSON.stringify(input)}`;
  
  try {
    const response = await llm.withStructuredOutput(OutputSchema)
      .invoke(prompt);
    return response;
  } catch (error) {
    return { result: "fallback", confidence: 0.5 };
  }
}
```

**Error Handling** — Graceful degradation everywhere:
```tsx
// If MongoDB fails → use demo data
// If API fails → use offline bot responses
// If AI fails → use fallback values
// Result: App never crashes, always works!
```

---

## 🧪 Testing Individual Features

### Test SIP Calculator (Without UI)
```bash
curl -X POST http://localhost:3000/api/sip \
  -H "Content-Type: application/json" \
  -d '{
    "monthlyInvestment": 10000,
    "annualReturnRate": 12,
    "years": 10
  }'
```

### Test Financial Analysis
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 32,
    "salary": 2000000,
    "expenses": 75000,
    "investments": 500000,
    "monthlySavings": 45000
  }'
```

### Test Chat
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{
      "role": "user",
      "content": "How much should I invest monthly?"
    }]
  }'
```

→ See [API_REFERENCE.md](./API_REFERENCE.md) for all endpoints

---

## 🚨 Troubleshooting Common Issues

### Issue: "Cannot load demo data" or Dashboard shows 0
**Problem**: MongoDB isn't running or connection string is wrong

**Solution**:
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB (macOS)
brew services start mongodb-community

# Or test connection directly
mongosh "mongodb://127.0.0.1:27017/ai-money-mentor"

# If using MongoDB Atlas, test connection string
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/ai-money-mentor"
```

### Issue: "Chat not responding" or "API error"
**Problem**: OpenRouter API key missing or invalid

**Solution**:
```bash
# Add OPENROUTER_API_KEY to .env.local
# Get key from https://openrouter.ai/

# Or app works in demo mode (limited responses)
# No action needed, already functional!
```

### Issue: "Styles look broken" or "Tailwind not working"
**Problem**: CSS might not have compiled

**Solution**:
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run dev

# Or restart dev server (Ctrl+C, then run again)
```

### Issue: "Port 3000 already in use"
**Problem**: Another app is using port 3000

**Solution**:
```bash
# Find and kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 npm run dev
```

### Issue: Build fails with "Cannot find module..."
**Problem**: Dependencies not installed or Node version mismatch

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Ensure Node ≥ 18
node --version  # Should be v18.x, v19.x, v20.x etc
```

→ More help in [SETUP.md](./SETUP.md#troubleshooting)

---

## 📈 Performance & Optimization

**What We Did**:
- ✅ **GSAP animations** optimized for 60 FPS (smooth, not janky)
- ✅ **Tailwind CSS** purged unused styles (~45KB gzipped)
- ✅ **MongoDB connection pooling** — multiple requests share 1 connection
- ✅ **Lazy loading** — components load only when needed
- ✅ **Dynamic imports** — Large libraries load on-demand
- ✅ **API response caching** — Don't recalculate same thing twice
- ✅ **Image optimization** — Next.js automatic image resizing
- ✅ **Code splitting** — Each page gets only code it needs

**Result**: Fast-loading, smooth-running app even on 4G networks 📱⚡

---

## 🔐 Security Practices

✅ **Environment variables** — No secrets in code  
✅ **Input validation** — Zod validates all API inputs  
✅ **MongoDB IP whitelist** — Only our servers can access  
✅ **HTTPS in production** — Vercel enforces automatic SSL  
✅ **CORS configured** — API accepts requests only from our domain  
✅ **No hardcoded API keys** — Everything from environment  
✅ **Rate limiting** — Prevents API abuse (on roadmap)  
✅ **Data validation** — Prevents injection attacks  

---

## 🎯 Project Stats

| Metric | Value |
|--------|-------|
| **Total Components** | 20+ |
| **API Endpoints** | 8 |
| **AI Agents** | 8 |
| **Database Models** | 3 |
| **Feature Pages** | 8+ |
| **TypeScript Coverage** | 100% |
| **Code Lines** | ~5,000+ |
| **Animations** | 10+ |
| **Financial Calculations** | 15+ |

---

## 🎓 Learning Resources

Want to understand how it works? Check these out:

**Next.js**
- [Official Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

**React**
- [React Docs](https://react.dev/)
- [Hooks Guide](https://react.dev/reference/react/hooks)

**Tailwind CSS**
- [Official Docs](https://tailwindcss.com/)
- [Component Examples](https://tailwindui.com/)

**GSAP Animations**
- [Getting Started](https://gsap.com/)
- [ScrollTrigger Plugin](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

**MongoDB**
- [Official Docs](https://www.mongodb.com/docs/)
- [Mongoose Guide](https://mongoosejs.com/)

**LangChain**
- [Official Docs](https://js.langchain.com/)
- [Structured Output Guide](https://js.langchain.com/docs/concepts/structured_output)

**AI/LLM Basics**
- [OpenAI Concepts](https://platform.openai.com/docs/concepts)
- [Prompt Engineering Tips](https://platform.openai.com/docs/guides/prompt-engineering)

---

## 🚀 What's on the Roadmap?

Future enhancements planned:

- [ ] **Mobile App** — React Native version for iOS/Android
- [ ] **Investment Tracking** — Real-time stock/fund price updates
- [ ] **Financial Planning** — Detailed retirement planning, insurance needs
- [ ] **Banking Integration** — Connect bank accounts (Plaid)
- [ ] **Advanced Analytics** — Machine learning for spending patterns
- [ ] **Multi-user** — Family financial planning
- [ ] **Export Reports** — PDF/Excel financial reports
- [ ] **Dark mode** — (Already have light UI, can add toggle)
- [ ] **International** — Support for other countries

---

## 🤝 Contributing

Want to improve AI Money Mentor? Here's how:

1. **Fork** the repository
2. **Create a branch** — `git checkout -b feature/amazing-feature`
3. **Make changes** — Add your feature
4. **Test thoroughly** — Try all flows
5. **Commit** — `git commit -m "Add amazing feature"`
6. **Push** — `git push origin feature/amazing-feature`
7. **Open Pull Request** — Describe what you changed

**Ideas to contribute**:
- New financial calculations
- UI improvements
- New AI agents for specific use cases
- Translations for other languages
- Bug fixes
- Documentation improvements

---

## 📞 Support & Questions

**Having issues?**
1. Check [SETUP.md Troubleshooting](./SETUP.md#troubleshooting)
2. Read [API_REFERENCE.md](./API_REFERENCE.md)
3. Search existing issues on GitHub

**Want to report a bug?**
- Open a GitHub issue with:
  - What you did
  - What you expected to happen
  - What actually happened
  - Screenshots if possible

**Have a feature idea?**
- Open a GitHub discussion
- Or email us

---

## 📜 License

MIT © 2024 AI Money Mentor

This means you can:
- ✅ Use it for personal projects
- ✅ Use it for commercial projects
- ✅ Modify and distribute
- ✅ Use privately

Just include the license notice. [See full LICENSE](./LICENSE)

---

## 🎉 Quick Links

**Get Started Now**
- 🚀 [Quick Start (5 min)](./QUICKSTART.md)
- 📖 [Full Setup Guide](./SETUP.md)
- 🌐 [Deploy to Vercel](./VERCEL_DEPLOYMENT_GUIDE.md)
- ✅ [Deployment Checklist](./VERCEL_DEPLOYMENT_CHECKLIST.md)

**API & Code**
- 📚 [API Reference](./API_REFERENCE.md)
- 🏗️ [Project Architecture](./ARCHITECTURE.md) *(coming soon)*
- 🔍 [Code Examples](./EXAMPLES.md) *(coming soon)*

**Resources**
- 💰 [Indian Tax Guide](./INDIA_TAX_GUIDE.md) *(coming soon)*
- 📊 [SIP & Investment Guide](./INVESTMENT_GUIDE.md) *(coming soon)*

---

## 👨‍💻 Built With ❤️

Making personal finance simple, accessible, and fun for everyone in India.

---

**Ready to take control of your finances?** Let's go! 🚀💰

```
npm run dev
# Then visit http://localhost:3000
```

Questions? Check our docs or reach out. Happy coding! 🎯
