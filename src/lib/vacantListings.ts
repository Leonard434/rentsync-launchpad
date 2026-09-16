// Public read-only client for RentSync's vacant-listings data API.
// See the app repo's docs/vacant-listings-public-api.md for the full
// contract. Uses the Supabase anon key, which is safe to embed client-side
// (it's RLS/RPC-restricted server-side, not a secret) — no @supabase/supabase-js
// dependency needed for two simple RPC calls, so this just hits PostgREST
// directly with fetch.

const SUPABASE_URL = "https://bafupdjupuryvopclsoy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZnVwZGp1cHVyeXZvcGNsc295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjcwNDYsImV4cCI6MjA4OTQ0MzA0Nn0.MZS2dt0838hJ0xx0oSu5St6XUQsm3JN34luGrO_N-W8";

export type VacantListing = {
  id: number;
  title: string;
  description: string | null;
  rent: number;
  deposit: number;
  photos: string[];
  published_at: string;
  property_name: string;
  property_location: string;
  detailed_location: string | null;
  contact_phone: string | null;
  unit_type: string | null;
};

const MAX_DISPLAY_PHOTOS = 3;

export function displayPhotos(listing: Pick<VacantListing, "photos">): string[] {
  return (listing.photos ?? []).slice(0, MAX_DISPLAY_PHOTOS);
}

export function whatsappLink(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "254");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

async function callRpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(args),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.message || `${fn} failed (${response.status})`);
  }
  return response.json();
}

export function listVacantListings(
  params: {
    location?: string;
    unitType?: string;
    limit?: number;
    offset?: number;
  } = {},
): Promise<VacantListing[]> {
  return callRpc("public_list_vacant_listings", {
    p_location: params.location ?? null,
    p_unit_type: params.unitType ?? null,
    p_limit: params.limit ?? 20,
    p_offset: params.offset ?? 0,
  });
}

export async function getVacantListing(id: number): Promise<VacantListing | null> {
  const rows = await callRpc<VacantListing[]>("public_get_vacant_listing", { p_id: id });
  return rows[0] ?? null;
}

export function contactVacantListingLead(params: {
  listingId: number;
  name: string;
  phone: string;
  message?: string;
}): Promise<void> {
  return callRpc("contact_vacant_listing_lead", {
    p_listing_id: params.listingId,
    p_name: params.name,
    p_phone: params.phone,
    p_message: params.message ?? null,
  });
}

export function formatKes(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}
