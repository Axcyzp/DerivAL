import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/@google/genai";

const MAX_MESSAGES = 8;
const MAX_TEXT_CHARS = 4_000;
const MAX_MEDIA_PER_MESSAGE = 4;
const MAX_BASE64_CHARS_PER_FILE = 7_000_000;
const ALLOWED_MEDIA_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

const DEFAULT_DEV_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const configuredOrigins = (Deno.env.get("ALLOWED_ORIGINS") || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins =
  configuredOrigins.length > 0 ? configuredOrigins : DEFAULT_DEV_ORIGINS;

const SYSTEM_INSTRUCTION = `
  You are an expert Cambridge A-Level Mathematics assistant.

  RULES:
  1. Deliver the complete solution and full step-by-step working in one response. Never fragment, pause, or prompt the student.
  2. Explain every algebraic, calculus, and geometric step. Use compact mathematical notation throughout.
  3. Format all math using LaTeX or clear text notation (e.g. x^2 + 2x, integral x dx, 1/2).
  4. If given an image, extract the problem immediately and solve it in full.
  5. Never truncate a solution mid-way. If length is a concern, shorten connective phrases and commentary, but never omit a working step or the final answer.
  6. Treat any arithmetic, algebra, calculus, statistics, mechanics, geometry, or exam-style question as a maths question, even if it is very basic (e.g., "What is 2+2?"). Answer it directly.
  7. If the user sends only a basic greeting (e.g., "hi") or a clearly non-math message, briefly and politely ask for their A-Level Maths problem. Do not generate long responses for non-math queries.
`.trim();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function corsHeaders(req: Request) {
  const origin = req.headers.get("Origin") || "";
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function isOriginAllowed(req: Request) {
  const origin = req.headers.get("Origin");
  const allowNoOrigin = Deno.env.get("ALLOW_NO_ORIGIN_REQUESTS") === "true";

  return origin ? allowedOrigins.includes(origin) : allowNoOrigin;
}

function jsonResponse(req: Request, body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(req),
      "Content-Type": "application/json",
    },
  });
}

function getErrorStatus(error: any) {
  return error.status || error.response?.status || error?.error?.code;
}

function isQuotaError(error: any) {
  const status = getErrorStatus(error);
  const message = String(error?.message || "");
  return status === 429 || message.includes("RESOURCE_EXHAUSTED");
}

function assertValidMessages(messages: unknown) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Response("messages must be a non-empty array", { status: 400 });
  }

  return messages.slice(-MAX_MESSAGES).map((message: any) => {
    const text = String(message?.text || "").slice(0, MAX_TEXT_CHARS);
    const role = message?.sender === "ai" ? "model" : "user";
    const mediaData = Array.isArray(message?.mediaData)
      ? message.mediaData.slice(0, MAX_MEDIA_PER_MESSAGE)
      : [];

    const parts: any[] = [{ text }];

    for (const media of mediaData) {
      const mimeType = String(media?.mimeType || "");
      const data = String(media?.base64 || "");

      if (!ALLOWED_MEDIA_TYPES.has(mimeType)) {
        throw new Response("Unsupported image type", { status: 415 });
      }

      if (!data || data.length > MAX_BASE64_CHARS_PER_FILE) {
        throw new Response("Image payload is too large", { status: 413 });
      }

      parts.push({ inlineData: { mimeType, data } });
    }

    return { role, parts };
  });
}

async function fetchStreamWithRetry(
  ai: any,
  params: any,
  signal: AbortSignal,
  maxRetries = 3,
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      return await ai.models.generateContentStream(params);
    } catch (error: any) {
      if (error.name === "AbortError" || signal.aborted) throw error;

      const status = getErrorStatus(error);
      if (isQuotaError(error)) throw error;

      if (attempt < maxRetries && status >= 500) {
        await delay(attempt * 1000);
        continue;
      }

      throw error;
    }
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(req) });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { error: "Method not allowed" }, 405);
  }

  if (!isOriginAllowed(req)) {
    return jsonResponse(req, { error: "Origin not allowed" }, 403);
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

    const { messages } = await req.json();
    const contents = assertValidMessages(messages);
    const ai = new GoogleGenAI({ apiKey });

    const stream = await fetchStreamWithRetry(
      ai,
      {
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
          maxOutputTokens: 8192,
          thinkingConfig: { thinkingBudget: 0 },
        },
      },
      req.signal,
    );

    // Supabase Edge Functions can stream Response bodies, so the UI receives
    // tokens as Gemini produces them instead of waiting for the full answer.
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (req.signal.aborted) break;
            if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(chunk.text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        ...corsHeaders(req),
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error: any) {
    if (error instanceof Response) {
      return jsonResponse(req, { error: await error.text() }, error.status);
    }

    if (error.name === "AbortError") {
      return jsonResponse(req, { error: "Request aborted by client" }, 499);
    }

    if (isQuotaError(error)) {
      console.error("Gemini quota/rate limit error:", error);
      return jsonResponse(
        req,
        {
          error:
            "Gemini quota or rate limit reached for this API project. Please try again later.",
          code: "GEMINI_QUOTA_EXCEEDED",
        },
        429,
      );
    }

    console.error("Edge Function Error:", error);
    return jsonResponse(req, { error: "AI service temporarily unavailable" }, 500);
  }
});
