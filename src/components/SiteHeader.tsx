import { Link } from "@tanstack/react-router";

const LOGIN_URL = "https://rent-sync-theta.vercel.app/login";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/rentsync-logo.png"
            alt="RentSync — Smart Property Management"
            className="h-10 sm:h-11"
          />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-600">
              Smart Property Management
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-semibold uppercase tracking-wider text-slate-700 transition hover:text-amber-600"
          >
            Home
          </Link>
          <Link
            to="/listings"
            className="text-sm font-semibold uppercase tracking-wider text-slate-700 transition hover:text-amber-600"
          >
            Vacant Listings
          </Link>
        </nav>
        <a
          href={LOGIN_URL}
          className="inline-flex items-center justify-center rounded-md bg-amber-500 px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-sm transition hover:bg-amber-400"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}
