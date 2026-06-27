import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    name: "Starter Setup",
    price: "$1,500",
    cadence: "one-time",
    tag: null,
    description: "The foundation — lead intake, urgency scoring, draft responses, Google Sheets logging, and owner email notification.",
    features: [
      "AI lead intake + classification",
      "Urgency scoring",
      "Draft response in English + Spanish",
      "Google Sheets logging",
      "Owner email notification",
      "1 channel (website form or email)"
    ]
  },
  {
    name: "Standard Setup",
    price: "$2,500",
    cadence: "one-time",
    tag: "Most Popular",
    description: "Everything in Starter, expanded to multi-channel with WhatsApp integration and bilingual automation.",
    features: [
      "Everything in Starter",
      "WhatsApp integration",
      "Multi-channel intake (form + email + WhatsApp)",
      "Bilingual response drafting",
      "CRM or additional sheet logging",
      "Priority setup support"
    ]
  },
  {
    name: "Monthly Management",
    price: "$500",
    cadence: "/ month",
    tag: null,
    description: "We monitor, update, and improve your automation every month. Your system stays working as your business grows.",
    features: [
      "Monthly workflow health check",
      "Scenario and prompt updates",
      "New channel additions",
      "Performance review",
      "Priority support"
    ]
  }
];

export function PricingPanel({ showCTA = true }: { showCTA?: boolean }) {
  return (
    <section>
      <p className="eyebrow">Packages</p>
      <h2 className="mt-3 text-3xl font-black leading-[1.05] tracking-tight text-ink">
        Clear pricing. No surprises.
      </h2>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        One setup fee to get your AI workforce live. Optional monthly management to keep it sharp.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative rounded-xl p-6 ${
              pkg.tag
                ? "border-2 border-ink bg-ink text-cream shadow-soft"
                : "border border-black/10 bg-white/80"
            }`}
          >
            {pkg.tag && (
              <span className="absolute right-4 top-4 rounded-sm bg-gold px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-ink">
                {pkg.tag}
              </span>
            )}
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${pkg.tag ? "text-gold" : "text-stone-500"}`}>
              {pkg.name}
            </p>
            <div className="mt-3 flex items-end gap-1">
              <span className={`text-4xl font-black leading-none ${pkg.tag ? "text-cream" : "text-ink"}`}>
                {pkg.price}
              </span>
              <span className={`pb-1 text-sm ${pkg.tag ? "text-stone-400" : "text-stone-500"}`}>
                {pkg.cadence}
              </span>
            </div>
            <p className={`mt-3 text-xs leading-5 ${pkg.tag ? "text-stone-300" : "text-stone-600"}`}>
              {pkg.description}
            </p>
            <ul className="mt-5 space-y-2">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check
                    className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${pkg.tag ? "text-gold" : "text-teal"}`}
                    aria-hidden="true"
                  />
                  <span className={pkg.tag ? "text-stone-300" : "text-stone-700"}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showCTA && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/quote" className="primary-button">
            Book a discovery call
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="flex items-center text-xs text-stone-500">
            20 minutes. No commitment. We confirm which package fits before you pay anything.
          </p>
        </div>
      )}
    </section>
  );
}
