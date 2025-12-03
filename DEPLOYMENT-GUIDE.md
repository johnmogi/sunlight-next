# SunLight Tarot - Deployment Guide

## Database Setup for Production

Your database tables (`votes` and `comments`) don't exist in production yet. Here's how to fix it:

### Option 1: Apply Migrations via Vercel (Recommended)

1. **Add Build Command in Vercel Dashboard:**
   - Go to: https://vercel.com/johnmogis-projects/sunlight-next/settings/general
   - Scroll to "Build & Development Settings"
   - Override the build command with:
     ```bash
     npx prisma migrate deploy && npm run build
     ```
   - This will apply migrations before each build

2. **Or use Vercel CLI:**
   ```bash
   # Set production database URL
   vercel env add DATABASE_URL production
   # Paste your production database URL when prompted

   # Deploy with migrations
   vercel --prod
   ```

### Option 2: Apply Migrations Manually

Run this command with your **production** database URL:

```bash
# Temporarily set production DB
export DATABASE_URL="your-production-postgres-url"

# Apply migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### Option 3: Push Schema Directly (Quick Fix)

```bash
# Set production database URL
export DATABASE_URL="postgres://ad63dace034dace97b71e7a0e1c86016c0c1ba7f6060453de26ca9e665a1dcba:sk_NunHq2jpmBu5KwIBqVHkf@db.prisma.io:5432/postgres?sslmode=require"

# Push schema to production database
npx prisma db push --accept-data-loss
```

**Warning:** `db push` is good for development but `migrate deploy` is better for production.

## Verify Tables Were Created

After applying migrations, verify with:

```bash
npx prisma studio
```

Or connect directly to your database and check:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

You should see:
- `subscribers`
- `comments`
- `votes`

## Environment Variables Checklist

Make sure these are set in Vercel:

- ✅ `DATABASE_URL` - Your PostgreSQL connection string
- ✅ (Optional) `DIRECT_URL` - Direct database URL if using Prisma Accelerate

## Current Migration

The migration file is located at:
`prisma/migrations/20251203045626_add_vote_type_field/migration.sql`

It creates:
- **subscribers** table (for email subscriptions)
- **comments** table (for card comments)
- **votes** table (for card voting with like/dislike/love)

## Troubleshooting

### "Table does not exist" errors

This means migrations haven't been applied to production. Use Option 1 or 2 above.

### "Migration already applied" but tables still missing

Your local DB and production DB are different. Make sure you're using the production DATABASE_URL when applying migrations.

### Permission errors

Ensure your database user has CREATE TABLE permissions.

## Quick Deploy Script

```bash
#!/bin/bash
# deploy-with-migrations.sh

echo "🗄️  Applying database migrations..."
npx prisma migrate deploy

echo "📦 Building application..."
npm run build

echo "🚀 Deploying to Vercel..."
vercel --prod
```

Make it executable:
```bash
chmod +x deploy-with-migrations.sh
./deploy-with-migrations.sh
```

---

## Media Tab - Suno Album

The Suno album tab now shows a "Coming Soon" placeholder. When you have the published link (YouTube or other), let me know and I'll update it to embed the content!

Just provide:
- The platform (YouTube, Suno, SoundCloud, etc.)
- The URL or embed code
