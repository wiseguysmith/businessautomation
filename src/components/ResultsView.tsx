"use client";

import { createOpportunitySnapshot } from "@/lib/demo";
import { STORAGE_KEYS } from "@/lib/storage";
import type { OpportunitySnapshotInput, OpportunitySnapshotResult } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DemoDisclaimer } from "./DemoDisclaimer";
import { OpportunitySnapshot } from "./OpportunitySnapshot";

const defaultInput: OpportunitySnapshotInput = {
  businessName: "Tamarindo Luxury Realty",
  industry: "Real Estate",
  websiteOrInstagram: "",
  estimatedLeadsPerMonth: "25",
  averageDealValue: "7500",
  currentResponseTime: "A few hours",
  painPoint: "Leads come from several places and follow-up can be slow."
};

export function ResultsView() {
  const [result, setResult] = useState<OpportunitySnapshotResult>(() =>
    createOpportunitySnapshot(defaultInput)
  );

  useEffect(() => {
    const savedResult = window.localStorage.getItem(STORAGE_KEYS.snapshotResult);
    const savedInput = window.localStorage.getItem(STORAGE_KEYS.snapshotInput);

    try {
      if (savedResult) {
        setResult(JSON.parse(savedResult) as OpportunitySnapshotResult);
        return;
      }
      if (savedInput) {
        setResult(createOpportunitySnapshot(JSON.parse(savedInput) as OpportunitySnapshotInput));
      }
    } catch {
      setResult(createOpportunitySnapshot(defaultInput));
    }
  }, []);

  return (
    <div className="space-y-6">
      <section className="max-w-3xl">
        <p className="eyebrow">Opportunity Snapshot</p>
        <h1 className="mt-3 text-4xl font-black tracking-normal text-ink">
          A cautious preview of the response gap.
        </h1>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          This snapshot uses estimated, potential, and based-on-your-inputs language so
          the demo stays credible and prospect-safe.
        </p>
      </section>
      <OpportunitySnapshot result={result} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/demo/real-estate" className="primary-button">
          Run Real Estate Demo
        </Link>
        <Link href="/preview" className="secondary-button">
          Edit Snapshot Inputs
        </Link>
      </div>
      <DemoDisclaimer />
    </div>
  );
}
