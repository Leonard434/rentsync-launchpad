import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Home as HomeIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { listVacantListings, formatKes, type VacantListing } from "@/lib/vacantListings";

export const Route = createFileRoute("/listings/")({
  loader: async () => {
    const listings = await listVacantListings({ limit: 24 });
    return { listings };
  },
  head: () => ({
    meta: [
      { title: "Vacant Houses for Rent in Kenya — RentSync Listings" },
      {
        name: "description",
        content:
          "Browse vacant bedsitters, single rooms and apartments for rent across Kenya, listed by verified RentSync landlords. Never pay before viewing.",
      },
      { property: "og:title", content: "Vacant Houses for Rent — RentSync Listings" },
      {
        property: "og:description",
        content: "Browse vacant units listed by verified, active RentSync landlords across Kenya.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ListingsIndex,
});

function ListingCard({ listing }: { listing: VacantListing }) {
  const photo = listing.photos?.[0];
  return (
    <Link
      to="/listings/$id"
      params={{ id: String(listing.id) }}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
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
            <HomeIcon className="h-12 w-12" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {listing.unit_type && (
          <span className="w-fit rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-700">
            {listing.unit_type}
          </span>
        )}
        <h3 className="mt-1 text-base font-semibold text-slate-900">{listing.title}</h3>
        <p className="flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" /> {listing.property_location}
        </p>
        <p className="mt-2 text-lg font-bold text-[#0b1f3f]">
          {formatKes(listing.rent)}<span className="text-sm font-medium text-slate-500">/month</span>
        </p>
      </div>
    </Link>
  );
}

function ListingsIndex() {
  const { listings } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-[#0b1f3f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="font-serif-display text-4xl sm:text-5xl">Vacant Houses for Rent</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Every listing here comes from a verified, active RentSync landlord — never send money
            before viewing the property in person.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {listings.length === 0 ? (
          <div className="py-24 text-center">
            <HomeIcon className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-4 text-lg font-semibold text-slate-700">No vacant units listed right now</h2>
            <p className="mt-1 text-sm text-slate-500">Check back soon — new listings are added regularly.</p>
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
