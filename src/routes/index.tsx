import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  Receipt,
  Wrench,
  LayoutDashboard,
  Smartphone,
  BarChart3,
  ShieldCheck,
  Bell,
  CheckCircle2,
  Menu,
  X,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lock,
  HeartHandshake,
  Sparkles,
  Target,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const LOGIN_URL = "https://rent-sync-theta.vercel.app/login";
const PHONE_DISPLAY = "0758 445 536";
const PHONE_TEL = "tel:+254758445536";
const WHATSAPP_URL = "https://wa.me/254758445536";

const services = [
  {
    icon: Building2,
    title: "Property & Unit Management",
    body:
      "Organise every building, block and unit in one place. Track occupancy, unit types, rent amounts, deposits and access codes without ever touching a spreadsheet again.",
  },
  {
    icon: Users,
    title: "Tenant Management",
    body:
      "Onboard tenants with digital lease details, ID records and emergency contacts. Handle move-ins, transfers and move-outs with clear timelines and status updates.",
  },
  {
    icon: Receipt,
    title: "Smart Billing & Invoicing",
    body:
      "Rent, water, service charge and one-off bills are generated automatically each month. Support for partial payments, advances, arrears and custom line items — always accurate.",
  },
  {
    icon: Smartphone,
    title: "M-Pesa & Bank Payments",
    body:
      "Record M-Pesa till, paybill and bank transfer payments in seconds. Every shilling is matched to the right tenant, the right unit and the right invoice — with a full audit trail.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    body:
      "Tenants report issues in-app. You assign technicians, track status from open to resolved and log actual costs against each property to keep repairs profitable.",
  },
  {
    icon: LayoutDashboard,
    title: "Real-Time Landlord Dashboard",
    body:
      "One live view of collections, occupancy, arrears and pending actions across your entire portfolio — refreshed instantly whether you're on your phone, tablet or laptop.",
  },
  {
    icon: Bell,
    title: "Tenant Portal & Notifications",
    body:
      "Tenants get their own secure login to see bills, download receipts, pay online and receive automated rent reminders and maintenance updates — reducing calls to you.",
  },
  {
    icon: BarChart3,
    title: "Reports, Insights & Statements",
    body:
      "Month-over-month reports on collections, arrears, occupancy and maintenance spend. Export clean tenant statements and landlord summaries in a single click.",
  },
];

const whyPoints = [
  {
    icon: MapPin,
    title: "Built for Kenyan Landlords",
    body:
      "Designed around the way rent is actually collected here — M-Pesa first, mobile first, real workflows for real properties in Nairobi and beyond.",
  },
  {
    icon: Clock,
    title: "Save Hours Every Month",
    body:
      "Auto-generated bills, digital receipts and instant reminders replace WhatsApp chases, paper books and endless spreadsheets.",
  },
  {
    icon: Lock,
    title: "Secure & Reliable",
    body:
      "Your tenant data, payments and records are protected with modern security and daily backups — accessible only to you.",
  },
  {
    icon: HeartHandshake,
    title: "Fair, Transparent Pricing",
    body:
      "Start free and scale as your portfolio grows. No setup fees, no hidden charges, no long contracts — ever.",
  },
  {
    icon: Sparkles,
    title: "Simple Enough for Anyone",
    body:
      "A clean, friendly interface that any landlord — or caretaker — can pick up in minutes. No training required.",
  },
  {
    icon: Target,
    title: "End-to-End Rental Ops",
    body:
      "From listing a unit to closing the books at month-end, RentSync covers every step of running your rental business.",
  },
];

