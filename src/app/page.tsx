import { DemoDisclaimer } from "@/components/DemoDisclaimer";
import { HeroSection } from "@/components/HeroSection";
import { ObjectionFAQ } from "@/components/ObjectionFAQ";
import { ArrowRight, BellRing, ClipboardList, MessageSquareText, Timer } from "lucide-react";
import Link from "next/link";

const outcomes = [
  {
    title: "Classify incoming leads",
    copy: "Buyer, seller, renter, investor, or general inquiry language that owners understand.",
    icon: ClipboardList
  },
  {
    title: "Score urgency",
    copy: "A simple hot, warm, or low-priority signal based on timeline, specificity, and intent.",
    icon: Timer
  },
  {
    title: "Draft the response",
    copy: "Professional English follow-up appears first, with Spanish available as a secondary action.",
    icon: MessageSquareText
  },
  {
    title: "Notify the owner",
    copy: "The demo shows the logging and notification path without exposing backend details.",
    icon: BellRing
  }
];

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <section className="page-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Lead Response Demo</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-ink">
              Stop losing leads because no one responded fast enough.
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-700">
              Mindful Consultations helps local businesses see how faster intake,
              classification, draft follow-up, and owner alerts can protect real
              opportunities before they go cold.
            </p>
            <Link href="/preview" className="primary-button mt-6">
              Start Opportunity Snapshot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <article key={outcome.title} className="panel p-5">
                  <div className="rounded-full bg-gold/15 p-3 text-gold w-fit">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-ink">{outcome.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-700">{outcome.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white/55 py-16">
        <div className="page-shell grid gap-6 lg:grid-cols-3">
          <article className="rounded-lg border border-black/10 bg-ink p-6 text-cream lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Real Estate V1
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              Built for Tamarindo real estate agencies first.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-200">
              Real estate leads are high-value, time-sensitive, and easy for an owner to
              recognize. V1 focuses on the sales moment: show the missed opportunity, then
              show the system that helps respond faster.
            </p>
          </article>
          <DemoDisclaimer />
        </div>
      </section>

      <ObjectionFAQ />
    </main>
  );
}
