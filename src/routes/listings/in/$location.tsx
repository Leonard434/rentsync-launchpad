import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Home as HomeIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import UnitTypeIcon from "@/components/UnitTypeIcon";
import { Badge } from "@/components/ui/badge";
import {
  listVacantListings,
  formatKes,
  displayPhotos,
  type VacantListing,
} from "@/lib/vacantListings";
import { breadcrumbLd, canonicalLink, itemListLd, slugify, unslugify } from "@/lib/seo";

export const Route = createFileRoute("/listings/in/$location")({
  loader: async ({ params }) => {
    const location = unslugify(params.location);
    const listings = await listVacantListings({ location, limit: 50 });
    return { listings, location };
  },
  head: ({ loaderData, params }) => {
    const location = loaderData?.location ?? unslugify(params.location);
    const count = loaderData?.listings.length ?? 0;
    const title = `Vacant Houses for Rent in ${location}, Kenya: Bedsitters & Apartments | RentSync`;
    const description = `${
      count > 0 ? `${count} vacant unit${count === 1 ? "" : "s"}` : "Browse vacant houses"
    } for rent in ${location}, including bedsitters, single rooms and apartments listed by verified RentSync landlords. Never pay before viewing.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        ...(loaderData?.listings.length ? [itemListLd(loaderData.listings)] : []),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Vacant Listings", path: "/listings" },
          { name: location, path: `/listings/in/${params.location}` },
        ]),
      ],
      links: [canonicalLink(`/listings/in/${params.location}`)],
    };
  },
  component: LocationListings,
});

function ListingCard({ listing }: { listing: VacantListing }) {
  const photo = displayPhotos(listing)[0];
  const location = listing.detailed_location || listing.property_location;
  return (
    <Link
      to="/listings/$id"
      params={{ id: String(listing.id) }}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {photo ? (
          <img
            src={photo}
            alt={listing.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <UnitTypeIcon unitType={listing.unit_type} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="mt-1 text-base font-semibold text-slate-900">{listing.title}</h3>
          {listing.units_available > 1 && (
            <Badge variant="secondary" className="shrink-0 bg-brand-100 text-brand-700">
              {listing.units_available} available
            </Badge>
          )}
        </div>
        <p className="flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" /> {location}
        </p>
        <p className="mt-2 text-lg font-bold text-[#0b1f3f]">
          {formatKes(listing.rent)}
          <span className="text-sm font-medium text-slate-500">/month</span>
        </p>
      </div>
    </Link>
  );
}

function LocationListings() {
  const { listings, location } = Route.useLoaderData();

  const unitTypes = useMemo(
    () => Array.from(new Set(listings.map((l) => l.unit_type).filter(Boolean))) as string[],
    [listings],
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-[#0b1f3f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav className="mb-3 text-xs text-slate-400">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            {" / "}
            <Link to="/listings" className="hover:text-white">
              Vacant Listings
            </Link>
            {" / "}
            <span className="text-slate-300">{location}</span>
          </nav>
          <h1 className="font-serif-display text-4xl sm:text-5xl">
            Vacant Houses for Rent in {location}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            {listings.length > 0
              ? `${listings.length} vacant unit${listings.length === 1 ? "" : "s"} in ${location} from verified, active RentSync landlords.`
              : `No vacant units in ${location} right now. Check back soon, or browse all listings across Kenya.`}{" "}
            Never send money before viewing the property in person.
          </p>
          {unitTypes.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {unitTypes.map((t) => (
                <Link
                  key={t}
                  to="/listings/type/$unitType"
                  params={{ unitType: slugify(t) }}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-brand-300 hover:text-white"
                >
                  {t} in {location}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {listings.length === 0 ? (
          <div className="py-24 text-center">
            <HomeIcon className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-4 text-lg font-semibold text-slate-700">
              No vacant units listed in {location} right now
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              <Link to="/listings" className="text-brand-600 hover:underline">
                Browse all vacant listings across Kenya
              </Link>{" "}
              instead.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
