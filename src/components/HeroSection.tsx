import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-ink text-cream">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-command-center.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/82 to-black/25" />

      {/* large background number accent */}
      <span
        className="pointer-events-none absolute bottom-6 right-6 select-none text-[160px] font-black leading-none text-white/[0.03] sm:text-[220px]"
        aria-hidden="true"
      >
        01
      </span>

      <div className="page-shell py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Business Automation Demo</p>
          <h1 className="mt-5 text-6xl font-black leading-[0.93] tracking-tight sm:text-8xl">
            Mindful<br />Consultations
          </h1>

          {/* gold rule */}
          <div className="mt-6 h-0.5 w-12 bg-gold" aria-hidden="true" />

          <p className="mt-6 max-w-lg text-base leading-7 text-stone-300 sm:text-lg sm:leading-8">
            Calm over chaos. We show local businesses how faster lead response, AI
            classification, and owner alerts keep opportunities from going cold — before a
            production setup is ever built.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo/real-estate"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-bold text-ink transition hover:bg-[#d9be7a]"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              Run Real Estate Demo
            </Link>
            <Link
              href="/preview"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-cream transition hover:bg-white/18"
            >
              View Opportunity Snapshot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
