# Environment Variables Setup Guide

## Local Development

1. **Create a `.env` file in the project root:**
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
   ```

2. **Get your Supabase credentials:**
   - Go to your Supabase project dashboard
   - Settings → API
   - Copy the "Project URL" and "anon public" key

## Vercel Deployment

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your project

2. **Add Environment Variables:**
   - Settings → Environment Variables
   - Add these variables:

   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co`
   - Environment: Production, Preview, Development

   **Variable 2:**
   - Name: `VITE_SUPABASE_PUBLISHABLE_KEY`
   - Value: `your-supabase-anon-key`
   - Environment: Production, Preview, Development

3. **Redeploy your project**

## Important Notes

- The `.env` file is in `.gitignore` and won't be committed to git
- Environment variables are required - the app will show an error if they're missing
- Make sure your Supabase project has proper CORS settings for your Vercel domain 