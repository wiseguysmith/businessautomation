import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[82svh] items-center overflow-hidden bg-ink text-cream">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-command-center.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/78 to-black/20" />
      <div className="page-shell py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Business Automation Demo</p>
          <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-normal sm:text-7xl">
            Mindful Consultations
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-200 sm:text-xl">
            A premium field demo that shows local businesses how faster lead response can
            classify inquiries, draft follow-up, alert owners, and keep opportunities from
            going cold.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo/real-estate" className="primary-button bg-gold text-ink hover:bg-[#d9be7a]">
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              Run Real Estate Demo
            </Link>
            <Link href="/preview" className="secondary-button border-white/20 bg-white/10 text-cream hover:bg-white/20">
              View Opportunity Snapshot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
