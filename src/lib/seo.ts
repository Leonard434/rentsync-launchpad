// Shared SEO helpers: canonical URLs, slugs for programmatic location/unit-type
// landing pages, and JSON-LD builders. TanStack Start renders any meta entry
// shaped as `{ "script:ld+json": {...} }` as a `<script type="application/ld+json">`
// tag automatically (see @tanstack/react-router's headContentUtils) — no extra
// wiring needed beyond spreading these into a route's `head().meta` array.

export const SITE_URL = "https://rentsync.co.ke";
export const SITE_NAME = "RentSync";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// "Ndumberi, Kiambu" -> "ndumberi-kiambu". Reversible enough for RPC filtering
// (public_list_vacant_listings does an ILIKE, not an exact match) since we
// convert back to spaced words, not the exact original casing/punctuation.
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// "ndumberi-kiambu" -> "Ndumberi Kiambu" — good enough as an ILIKE search term
// and for display when we don't have the original string on hand.
export function unslugify(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function canonicalLink(path: string) {
  return { rel: "canonical", href: absoluteUrl(path) };
}

// TanStack Start's route `head().meta` type only declares standard HTML
// `<meta>` attributes, but @tanstack/react-router's headContentUtils
// specifically special-cases a `"script:ld+json"` key at runtime and renders
// it as a `<script type="application/ld+json">` tag (see
// node_modules/@tanstack/react-router/dist/esm/headContentUtils.js) — so this
// is deliberately typed as `any` to bridge that gap, not a type-safety hole.
export function ldJson(data: Record<string, unknown>): any {
  return { "script:ld+json": data };
}

export function organizationLd() {
  return ldJson({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/rentsync-logo.png"),
    description:
      "RentSync helps Kenyan landlords manage properties, tenants and rent collection — and publishes verified vacant houses, bedsitters and apartments for rent across Kenya.",
    areaServed: { "@type": "Country", name: "Kenya" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@rentsync.co.ke",
      areaServed: "KE",
    },
  });
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return ldJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  });
}

type ListingLike = {
  id: number;
  title: string;
  rent: number;
  photos: string[];
  detailed_location: string | null;
  property_location: string;
};

export function itemListLd(listings: ListingLike[]) {
  return ldJson({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: listings.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/listings/${l.id}`),
      name: l.title,
    })),
  });
}

type ApartmentListingLike = {
  id: number;
  title: string;
  description: string | null;
  rent: number;
  deposit: number;
  photos: string[];
  units_available: number;
  unit_type: string | null;
  property_location: string;
  detailed_location: string | null;
  published_at: string;
};

export function apartmentLd(listing: ApartmentListingLike) {
  const location = listing.detailed_location || listing.property_location;
  return ldJson({
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: listing.title,
    description:
      listing.description || `${listing.unit_type ?? "Unit"} for rent in ${location}, Kenya.`,
    image: listing.photos,
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
      addressRegion: listing.property_location,
      addressCountry: "KE",
    },
    numberOfRooms: listing.unit_type ?? undefined,
    offers: {
      "@type": "Offer",
      price: listing.rent,
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/listings/${listing.id}`),
      priceValidUntil: undefined,
    },
  });
}
