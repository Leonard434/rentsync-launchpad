import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { MapPin, Home as HomeIcon, SlidersHorizontal, X, Search } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import UnitTypeIcon from "@/components/UnitTypeIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { listVacantListings, formatKes, displayPhotos, type VacantListing } from "@/lib/vacantListings";
import { breadcrumbLd, canonicalLink, itemListLd, slugify } from "@/lib/seo";

const searchSchema = z.object({
  q: z.string().optional().catch(undefined),
  type: z.string().optional().catch(undefined),
  location: z.string().optional().catch(undefined),
  min: z.number().optional().catch(undefined),
  max: z.number().optional().catch(undefined),
  sort: z.enum(["newest", "price_asc", "price_desc"]).optional().catch(undefined),
});

export const Route = createFileRoute("/listings/")({
  validateSearch: searchSchema,
  loader: async () => {
    const listings = await listVacantListings({ limit: 50 });
    return { listings };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: "Vacant Houses for Rent in Kenya — Bedsitters, Single Rooms & Apartments | RentSync" },
      {
        name: "description",
        content:
          "Search vacant bedsitters, single rooms and apartments for rent across Kenya by location, type and price — listed by verified RentSync landlords. Never pay before viewing.",
      },
      { property: "og:title", content: "Vacant Houses for Rent — RentSync Listings" },
      {
        property: "og:description",
        content: "Search vacant units listed by verified, active RentSync landlords across Kenya.",
      },
      { property: "og:type", content: "website" },
      ...(loaderData?.listings.length ? [itemListLd(loaderData.listings)] : []),
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Vacant Listings", path: "/listings" },
      ]),
    ],
    links: [canonicalLink("/listings")],
  }),
  component: ListingsIndex,
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

const ANY = "__any__";

