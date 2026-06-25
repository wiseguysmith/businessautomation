"use client";

import { workflowSteps } from "@/lib/demo";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const STEP_DURATION_MS = 650;

type Props =
  | { animate: true; onComplete?: () => void; steps?: never; activeStep?: never; complete?: never }
  | { animate?: false; steps: string[]; activeStep: number; complete?: boolean; onComplete?: never };

export function WorkflowTimeline(props: Props) {
  const [autoStep, setAutoStep] = useState(0);
  const [autoComplete, setAutoComplete] = useState(false);

  useEffect(() => {
    if (!props.animate) return;
    if (autoStep >= workflowSteps.length) {
      setAutoComplete(true);
      props.onComplete?.();
      return;
    }
    const t = setTimeout(() => setAutoStep((s) => s + 1), STEP_DURATION_MS);
    return () => clearTimeout(t);
  }, [props.animate, autoStep, props.onComplete]);

  const steps = props.animate ? workflowSteps : props.steps;
  const activeStep = props.animate ? autoStep : props.activeStep;
  const complete = props.animate ? autoComplete : (props.complete ?? false);

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
                className={`flex h-7 w-7 flex-none items-center justify-center rounded-full transition-colors duration-300 ${
                  done
                    ? "bg-teal text-white"
                    : active
                      ? "bg-gold/20 text-gold"
                      : "bg-black/5 text-stone-400"
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
              <span
                className={`transition-colors duration-300 ${
                  done || active ? "font-semibold text-ink" : "text-stone-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
