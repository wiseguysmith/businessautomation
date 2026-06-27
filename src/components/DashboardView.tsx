"use client";

import {
  createFallbackRealEstateResult,
  defaultRealEstatePayload
} from "@/lib/demo";
import { STORAGE_KEYS } from "@/lib/storage";
import type { DemoResult, RealEstateDemoPayload } from "@/lib/types";
import { track } from "@/lib/analytics";
import { ArrowRight, PlayCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AIDraftCard } from "./AIDraftCard";
import { AIImpactPanel } from "./AIImpactPanel";
import { DemoDisclaimer } from "./DemoDisclaimer";
import { HumanApprovalCard } from "./HumanApprovalCard";
import { LeadClassificationCard } from "./LeadClassificationCard";
import { NotificationMoment } from "./NotificationMoment";
import { SendSummaryCTA } from "./SendSummaryCTA";
import { UrgencyScoreCard } from "./UrgencyScoreCard";
import { WorkflowTimeline } from "./WorkflowTimeline";

export function DashboardView() {
  const [payload, setPayload] = useState<RealEstateDemoPayload>(defaultRealEstatePayload);
  const [result, setResult] = useState<DemoResult>(() =>
    createFallbackRealEstateResult(defaultRealEstatePayload, { simulatedOnly: true })
  );
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    track("dashboard_viewed", {});
    const savedPayload = window.localStorage.getItem(STORAGE_KEYS.demoPayload);
    const savedResult = window.localStorage.getItem(STORAGE_KEYS.demoResult);

    try {
      if (savedPayload) setPayload(JSON.parse(savedPayload) as RealEstateDemoPayload);
      if (savedResult) setResult(JSON.parse(savedResult) as DemoResult);
    } catch {
      setResult(createFallbackRealEstateResult(defaultRealEstatePayload, { simulatedOnly: true }));
    }
  }, []);

  const handleTimelineComplete = useCallback(() => {
    setRevealed(true);
  }, []);

  return (
    <div className="space-y-6">

      {/* Field reset bar — always visible for quick restart */}
      <div className="flex items-center justify-between rounded-lg border border-black/8 bg-white/60 px-4 py-2.5">
        <p className="text-xs font-semibold text-stone-500">Live Demo Result</p>
        <Link
          href="/demo"
          className="flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-bold text-cream transition hover:bg-stone-800"
          onClick={() => track("demo_started", { reset: true })}
        >
          <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
          New Demo
        </Link>
      </div>

      {/* Hero header — business name front and center */}
      <section className="rounded-xl bg-ink px-6 py-8 text-cream shadow-soft sm:px-8 sm:py-10">
        <p className="eyebrow">Live Demo Result</p>
        <h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
          {payload.businessName}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-stone-300">
          New {payload.channel} inquiry from{" "}
          <span className="font-semibold text-cream">{payload.customerName}</span>.
          Your AI workforce — intake specialist, sales assistant, inbox manager —
          classified the lead, scored urgency, drafted a response, logged it, and
          prepared your notification. All in seconds.
        </p>
      </section>

      {/* Timeline plays first. Cards reveal after it completes. */}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {revealed ? (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <LeadClassificationCard
                  leadType={result.leadType}
                  estimatedOpportunity={result.estimatedOpportunity}
                />
                <UrgencyScoreCard score={result.urgencyScore} label={result.urgencyLabel} />
                <article className="panel p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                    Recommended Action
                  </p>
                  <h2 className="mt-3 text-lg font-black leading-snug text-ink">
                    {result.recommendedAction}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{result.riskNote}</p>
                </article>
              </div>

              <AIDraftCard result={result} />
              <HumanApprovalCard />
            </>
          ) : (
            <div className="rounded-xl border border-black/8 bg-white/60 p-8 text-center">
              <p className="text-sm font-semibold text-stone-500">
                Processing lead — watch the timeline
              </p>
            </div>
          )}
        </div>

        {/* Timeline column */}
        <div className="space-y-4">
          <WorkflowTimeline animate onComplete={handleTimelineComplete} />
          {revealed && (
            <NotificationMoment
              businessName={payload.businessName}
              logged={result.logged}
              notificationSent={result.notificationSent}
              fallback={result.fallback}
            />
          )}
        </div>
      </div>

      {/* AI Impact Panel */}
      {revealed && <AIImpactPanel />}

      {/* CTAs — only after reveal */}
      {revealed && (
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <SendSummaryCTA compact />
          <div className="space-y-4">
            <article className="panel p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                Ready to set this up?
              </p>
              <h2 className="mt-3 text-xl font-black text-ink">
                Book a 20-minute discovery call.
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                We will confirm your tools, build the production version, and have it
                running for your business.
              </p>
              <Link href="/quote" className="primary-button mt-5 w-full">
                Request Setup Quote
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
      )}
    </div>
  );
}
