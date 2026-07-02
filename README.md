# DerivAL

DerivAL is a React app for Cambridge A-Level Mathematics. It combines a past-paper viewer with a Gemini-powered AI assistant for worked maths solutions.

## Features

- Browse A-Level Maths past papers by paper, year, series, and variant.
- Open or download question papers and mark schemes from Supabase Storage.
- Ask the AI assistant text/image-based maths questions with streamed responses.
- Responsive layout for desktop and mobile.

## Tech Stack

- React
- Supabase Database, Storage, and Edge Functions
- Google Gemini API
- KaTeX and React Markdown for maths rendering

## Project Structure

```text
src/
  components/        Reusable UI grouped by feature/domain
    aiAssistant/     Chat UI, bubbles, media preview, and input controls
    appShell/        Shared layout and navigation
    common/          Small reusable primitives and hooks
    home/            Homepage feature-card UI
    pastPapers/      Past-paper viewer UI
  config/            Runtime environment configuration
  pages/             Route-level screens
  services/          External service clients
  utils/             Shared helper functions
  App.js             Routes
  index.js           React entry point

supabase/
  functions/         Supabase Edge Functions
  config.toml        Local Supabase configuration
```

## Environment Setup

Create a local `.env.local` file based on `.env.example`:

```env
REACT_APP_SUPABASE_URL=https://your-project-ref.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-publishable-or-anon-key
```

For the Supabase Edge Function, set these secrets in Supabase:

```text
GEMINI_API_KEY=your-gemini-api-key
ALLOWED_ORIGINS=https://your-production-domain.com,http://localhost:3000
```

`ALLOWED_ORIGINS` is important for public deployment. Without your production domain in that list, the AI assistant endpoint should reject browser calls from the deployed site.
Leave `ALLOW_NO_ORIGIN_REQUESTS` unset in production unless you intentionally need server-to-server calls to the AI endpoint.

## Available Scripts

```bash
npm start
npm run build
npm test
```

## Deployment Checklist

- Keep `.env.local` private. Only commit `.env.example`.
- Enable Row Level Security on Supabase tables and allow public reads only for data the app genuinely needs.
- Keep the `past-papers` storage bucket public only if every file inside it is intended to be public.
- Deploy the `gemini-chat` Edge Function with `GEMINI_API_KEY` and `ALLOWED_ORIGINS` set.
- Consider usage limits or authentication before promoting the AI assistant beyond beta, because public AI endpoints can consume quota quickly.
- Run `npm run build` before deployment.

## Security Notes

The Supabase publishable/anon key is safe to use in the browser only when Supabase policies are configured correctly. Never expose a service-role key or Gemini API key in React code.
