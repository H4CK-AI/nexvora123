import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { isSupabaseConfigured } from "@/integrations/supabase/client";

export const DebugInfo = () => {
  const envVars = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'https://hyxwzeclqmanosdpkxae.supabase.co',
    VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5eHd6ZWNscW1hbm9zZHBreGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMDQ2NTUsImV4cCI6MjA2OTU4MDY1NX0.Ij0r0wSyCXKjfmSzVut-ULRSzhAN499KWj1k1jhzCOg',
  };

  const isConfigured = isSupabaseConfigured();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Debug Information
          <Badge variant={isConfigured ? "default" : "destructive"}>
            {isConfigured ? "Configured" : "Not Configured"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <p className="text-sm font-medium">Environment Variables:</p>
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="text-xs">
              <span className="font-mono">{key}:</span>{" "}
              <Badge variant={value ? "secondary" : "destructive"}>
                {value ? "Set" : "Missing"}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Environment:</p>
          <Badge variant="outline">{import.meta.env.MODE}</Badge>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Base URL:</p>
          <Badge variant="outline">{import.meta.env.BASE_URL}</Badge>
        </div>

        {!isConfigured && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">
              Supabase is not properly configured. Please set the environment variables in your Vercel project settings.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 