import { Clock, TrendingUp, Users } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    label: "Response Time",
    before: "24–48 hours",
    after: "Under 60 seconds",
    note: "AI Intake Specialist handles triage the moment a lead arrives."
  },
  {
    icon: Users,
    label: "Leads Followed Up",
    before: "~40% (manual)",
    after: "100% captured",
    note: "Every inquiry is logged, classified, and a draft prepared — no one slips through."
  },
  {
    icon: TrendingUp,
    label: "Owner Visibility",
    before: "End of day (if remembered)",
    after: "Instant notification",
    note: "AI Inbox Manager alerts you the moment a hot lead comes in."
  }
];

export function AIImpactPanel() {
  return (
    <section className="rounded-xl bg-ink px-6 py-8 text-cream sm:px-8">
      <p className="eyebrow">Business Impact</p>
      <h2 className="mt-3 text-2xl font-black leading-snug">
        What changes when your AI workforce is live.
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {metrics.map(({ icon: Icon, label, before, after, note }) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-400">
                {label}
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-12 flex-shrink-0 text-[10px] font-bold uppercase tracking-wide text-stone-500">
                  Before
                </span>
                <span className="text-stone-400 line-through">{before}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-12 flex-shrink-0 text-[10px] font-bold uppercase tracking-wide text-gold">
                  After
                </span>
                <span className="font-black text-cream">{after}</span>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-stone-400">{note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
