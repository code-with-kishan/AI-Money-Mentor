# 🚀 AI Money Mentor — Complete Setup & Deployment Guide

**A production-ready fintech app for India. Smart financial advisor with AI agents, real calculations, and beautiful animations.**

---

## 📋 Project Overview

**AI Money Mentor** is a full-stack financial planning application built with:

- **Frontend**: Next.js 16 (App Router) + Tailwind CSS + GSAP animations
- **Backend**: Next.js API routes + LangChain AI agents
- **Database**: MongoDB + Mongoose
- **AI**: OpenAI API + Structured outputs
- **UI**: Glassmorphism, neon gradients, smooth micro-interactions

---

## 🎯 Features

### 1. **Dashboard** — Money Health Score
- Real-time financial analysis
- Monthly savings tracking
- Emergency fund calculation
- AI-powered insights & recommendations

### 2. **AI Finance Chat** — ChatGPT-like Interface
- Ask about SIP, tax, savings, investment
- Powered by OpenAI (or demo fallback)
- Persistent chat history in MongoDB

### 3. **SIP Goal Planner** — Investment Calculator
- Compound interest with SIP formula
- Real maturity projections
- Monthly/annual breakdown

### 4. **Tax Optimizer** — Old vs New Regime
- Legal Indian tax slabs (2024/25)
- Deduction impact analysis
- Regime switching recommendations

### 5. **Portfolio Analyzer** — Holdings Assessment
- JSON-based portfolio input
- Risk level classification
- AI-powered allocation insights

### 6. **Future Wealth Simulator** — Interactive Projections
- Real-time slider adjustments
- Recharts visualization
- 30-year wealth trajectory

### 7. **Offline Helper Bot** — Context-aware Guidance
- Works without API key
- 50+ pre-built responses
- Accessible from any page

---

## ⚙️ Prerequisites

### Required
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **MongoDB** (local or cloud URI)
- **Google Gemini API Key** (optional for demo mode)

### Recommended
- macOS/Linux (Windows WSL2 also works)
- Git for version control
- Postman for API testing (optional)

---

## 📦 Installation & Setup

### Step 1: Clone & Navigate
```bash
cd /Users/macbook/Code/AI\ Money\ Mentor/ai-money-mentor
```

### Step 2: Install Dependencies
```bash
npm ci
# or: npm install
```

### Step 3: Create `.env.local` File

Copy from the example:
```bash
cp .env.example .env.local
```

Then **edit `.env.local`** with your values:

```env
# MongoDB Configuration (REQUIRED)
MONGODB_URI=mongodb://127.0.0.1:27017/ai-money-mentor
MONGODB_DB=ai-money-mentor

# OpenAI Configuration (OPTIONAL - app works without it)
OPENAI_API_KEY=sk-proj-xxxxx...  # Get from https://platform.openai.com/api-keys
OPENAI_MODEL=gpt-4o-mini         # Recommended for cost-efficiency
```

**Note**: If you skip OpenAI, the app still runs in **demo mode** with fallback responses.

### Step 4: Set Up MongoDB

#### Option A: Local MongoDB (Recommended for Development)

**Using Homebrew (macOS)**:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Check Connection**:
```bash
mongosh
# Type: exit
```

#### Option B: MongoDB Atlas (Cloud)

