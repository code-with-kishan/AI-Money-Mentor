# 🚀 Quick Start Guide (5 Minutes)

## Before You Start
- Node.js 18+ installed? → `node --version`
- MongoDB running? → `brew services list` (or use Atlas)

## Step 1: Install Dependencies (1 min)
```bash
cd /Users/macbook/Code/AI\ Money\ Mentor/ai-money-mentor
npm install
```

## Step 2: Create `.env.local` (30 seconds)
```bash
cat > .env.local << 'EOF'
# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/ai-money-mentor
MONGODB_DB=ai-money-mentor

# OpenAI (optional - get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-proj-xxxxx
OPENAI_MODEL=gpt-4o-mini
EOF
```

## Step 3: Make Sure MongoDB is Running (30 seconds)
```bash
# If not running:
brew services start mongodb-community

# Verify:
mongosh
exit
```

## Step 4: Start the App (30 seconds)
```bash
npm run dev
```

Open: **http://localhost:3000**

## Step 5: Try the Demo (2 minutes)
1. Click **"Try Demo"** button
2. Wait 3 seconds for data to load
3. You're now on the Dashboard with sample data!

## What to Try Next
- **Dashboard**: See your Money Health Score (≈75)
- **AI Chat**: Ask "How much should I invest?" 
- **SIP Planner**: Calculate ₹15,000/month at 12% for 10 years
- **Tax Optimizer**: Compare old vs new tax regime
- **Portfolio**: Upload sample holdings JSON
- **Future Simulator**: Drag sliders to see wealth projection
- **Help Bot**: Click bottom-right "?" for offline guidance

---

## 🐛 If Something Doesn't Work

| Problem | Solution |
|---------|----------|
| Dashboard shows 0 | MongoDB isn't running: `brew services start mongodb-community` |
| Chat doesn't respond | Missing OPENAI_API_KEY in `.env.local` (OK, demo works anyway) |
| Styles look broken | `rm -rf .next` then restart `npm run dev` |
| Port 3000 in use | `kill -9 $(lsof -ti:3000)` or use `PORT=3001 npm run dev` |

---

## ✅ Success Indicators
- Page loads with dark theme + blue gradients
- "Try Demo" button works
- Dashboard shows ₹1.8M salary, ₹87K savings
- Chat responds to messages
- Sliders are smooth and responsive

**That's it! You're done.** For detailed setup, see [SETUP.md](./SETUP.md).
