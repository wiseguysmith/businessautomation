import { Gauge } from "lucide-react";

export function UrgencyScoreCard({
  score,
  label
}: {
  score: number;
  label: string;
}) {
  return (
    <article className="rounded-lg border border-black/10 bg-ink p-5 text-cream">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
            AI Intake Specialist
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400">
            Urgency Score
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-6xl font-black leading-none">{score}</span>
            <span className="pb-2 text-sm font-bold text-stone-300">/100</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-stone-200">{label}</p>
        </div>
        <div className="rounded-full bg-gold/15 p-3 text-gold">
          <Gauge className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
      <div className="mt-5 h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-gold"
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
    </article>
  );
}
