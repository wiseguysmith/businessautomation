"use client";

import {
  defaultRealEstatePayload,
  realEstateScenarios,
  workflowSteps
} from "@/lib/demo";
import { STORAGE_KEYS } from "@/lib/storage";
import type { RealEstateDemoPayload, Scenario } from "@/lib/types";
import { PlayCircle, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { DemoDisclaimer } from "./DemoDisclaimer";
import { PreloadedScenarioCards } from "./PreloadedScenarioCards";
import { WorkflowTimeline } from "./WorkflowTimeline";

export function RealEstateDemoForm() {
  const router = useRouter();
  const [form, setForm] = useState<RealEstateDemoPayload>(defaultRealEstatePayload);
  const [selectedScenarioId, setSelectedScenarioId] = useState(realEstateScenarios[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const savedBusiness = window.localStorage.getItem(STORAGE_KEYS.snapshotInput);
    if (!savedBusiness) {
      return;
    }

    try {
      const snapshot = JSON.parse(savedBusiness) as { businessName?: string; painPoint?: string };
      setForm((current) => ({
        ...current,
        businessName: snapshot.businessName || current.businessName,
        painPoint: snapshot.painPoint || current.painPoint
      }));
    } catch {
      // Ignore old local demo data.
    }
  }, []);

  function update<K extends keyof RealEstateDemoPayload>(key: K, value: RealEstateDemoPayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function selectScenario(scenario: Scenario) {
    setSelectedScenarioId(scenario.id);
    setForm((current) => ({
      ...current,
      customerName: scenario.customerName,
      inquiry: scenario.inquiry,
      channel: scenario.channel,
      budget: scenario.budget,
      timeline: scenario.timeline,
      propertyType: scenario.propertyType
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsRunning(true);
    setStatusMessage("Preparing live demo result...");
    setActiveStep(0);

    const payload: RealEstateDemoPayload = {
      ...form,
      industry: "Real Estate",
      source: "Mindful Consultations Demo"
    };

    const progress = window.setInterval(() => {
      setActiveStep((current) => Math.min(current + 1, workflowSteps.length - 1));
    }, 520);

    try {
      const response = await fetch("/api/demo/real-estate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      window.localStorage.setItem(STORAGE_KEYS.demoPayload, JSON.stringify(payload));
      window.localStorage.setItem(STORAGE_KEYS.demoResult, JSON.stringify(result));
      setActiveStep(workflowSteps.length - 1);
      setStatusMessage(result.message || "Demo result ready.");
      window.setTimeout(() => router.push("/dashboard"), 650);
    } catch {
      setStatusMessage("Demo simulation loaded.");
    } finally {
      window.clearInterval(progress);
      window.setTimeout(() => setIsRunning(false), 700);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form onSubmit={handleSubmit} className="panel p-5 sm:p-6">
        <p className="eyebrow">Lead Response Demo</p>
        <h1 className="mt-3 text-4xl font-black tracking-normal text-ink">
          Run a real estate lead through the automation preview.
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-700">
          Choose a preloaded scenario or customize the inquiry before running the demo.
        </p>

        <div className="mt-6">
          <span className="field-label">Preloaded Scenarios</span>
          <div className="mt-2">
            <PreloadedScenarioCards
              scenarios={realEstateScenarios}
              selectedId={selectedScenarioId}
              onSelect={selectScenario}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="field-label">Business Name</span>
            <input
              className="field-input mt-2"
              value={form.businessName}
              onChange={(event) => update("businessName", event.target.value)}
              required
            />
          </label>
          <label>
            <span className="field-label">Customer Name</span>
            <input
              className="field-input mt-2"
              value={form.customerName}
              onChange={(event) => update("customerName", event.target.value)}
              required
            />
          </label>
          <label>
            <span className="field-label">Channel</span>
            <select
              className="field-input mt-2"
              value={form.channel}
              onChange={(event) => update("channel", event.target.value)}
            >
              <option>Website</option>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>Instagram</option>
              <option>Walk-in</option>
            </select>
          </label>
          <label>
            <span className="field-label">Property Type</span>
            <input
              className="field-input mt-2"
              value={form.propertyType}
              onChange={(event) => update("propertyType", event.target.value)}
              placeholder="Condo"
            />
          </label>
          <label>
            <span className="field-label">Budget</span>
            <input
              className="field-input mt-2"
              value={form.budget}
              onChange={(event) => update("budget", event.target.value)}
              inputMode="numeric"
              placeholder="450000"
            />
          </label>
          <label>
            <span className="field-label">Timeline</span>
            <input
              className="field-input mt-2"
              value={form.timeline}
              onChange={(event) => update("timeline", event.target.value)}
              placeholder="Next week"
            />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="field-label">Inquiry</span>
          <textarea
            className="field-input mt-2 min-h-32 resize-y"
            value={form.inquiry}
            onChange={(event) => update("inquiry", event.target.value)}
            required
          />
        </label>

        <details className="mt-5 rounded-lg border border-black/10 bg-black/[0.025] p-4">
          <summary className="cursor-pointer text-sm font-bold text-ink">
            Optional owner capture
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label>
              <span className="field-label">Owner Name</span>
              <input
                className="field-input mt-2"
                value={form.ownerName}
                onChange={(event) => update("ownerName", event.target.value)}
                placeholder="Owner name"
              />
            </label>
            <label>
              <span className="field-label">Email</span>
              <input
                className="field-input mt-2"
                value={form.ownerEmail}
                onChange={(event) => update("ownerEmail", event.target.value)}
                type="email"
                placeholder="owner@example.com"
              />
            </label>
            <label>
              <span className="field-label">WhatsApp</span>
              <input
                className="field-input mt-2"
                value={form.ownerWhatsApp}
                onChange={(event) => update("ownerWhatsApp", event.target.value)}
                placeholder="+506 ..."
              />
            </label>
            <label>
              <span className="field-label">Interest Level</span>
              <select
                className="field-input mt-2"
                value={form.interestLevel}
                onChange={(event) => update("interestLevel", event.target.value)}
              >
                <option value="">Select interest</option>
                <option>Just exploring</option>
                <option>Interested - want more info</option>
                <option>Ready to talk pricing</option>
                <option>Ready to move forward</option>
              </select>
            </label>
          </div>
        </details>

        <button type="submit" className="primary-button mt-6 w-full" disabled={isRunning}>
          {isRunning ? (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Running Demo
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              Run Demo
            </>
          )}
        </button>
      </form>

      <aside className="space-y-4">
        <WorkflowTimeline steps={workflowSteps} activeStep={activeStep} />
        {statusMessage ? (
          <div className="rounded-lg border border-teal/20 bg-teal/10 p-4 text-sm font-semibold text-teal">
            {statusMessage}
          </div>
        ) : null}
        <DemoDisclaimer />
      </aside>
    </div>
  );
}