function Logo({ className = "h-10" }: { className?: string }) {
  return <img src="/rentsync-logo.png" alt="RentSync — Smart Property Management" className={className} />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#why-us", label: "Why Us" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Logo className="h-10 sm:h-11" />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-600">
              Smart Property Management
            </span>
          </div>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold uppercase tracking-wider text-slate-700 transition hover:text-amber-600"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href={LOGIN_URL}
            className="inline-flex items-center justify-center rounded-md bg-amber-500 px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-sm transition hover:bg-amber-400"
          >
            Get Started
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-700 hover:bg-slate-100"
              >
                {l.label}
              </a>
            ))}
            <a
              href={LOGIN_URL}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-amber-500 px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-900"
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
    { v: "9+", l: "Properties" },
    { v: "35+", l: "Tenants" },
    { v: "100%", l: "Visibility" },
    { v: "24/7", l: "Access" },
  ];
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#0b1f3f] text-white"
    >
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-36">
        <div className="lg:col-span-7">
          <h1 className="font-serif-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Every <em className="not-italic text-amber-400 [font-style:italic]">Property,</em>
            <br />
            Every <em className="not-italic text-amber-400 [font-style:italic]">Shilling,</em>
            <br />
            Every Tenant.
          </h1>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-400">
            RentSync — Smart Property Management
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            RentSync gives Kenyan landlords one calm, reliable place to run their rentals — track
            rent, manage tenants, log maintenance and see the health of every property in real
            time, from your phone or laptop.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-md bg-amber-500 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              Our Services
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/5"
            >
              Request a Demo
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-8">
          <div className="grid grid-cols-2 rounded-sm border border-white/15 bg-white/[0.03] backdrop-blur">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={`p-8 text-center ${i % 2 === 0 ? "border-r border-white/10" : ""} ${i < 2 ? "border-b border-white/10" : ""}`}
              >
                <div className="font-serif-display text-5xl text-white sm:text-6xl">{s.v}</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-500" aria-hidden />
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-600">
            What We Offer
          </p>
          <h2 className="mt-4 font-serif-display text-4xl text-slate-900 sm:text-5xl lg:text-6xl">
            Our <em className="text-amber-500">Services</em>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            From onboarding your first tenant to closing the books at month-end, RentSync delivers
            a complete rental management toolkit — built specifically for the realities of managing
            property in Kenya.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative flex flex-col bg-white p-8 transition hover:bg-[#0b1f3f]"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif-display text-3xl text-amber-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <s.icon className="h-6 w-6 text-slate-400 transition group-hover:text-amber-400" />
              </div>
              <h3 className="mt-6 font-serif-display text-2xl leading-tight text-slate-900 transition group-hover:text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 transition group-hover:text-slate-300">
                {s.body}
              </p>
              <div className="mt-6 h-[2px] w-10 bg-amber-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-sm bg-[#0b1f3f] p-10 text-white shadow-xl">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="relative">
              <div className="inline-flex rounded bg-white px-3 py-2">
                <Logo className="h-10" />
              </div>
              <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-400">
                Director's Note
              </p>
              <blockquote className="mt-4 font-serif-display text-2xl leading-snug text-white">
                “We built RentSync because managing rental property in Kenya deserved better than
                paper receipts, lost WhatsApp threads and endless spreadsheets.”
              </blockquote>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm font-semibold text-white">The RentSync Team</p>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Founders & Product
                </p>
              </div>

              <div className="mt-10 grid gap-4">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>Support line — reach us any weekday</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>hello@rentsync.co.ke</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-600">
            About RentSync
          </p>
          <h2 className="mt-4 font-serif-display text-4xl text-slate-900 sm:text-5xl">
            A quieter way to run your <em className="text-amber-500">rentals</em>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            <p>
              RentSync is a smart, mobile-first property management platform designed around the
              real rhythms of Kenyan landlords — collecting rent via M-Pesa, coordinating
              caretakers, chasing arrears and juggling maintenance across scattered units.
            </p>
            <p>
              We replace the mix of notebooks, group chats and Excel files with a single, clear
              system: bills that generate themselves, payments that reconcile in seconds, tenants
              who know exactly what they owe, and a dashboard that tells you the truth about your
              portfolio at a glance.
            </p>
            <p>
              Whether you own three units in Ruaka or thirty across Nairobi, RentSync helps you
              spend less time chasing rent — and more time growing your investment.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Mobile-first, works everywhere",
              "M-Pesa & bank payment support",
              "Automated rent reminders",
              "Full audit trail on every shilling",
            ].map((t) => (
              <div
                key={t}
                className="flex items-start gap-3 rounded-sm border border-slate-200 bg-white p-4"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-500" />
                <span className="text-sm font-medium text-slate-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-600">
            Why Choose Us
          </p>
          <h2 className="mt-4 font-serif-display text-4xl text-slate-900 sm:text-5xl lg:text-6xl">
            Built on <em className="text-amber-500">Trust</em> & Simplicity
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            Landlords choose RentSync because it respects their time, their money and the way they
            actually work.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((p) => (
            <div
              key={p.title}
              className="group rounded-sm border border-slate-200 bg-white p-8 transition hover:border-amber-400 hover:shadow-lg"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-amber-500/10 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-slate-900">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-serif-display text-2xl text-slate-900">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 rounded-sm border border-slate-200 bg-slate-50 p-8 sm:grid-cols-3 sm:p-10">
          {[
            { icon: ShieldCheck, k: "Secure by default" },
            { icon: Smartphone, k: "Works on any device" },
            { icon: Receipt, k: "Every payment tracked" },
          ].map((x) => (
            <div key={x.k} className="flex items-center gap-4">
              <x.icon className="h-6 w-6 shrink-0 text-amber-500" />
              <span className="text-base font-semibold text-slate-800">{x.k}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-600">
            Get In Touch
          </p>
          <h2 className="mt-4 font-serif-display text-4xl text-slate-900 sm:text-5xl lg:text-6xl">
            Let's Sync Your <em className="text-amber-500">Rentals</em>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            Ready to move off spreadsheets? Reach out for a walkthrough — we'll help you set up
            your first properties and tenants in minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            {[
              { icon: Phone, label: "Phone", value: PHONE_DISPLAY, href: PHONE_TEL },
              { icon: Mail, label: "Email", value: "hello@rentsync.co.ke", href: "mailto:hello@rentsync.co.ke" },
              { icon: MapPin, label: "Location", value: "Nairobi, Kenya", href: null },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-4 rounded-sm border border-slate-200 bg-white p-6"
              >
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-amber-500/10 text-amber-600">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    {c.label}
                  </p>
                  {c.href ? (
                    <a href={c.href} className="mt-1 block text-base font-semibold text-slate-900 hover:text-amber-600">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-base font-semibold text-slate-900">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-green-500 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-green-600"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>

            <a
              href={LOGIN_URL}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-amber-500 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-900 transition hover:bg-amber-400"
            >
              Or Sign In Now
            </a>
          </div>

          <form
            className="rounded-sm border border-slate-200 bg-white p-8 shadow-sm lg:col-span-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name *" name="name" placeholder="Jane Wanjiku" required />
              <Field label="Phone" name="phone" placeholder="0712 345 678" type="tel" />
              <div className="sm:col-span-2">
                <Field label="Email *" name="email" placeholder="you@example.com" type="email" required />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Number of Units
                </label>
                <select className="mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
                  <option>1 – 5 units</option>
                  <option>6 – 20 units</option>
                  <option>21 – 50 units</option>
                  <option>50+ units</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Tell us about your properties *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Where are your properties, how many tenants, and what are you struggling with today?"
                  className="mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-[#0b1f3f] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#122c58]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#081a35] pt-16 pb-8 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="inline-flex rounded bg-white px-3 py-2">
              <Logo className="h-9" />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Smart Property Management — built for Kenyan landlords who want to spend less time
              chasing rent and more time growing their investment.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Product</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#why-us" className="hover:text-white">Why Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4 border-t border-white/10 pt-8 sm:justify-start">
          <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-amber-400 hover:text-amber-400">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-amber-400 hover:text-amber-400">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="#" aria-label="X" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-amber-400 hover:text-amber-400">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="#" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-amber-400 hover:text-amber-400">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-amber-400 hover:text-amber-400">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:flex sm:items-center sm:justify-between sm:text-left">
          © 2026 RentSync. Smart Property Management.
          <span className="mt-2 block sm:mt-0">Made for Kenyan landlords.</span>
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
        <Services />
        <About />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
