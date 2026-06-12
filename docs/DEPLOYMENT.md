# ChampFlimz - Deployment Guide

Complete deployment instructions for production environment.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Heroku/Railway)](#backend-deployment)
4. [Database Deployment (AWS RDS)](#database-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Logging](#monitoring--logging)
8. [Scaling](#scaling)

---

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] API keys obtained (TMDB, etc.)
- [ ] SSL certificates ready
- [ ] Domain name registered
- [ ] Analytics configured
- [ ] Error tracking setup (Sentry)
- [ ] Monitoring setup (New Relic/DataDog)
- [ ] Backup strategy in place

---

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub
# Then push
git remote add origin https://github.com/yourusername/champflimz-frontend.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Next.js

### Step 3: Configure Environment

In Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add production variables:

```
NEXT_PUBLIC_API_URL=https://api.champflimz.com/api
NEXT_PUBLIC_APP_URL=https://champflimz.com
NEXT_PUBLIC_APP_NAME=ChampFlimz
```

### Step 4: Deploy

```bash
# Push to main branch automatically deploys
git push origin main
```

**Deployment URL:** `https://champflimz.vercel.app`

### Step 5: Connect Custom Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `champflimz.com`)
3. Update DNS records at your domain provider
4. Vercel provides DNS records

---

## Backend Deployment

### Option A: Heroku (Deprecated Alternative)

> Note: Heroku removed free tier. Consider Railway or Render instead.

### Option B: Railway.app

#### Step 1: Prepare Code

```bash
# Create Procfile
echo "web: npm run build && npm start" > Procfile

# Add engines to package.json
{
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

#### Step 2: Connect to Railway

1. Visit [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Select "Deploy from GitHub"
5. Choose your backend repository

#### Step 3: Configure Environment

In Railway Dashboard:

1. Go to Variables
2. Add all environment variables:

```
DATABASE_URL=postgresql://user:pass@db.railway.internal:5432/champflimz
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
PORT=3000
NODE_ENV=production
TMDB_API_KEY=your_tmdb_key
FRONTEND_URL=https://champflimz.com
```

#### Step 4: Add PostgreSQL Database

1. In Railway Dashboard: New Service
2. Select PostgreSQL
3. Connect to project
4. Railway sets `DATABASE_URL` automatically

#### Step 5: Deploy

1. Push changes to GitHub
2. Railway auto-deploys on push

**API URL:** `https://champflimz-api.railway.app`

### Option C: Render.com

1. Visit [render.com](https://render.com)
2. Connect GitHub
3. Create new Web Service
4. Configure environment
5. Deploy

---

## Database Deployment

### AWS RDS PostgreSQL

#### Step 1: Create RDS Instance

```bash
# Via AWS Console:
1. RDS Dashboard → Create Database
2. Choose PostgreSQL (15)
3. Template: Free tier
4. DB Instance: db.t3.micro
5. Storage: 20GB
6. Public accessibility: Yes (for now)
```

#### Step 2: Security Groups

```bash
# Allow incoming traffic on port 5432
Security Group → Inbound Rules → Add Rule
Type: PostgreSQL
Source: Your IP or 0.0.0.0/0
```

#### Step 3: Create Database

```bash
# From your computer
psql -h your-rds-endpoint.rds.amazonaws.com \
     -U admin \
     -d postgres

# Create database
CREATE DATABASE champflimz;

# Create user
CREATE USER champflimz_user WITH PASSWORD 'secure_password_here';
GRANT ALL ON DATABASE champflimz TO champflimz_user;
```

#### Step 4: Update Connection String

```env
DATABASE_URL="postgresql://champflimz_user:password@your-rds-endpoint.rds.amazonaws.com:5432/champflimz"
```

#### Step 5: Run Migrations

```bash
cd backend
npm run prisma:migrate -- --skip-generate
```

---

## Environment Configuration

### Frontend (.env.production)

```env
NEXT_PUBLIC_API_URL=https://api.champflimz.com/api
NEXT_PUBLIC_APP_URL=https://champflimz.com
NEXT_PUBLIC_APP_NAME=ChampFlimz
```

### Backend (.env.production)

```env
DATABASE_URL=postgresql://user:pass@db.railway.internal/champflimz
JWT_SECRET=your-super-long-secret-key-min-32-chars
JWT_EXPIRE=7d
PORT=3000
NODE_ENV=production
TMDB_API_KEY=your_tmdb_api_key
FRONTEND_URL=https://champflimz.com
```

### SSL/HTTPS

- Vercel: Automatic SSL
- Railway: Automatic SSL
- Custom domain: Configure in DNS

---

## Post-Deployment

### Verify Deployment

```bash
# Test frontend
curl https://champflimz.com

# Test API
curl https://api.champflimz.com/api/health

# Expected response:
# {"status":"OK","timestamp":"..."}
```

### Database Migrations

```bash
# Run migrations on production
npm run prisma:migrate -- --skip-generate

# Or seed data
npm run prisma:seed
```

### Domain Configuration

**DNS Records:**
```
A     @             IPv4 address (from Vercel)
CNAME www          champflimz.vercel.app
A     api          Railway IP or CNAME
```

### Email Setup

For production emails (welcome, reset password):

```bash
# Install email service
npm install nodemailer

# Add SMTP credentials to .env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## Monitoring & Logging

### Error Tracking (Sentry)

#### Setup

```bash
# Install Sentry
npm install @sentry/node

# Frontend
npm install @sentry/react
```

#### Configure

**Backend (src/index.ts):**
```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.errorHandler());
```

**Frontend (app/layout.tsx):**
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

#### Get DSN

1. Create account at [sentry.io](https://sentry.io)
2. Create new project
3. Copy DSN
4. Add to environment variables

### Performance Monitoring

```bash
# Install New Relic
npm install newrelic

# Add to top of index.ts
require('newrelic');
```

### Logging

```bash
# Install logging service
npm install winston

# Configure logger
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});
```

---

## Scaling

### Database Optimization

```sql
-- Create indexes for faster queries
CREATE INDEX idx_movie_genre ON "Movie"(genre);
CREATE INDEX idx_movie_rating ON "Movie"(rating);
CREATE INDEX idx_watch_history_user ON "WatchHistory"("userId");
```

### Caching

```bash
# Install Redis
npm install redis

