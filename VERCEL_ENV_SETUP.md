# Vercel Environment Variables Setup Guide

## Problem
`.env` file gitignore mein hai, isliye Vercel pe environment variables automatically set nahi ho rahe.

## Solution: Manual Setup in Vercel

### Step 1: Vercel Dashboard mein jao
1. https://vercel.com/dashboard pe jao
2. Apne project pe click karo

### Step 2: Environment Variables add karein
1. **Settings** tab pe click karo
2. **Environment Variables** section mein jao
3. **Add New** button pe click karo

### Step 3: Variables add karein

**First Variable:**
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://hyxwzeclqmanosdpkxae.supabase.co`
- **Environment:** Production, Preview, Development (sab tick karo)

**Second Variable:**
- **Name:** `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5eHd6ZWNscW1hbm9zZHBreGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMDQ2NTUsImV4cCI6MjA2OTU4MDY1NX0.Ij0r0wSyCXKjfmSzVut-ULRSzhAN499KWj1k1jhzCOg`
- **Environment:** Production, Preview, Development (sab tick karo)

### Step 4: Save and Redeploy
1. **Save** button pe click karo
2. **Redeploy** button pe click karo
3. Wait karo deployment complete hone tak

### Step 5: Test karein
1. Apne Vercel URL pe jao
2. Login karo (nitish/nitish123)
3. Check karo ki data load ho raha hai ya nahi

## Alternative: Supabase CORS Settings

Agar phir bhi data load nahi ho raha, to Supabase CORS settings check karein:

1. Supabase Dashboard pe jao
2. **Settings** → **API**
3. **CORS Origins** mein apna Vercel URL add karo:
   - `https://your-project-name.vercel.app`
   - `https://your-project-name-git-main-your-username.vercel.app`

## Debug Information
Agar phir bhi problem hai, to browser console mein check karo:
1. F12 press karo
2. Console tab pe jao
3. Koi error messages dekh karo
4. Network tab mein Supabase API calls check karo 