# Deployment Guide

## ✅ Yes, 500MB images are fine for Vercel!

### Vercel Limits Breakdown

| Resource | Free Tier | Pro Tier | Your Usage |
|----------|-----------|----------|------------|
| **Bandwidth** | 100 GB/month | 1 TB/month | Depends on traffic |
| **Build Size** | 250 MB (functions only) | 250 MB | ~15 MB ✅ |
| **Static Files** | Unlimited | Unlimited | 500 MB ✅ |
| **Deployments** | Unlimited | Unlimited | ✅ |

**Your 500MB images = Static files = No problem!** ✅

### Image Optimization

Next.js automatically:
- Converts to WebP/AVIF (smaller file size)
- Generates responsive sizes
- Lazy loads images
- Caches on CDN
- Serves from edge network

**Real-world impact:**
- Your 2MB JPG → ~200KB WebP (10x smaller!)
- Only loaded when user scrolls to them
- Cached after first load

## 🚀 Deployment Steps

### 1. Prepare Repository

bash
cd sunlight-nextjs

# Initialize Git (if not already done)
git init

# Add .gitignore (already exists)
# This ignores node_modules, .env, .next, etc.

# Stage all files
git add .

# Commit
git commit -m "feat: SunLight Next.js - Section 1 complete

- Hero CTA slider with parallax animation
- Horizontal reveal join form
- Dark/Light mode with system detection
- Multilingual support (EN, HE, ES, FR, AR) with RTL
- Mobile-responsive with hamburger menu
- Prisma + SQLite database
- API endpoint for subscriptions"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/sunlight-nextjs.git
git branch -M main
git push -u origin main


### 2. Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Vercel auto-detects Next.js settings
5. Click **Deploy**

**No environment variables needed!** (SQLite file is included in deployment)

**Option B: Via CLI**

bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
# Production deployment:
vercel --prod


### 3. Post-Deployment

Your site will be live at:
https://sunlight-nextjs-YOUR_USERNAME.vercel.app

**Test checklist:**
- [ ] Homepage loads
- [ ] Hero slider animates
- [ ] Join form opens/closes
- [ ] Dark mode toggle works
- [ ] Language switcher works
- [ ] Submit form (test with your email)
- [ ] Check responsive on mobile

## 📊 Monitoring Usage

### View Analytics

Vercel Dashboard → Your Project → Analytics

Monitor:
- Page views
- Unique visitors
- Bandwidth usage
- Function invocations

### Bandwidth Estimate

**100 GB free bandwidth = how many visitors?**

Scenario 1: Small traffic
- 1 visitor loads homepage: ~3 MB (images + assets)
- 100 GB ÷ 3 MB = **~33,000 visitors/month** ✅

Scenario 2: Heavy browsing
- 1 visitor views 10 pages: ~10 MB
- 100 GB ÷ 10 MB = **~10,000 visitors/month** ✅

**If you exceed free tier:**
- Vercel will email you
- Upgrade to Pro ($20/mo) for 1 TB bandwidth
- Or optimize images further

## 🗄️ Database Options for Production

### Option 1: Keep SQLite (Simplest)

**Pros:**
- ✅ Zero setup
- ✅ Zero cost
- ✅ Included in deployment
- ✅ Fast reads

**Cons:**
- ❌ Limited writes (serverless env)
- ❌ Data resets on redeployment (unless using Vercel Blob)
- ❌ No concurrent writes

**Good for:**
- MVP testing
- Low-traffic sites (<100 subscribers/day)
- Read-heavy applications

### Option 2: Vercel Postgres

**Pros:**
- ✅ Integrated with Vercel
- ✅ Auto-configured
- ✅ Serverless-optimized
- ✅ Free tier: 256 MB storage

**Cons:**
- ❌ Requires schema changes (PostgreSQL not MySQL)
- ❌ Limited free tier

**Setup:**
bash
# In Vercel dashboard:
# 1. Storage → Create Database → Postgres
# 2. Copy DATABASE_URL
# 3. Update schema.prisma:

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# 4. Redeploy


### Option 3: PlanetScale (MySQL)

**Pros:**
- ✅ MySQL compatible (no schema changes!)
- ✅ Free tier: 5 GB storage, 1B reads/month
- ✅ Serverless-friendly
- ✅ Auto-scaling

**Cons:**
- ❌ External service

**Setup:**
1. Go to [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Add to Vercel env vars:

   DATABASE_URL="mysql://..."

5. Update schema.prisma:
   prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
     relationMode = "prisma" // Required for PlanetScale
   }

6. Deploy

### Option 4: Railway (Easiest MySQL)

**Pros:**
- ✅ Simple MySQL hosting
- ✅ $5/month flat rate
- ✅ Easy connection

**Cons:**
- ❌ Not free

**Setup:**
1. Go to [railway.app](https://railway.app)
2. New Project → Add MySQL
3. Copy DATABASE_URL
4. Add to Vercel env vars
5. Deploy

## 🔧 Advanced Configuration

### Custom Domain

In Vercel Dashboard:
1. Settings → Domains
2. Add domain: `sunlight.yourdomain.com`
3. Update DNS (Vercel provides instructions)
4. SSL auto-configured

### Performance Optimizations

**Already implemented:**
- ✅ Next.js Image component
- ✅ Lazy loading
- ✅ Code splitting
- ✅ Static generation for routes

**Future optimizations:**
- [ ] Image CDN (Cloudinary, ImageKit)
- [ ] Redis caching
- [ ] ISR (Incremental Static Regeneration)

### Error Monitoring

**Option 1: Vercel Analytics**
- Built-in
- Shows errors in dashboard

**Option 2: Sentry**
bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs


## 💰 Cost Breakdown

### Free Tier (Good for MVP)
- Vercel Hosting: **$0**
- Bandwidth: 100 GB/month
- SQLite: $0
- Custom domain: $0
- SSL: $0
- **Total: $0/month** ✅

### Production (Recommended)
- Vercel Pro: **$20/month**
  - 1 TB bandwidth
  - Analytics
  - Priority support
- PlanetScale: **$0** (free tier)
- **Total: $20/month**

### Scale (High Traffic)
- Vercel Pro: $20/month
- PlanetScale Scale: $29/month
- **Total: $49/month**

## 🎯 Launch Checklist

- [ ] Copy images to `public/images/`
- [ ] Test locally (`npm run dev`)
- [ ] Test build (`npm run build`)
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Test production URL
- [ ] Test form submission
- [ ] Check mobile responsive
- [ ] Test all 5 languages
- [ ] Monitor bandwidth for first week
- [ ] Add custom domain (optional)

---

**You're ready to launch!** 🚀

Questions? Check:
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
