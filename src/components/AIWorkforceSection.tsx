import { ArrowRight, Bot, BellRing, FileText, BadgeCheck, Gauge, Users } from "lucide-react";
import Link from "next/link";

const roles = [
  {
    icon: BadgeCheck,
    name: "AI Intake Specialist",
    description:
      "Classifies every incoming lead by type, intent, and budget the moment it arrives — no inbox check required."
  },
  {
    icon: Gauge,
    name: "AI Sales Assistant",
    description:
      "Scores urgency and drafts a personalized response in English and Spanish, ready for your approval."
  },
  {
    icon: BellRing,
    name: "AI Inbox Manager",
    description:
      "Notifies the owner instantly when a hot lead comes in so nothing waits until end of day."
  },
  {
    icon: FileText,
    name: "AI Operations Manager",
    description:
      "Logs every lead to Google Sheets automatically — classified, scored, and timestamped."
  },
  {
    icon: Users,
    name: "AI Client Success Manager",
    description:
      "Flags leads that need a follow-up and surfaces the next best action before momentum is lost."
  },
  {
    icon: Bot,
    name: "AI Bilingual Communications Officer",
    description:
      "Prepares responses in both English and Spanish so no inquiry falls through a language gap."
  }
];

export function AIWorkforceSection() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[48px_1fr]">
          <span className="text-sm font-black tracking-[0.1em] text-gold">02</span>
          <div>
            <p className="eyebrow">Your AI Workforce</p>
            <h2 className="mt-3 max-w-lg text-4xl font-black leading-[1.05] tracking-normal text-cream">
              Six specialists. Working the moment a lead arrives.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-400">
              Every role is powered by AI — handling intake, scoring, drafting, logging,
              and notifying your team while you focus on closing deals.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map(({ icon: Icon, name, description }) => (
                <div
                  key={name}
                  className="rounded-xl border border-white/8 bg-white/5 p-5 transition hover:border-gold/30 hover:bg-white/8"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-full bg-gold/15 p-2 text-gold">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold">
                      {name}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-stone-400">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/demo/real-estate"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-bold text-ink transition hover:bg-[#d9be7a]"
              >
                See the workforce in action
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
