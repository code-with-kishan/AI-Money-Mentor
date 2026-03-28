# ✅ Vercel Deployment Checklist

**Use this checklist to track your deployment progress.**

---

## Pre-Deployment Phase

- [ ] **Git Repository Created**
  - Repository pushed to GitHub/GitLab/Bitbucket
  - All code committed and pushed

- [ ] **MongoDB Atlas Setup**
  - Atlas account created
  - Cluster created (M0 free tier)
  - Database user created (`ai_mentor_user`)
  - Network access configured (0.0.0.0/0)
  - Connection string copied

- [ ] **Environment Files Ready**
  - `.env` file updated for local dev
  - `.env.vercel.example` reviewed
  - API keys collected (optional)

---

## Deployment Phase

- [ ] **Step 1: Vercel Account**
  - Vercel account created
  - GitHub connected

- [ ] **Step 2: Import Project**
  - Project imported to Vercel
  - Repository linked

- [ ] **Step 3: Environment Variables Set**
  - `MONGODB_URI` added
  - `MONGODB_DB` added
  - API keys added (if available)

- [ ] **Step 4: Initial Deployment**
  - First deployment triggered
  - Build completed successfully (green checkmark)
  - Vercel URL generated

---

## Post-Deployment Verification

- [ ] **Landing Page Loads**
  - Visit Vercel URL
  - Page loads without errors
  - Animations visible

- [ ] **Demo Feature Works**
  - Click "Try Demo"
  - Demo data loads
  - Dashboard displays

- [ ] **Database Connected**
  - Dashboard shows Money Health Score (not 0)
  - Demo profile loaded from MongoDB

- [ ] **AI Chat Works**
  - Chat page accessible
  - Can send messages
  - Receiving responses

- [ ] **All Features Tested**
  - ✅ Dashboard
  - ✅ AI Chat
  - ✅ SIP Calculator
  - ✅ Tax Optimizer
  - ✅ Portfolio Analyzer
  - ✅ Future Simulator
  - ✅ Offline Helper Bot

- [ ] **No Errors in Logs**
  - Vercel logs checked
  - No 500 errors
  - MongoDB connection successful

---

## Post-Deployment Configuration

- [ ] **Auto-Deployments Enabled**
  - Settings → Git → "Deploy on push" enabled
  - Test: Push a commit, verify auto-deploy

- [ ] **Domain Setup (Optional)**
  - Custom domain configured
  - SSL certificate active

- [ ] **Analytics Monitored**
  - Vercel Analytics viewed
  - Request counts visible

- [ ] **Backup Plan**
  - MongoDB backup enabled
  - Deployment rollback understood

---

## Troubleshooting (if issues occur)

- [ ] **MongoDB Connection Issues**
  - Connection string verified in Vercel
  - IP whitelist checked in Atlas
  - Database user password confirmed

- [ ] **Build Failures**
  - Build logs reviewed
  - Dependencies verified
  - Environment variables double-checked

- [ ] **API Errors**
  - Function logs reviewed in Vercel
  - OpenAI key configured (if used)
  - Error messages investigated

---

## Resources

- 📖 Full Guide: See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
- 🔗 Next.js Docs: https://vercel.com/docs/frameworks/nextjs
- 🔗 MongoDB Docs: https://www.mongodb.com/docs/atlas/
- 🔗 Vercel Docs: https://vercel.com/docs

---

**Status**: Ready to deploy ✅
