# Database Setup Guide for Vercel Deployment

## The Problem
SQLite doesn't work on Vercel because serverless functions have ephemeral, read-only filesystems.

## Solution: Vercel Postgres

### 1. Create Database in Vercel (Web UI)

1. Go to https://vercel.com/dashboard
2. Select your project (`sunlight-nextjs`)
3. Click **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Name it (e.g., `sunlight-db`)
7. Select your preferred region
8. Click **Create**

### 2. Get Environment Variables

After creating the database, Vercel will show you environment variables like:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

These are **automatically added** to your production environment.

### 3. For Local Development

Pull the environment variables from Vercel to your local machine:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local
```

This creates a `.env.local` file with your database credentials.

### 4. Run Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Or use migrations for production
npx prisma migrate dev --name init
```

### 5. Deploy

```bash
# Commit changes
git add .
git commit -m "Migrate to Postgres for Vercel deployment"

# Push to trigger Vercel deployment
git push
```

## Verification

After deployment, check:
1. Vercel deployment logs for errors
2. Try your app's database features
3. Check Vercel Postgres dashboard for data

## Alternative: Use Vercel's Development Database Locally

If you don't want to set up local Postgres:

1. Use Vercel's database for development (not recommended for large teams)
2. Or use a local Postgres with Docker:

```bash
# Create docker-compose.yml
docker-compose up -d

# Update .env.local with local connection string
POSTGRES_PRISMA_URL="postgresql://postgres:postgres@localhost:5432/sunlight"
POSTGRES_URL_NON_POOLING="postgresql://postgres:postgres@localhost:5432/sunlight"
```

## Files Changed

✅ `prisma/schema.prisma` - Updated to use PostgreSQL
✅ `lib/prisma.ts` - Already configured for serverless
✅ `.env.example` - Updated with new variables

## Need Help?

If you get stuck:
1. Check Vercel dashboard → Storage → Your database → Logs
2. Check your deployment logs in Vercel
3. Verify environment variables are set in Vercel → Settings → Environment Variables