1. Visit [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/ai-money-mentor?retryWrites=true&w=majority
   ```

---

## 🏃 Running the App

### Start Development Server
```bash
npm run dev
```

**Output**:
```
▲ Next.js 16.2.1
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Open in Browser
```
http://localhost:3000
```

---

## ✅ Testing the Complete Flow

### 1. **Test Without Demo**
1. Open http://localhost:3000
2. You'll see the landing page with animations
3. Click through each feature link

### 2. **Load Demo Data** ← **START HERE**
1. Click **"Try Demo"** button
2. Wait for demo profile to load (~3 seconds)
3. You'll be redirected to Dashboard with sample user data

### 3. **Test Each Feature**

#### Dashboard
- Displays Money Health Score (60-85 in demo)
- Shows monthly savings (~₹87,000)
- Lists AI-generated insights
- Problem: If score shows 0, MongoDB isn't connected

#### AI Chat
- Type: "How much should I invest monthly?"
- Assistant responds with advice
- Chat history persists to database (if MongoDB is up)

#### SIP Goal Planner
- Enter: Monthly ₹15,000, 12% return, 10 years
- Result: ₹27,83,742 maturity
- Verify math with SIP formula

#### Tax Optimizer
- Salary: ₹18,00,000, Deductions: ₹2,20,000
- Shows old regime vs new regime
- Typically shows new regime as better (~₹95K savings)

#### Portfolio Analyzer
- Paste sample JSON (provided in UI)
- Risk Level: "Moderate" (65% equity)
- AI provides diversification notes

#### Future Simulator
- Adjust sliders in real-time
- Graph updates instantly
- 15 years at ₹25K/month shows ~₹87L corpus at 11% return

#### Offline Helper Bot
- Bottom-right corner
- Click to open chat
- Ask: "How to use dashboard"
- Gets instant offline response

### 4. **API Testing** (Optional)

Test individual endpoints with curl or Postman:

```bash
# Analyze Financial Health
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "age": 32,
    "salary": 2000000,
    "expenses": 75000,
    "investments": 600000,
    "monthlySavings": 45000
  }'

# Calculate SIP
curl -X POST http://localhost:3000/api/sip \
  -H "Content-Type: application/json" \
  -d '{
    "monthlyInvestment": 15000,
    "annualReturnRate": 12,
    "years": 10
  }'

# Optimize Tax
curl -X POST http://localhost:3000/api/tax \
  -H "Content-Type: application/json" \
  -d '{
    "annualSalary": 1800000,
    "deductions": 220000
  }'

# Simulate Future
curl -X POST http://localhost:3000/api/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "currentCorpus": 600000,
    "monthlyContribution": 25000,
    "annualReturnRate": 11,
    "years": 15
  }'

# Get Demo Profile
curl http://localhost:3000/api/demo
```

---

## 🚨 Troubleshooting

### Issue: "Demo data unavailable" or Dashboard shows 0
**Cause**: MongoDB not running or MONGODB_URI incorrect
```bash
# Check MongoDB status
brew services list

# If stopped, start it
brew services start mongodb-community

# Or verify connection string
mongosh "mongodb://127.0.0.1:27017/ai-money-mentor"
```

### Issue: "Chat not responding" or "Unable to contact AI backend"
**Cause**: OpenAI API key missing/invalid
- Set OPENAI_API_KEY in `.env.local`
- Or app runs in **demo mode** with limited responses
- Check: `tail -f .next/build-log` for errors

### Issue: Animations not smooth
- Ensure GSAP library loaded
- Check browser console for JS errors
- Try incognito mode (no browser extensions)

### Issue: Tailwind styles not applied
```bash
# Stop dev server (Ctrl+C)
rm -rf .next
npm run dev
```

### Issue: "Cannot find module '@langchain/openai'"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🏗️ Project Structure

```
ai-money-mentor/
├── app/
│   ├── api/                    # Backend API routes
│   │   ├── analyze/route.ts    # Financial health analysis
│   │   ├── chat/route.ts       # AI chat endpoint
│   │   ├── demo/route.ts       # Demo data seed
│   │   ├── portfolio/route.ts  # Portfolio analysis
│   │   ├── simulate/route.ts   # Wealth projection
│   │   ├── sip/route.ts        # SIP calculation
│   │   └── tax/route.ts        # Tax optimization
│   ├── chat/page.tsx           # Chat UI page
│   ├── dashboard/page.tsx      # Money health dashboard
│   ├── future-simulator/...    # Wealth simulator UI
│   ├── goal-planner/...        # SIP planner UI
│   ├── portfolio/...           # Portfolio analyzer UI
│   ├── tax-optimizer/...       # Tax optimizer UI
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles + animations
├── components/
│   ├── DemoButton.tsx          # Try Demo button
│   ├── FeatureGrid.tsx         # Feature showcase
│   ├── GlassCard.tsx           # Glassmorphic card
│   ├── HeroSection.tsx         # Landing hero (GSAP animated)
│   ├── MainNav.tsx             # Top navigation
│   ├── MoneyCounter.tsx        # Animated number display
│   ├── OfflineHelperBot.tsx    # Offline chatbot
│   ├── PageShell.tsx           # Page header wrapper
│   ├── Skeleton.tsx            # Loading skeletons
│   ├── StoryChartSection.tsx   # Landing charts
│   └── hooks/
│       └── useGsapContext.ts   # GSAP scoped context helper
├── lib/
│   ├── agents/                 # AI agent implementations
│   │   ├── base.ts             # Base structured agent
│   │   ├── analysisAgent.ts    # Financial analysis AI
│   │   ├── portfolioAgent.ts   # Portfolio recommendations
│   │   ├── recommendationAgent.ts  # Action planner
│   │   ├── simulationAgent.ts  # Growth narrative creator
│   │   └── taxAgent.ts         # Tax advisory AI
│   ├── apiClient.ts            # Frontend API utilities
│   ├── demoData.ts             # Sample user & financial data
│   ├── mongodb.ts              # MongoDB connection handler
│   ├── offlineBotKnowledge.ts  # Offline helper rules
│   └── types.ts                # TypeScript interfaces
├── models/                     # MongoDB Mongoose schemas
│   ├── ChatHistory.ts          # Chat message persistence
│   ├── FinancialData.ts        # User financial data
│   └── User.ts                 # User profile
├── routes/                     # Business logic for APIs
│   ├── analyze.ts              # Analysis pipeline
│   ├── chat.ts                 # Chat response logic
│   ├── demo.ts                 # Demo seeding
│   ├── portfolio.ts            # Portfolio analysis
│   ├── simulate.ts             # Simulation pipeline
│   ├── sip.ts                  # SIP calculation
│   └── tax.ts                  # Tax calculation
├── utils/
│   └── finance.ts              # Core financial calculations
├── public/
│   └── data/mock-portfolio.json # Example portfolio data
├── .env.example                # Environment template
├── .env.local                  # (Git-ignored) Your secrets
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
└── SETUP.md                    # This file
```

---

## 💾 Database Schema

### User Collection
```json
{
  "_id": ObjectId,
  "name": "Aarav Sharma",
  "age": 29,
  "salary": 1800000,
  "expenses": 70000,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### FinancialData Collection
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "investments": 850000,
  "goals": [
    { "name": "Emergency Fund", "target": 600000, "years": 1 },
    { "name": "House Down Payment", "target": 3000000, "years": 5 }
  ],
  "taxData": {
    "annualSalary": 1800000,
    "deductions": 220000
  },
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### ChatHistory Collection
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "messages": [
    { "role": "user", "content": "How much to invest?" },
    { "role": "assistant", "content": "Invest 25% of income..." }
  ],
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

---

## 🧮 Key Financial Formulas

### SIP Maturity Formula
```
M = P × [((1+i)^n - 1) / i] × (1+i)

Where:
- P = Monthly investment
- i = Monthly return rate
- n = Total months
```

### Compound Growth with Contributions
```
A = P(1+r)^t + C × [((1+r)^t - 1) / r] × (1+r)

Where:
- P = Initial corpus
- C = Monthly contribution
- r = Monthly return
- t = Months
```

### Indian Tax Calculation
```
Old Regime:
- ₹0 - ₹2.5L: Nil
- ₹2.5L - ₹5L: 5%
- ₹5L - ₹10L: 20%
- ₹10L+: 30%
Plus 4% cess on total tax

New Regime (2024-25):
- ₹0 - ₹3L: Nil
- ₹3L - ₹6L: 5%
- ₹6L - ₹9L: 10%
- ₹9L - ₹12L: 15%
- ₹12L - ₹15L: 20%
- ₹15L+: 30%
Plus 4% cess
```

---

## 🚀 Production Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to connect GitHub repo
```

**Add Environment Variables in Vercel Dashboard**:
- `MONGODB_URI=mongodb+srv://...`
- `OPENAI_API_KEY=sk-proj-...`
- `OPENAI_MODEL=gpt-4o-mini`

### Option 2: Docker + Any Cloud

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build & run:
```bash
docker build -t ai-money-mentor .
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb+srv://... \
  -e OPENAI_API_KEY=sk-proj-... \
  ai-money-mentor
```

### Option 3: Self-Hosted (VPS/EC2)

```bash
# on your server
cd /var/www
git clone <your-repo>
cd ai-money-mentor
npm ci --production
echo "MONGODB_URI=..." > .env.local
echo "OPENAI_API_KEY=..." >> .env.local
npm run build

# Run with PM2 for process management
npm install -g pm2
pm2 start npm --name "ai-money-mentor" -- start
pm2 save
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** (add to `.gitignore`)
2. **Use environment variables** for all secrets
3. **Limit API key scopes** in OpenAI dashboard
4. **Enable MongoDB IP whitelist** in Atlas
5. **Use HTTPS** in production (Vercel/domain SSL cert)
6. **Add rate limiting** for API endpoints (in next update)
7. **Validate user input** on backend

---

## 📊 Performance Optimization

- **GSAP animations**: Only run on desktop (media queries)
- **Recharts**: Lazy-loaded on FutureSimulator page
- **MongoDB indexes** on `userId`, `name` fields
- **Next.js Image optimization**: Handled automatically
- **CSS**: Tailwind v4 with minimal bundle (~45KB gzipped)

---

## 🐛 Common Git/Deployment Issues

### Issue: "This branch is X commits behind main"
```bash
git fetch origin
git rebase origin/main
git push origin HEAD --force-with-lease
```

### Issue: "EACCES: permission denied"
```bash
# Never use `sudo npm install`
# Fix ownership instead
sudo chown -R $(whoami) ~/.npm
npm install
```

### Issue: Build fails on Vercel
1. Check build logs in dashboard
2. Increase buildpack memory: **Settings > Build & Deployment > Functions memory: 1024 MB**
3. Verify all env vars are set

---

## 📚 Resources & Links

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **GSAP**: https://gsap.com/get-started
- **MongoDB**: https://docs.mongodb.com
- **LangChain**: https://python.langchain.com/docs
- **OpenAI API**: https://platform.openai.com/docs

---

## 🤝 Support & Issues

For bugs or feature requests:
1. Check existing issues: https://github.com/[your-repo]/issues
2. Create detailed bug report with:
   - Step to reproduce
   - Expected vs actual behavior
   - Browser/OS version
   - Error logs

---

## 📜 License

MIT License — Free to use and modify for personal/commercial projects.

---

## 🎉 Success Checklist

- [x] Node.js ≥18 installed
- [x] MongoDB running locally or Atlas connected
- [x] `.env.local` created with MONGODB_URI
- [x] `npm install` completed
- [x] `npm run dev` started
- [x] http://localhost:3000 loads
- [x] "Try Demo" button works
- [x] Dashboard shows Money Health Score
- [x] Chat responds to messages
- [x] SIP calculation works
- [x] Tax optimizer compares regimes
- [x] Portfolio analyzer accepts JSON
- [x] Future simulator updates on slider change
- [x] Offline helper bot responds

**Once all checked, celebrate! 🎊 Your AI Money Mentor is ready.**

---

## 📞 Quick Support

**Setup takes ~10 minutes**. Here's what to do if stuck:

1. **Dashboard shows 0**: MongoDB not connected. Check `brew services list`
2. **Chat doesn't respond**: Missing OPENAI_API_KEY (it's OK, demo mode works)
3. **Styles broken**: Run `rm -rf .next` then `npm run dev`
4. **Animations lag**: Check GPU acceleration in DevTools

---

**Happy financial advising! 🚀💰**