function FilterFields({
  unitTypes,
  locations,
  draft,
  setDraft,
}: {
  unitTypes: string[];
  locations: string[];
  draft: {
    type?: string;
    location?: string;
    min?: string;
    max?: string;
    sort?: string;
  };
  setDraft: React.Dispatch<React.SetStateAction<typeof draft>>;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Unit Type
        </label>
        <Select
          value={draft.type || ANY}
          onValueChange={(v) => setDraft((d) => ({ ...d, type: v === ANY ? undefined : v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Any type</SelectItem>
            {unitTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Location
        </label>
        <Select
          value={draft.location || ANY}
          onValueChange={(v) => setDraft((d) => ({ ...d, location: v === ANY ? undefined : v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Any location</SelectItem>
            {locations.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Rent (KES/month)
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            value={draft.min ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, min: e.target.value }))}
          />
          <span className="text-slate-400">–</span>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            value={draft.max ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, max: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Sort By
        </label>
        <Select
          value={draft.sort || "newest"}
          onValueChange={(v) => setDraft((d) => ({ ...d, sort: v }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="price_asc">Price: low to high</SelectItem>
            <SelectItem value="price_desc">Price: high to low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function ListingsIndex() {
  const { listings } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const unitTypes = useMemo(
    () => Array.from(new Set(listings.map((l) => l.unit_type).filter(Boolean))) as string[],
    [listings],
  );
  const locations = useMemo(
    () =>
      Array.from(
        new Set(listings.map((l) => l.detailed_location || l.property_location).filter(Boolean)),
      ) as string[],
    [listings],
  );

  const [qInput, setQInput] = useState(search.q || "");
  const [draft, setDraft] = useState({
    type: search.type,
    location: search.location,
    min: search.min !== undefined ? String(search.min) : "",
    max: search.max !== undefined ? String(search.max) : "",
    sort: search.sort || "newest",
  });
  const [sheetOpen, setSheetOpen] = useState(false);

  function applyFilters(next: typeof draft, q = qInput) {
    navigate({
      search: {
        q: q.trim() || undefined,
        type: next.type || undefined,
        location: next.location || undefined,
        min: next.min ? Number(next.min) : undefined,
        max: next.max ? Number(next.max) : undefined,
        sort: (next.sort as "newest" | "price_asc" | "price_desc") || undefined,
      },
    });
    setSheetOpen(false);
  }

  function clearAll() {
    setQInput("");
    setDraft({ type: undefined, location: undefined, min: "", max: "", sort: "newest" });
    navigate({ search: {} });
    setSheetOpen(false);
  }

  const activeFilterCount = [search.type, search.location, search.min, search.max].filter(
    (v) => v !== undefined,
  ).length;
  const hasActiveSearch = Boolean(search.q || activeFilterCount > 0);

  const filtered = useMemo(() => {
    let result = listings.filter((l) => {
      const location = (l.detailed_location || l.property_location || "").toLowerCase();
      if (search.q) {
        const q = search.q.toLowerCase();
        const haystack = `${l.title} ${location} ${l.unit_type || ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (search.type && l.unit_type !== search.type) return false;
      if (search.location && location !== search.location.toLowerCase()) return false;
      if (search.min !== undefined && l.rent < search.min) return false;
      if (search.max !== undefined && l.rent > search.max) return false;
      return true;
    });

    if (search.sort === "price_asc") result = [...result].sort((a, b) => a.rent - b.rent);
    else if (search.sort === "price_desc") result = [...result].sort((a, b) => b.rent - a.rent);

    return result;
  }, [listings, search]);

  const groups = useMemo(() => {
    const m = new Map<string, VacantListing[]>();
    for (const listing of filtered) {
      const key = listing.unit_type || "Other Units";
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(listing);
    }
    return m;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-[#0b1f3f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 className="font-serif-display text-4xl sm:text-5xl">Vacant Houses for Rent</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Every listing here comes from a verified, active RentSync landlord — never send money
            before viewing the property in person.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters(draft, qInput);
            }}
            className="mt-6 flex max-w-2xl gap-2"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={qInput}
                onChange={(e) => setQInput(e.target.value)}
                placeholder="Search by area, e.g. Ndumberi, or unit type"
                className="border-white/20 bg-white/95 pl-9 text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="relative shrink-0 bg-white/95 text-slate-900 hover:bg-white"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>Filter Listings</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterFields
                    unitTypes={unitTypes}
                    locations={locations}
                    draft={draft}
                    setDraft={setDraft}
                  />
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={clearAll} type="button">
                    Clear all
                  </Button>
                  <Button
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                    onClick={() => applyFilters(draft)}
                    type="button"
                  >
                    Show results
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Button type="submit" className="shrink-0 bg-brand-500 hover:bg-brand-600">
              Search
            </Button>
          </form>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {!hasActiveSearch && (locations.length > 0 || unitTypes.length > 0) && (
          <div className="mb-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-slate-200 pb-8 text-sm">
            {locations.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-500">Browse by area:</span>
                {locations.slice(0, 12).map((l) => (
                  <Link
                    key={l}
                    to="/listings/in/$location"
                    params={{ location: slugify(l) }}
                    className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-brand-400 hover:text-brand-700"
                  >
                    {l}
                  </Link>
                ))}
              </div>
            )}
            {unitTypes.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-500">Browse by type:</span>
                {unitTypes.map((t) => (
                  <Link
                    key={t}
                    to="/listings/type/$unitType"
                    params={{ unitType: slugify(t) }}
                    className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-brand-400 hover:text-brand-700"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {hasActiveSearch && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-500">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
            {search.q && (
              <Badge variant="secondary" className="gap-1 bg-brand-100 text-brand-700">
                "{search.q}"
                <button onClick={() => { setQInput(""); navigate({ search: { ...search, q: undefined } }); }}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {search.type && (
              <Badge variant="secondary" className="gap-1 bg-brand-100 text-brand-700">
                {search.type}
                <button
                  onClick={() => {
                    setDraft((d) => ({ ...d, type: undefined }));
                    navigate({ search: { ...search, type: undefined } });
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {search.location && (
              <Badge variant="secondary" className="gap-1 bg-brand-100 text-brand-700">
                <MapPin className="h-3 w-3" /> {search.location}
                <button
                  onClick={() => {
                    setDraft((d) => ({ ...d, location: undefined }));
                    navigate({ search: { ...search, location: undefined } });
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(search.min !== undefined || search.max !== undefined) && (
              <Badge variant="secondary" className="gap-1 bg-brand-100 text-brand-700">
                {search.min ? formatKes(search.min) : "Ksh 0"} – {search.max ? formatKes(search.max) : "any"}
                <button
                  onClick={() => {
                    setDraft((d) => ({ ...d, min: "", max: "" }));
                    navigate({ search: { ...search, min: undefined, max: undefined } });
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <button
              onClick={clearAll}
              className="text-sm font-semibold text-slate-500 underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {listings.length === 0 ? (
          <div className="py-24 text-center">
            <HomeIcon className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-4 text-lg font-semibold text-slate-700">
              No vacant units listed right now
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Check back soon — new listings are added regularly.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <Search className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-4 text-lg font-semibold text-slate-700">
              No listings match your search
            </h2>
            <p className="mt-1 text-sm text-slate-500">Try widening your filters.</p>
            <Button variant="outline" className="mt-4" onClick={clearAll}>
              Clear all filters
            </Button>
          </div>
        ) : hasActiveSearch ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="space-y-14">
            {Array.from(groups.entries()).map(([unitType, group]) => (
              <div key={unitType}>
                <h2 className="mb-5 flex items-baseline gap-2 text-xl font-bold text-slate-900">
                  {unitType}
                  <span className="text-sm font-medium text-slate-400">
                    ({group.reduce((sum, l) => sum + (l.units_available || 1), 0)} vacant)
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
