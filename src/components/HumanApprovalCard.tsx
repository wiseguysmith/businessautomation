import { UserCheck } from "lucide-react";

export function HumanApprovalCard() {
  return (
    <article className="rounded-lg border border-gold/35 bg-gold/10 p-5">
      <div className="flex gap-3">
        <UserCheck className="mt-1 h-5 w-5 flex-none text-gold" aria-hidden="true" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-600">
            Human Approval Layer
          </p>
          <h2 className="mt-2 text-xl font-black text-ink">
            The system prepares the response. Your team stays in control.
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-700">
            AI drafts customer-facing messages for your review. It does not auto-send
            replies to prospects.
          </p>
        </div>
      </div>
    </article>
  );
}
