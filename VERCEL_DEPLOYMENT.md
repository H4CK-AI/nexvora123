# Vercel Deployment Guide

## Environment Variables Setup

### Step 1: Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Environment Variables
Add these two variables:

**Variable Name:** `VITE_SUPABASE_URL`
**Value:** `https://hyxwzeclqmanosdpkxae.supabase.co`
**Environment:** Production, Preview, Development

**Variable Name:** `VITE_SUPABASE_PUBLISHABLE_KEY`
**Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5eHd6ZWNscW1hbm9zZHBreGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMDQ2NTUsImV4cCI6MjA2OTU4MDY1NX0.Ij0r0wSyCXKjfmSzVut-ULRSzhAN499KWj1k1jhzCOg`
**Environment:** Production, Preview, Development

### Step 3: Redeploy
After adding environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on your latest deployment

## Supabase Configuration

### CORS Settings
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Add your Vercel domain to CORS:
   - `https://your-project.vercel.app`
   - `https://your-project.vercel.app/*`

### RLS Policies
Make sure your tables have proper RLS policies for anonymous access if needed.

## Troubleshooting

### If data still doesn't load:
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Check Supabase project is active
4. Verify CORS settings
5. Check RLS policies

### Common Issues:
- **White screen**: Environment variables not set
- **CORS errors**: Domain not added to Supabase CORS
- **Authentication errors**: RLS policies too restrictive
- **404 errors**: Supabase project paused or deleted 