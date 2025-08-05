# Nexvora Dashboard

A comprehensive business management dashboard built with React, TypeScript, and Supabase.

## Features

- **CRM Module**: Client management and relationship tracking
- **Finance Module**: Revenue tracking and financial analytics
- **Compliance Module**: Regulatory compliance management
- **Task Module**: Project and task management
- **Team Module**: Employee and team management
- **Analytics**: Comprehensive business insights and reporting

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Supabase for backend and database
- React Query for data fetching
- React Router for navigation
- Shadcn/ui for UI components

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```
4. Run the development server: `npm run dev`

## Deployment on Vercel

### Environment Variables Setup

To deploy on Vercel, you need to set the following environment variables in your Vercel project settings:

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

   **Variable Name:** `VITE_SUPABASE_URL`
   **Value:** Your Supabase project URL
   **Environment:** Production, Preview, Development

   **Variable Name:** `VITE_SUPABASE_PUBLISHABLE_KEY`
   **Value:** Your Supabase anon/public key
   **Environment:** Production, Preview, Development

### Supabase Configuration

Make sure your Supabase project has:
1. Proper Row Level Security (RLS) policies configured
2. CORS settings allowing your Vercel domain
3. Database tables created and populated

### Common Issues

If data is not loading on Vercel:
1. Check that environment variables are correctly set
2. Verify Supabase RLS policies allow anonymous access (if needed)
3. Check browser console for CORS errors
4. Ensure your Supabase project is active and not paused

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── analytics/      # Analytics components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard components
│   ├── modals/        # Modal components
│   ├── modules/       # Feature modules
│   └── ui/           # Base UI components
├── hooks/            # Custom React hooks
├── integrations/     # External service integrations
│   └── supabase/    # Supabase configuration
├── lib/             # Utility functions
└── pages/           # Page components
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
