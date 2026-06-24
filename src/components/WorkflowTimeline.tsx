import { CheckCircle2, Circle, Loader2 } from "lucide-react";

export function WorkflowTimeline({
  steps,
  activeStep,
  complete = false
}: {
  steps: string[];
  activeStep: number;
  complete?: boolean;
}) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
        Workflow Timeline
      </p>
      <div className="mt-4 grid gap-3">
        {steps.map((step, index) => {
          const done = complete || index < activeStep;
          const active = !complete && index === activeStep;
          return (
            <div key={step} className="flex items-center gap-3 text-sm">
              <div
                className={`flex h-7 w-7 flex-none items-center justify-center rounded-full ${
                  done ? "bg-teal text-white" : active ? "bg-gold/20 text-gold" : "bg-black/5 text-stone-400"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                ) : active ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Circle className="h-3 w-3" aria-hidden="true" />
                )}
              </div>
              <span className={done || active ? "font-semibold text-ink" : "text-stone-500"}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
