import type { OpportunitySnapshotResult } from "@/lib/types";
import { CheckCircle2, ClipboardList } from "lucide-react";
import Link from "next/link";
import { RevenueLeakCard } from "./RevenueLeakCard";

export function OpportunitySnapshot({
  result
}: {
  result: OpportunitySnapshotResult;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <RevenueLeakCard estimate={result.revenueLeakEstimate} riskLevel={result.riskLevel} />
      <article className="panel p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-teal/10 p-2 text-teal">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              Opportunity Snapshot
            </p>
            <h3 className="text-xl font-black text-ink">{result.suggestedPackage}</h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-stone-700">{result.summary}</p>
        <div className="mt-4 rounded-md bg-black/[0.035] p-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
            Estimated Monthly Leads at Risk
          </p>
          <p className="mt-1 text-lg font-black text-ink">
            {result.estimatedMonthlyLeadsAtRisk}
          </p>
        </div>
        <div className="mt-5 space-y-3">
          <div className="flex gap-3 text-sm text-stone-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-teal" aria-hidden="true" />
            <span>{result.recommendedAutomation}</span>
          </div>
          <div className="flex gap-3 text-sm text-stone-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-teal" aria-hidden="true" />
            <span>Suggested next step: run the real estate live demo.</span>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/results" className="secondary-button w-full sm:w-auto">
            View Snapshot
          </Link>
          <Link href="/demo/real-estate" className="primary-button w-full sm:w-auto">
          Run Live Demo
          </Link>
        </div>
      </article>
    </div>
  );
}
