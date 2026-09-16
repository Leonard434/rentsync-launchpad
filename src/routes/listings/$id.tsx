import { useState, type FormEvent } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, ShieldCheck, ArrowLeft, MessageCircle, Phone } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import UnitTypeIcon from "@/components/UnitTypeIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getVacantListing,
  contactVacantListingLead,
  formatKes,
  displayPhotos,
  whatsappLink,
  type VacantListing,
} from "@/lib/vacantListings";

export const Route = createFileRoute("/listings/$id")({
  loader: async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) throw notFound();
    const listing = await getVacantListing(id);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => {
    const listing = loaderData?.listing;
    if (!listing) return { meta: [{ title: "Listing not found — RentSync" }] };
    return {
      meta: [
        { title: `${listing.title} — ${formatKes(listing.rent)}/mo — RentSync` },
        {
          name: "description",
          content:
            listing.description ||
            `${listing.unit_type ?? "Unit"} for rent in ${listing.property_location}.`,
        },
        { property: "og:title", content: listing.title },
        {
          property: "og:description",
          content:
            listing.description ||
            `${listing.unit_type ?? "Unit"} for rent in ${listing.property_location}.`,
        },
        { property: "og:type", content: "product" },
        ...(listing.photos?.[0] ? [{ property: "og:image", content: listing.photos[0] }] : []),
      ],
    };
  },
  component: ListingDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex flex-1 items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Listing not found</h1>
          <p className="mt-2 text-slate-500">
            This listing may have been taken down or never existed.
          </p>
          <Link to="/listings" className="mt-6 inline-block text-brand-600 hover:underline">
            Browse all listings
          </Link>
        </div>
      </div>
    </div>
  ),
});

function ContactForm({ listing }: { listing: VacantListing }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("sending");
    setError("");
    try {
      await contactVacantListingLead({ listingId: listing.id, name, phone, message });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send your inquiry.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
        Thanks! Your inquiry has been sent to the landlord. They'll reach out on the number you
        provided.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Phone number e.g. 07XXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <Textarea
        placeholder="Message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
      />
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-brand-500 text-white hover:bg-brand-600"
      >
        {status === "sending" ? "Sending..." : "Contact about this listing"}
      </Button>
    </form>
  );
}

function ListingDetail() {
  const { listing } = Route.useLoaderData();
  const photos = displayPhotos(listing);
  const location = listing.detailed_location || listing.property_location;

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/listings"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all listings
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
              {photos[0] ? (
                <img src={photos[0]} alt={listing.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-300">
                  <UnitTypeIcon unitType={listing.unit_type} className="h-16 w-16" />
                </div>
              )}
            </div>
            {photos.length > 1 && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {photos.slice(1).map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt={listing.title}
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            )}

            <div className="mt-6">
              {listing.unit_type && (
                <span className="w-fit rounded-full bg-brand-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-700">
                  {listing.unit_type}
                </span>
              )}
              <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                {listing.title}
              </h1>
              <p className="mt-1 flex items-center gap-1 text-slate-500">
                <MapPin className="h-4 w-4 shrink-0" /> {location}
              </p>
              <p className="mt-4 text-3xl font-bold text-[#0b1f3f]">
                {formatKes(listing.rent)}
                <span className="text-base font-medium text-slate-500">/month</span>
              </p>
              {listing.deposit > 0 && (
                <p className="mt-1 text-sm text-slate-500">Deposit: {formatKes(listing.deposit)}</p>
              )}
              {listing.description && (
                <p className="mt-6 whitespace-pre-line text-slate-700">{listing.description}</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 flex items-start gap-2 text-xs text-slate-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                This listing comes from a verified, active RentSync landlord. Never send money
                before viewing the property in person.
              </p>

              {listing.contact_phone && (
                <div className="mb-4 space-y-2 border-b border-slate-100 pb-4">
                  <a
                    href={whatsappLink(
                      listing.contact_phone,
                      `Hi, I'm interested in "${listing.title}" (${formatKes(listing.rent)}/month) on RentSync.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-green-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-600"
                  >
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                  <a
                    href={`tel:${listing.contact_phone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Phone className="h-4 w-4" /> {listing.contact_phone}
                  </a>
                </div>
              )}

              <ContactForm listing={listing} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
