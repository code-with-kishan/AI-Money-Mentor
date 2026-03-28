# 🚀 AI Money Mentor — Strict Vercel Deployment Guide

**This guide provides exact, numbered steps to deploy your Next.js app to Vercel. Follow each step in order.**

---

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] MongoDB Atlas account created
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB database user created
- [ ] Connection string copied from Atlas
- [ ] Vercel account created
- [ ] API keys ready (OpenAI, Google Gemini, etc.)

---

## ⚙️ PHASE 1: MongoDB Atlas Setup (10 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Sign up with email or Google
4. Complete verification

### Step 2: Create a Cluster
1. Log in to MongoDB Atlas Dashboard
2. Click **"Create"** (Project dropdown top-left)
3. Name: `AI Money Mentor`
4. Use free tier options
5. Click **"Create Project"**
6. Click **"Create"** (Deployment box)
7. Select **"M0 Shared"** (free tier)
8. Select **"AWS"** region closest to your users (e.g., `ap-southeast-1` for Asia)
9. Click **"Create Cluster"**
10. Wait 2-3 minutes for cluster to initialize

### Step 3: Create Database User
1. In Atlas Dashboard, go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. **Username**: `ai_mentor_user`
4. **Password**: Generate strong password (copy it)
5. **Database User Privileges**: `Read and write to any database`
6. Click **"Add User"**

### Step 4: Allow Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Select **"Allow access from anywhere"** (for Vercel)
4. Click **"Confirm"**
5. Click **"Allow"** in popup

### Step 5: Get Connection String
1. Go to **"Clusters"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Select **"Drivers"** tab
4. Copy the connection string
5. Replace `<username>` with `ai_mentor_user`
6. Replace `<password>` with your password
7. Replace `myFirstDatabase` with `ai-money-mentor`
8. **Example**: 
   ```
   mongodb+srv://ai_mentor_user:myPassword123@cluster0.xyz.mongodb.net/ai-money-mentor?retryWrites=true&w=majority
   ```
9. **Save this string** — you'll need it in Step 10

---

## 📦 PHASE 2: Git & GitHub Setup (5 minutes)

### Step 6: Ensure Git is Initialized
```bash
cd /Users/macbook/Code/AI\ Money\ Mentor
git status
```

If error, initialize git:
```bash
git init
git add .
git commit -m "Initial commit: AI Money Mentor fintech app"
```

### Step 7: Create GitHub Repository
1. Go to https://github.com/new
2. **Repository name**: `ai-money-mentor`
3. **Description**: `Smart Financial Advisor for India — AI agents, SIP calculator, tax optimizer, portfolio analyzer`
4. **Public** or **Private** (your choice)
5. Click **"Create repository"**
6. Follow GitHub's instructions to push your local code:
   ```bash
   git remote add origin https://github.com/<your-username>/ai-money-mentor.git
   git branch -M main
   git push -u origin main
   ```

### Step 8: Verify Code is on GitHub
- Visit https://github.com/your-username/ai-money-mentor
- Ensure all files are visible

---

## 🎯 PHASE 3: Vercel Deployment (10 minutes)

### Step 9: Sign In to Vercel
1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Sign In"**
3. Sign in with GitHub (recommended for auto-linking)

### Step 10: Import Project
1. Click **"New Project"** (top-left)
2. Under "Import Git Repository", click your GitHub repo
3. If repo doesn't appear, click **"Add GitHub App"** and authorize
4. Select `ai-money-mentor` repo
5. Click **"Import"**

### Step 11: Configure Project Settings
1. **Project Name**: `ai-money-mentor` (auto-filled)
2. **Framework**: Should auto-detect "Next.js" ✅
3. **Root Directory**: `./` (default) ✅
4. **Build Command**: `npm run build` (auto-detected) ✅
5. **Output Directory**: `.next` (auto-detected) ✅
6. **Install Command**: `npm ci` (auto-detected) ✅
7. Click **"Deploy"** (DO NOT CLICK YET — NEXT STEP)

