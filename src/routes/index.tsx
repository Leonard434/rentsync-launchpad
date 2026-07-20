import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  Receipt,
  Wrench,
  LayoutDashboard,
  Smartphone,
  BarChart3,
  UserPlus,
  Building2,
  Activity,
  ShieldCheck,
  MapPin,
  Bell,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import logoAsset from "@/assets/rentsync-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const LOGIN_URL = "https://rent-sync-theta.vercel.app/login";

const features = [
  { icon: Users, title: "Tenant Management", body: "Track leases, rent status, access codes, and move-ins/move-outs in one place." },
  { icon: Receipt, title: "Smart Billing", body: "Auto-generate bills, record M-Pesa and bank payments, track partial and advance payments." },
  { icon: Wrench, title: "Maintenance Tracking", body: "Log tenant complaints, assign technicians, and monitor repair costs." },
  { icon: LayoutDashboard, title: "Real-Time Dashboard", body: "See rent collection, occupancy, and pending actions at a glance." },
  { icon: Smartphone, title: "Tenant Portal", body: "Tenants view bills, pay, and get instant notifications from their own login." },
  { icon: BarChart3, title: "Reports & Insights", body: "Month-over-month trends on collections, maintenance costs, and occupancy." },
];

const steps = [
  { icon: UserPlus, title: "Create your account", body: "Sign up in minutes — no setup fees, no contracts." },
  { icon: Building2, title: "Add your properties and tenants", body: "Import units, leases and tenant details in one flow." },
  { icon: Activity, title: "Track everything in real time", body: "Payments, maintenance and occupancy — always up to date." },
];

const trustPoints = [
  { icon: MapPin, title: "Built specifically for Kenyan landlords" },
  { icon: CheckCircle2, title: "No spreadsheets, no guesswork" },
  { icon: Bell, title: "Real-time tenant notifications" },
  { icon: ShieldCheck, title: "Secure, reliable, always accessible" },
  { icon: Smartphone, title: "Works on phone, tablet and laptop" },
  { icon: Receipt, title: "M-Pesa and bank payments supported" },
];

function Logo({ className = "h-10" }: { className?: string }) {
  return <img src={logoAsset.url} alt="RentSync — Smart Property Management" className={className} />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 rounded-md bg-white px-2 py-1">
          <Logo className="h-8 sm:h-9" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-200 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href={LOGIN_URL}
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-amber-400"
          >
            Get Started
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-200 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-slate-900 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href={LOGIN_URL}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const stats = [
    { v: "9+", l: "Properties Managed" },
    { v: "35+", l: "Active Tenants" },
    { v: "Real-Time", l: "Tracking" },
    { v: "Built for", l: "Kenya" },
  ];
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Smart Property Management
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Manage Every Property.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Collect Every Shilling.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            RentSync helps Kenyan landlords track rent, tenants, maintenance and finances — all from one simple dashboard, on your phone or laptop.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={LOGIN_URL}
              className="inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 sm:w-auto"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              See How It Works
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
              <div className="text-2xl font-bold text-white sm:text-3xl">{s.v}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Features</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What RentSync Does</h2>
          <p className="mt-4 text-lg text-slate-600">Everything you need to run your rental business — nothing you don't.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-md">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">How It Works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Up and running in minutes</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="absolute -top-4 left-8 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {i + 1}
              </div>
              <div className="mt-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Pricing</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Simple, transparent pricing</h2>
        <p className="mt-4 text-lg text-slate-600">Start free. Scale as your portfolio grows.</p>
        <div className="mx-auto mt-10 max-w-md rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-emerald-50 p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-wide text-blue-600">Starter</div>
          <div className="mt-4 flex items-baseline justify-center gap-2">
            <span className="text-5xl font-extrabold text-slate-900">Free</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">Everything you need to get started managing your first properties.</p>
          <a
            href={LOGIN_URL}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-amber-400"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Why RentSync</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Why Landlords Choose RentSync</h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((t) => (
            <div key={t.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <t.icon className="h-5 w-5" />
              </div>
              <p className="text-base font-medium text-slate-900">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-900 py-24 text-white">
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Ready to simplify your property management?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
          Join Kenyan landlords already collecting rent, tracking tenants and managing maintenance with RentSync.
        </p>
        <a
          href={LOGIN_URL}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-amber-500 px-8 py-4 text-lg font-semibold text-slate-900 shadow-xl shadow-amber-500/20 transition hover:bg-amber-400"
        >
          Get Started Free
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="inline-flex rounded-lg bg-white px-3 py-2">
              <Logo className="h-9" />
            </div>
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              Smart Property Management — built for Kenyan landlords who want to spend less time chasing rent and more time growing.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Product</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#top" className="hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © 2026 RentSync. Smart Property Management.
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <WhyChoose />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
