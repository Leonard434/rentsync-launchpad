// Server-only helpers for the AI assistant widget's backend, called from
// src/server.ts's manual route branch (this TanStack Start version has no
// file-based API routes — see the /sitemap.xml branch for the established
// precedent). Talks to the same Supabase project as vacantListings.ts, via
// plain fetch + the public anon key — this site owns no database of its own,
// so record_assistant_chat_attempt / log_assistant_conversation are the same
// SECURITY DEFINER RPCs the main app's api/assistant/chat.js calls (with a
// service-role key instead), giving one shared rate-limit + logging surface.
import { ASSISTANT_SYSTEM_PROMPT } from "./assistantKnowledge";

const SUPABASE_URL = "https://bafupdjupuryvopclsoy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZnVwZGp1cHVyeXZvcGNsc295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjcwNDYsImV4cCI6MjA4OTQ0MzA0Nn0.MZS2dt0838hJ0xx0oSu5St6XUQsm3JN34luGrO_N-W8";

const HF_ROUTER_URL = "https://router.huggingface.co/v1/chat/completions";
const MAX_HISTORY_TURNS = 6;
const MAX_LISTINGS_IN_CONTEXT = 40;

type ChatMessage = { role: "user" | "assistant"; content: string };

type VacantListingRow = {
  id: number;
  rent: number;
  units_available: number;
  property_location: string;
  detailed_location: string | null;
  unit_type: string | null;
};

async function callRpc(fn: string, args: Record<string, unknown>): Promise<Response> {
  return fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(args),
  });
}

// Same live-grounding approach as the main app's api/assistant/chat.js —
// see that file's formatListingsContext for the rationale. Duplicated here
// deliberately since these are separate codebases with no shared package.
function formatListingsContext(listings: VacantListingRow[]): string {
  if (!listings || listings.length === 0) {
    return "CURRENT VACANT LISTINGS: none published right now.";
  }
  const lines = listings.map((l) => {
    const location = l.detailed_location || l.property_location;
    return `#${l.id} | ${l.unit_type || "Unit"} | ${location} | KES ${l.rent}/mo | ${l.units_available} available | rentsync.co.ke/listings/${l.id}`;
  });
  return [
    "CURRENT VACANT LISTINGS (live snapshot, may be incomplete — direct the user to rentsync.co.ke/listings for the full, up-to-date list):",
    ...lines,
  ].join("\n");
}

export async function handleAssistantChat(request: Request): Promise<Response> {
  const hfToken = process.env.HUGGINGFACE_API_TOKEN;
  if (!hfToken) {
    return Response.json({ error: "Assistant is not configured yet" }, { status: 500 });
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) return Response.json({ error: "message is required" }, { status: 400 });

  const forwardedFor = request.headers.get("x-forwarded-for");
  const identity = `ip:${forwardedFor?.split(",")[0]?.trim() || "unknown"}`;

  const rateLimitResponse = await callRpc("record_assistant_chat_attempt", {
    p_identity: identity,
  });
  if (!rateLimitResponse.ok) {
    const err = await rateLimitResponse.json().catch(() => ({}));
    return Response.json({ error: err?.message || "Too many messages recently." }, { status: 429 });
  }

  const history: ChatMessage[] = Array.isArray(body.history)
    ? body.history
        .filter(
          (m: unknown): m is ChatMessage =>
            !!m &&
            typeof m === "object" &&
            ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
            typeof (m as ChatMessage).content === "string",
        )
        .slice(-MAX_HISTORY_TURNS)
    : [];

  const listingsResponse = await callRpc("public_list_vacant_listings", {
    p_location: null,
    p_unit_type: null,
    p_limit: MAX_LISTINGS_IN_CONTEXT,
    p_offset: 0,
  });
  const listings: VacantListingRow[] = listingsResponse.ok ? await listingsResponse.json() : [];

  const messages = [
    { role: "system", content: ASSISTANT_SYSTEM_PROMPT },
    { role: "system", content: formatListingsContext(listings) },
    ...history,
    { role: "user", content: message },
  ];

  let reply: string | undefined;
  try {
    const hfResponse = await fetch(HF_ROUTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${hfToken}` },
      body: JSON.stringify({
        // Qwen2.5 is not gated (unlike Meta's Llama models, which require
        // accepting a license on huggingface.co before they'll serve
        // inference) — a smoother zero-friction default for a free-tier setup.
        model: process.env.HUGGINGFACE_MODEL || "Qwen/Qwen2.5-7B-Instruct",
        messages,
        max_tokens: 400,
        temperature: 0.4,
      }),
    });
    const data = await hfResponse.json();
    if (!hfResponse.ok) {
      return Response.json(
        { error: data?.error?.message || data?.error || "Assistant request failed" },
        { status: 502 },
      );
    }
    reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply)
      return Response.json({ error: "Assistant returned an empty response" }, { status: 502 });
  } catch (error) {
    return Response.json(
      {
        error:
          "Could not reach the assistant: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 502 },
    );
  }

  callRpc("log_assistant_conversation", {
    p_source: "launchpad",
    p_question: message,
    p_answer: reply,
    p_landlord_id: null,
  }).catch((error) => console.error("Failed to log assistant conversation", error));

  return Response.json({ reply });
}
