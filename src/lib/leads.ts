// Public write client for the "Let's Sync Your Rentals" signup form on the
// home page. Same anon-key-direct-to-PostgREST approach as vacantListings.ts
// (see that file's header comment) — no @supabase/supabase-js dependency
// needed for one RPC call.

const SUPABASE_URL = "https://bafupdjupuryvopclsoy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZnVwZGp1cHVyeXZvcGNsc295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjcwNDYsImV4cCI6MjA4OTQ0MzA0Nn0.MZS2dt0838hJ0xx0oSu5St6XUQsm3JN34luGrO_N-W8";

// A random per-browser id, not a real identity — just enough to stop one
// browser from resubmitting the form in a loop without rate-limiting every
// visitor together under one shared bucket (there's no server here to read a
// real IP from). sessionStorage rather than localStorage, so each fresh tab
// still gets a fair shot rather than being blocked by a prior visit's usage.
function getBrowserIdentity(): string {
  try {
    const key = "rentsync_lead_identity";
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

export async function submitSignupLead(params: {
  name: string;
  phone?: string;
  email: string;
  unitCount?: string;
  message: string;
}): Promise<void> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_signup_lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      p_name: params.name,
      p_phone: params.phone || null,
      p_email: params.email,
      p_unit_count: params.unitCount || null,
      p_message: params.message,
      p_identity: getBrowserIdentity(),
    }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.message || "Could not send your message.");
  }
}