# Add cache layer
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
```

### CDN for Images

```bash
# Configure Cloudflare or AWS CloudFront
# Update image URLs to use CDN

// In Tailwind config
images: {
  domains: ['cdn.champflimz.com', 'api.champflimz.com'],
}
```

### Load Balancing

For multiple backend instances:

```bash
# Railway/Render handle this automatically
# Or use:
npm install express-sticky-session
```

---

## Backup Strategy

### Database Backups

```bash
# Automated backups (AWS RDS)
# Configured in AWS Console
# Daily backups retained for 30 days

# Manual backup
pg_dump -h endpoint -U admin champflimz > backup.sql

# Restore from backup
psql -h endpoint -U admin < backup.sql
```

### Code Backups

```bash
# GitHub is your backup
# Use GitHub Actions for automated backups
```

---

## Rollback Strategy

```bash
# If deployment fails, rollback:

# Vercel: Automatic rollback available
# Railway: Re-deploy previous version

# Database rollback
git revert commit-hash
npm run prisma:migrate -- --skip-generate
```

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation enforced
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection (React escaping)
- [ ] CSRF tokens implemented
- [ ] Secrets not in version control
- [ ] Environment variables secured
- [ ] Regular security audits
- [ ] Dependency updates scheduled
- [ ] Database encrypted
- [ ] Backups encrypted
- [ ] Logging configured
- [ ] Error tracking active

---

## Performance Optimization

```bash
# Frontend builds
npm run build

# Check bundle size
npm install --save-dev webpack-bundle-analyzer

# Optimize images
npm install next-image-export-optimizer

# Enable compression
npm install compression

# Database query optimization
npm run prisma:studio  # Analyze slow queries
```

---

## Support & Monitoring Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Railway Dashboard:** https://railway.app/dashboard
- **AWS Console:** https://console.aws.amazon.com
- **Sentry Dashboard:** https://sentry.io/dashboard
- **GitHub:** https://github.com/dashboard

---

## Troubleshooting

### Build Fails

```bash
# Check build logs
# Clear cache and rebuild

# Vercel: Clear cache in Settings
# Railway: Check logs in Dashboard
```

### Database Connection

```bash
# Check connection string
psql -c "SELECT version();"

# Verify credentials in .env
# Check security groups (AWS)
```

### High CPU Usage

```bash
# Optimize database queries
# Enable caching
# Increase server resources
# Railway: Upgrade instance type
```

### Out of Memory

```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=2048"

# Optimize code
# Consider database indexing
```

---

## Success Checklist

- ✅ Frontend deployed and accessible
- ✅ Backend API responding
- ✅ Database connected
- ✅ User registration working
- ✅ Movies loading
- ✅ Search functionality active
- ✅ Admin dashboard accessible
- ✅ Logging configured
- ✅ Error tracking active
- ✅ Backups scheduled
- ✅ Monitor alerts set up
- ✅ Performance metrics baseline

---

**Deployment Date:** January 2024
**Status:** Ready for Production
**Maintenance Window:** Weekly during off-peak hours

For additional help, contact DevOps team or visit our support portal.
