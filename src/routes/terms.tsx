import { createFileRoute, Link } from "@tanstack/react-router";
import SiteHeader from "@/components/SiteHeader";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | RentSync" },
      {
        name: "description",
        content:
          "The terms governing use of RentSync's property management platform and public vacant listings.",
      },
    ],
    links: [canonicalLink("/terms")],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm font-medium text-brand-600 hover:underline">
          Back to home
        </Link>
        <h1 className="mt-4 font-serif-display text-4xl text-slate-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: 18 September 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900">The service</h2>
            <p className="mt-3">
              RentSync is a property management platform for landlords in Kenya, covering property
              and unit management, tenant management, billing and invoicing, M-Pesa and bank
              payments, maintenance dispatch, bank reconciliation and reporting. RentSync also
              publishes a public directory of vacant units submitted by active landlords.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Accounts and billing</h2>
            <p className="mt-3">
              Landlord accounts start on a 30 day free trial. After the trial, continued use
              requires an active subscription billed per unit under management, according to the
              plan selected in the app. Subscriptions can be changed or cancelled at any time from
              account settings; charges already invoiced remain due.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Landlord responsibilities</h2>
            <p className="mt-3">
              Landlords are responsible for the accuracy of the tenant, property and payment data
              they enter, for having the right to collect and store that data about their tenants,
              and for how they use RentSync to communicate with tenants and technicians.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Vacant listings</h2>
            <p className="mt-3">
              Listings are published only by landlords with an active RentSync account and must
              accurately describe a real, available unit. RentSync may remove a listing that is
              inaccurate, abusive or no longer available. House hunters should always view a
              property in person and never send money before doing so; RentSync is not a party to
              any tenancy agreement between a landlord and a house hunter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Payments</h2>
            <p className="mt-3">
              M-Pesa and bank payments processed through RentSync are handled by IntaSend, a
              licensed payment processor. RentSync matches payments to invoices but is not a bank or
              a holder of client funds.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Availability and liability</h2>
            <p className="mt-3">
              RentSync is provided on an as-is basis. We work to keep the service reliable but don't
              guarantee uninterrupted availability. RentSync is not liable for losses arising from
              landlord-entered data errors, third-party payment processor issues, or disputes
              between landlords, tenants and house hunters.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Changes</h2>
            <p className="mt-3">
              These terms may be updated from time to time. Continued use of RentSync after a change
              means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Contact</h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
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
