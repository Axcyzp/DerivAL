# Security Notes

## Secrets

Do not commit real `.env` files, Supabase service-role keys, Gemini API keys, or provider tokens. Use `.env.example` for documentation and configure production secrets in the deployment platform or Supabase dashboard.

## Supabase

The frontend uses a public Supabase key. That is expected for browser apps, but the database must enforce Row Level Security. Public policies should only expose read access for past-paper metadata and public storage objects.

## AI Endpoint

The Gemini API key lives in the `gemini-chat` Supabase Edge Function, never in the React bundle. Set `ALLOWED_ORIGINS` for production and consider authentication or usage limits before allowing broad public access.
By default, requests without an `Origin` header are rejected by the function. Only set `ALLOW_NO_ORIGIN_REQUESTS=true` if you intentionally need trusted server-to-server calls.

## Reporting Issues

If you find a security issue, do not open a public GitHub issue with exploit details. Contact the project owner privately first.
