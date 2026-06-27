"use client";

import {
  createFallbackRealEstateResult,
  defaultRealEstatePayload,
  realEstateScenarios,
  workflowSteps
} from "@/lib/demo";
import { STORAGE_KEYS } from "@/lib/storage";
import type { RealEstateDemoPayload, Scenario } from "@/lib/types";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Step = "name" | "scenario" | "processing";

const STEP_MS = 600;

export function DemoWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("name");
  const [businessName, setBusinessName] = useState("");
  const [scenario, setScenario] = useState<Scenario>(realEstateScenarios[0]);
  const [customInquiry, setCustomInquiry] = useState("");
  const [showCustomize, setShowCustomize] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [workflowDone, setWorkflowDone] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEYS.snapshotInput);
    if (!saved) return;
    try {
      const snap = JSON.parse(saved) as { businessName?: string };
      if (snap.businessName) setBusinessName(snap.businessName);
    } catch {
      // ignore
    }
  }, []);

  function handleNameSubmit(e: FormEvent) {
    e.preventDefault();
    if (!businessName.trim()) return;
    setStep("scenario");
  }

  function pickScenario(s: Scenario) {
    setScenario(s);
    setCustomInquiry(s.inquiry);
    runDemo(s);
  }

  async function runDemo(s: Scenario) {
    setStep("processing");
    setActiveWorkflowStep(0);
    setWorkflowDone(false);

    const payload: RealEstateDemoPayload = {
      ...defaultRealEstatePayload,
      businessName: businessName.trim(),
      customerName: s.customerName,
      inquiry: customInquiry || s.inquiry,
      channel: s.channel,
      budget: s.budget,
      timeline: s.timeline,
      propertyType: s.propertyType,
      source: "Mindful Tech Demo"
    };

    const progress = window.setInterval(() => {
      setActiveWorkflowStep((n) => {
        if (n < workflowSteps.length - 1) return n + 1;
        return n;
      });
    }, STEP_MS);

    try {
      const res = await fetch("/api/demo/real-estate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      window.localStorage.setItem(STORAGE_KEYS.demoPayload, JSON.stringify(payload));
      window.localStorage.setItem(STORAGE_KEYS.demoResult, JSON.stringify(result));
    } catch {
      const fallback = createFallbackRealEstateResult(payload, { simulatedOnly: true });
      window.localStorage.setItem(STORAGE_KEYS.demoPayload, JSON.stringify(payload));
      window.localStorage.setItem(STORAGE_KEYS.demoResult, JSON.stringify(fallback));
    } finally {
      window.clearInterval(progress);
      setActiveWorkflowStep(workflowSteps.length);
      setWorkflowDone(true);
      window.setTimeout(() => router.push("/dashboard"), 900);
    }
  }

  /* ── Step 0: Business Name ───────────────────────────── */
  if (step === "name") {
    return (
      <div className="mx-auto max-w-lg">
        <p className="eyebrow">Live AI Assessment</p>
        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl">
          Who are we running this for?
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          Enter the business name and your AI workforce will process a real lead live.
        </p>
        <form onSubmit={handleNameSubmit} className="mt-8">
          <input
            autoFocus
            className="field-input w-full text-lg font-semibold"
            placeholder="e.g. Tamarindo Luxury Realty"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="primary-button mt-4 w-full text-base"
            disabled={!businessName.trim()}
          >
            Continue
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </div>
    );
  }

  /* ── Step 1: Scenario ────────────────────────────────── */
  if (step === "scenario") {
    return (
      <div className="mx-auto max-w-xl">
        <p className="eyebrow">Step 2 of 3</p>
        <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-tight text-ink sm:text-4xl">
          What kind of lead just came in for{" "}
          <span className="text-gold">{businessName}</span>?
        </h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Pick a scenario — your AI workforce handles the rest.
        </p>

        <div className="mt-8 grid gap-3">
          {realEstateScenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => pickScenario(s)}
              className="group w-full rounded-xl border border-black/10 bg-white p-5 text-left transition hover:border-gold/50 hover:bg-gold/5 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-black text-ink">{s.title}</p>
                  <p className="mt-1 text-sm text-stone-500">{s.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-stone-300 transition group-hover:text-gold" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>

        {showCustomize ? (
          <div className="mt-6">
            <label>
              <span className="field-label">Custom inquiry text</span>
              <textarea
                className="field-input mt-2 min-h-28 resize-y"
                value={customInquiry}
                onChange={(e) => setCustomInquiry(e.target.value)}
                placeholder="Type a custom lead inquiry..."
              />
            </label>
            <button
              type="button"
              onClick={() => runDemo(scenario)}
              className="primary-button mt-4 w-full"
            >
              Run with custom inquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowCustomize(true)}
            className="mt-5 text-xs font-semibold text-stone-400 underline underline-offset-2 hover:text-ink"
          >
            Write a custom inquiry instead
          </button>
        )}
      </div>
    );
  }

  /* ── Step 2: Processing (aha moment) ─────────────────── */
  return (
    <div className="mx-auto flex min-h-[72svh] max-w-lg flex-col items-center justify-center text-center">
      <div className="rounded-2xl bg-ink px-8 py-10 text-cream shadow-soft sm:px-12 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
          AI Workforce Activated
        </p>
        <h1 className="mt-4 text-3xl font-black leading-snug sm:text-4xl">
          {businessName}
        </h1>
        <p className="mt-2 text-sm text-stone-400">
          {scenario.title} · {scenario.customerName}
        </p>

        <div className="mx-auto mt-8 max-w-xs space-y-3 text-left">
          {workflowSteps.map((label, i) => {
            const done = workflowDone || i < activeWorkflowStep;
            const active = !workflowDone && i === activeWorkflowStep;
            return (
              <div key={label} className="flex items-center gap-3 text-sm">
                <div
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-full transition-all duration-300 ${
                    done
                      ? "bg-teal text-white"
                      : active
                        ? "bg-gold/20 text-gold"
                        : "bg-white/8 text-stone-500"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </div>
                <span
                  className={`transition-colors duration-300 ${
                    done || active ? "font-semibold text-cream" : "text-stone-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {workflowDone && (
          <div className="mt-8 animate-[fadeIn_0.4s_ease]">
            <p className="text-sm font-semibold text-gold">
              Your AI workforce is ready →
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
