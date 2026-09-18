import { createFileRoute, Link } from "@tanstack/react-router";
import SiteHeader from "@/components/SiteHeader";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | RentSync" },
      {
        name: "description",
        content: "How RentSync collects, uses and protects landlord, tenant and house-hunter data.",
      },
    ],
    links: [canonicalLink("/privacy")],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm font-medium text-brand-600 hover:underline">
          Back to home
        </Link>
        <h1 className="mt-4 font-serif-display text-4xl text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: 18 September 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900">Who this applies to</h2>
            <p className="mt-3">
              This policy covers RentSync's marketing and vacant-listings site (rentsync.co.ke) and
              the RentSync landlord application (app.rentsync.co.ke). It applies to landlords who
              create an account, tenants whose landlords use RentSync to manage them, technicians in
              the maintenance marketplace, and visitors browsing vacant listings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">What we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Landlords:</strong> name, email, phone number, property and unit details,
                and billing information needed to run a subscription.
              </li>
              <li>
                <strong>Tenants:</strong> name, phone number, ID details, lease information and
                payment history, entered by their landlord to manage the tenancy.
              </li>
              <li>
                <strong>Payments:</strong> M-Pesa and bank transaction references needed to match a
                payment to the right invoice. RentSync does not store M-Pesa PINs or full bank card
                numbers.
              </li>
              <li>
                <strong>House hunters:</strong> only what's submitted through a listing's contact
                form (name and phone number), sent directly to the landlord who owns that listing.
              </li>
              <li>
                <strong>Everyone:</strong> basic usage analytics (pages visited, general location)
                to understand how the product is used and to fix problems.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">How we use it</h2>
            <p className="mt-3">
              Data is used to operate the service: running billing, matching payments to invoices,
              displaying vacant listings publicly, sending tenants their bills and reminders, and
              improving RentSync based on how it's actually used. We do not sell personal data to
              third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Where it's stored</h2>
            <p className="mt-3">
              RentSync's data is stored with Supabase, a hosted Postgres provider, with row-level
              security restricting who can read what. Payments are processed through IntaSend for
              M-Pesa and bank transfers; RentSync does not handle raw card or PIN details directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Your choices</h2>
            <p className="mt-3">
              Landlords can export or delete their account data from within the app's account
              settings. Tenants and technicians whose data is managed by a landlord should contact
              that landlord directly, or reach us at hello@rentsync.co.ke and we'll help route the
              request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Contact</h2>
            <p className="mt-3">
              Questions about this policy or your data can be sent to{" "}
              <a href="mailto:hello@rentsync.co.ke" className="text-brand-600 hover:underline">
                hello@rentsync.co.ke
              </a>{" "}
              or via WhatsApp at +254 758 445 536.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
