"use client";

import { track } from "@/lib/analytics";
import { STORAGE_KEYS } from "@/lib/storage";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

interface QuoteLead {
  ownerName: string;
  businessName: string;
  email: string;
  whatsApp: string;
  suggestedPackage: string;
}

export function QuoteCTA({ bookingUrl }: { bookingUrl: string }) {
  const [lead, setLead] = useState<QuoteLead>({
    ownerName: "",
    businessName: "",
    email: "",
    whatsApp: "",
    suggestedPackage: "Starter Setup"
  });
  const [industry, setIndustry] = useState("Real Estate");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const summary = window.localStorage.getItem(STORAGE_KEYS.summaryLead);
    if (!summary) {
      return;
    }

    try {
      const parsed = JSON.parse(summary) as Partial<QuoteLead>;
      setLead((current) => ({
        ...current,
        ownerName: parsed.ownerName || current.ownerName,
        businessName: parsed.businessName || current.businessName,
        email: parsed.email || current.email,
        whatsApp: parsed.whatsApp || current.whatsApp
      }));
    } catch {
      // Ignore old local demo data.
    }

    try {
      const rawPayload = window.localStorage.getItem(STORAGE_KEYS.demoPayload);
      if (rawPayload) {
        const p = JSON.parse(rawPayload) as { industry?: string };
        if (p.industry) setIndustry(p.industry);
      }
    } catch {
      // ignore
    }
  }, []);

  function update<K extends keyof QuoteLead>(key: K, value: QuoteLead[K]) {
    setLead((current) => ({ ...current, [key]: value }));
  }

  async function captureQuote(status: string) {
    window.localStorage.setItem(STORAGE_KEYS.quoteLead, JSON.stringify(lead));
    setSaved(true);

    try {
      await fetch("/api/demo/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.ownerName,
          businessName: lead.businessName,
          email: lead.email,
          whatsapp: lead.whatsApp,
          interestLevel: "Ready to talk pricing",
          demoType: industry,
          suggestedPackage: lead.suggestedPackage,
          status
        })
      });
    } catch {
      // Local capture is enough to keep the field demo moving.
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    await captureQuote("Quote Requested");
    setIsSaving(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border border-black/10 bg-ink p-6 text-cream shadow-soft">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
          Request Quote
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-normal">
          Turn the demo into a setup plan.
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-200">
          Most simple systems start around $1,500. More complete setups are usually around
          $2,500 depending on the tools and workflow.
        </p>
        <div className="mt-6 grid gap-3">
          <div className="rounded-md bg-white/10 p-4">
            <h2 className="text-lg font-black">Starter Setup - $1,500</h2>
            <p className="mt-2 text-sm text-stone-200">
              Lead intake, classification, urgency scoring, draft response, sheet logging,
              and email notification.
            </p>
          </div>
          <div className="rounded-md bg-white/10 p-4">
            <h2 className="text-lg font-black">Standard Setup - $2,500</h2>
            <p className="mt-2 text-sm text-stone-200">
              Starter features plus owner dashboard, daily summaries, approval workflow,
              and custom business rules.
            </p>
          </div>
          <div className="rounded-md bg-white/10 p-4">
            <h2 className="text-lg font-black">Support Retainer - $500/month</h2>
            <p className="mt-2 text-sm text-stone-200">
              Monitoring, workflow fixes, prompt improvements, monthly optimization, and
              basic reporting.
            </p>
          </div>
        </div>
      </section>

      <section className="panel p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gold/15 p-3 text-gold">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              Booking CTA
            </p>
            <h2 className="text-2xl font-black text-ink">Book a setup call</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="field-label">Name</span>
            <input
              className="field-input mt-2"
              value={lead.ownerName}
              onChange={(event) => update("ownerName", event.target.value)}
              required
            />
          </label>
          <label>
            <span className="field-label">Business Name</span>
            <input
              className="field-input mt-2"
              value={lead.businessName}
              onChange={(event) => update("businessName", event.target.value)}
              required
            />
          </label>
          <label>
            <span className="field-label">Email</span>
            <input
              className="field-input mt-2"
              value={lead.email}
              onChange={(event) => update("email", event.target.value)}
              type="email"
              required
            />
          </label>
          <label>
            <span className="field-label">WhatsApp</span>
            <input
              className="field-input mt-2"
              value={lead.whatsApp}
              onChange={(event) => update("whatsApp", event.target.value)}
            />
          </label>
          <label className="sm:col-span-2">
            <span className="field-label">Suggested Package</span>
            <select
              className="field-input mt-2"
              value={lead.suggestedPackage}
              onChange={(event) => update("suggestedPackage", event.target.value)}
            >
              <option>Starter Setup</option>
              <option>Standard Setup</option>
              <option>Support Retainer</option>
            </select>
          </label>
          <div className="sm:col-span-2">
          <button type="submit" className="secondary-button w-full">
              {isSaving ? "Saving Quote Details" : "Save Quote Details"}
          </button>
          </div>
        </form>

        {saved ? (
          <p className="mt-4 rounded-md bg-teal/10 p-3 text-sm font-semibold text-teal">
            Quote details captured for this demo session.
          </p>
        ) : null}

        {bookingUrl ? (
          <a
            href={bookingUrl}
            className="primary-button mt-5 w-full"
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              track("booking_cta_clicked", {});
              void captureQuote("Quote Requested");
            }}
          >
            Book Mindful Tech Setup Call
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <p className="mt-5 rounded-md border border-gold/35 bg-gold/10 p-4 text-sm font-semibold text-stone-800">
            Booking link not configured yet.
          </p>
        )}
      </section>
    </div>
  );
}
