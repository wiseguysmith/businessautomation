import { DemoDisclaimer } from "@/components/DemoDisclaimer";
import { HeroSection } from "@/components/HeroSection";
import { ObjectionFAQ } from "@/components/ObjectionFAQ";
import {
  ArrowRight,
  BedDouble,
  Building2,
  Check,
  UtensilsCrossed,
  X
} from "lucide-react";
import Link from "next/link";

const beforeItems = [
  "Lead arrives — no one sees it",
  "Response takes 24–48 hours",
  "No draft, no log, no alert",
  "Opportunity goes cold quietly"
];

const afterItems = [
  "Lead classified in seconds",
  "Draft response ready instantly",
  "Logged and owner notified",
  "Your team stays in control"
];

const steps = [
  {
    n: "1",
    title: "20-minute discovery",
    body: "We confirm your tools, workflow, and the leads you are most likely to lose."
  },
  {
    n: "2",
    title: "Build the production version",
    body: "Connected to your real website form, email, WhatsApp, Google Sheets, or CRM."
  },
  {
    n: "3",
    title: "Launch and improve",
    body: "Test with your team, go live, and refine after real usage."
  }
];

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      {/* 01 — The Problem */}
      <section className="page-shell py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[48px_1fr]">
          <span className="text-sm font-black tracking-[0.1em] text-gold">01</span>
          <div>
            <p className="eyebrow">The Problem</p>
            <h2 className="mt-3 max-w-md text-4xl font-black leading-[1.05] tracking-normal text-ink">
              Most businesses lose leads before they even know one arrived.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
              Slow response. No classification. No follow-up draft. No visibility. The
              infrastructure to fix it exists — most businesses just have not had someone
              build it for them yet.
            </p>

            {/* Before / After */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-black/10 bg-white/60 p-5">
                <p className="eyebrow mb-4" style={{ color: "#9e9890" }}>
                  Without automation
                </p>
                <ul className="space-y-3">
                  {beforeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-600">
                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
                <p className="eyebrow mb-4">With Mindful Tech AI</p>
                <ul className="space-y-3">
                  {afterItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-800">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="page-shell">
        <div className="h-px bg-black/8" />
      </div>

      {/* 02 — The Demo */}
      <section className="page-shell py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[48px_1fr]">
          <span className="text-sm font-black tracking-[0.1em] text-gold">02</span>
          <div>
            <p className="eyebrow">The Demo</p>
            <h2 className="mt-3 max-w-md text-4xl font-black leading-[1.05] tracking-normal text-ink">
              See it working in under 90 seconds.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-ink p-6 text-cream">
                <p className="eyebrow">Street Demo</p>
                <p className="mt-3 text-2xl font-black">60–90 seconds</p>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  Select a preloaded scenario. Watch classification, urgency score, and a
                  draft response appear live.
                </p>
                <Link
                  href="/demo/real-estate"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-[#d9be7a]"
                >
                  Start Street Demo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="rounded-xl border border-black/10 bg-white/70 p-6">
                <p className="eyebrow" style={{ color: "#667a68" }}>Full Demo</p>
                <p className="mt-3 text-2xl font-black text-ink">3–5 minutes</p>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  Enter a custom lead, run the full dashboard, and capture the prospect's
                  contact details for follow-up.
                </p>
                <Link
                  href="/preview"
                  className="mt-5 inline-flex items-center gap-2 rounded-md border border-black/15 px-4 py-2.5 text-sm font-bold text-ink transition hover:border-gold hover:bg-gold/8"
                >
                  View Opportunity Snapshot
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="page-shell">
        <div className="h-px bg-black/8" />
      </div>

      {/* 03 — Industries */}
      <section className="page-shell py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[48px_1fr]">
          <span className="text-sm font-black tracking-[0.1em] text-gold">03</span>
          <div>
            <p className="eyebrow">Industries</p>
            <h2 className="mt-3 max-w-md text-4xl font-black leading-[1.05] tracking-normal text-ink">
              One engine. Different business language.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
              The same AI classification and urgency scoring adapts its labels, scenarios,
              and recommended actions to each industry's reality.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {/* Real Estate — live */}
              <div className="relative rounded-xl border-2 border-ink bg-white/80 p-6 shadow-soft">
                <span className="absolute right-4 top-4 rounded-sm bg-gold px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-ink">
                  V1 Live
                </span>
                <Building2 className="h-6 w-6 text-gold" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-ink">Real Estate</h3>
                <p className="mt-2 text-xs leading-5 text-stone-600">
                  Buyer, seller, renter, and investor classification for agencies in
                  Tamarindo, Costa Rica.
                </p>
                <Link
                  href="/demo/real-estate"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-ink underline-offset-2 hover:text-gold"
                >
                  Run the demo <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>

              {/* Hotels — preview */}
              <div className="relative rounded-xl border border-black/10 bg-white/40 p-6 opacity-70">
                <span className="absolute right-4 top-4 rounded-sm border border-black/15 px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-stone-500">
                  V2 Preview
                </span>
                <BedDouble className="h-6 w-6 text-stone-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-ink">Hotels</h3>
                <p className="mt-2 text-xs leading-5 text-stone-500">
                  Guest requests, booking inquiries, complaint escalation, and upsell
                  suggestions.
                </p>
              </div>

              {/* Restaurants — preview */}
              <div className="relative rounded-xl border border-black/10 bg-white/40 p-6 opacity-70">
                <span className="absolute right-4 top-4 rounded-sm border border-black/15 px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-stone-500">
                  V2 Preview
                </span>
                <UtensilsCrossed className="h-6 w-6 text-stone-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-ink">Restaurants</h3>
                <p className="mt-2 text-xs leading-5 text-stone-500">
                  Review sentiment, reservation handling, promo follow-up, and negative
                  review escalation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="page-shell">
        <div className="h-px bg-black/8" />
      </div>

      {/* 04 — The Path */}
      <section className="page-shell py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[48px_1fr]">
          <span className="text-sm font-black tracking-[0.1em] text-gold">04</span>
          <div>
            <p className="eyebrow">The Path</p>
            <h2 className="mt-3 max-w-md text-4xl font-black leading-[1.05] tracking-normal text-ink">
              From demo to live automation in days.
            </h2>
            <div className="mt-8 divide-y divide-black/8">
              {steps.map((step, i) => (
                <div key={step.n} className="flex items-start gap-5 py-5">
                  <div
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      i === steps.length - 1
                        ? "bg-gold text-ink"
                        : "bg-ink text-gold"
                    }`}
                  >
                    {step.n}
                  </div>
                  <div>
                    <p className="text-sm font-black text-ink">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="primary-button">
                Request Setup Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/demo/real-estate" className="secondary-button">
                Run the Demo First
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink py-16 sm:py-20">
        <div className="page-shell">
          <p className="eyebrow mb-3">Common Questions</p>
          <h2 className="mb-10 max-w-sm text-4xl font-black leading-[1.05] text-cream">
            Honest answers before you decide.
          </h2>
          <ObjectionFAQ dark />
        </div>
      </section>

      {/* Disclaimer */}
      <div className="page-shell py-8">
        <DemoDisclaimer />
      </div>
    </main>
  );
}
