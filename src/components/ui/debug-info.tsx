import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { isSupabaseConfigured } from "@/integrations/supabase/client";

export const DebugInfo = () => {
  const envVars = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
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
              {value && (
                <div className="text-xs text-muted-foreground mt-1">
                  Value: {value.substring(0, 20)}...
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Environment:</p>
          <div className="flex gap-2">
            <Badge variant="outline">{import.meta.env.MODE}</Badge>
            <Badge variant={import.meta.env.DEV ? "secondary" : "default"}>
              {import.meta.env.DEV ? "Development" : "Production"}
            </Badge>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Base URL:</p>
          <Badge variant="outline">{import.meta.env.BASE_URL}</Badge>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Current URL:</p>
          <Badge variant="outline">{window.location.href}</Badge>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Build Time:</p>
          <Badge variant="outline">{import.meta.env.BUILD_TIME || 'Unknown'}</Badge>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Configuration Status:</p>
          <div className="text-xs space-y-1">
            <div>Environment Variables Set: {(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) ? "Yes" : "No"}</div>
            <div>Environment Mode: {import.meta.env.MODE}</div>
            <div>Is Development: {import.meta.env.DEV ? "Yes" : "No"}</div>
          </div>
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