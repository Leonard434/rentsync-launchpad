# RentSync Launchpad — Marketing Site

This is RentSync's **public marketing website** (TanStack Start / Vite / React, deployed as SSR). It is a **separate project** from the main RentSync application (property/tenant management, billing, IntaSend M-Pesa payments), which lives in a sibling repo at `D:\rent-management-system`.

## Relationship to the main app

This site is a **read-only public consumer** of the main app's Supabase backend — it has no database of its own and shares no codebase with the main app.

- Data source: Supabase project `bafupdjupuryvopclsoy` (same Supabase project as the main RentSync app)
- Access pattern: plain `fetch` calls to Postgres RPC functions via PostgREST (`${SUPABASE_URL}/rest/v1/rpc/<fn>`), using the public anon key — no `@supabase/supabase-js` dependency
- Client: `src/lib/vacantListings.ts`
- RPC functions consumed (all `SECURITY DEFINER`, public-safe by design in the main app's migrations):
  - `public_list_vacant_listings` — browse/search vacant listings
  - `public_get_vacant_listing` — single listing detail
  - `contact_vacant_listing_lead` — anonymous lead capture form submission
- Feature: "Vacant Listings" — public browse (`src/routes/listings/index.tsx`) and detail (`src/routes/listings/$id.tsx`) pages, surfaced in site nav (`SiteHeader`)
- The anon key embedded in `vacantListings.ts` is intentionally public (RLS/RPC-restricted server-side) — not a secret, don't treat exposure as an incident

## What NOT to do here

- Don't add IntaSend/payment code — that belongs entirely in the main app repo (`D:\rent-management-system`)
- Don't add auth, tenant/landlord dashboards, or anything beyond public marketing + listings browse — this is a public-facing site with no login
- If a listings feature needs a new data shape, the RPC function must be added/changed in the main app's Supabase migrations first, then this site's `vacantListings.ts` client updated to match

## Stack notes

- `npm run build` → Vite/TanStack Start SSR build, outputs to `.output/`
- `npm run dev` → dev server (has previously needed a full `node_modules` reinstall if `node_modules/.bin` is empty/incomplete — verify `vite` resolves before debugging further)
- Deployed via Vercel (auto-deploy on push to `main`)
