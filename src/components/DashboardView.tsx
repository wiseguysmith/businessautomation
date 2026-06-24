"use client";

import {
  createFallbackRealEstateResult,
  defaultRealEstatePayload,
  workflowSteps
} from "@/lib/demo";
import { STORAGE_KEYS } from "@/lib/storage";
import type { DemoResult, RealEstateDemoPayload } from "@/lib/types";
import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AIDraftCard } from "./AIDraftCard";
import { DemoDisclaimer } from "./DemoDisclaimer";
import { HumanApprovalCard } from "./HumanApprovalCard";
import { LeadClassificationCard } from "./LeadClassificationCard";
import { OwnerNotificationCard } from "./OwnerNotificationCard";
import { SendSummaryCTA } from "./SendSummaryCTA";
import { UrgencyScoreCard } from "./UrgencyScoreCard";
import { WorkflowTimeline } from "./WorkflowTimeline";

export function DashboardView() {
  const [payload, setPayload] = useState<RealEstateDemoPayload>(defaultRealEstatePayload);
  const [result, setResult] = useState<DemoResult>(() =>
    createFallbackRealEstateResult(defaultRealEstatePayload, { simulatedOnly: true })
  );

  useEffect(() => {
    const savedPayload = window.localStorage.getItem(STORAGE_KEYS.demoPayload);
    const savedResult = window.localStorage.getItem(STORAGE_KEYS.demoResult);

    try {
      if (savedPayload) {
        setPayload(JSON.parse(savedPayload) as RealEstateDemoPayload);
      }
      if (savedResult) {
        setResult(JSON.parse(savedResult) as DemoResult);
      }
    } catch {
      const fallback = createFallbackRealEstateResult(defaultRealEstatePayload, {
        simulatedOnly: true
      });
      setResult(fallback);
    }
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-ink p-5 text-cream shadow-soft sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Live Demo Result
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">
              Opportunity Snapshot for {payload.businessName}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-200">
              New {payload.channel} inquiry from {payload.customerName}. The dashboard shows
              classification, urgency, recommended action, draft response, logging, and
              owner notification status.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-300">
              System Message
            </p>
            <p className="mt-2 text-lg font-black text-gold">
              {result.message || "Demo result ready."}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <LeadClassificationCard
          leadType={result.leadType}
          estimatedOpportunity={result.estimatedOpportunity}
        />
        <UrgencyScoreCard score={result.urgencyScore} label={result.urgencyLabel} />
        <article className="panel p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
            Recommended Next Action
          </p>
          <h2 className="mt-3 text-2xl font-black text-ink">{result.recommendedAction}</h2>
          <p className="mt-4 text-sm leading-6 text-stone-700">{result.riskNote}</p>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <AIDraftCard result={result} />
        <div className="space-y-4">
          <WorkflowTimeline steps={workflowSteps} activeStep={workflowSteps.length} complete />
          <OwnerNotificationCard
            logged={result.logged}
            notificationSent={result.notificationSent}
            fallback={result.fallback}
          />
          <HumanApprovalCard />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <SendSummaryCTA compact />
        <div className="space-y-4">
          <article className="panel p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              Quote Path
            </p>
            <h2 className="mt-3 text-2xl font-black text-ink">
              Request setup quote or book a call.
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-700">
              Capture prospect details first, then send them to the booking path when the
              business owner is ready.
            </p>
            <Link href="/quote" className="primary-button mt-5 w-full">
              Request Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
          <Link href="/demo/real-estate" className="secondary-button w-full">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Run Another Demo
          </Link>
          <DemoDisclaimer />
        </div>
      </div>
    </div>
  );
}