### Step 12: Add Environment Variables (CRITICAL)
**BEFORE clicking "Deploy" in Step 11:**

1. In the Vercel import dialog, scroll down to **"Environment Variables"**
2. Add each variable:
   - **Name**: `MONGODB_URI`
   - **Value**: (your MongoDB Atlas connection string from Step 5)
   - Click **"Add"**
3. Add next variable:
   - **Name**: `MONGODB_DB`
   - **Value**: `ai-money-mentor`
   - Click **"Add"**
4. (Optional) Add API keys if you have them:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-...` (from OpenAI dashboard)
   - Click **"Add"**
5. (Optional) Add Google Gemini key:
   - **Name**: `GOOGLE_GEMINI_API_KEY`
   - **Value**: (from Google AI Studio)
   - Click **"Add"**

### Step 13: Deploy
1. Click **"Deploy"** button
2. Wait for build to complete (2-5 minutes)
3. When green checkmark appears, click **"Visit"** to see your live app

---

## ✅ PHASE 4: Post-Deployment Verification (5 minutes)

### Step 14: Test Your App
1. Visit the Vercel URL (e.g., `https://ai-money-mentor.vercel.app`)
2. Verify landing page loads
3. Test **"Try Demo"** button
4. Verify Dashboard loads with demo data
5. Test each feature:
   - ✅ AI Chat (type a question)
   - ✅ SIP Calculator
   - ✅ Tax Optimizer
   - ✅ Portfolio Analyzer
   - ✅ Future Simulator
   - ✅ Offline Helper Bot (bottom-right)

### Step 15: Check Vercel Logs
1. Go to your Vercel Dashboard
2. Click on `ai-money-mentor` project
3. Go to **"Deployments"**
4. Click latest deployment
5. Go to **"Logs"** tab
6. Expand **"Function Logs"** to see any errors
7. If MongoDB errors appear, verify connection string in Step 12

### Step 16: Enable Automatic Deployments
1. In Vercel Dashboard, go to **"Settings"**
2. Go to **"Git"** tab
3. Verify **"Deploy on push to main"** is enabled ✅
4. Now every `git push` will auto-deploy

---

## 🔧 Troubleshooting

### Issue: "Build failed"
- Check **Vercel logs** for the error
- Most common: Missing environment variable
- Go to **Settings → Environment Variables**, verify all are set

### Issue: "Cannot connect to MongoDB"
- Verify connection string in Vercel env vars (no typos)
- Check MongoDB Atlas IP whitelist includes Vercel IPs (0.0.0.0/0)
- Test locally with same connection string: `mongosh "<your-MONGODB_URI>"`

### Issue: "Chat not responding" or "API error"
- Set `OPENAI_API_KEY` in Vercel env vars
- Or app will run in demo mode (limited responses)
- Check Vercel function logs for errors

### Issue: "Styles not applying" (Tailwind)
- Clear Vercel cache: **Settings → Git → Clear build cache**
- Redeploy

### Issue: External images not loading
- Add domain to `next.config.ts` images.domains array
- Redeploy

---

## 📊 Monitor Your Deployment

### View Analytics
1. Vercel Dashboard → Project
2. Click **"Analytics"** tab
3. Monitor requests, errors, response time

### View Build History
1. Vercel Dashboard → Project
2. Click **"Deployments"**
3. See all past builds and their status

### Rollback to Previous Version
1. Vercel Dashboard → Project → **"Deployments"**
2. Click on a past successful deployment
3. Click **"Redeploy"**

---

## 🎉 You're Live!

Your app is now deployed to Vercel. Share the URL:
```
https://ai-money-mentor.vercel.app
```

Every time you `git push`, Vercel automatically redeploys.

---

## 📚 Additional Resources

- [Vercel Next.js Docs](https://vercel.com/docs/frameworks/nextjs)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

---

## 🆘 Need Help?

- Check Vercel logs: **Project → Deployments → Functions Logs**
- Check MongoDB status: https://status.mongodb.com
- Vercel Support: https://vercel.com/support
