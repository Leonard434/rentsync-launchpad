import { listVacantListings } from "./vacantListings";
import { SITE_URL, slugify } from "./seo";

type UrlEntry = { path: string; lastmod?: string; changefreq?: string; priority?: string };

function xmlEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlTag(entry: UrlEntry): string {
  const parts = [`<loc>${xmlEscape(`${SITE_URL}${entry.path}`)}</loc>`];
  if (entry.lastmod) parts.push(`<lastmod>${entry.lastmod}</lastmod>`);
  if (entry.changefreq) parts.push(`<changefreq>${entry.changefreq}</changefreq>`);
  if (entry.priority) parts.push(`<priority>${entry.priority}</priority>`);
  return `<url>${parts.join("")}</url>`;
}

// Pulls the live vacant-listings set once and derives per-listing,
// per-location and per-unit-type landing page URLs from it, so the sitemap
// always reflects units that are actually published right now rather than a
// stale precomputed list (listings churn constantly as tenants move in/out).
export async function buildSitemapXml(): Promise<string> {
  const today = new Date().toISOString().slice(0, 10);
  const entries: UrlEntry[] = [
    { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
    { path: "/listings", changefreq: "hourly", priority: "0.9", lastmod: today },
  ];

  let listings: Awaited<ReturnType<typeof listVacantListings>> = [];
  try {
    listings = await listVacantListings({ limit: 200 });
  } catch (error) {
    console.error("sitemap: failed to fetch vacant listings", error);
  }

  const locations = new Set<string>();
  const unitTypes = new Set<string>();

  for (const listing of listings) {
    entries.push({
      path: `/listings/${listing.id}`,
      lastmod: listing.published_at?.slice(0, 10) ?? today,
      changefreq: "daily",
      priority: "0.8",
    });
    const location = listing.detailed_location || listing.property_location;
    if (location) locations.add(location);
    if (listing.unit_type) unitTypes.add(listing.unit_type);
  }

  for (const location of locations) {
    entries.push({
      path: `/listings/in/${slugify(location)}`,
      changefreq: "daily",
      priority: "0.7",
      lastmod: today,
    });
  }

  for (const unitType of unitTypes) {
    entries.push({
      path: `/listings/type/${slugify(unitType)}`,
      changefreq: "daily",
      priority: "0.7",
      lastmod: today,
    });
  }

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries
    .map(urlTag)
    .join("")}</urlset>`;
}
