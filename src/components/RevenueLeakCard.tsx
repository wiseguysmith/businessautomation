import { TrendingDown } from "lucide-react";

export function RevenueLeakCard({
  estimate,
  riskLevel
}: {
  estimate: string;
  riskLevel: string;
}) {
  return (
    <article className="rounded-lg border border-black/10 bg-ink p-5 text-cream">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
            Potential Revenue Leakage
          </p>
          <h3 className="mt-3 text-2xl font-black">{riskLevel} response risk</h3>
        </div>
        <div className="rounded-full bg-gold/15 p-3 text-gold">
          <TrendingDown className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-stone-200">{estimate}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
        Based on your inputs
      </p>
    </article>
  );
}
