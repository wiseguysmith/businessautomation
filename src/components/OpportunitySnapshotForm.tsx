"use client";

import { createOpportunitySnapshot } from "@/lib/demo";
import { STORAGE_KEYS } from "@/lib/storage";
import type { Industry, OpportunitySnapshotInput, OpportunitySnapshotResult } from "@/lib/types";
import { ScanLine } from "lucide-react";
import { FormEvent, useState } from "react";
import { IndustrySelector } from "./IndustrySelector";
import { OpportunitySnapshot } from "./OpportunitySnapshot";

const defaultInput: OpportunitySnapshotInput = {
  businessName: "Tamarindo Luxury Realty",
  industry: "Real Estate",
  websiteOrInstagram: "",
  estimatedLeadsPerMonth: "25",
  averageDealValue: "7500",
  currentResponseTime: "Same day",
  painPoint: "Leads come from several places and follow-up can be slow."
};

export function OpportunitySnapshotForm() {
  const [form, setForm] = useState<OpportunitySnapshotInput>(defaultInput);
  const [result, setResult] = useState<OpportunitySnapshotResult | null>(null);

  function update<K extends keyof OpportunitySnapshotInput>(
    key: K,
    value: OpportunitySnapshotInput[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const snapshot = createOpportunitySnapshot(form);
    setResult(snapshot);
    window.localStorage.setItem(STORAGE_KEYS.snapshotInput, JSON.stringify(form));
    window.localStorage.setItem(STORAGE_KEYS.snapshotResult, JSON.stringify(snapshot));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="panel p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gold/15 p-3 text-gold">
            <ScanLine className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Business Automation Preview</p>
            <h1 className="mt-1 text-3xl font-black tracking-normal text-ink">
              Opportunity Snapshot
            </h1>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="field-label">Business Name</span>
            <input
              className="field-input mt-2"
              value={form.businessName}
              onChange={(event) => update("businessName", event.target.value)}
              placeholder="Tamarindo Luxury Realty"
              required
            />
          </label>

          <div>
            <span className="field-label">Industry</span>
            <div className="mt-2">
              <IndustrySelector value={form.industry} onChange={(value: Industry) => update("industry", value)} />
            </div>
          </div>

          <label className="block">
            <span className="field-label">Website / Instagram</span>
            <input
              className="field-input mt-2"
              value={form.websiteOrInstagram}
              onChange={(event) => update("websiteOrInstagram", event.target.value)}
              placeholder="@business or website"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="field-label">Estimated Leads Per Month</span>
              <input
                className="field-input mt-2"
                value={form.estimatedLeadsPerMonth}
                onChange={(event) => update("estimatedLeadsPerMonth", event.target.value)}
                inputMode="numeric"
                placeholder="25"
              />
            </label>
            <label className="block">
              <span className="field-label">Average Deal / Customer Value</span>
              <input
                className="field-input mt-2"
                value={form.averageDealValue}
                onChange={(event) => update("averageDealValue", event.target.value)}
                inputMode="numeric"
                placeholder="7500"
              />
            </label>
          </div>

          <label className="block">
            <span className="field-label">Current Response Time</span>
            <select
              className="field-input mt-2"
              value={form.currentResponseTime}
              onChange={(event) => update("currentResponseTime", event.target.value)}
            >
              <option>Same hour</option>
              <option>Same day</option>
              <option>Next day</option>
              <option>2-3 days</option>
              <option>Longer / Not sure</option>
            </select>
          </label>

          <label className="block">
            <span className="field-label">Biggest Pain Point</span>
            <textarea
              className="field-input mt-2 min-h-28 resize-y"
              value={form.painPoint}
              onChange={(event) => update("painPoint", event.target.value)}
              placeholder="Where do leads get delayed or lost?"
            />
          </label>

          <button type="submit" className="primary-button w-full">
            Generate Snapshot
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {result ? (
          <OpportunitySnapshot result={result} />
        ) : (
          <div className="panel flex min-h-[360px] items-center justify-center p-6 text-center">
            <div className="max-w-sm">
              <p className="eyebrow">Preview Ready</p>
              <h2 className="mt-3 text-2xl font-black text-ink">
                Estimate the response gap before running a live demo.
              </h2>
              <p className="mt-4 text-sm leading-6 text-stone-700">
                Enter a few business assumptions to show a cautious opportunity range,
                recommended automation, and suggested package.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
