import { BadgeCheck, Bot } from "lucide-react";

export function LeadClassificationCard({
  leadType,
  estimatedOpportunity
}: {
  leadType: string;
  estimatedOpportunity: string;
}) {
  return (
    <article className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5">
            <Bot className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal">
              AI Intake Specialist
            </p>
          </div>
          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">
            Lead Classification
          </p>
          <h2 className="mt-3 text-3xl font-black text-ink">{leadType}</h2>
          <p className="mt-3 text-sm leading-6 text-stone-700">{estimatedOpportunity}</p>
        </div>
        <div className="rounded-full bg-teal/10 p-3 text-teal">
          <BadgeCheck className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
