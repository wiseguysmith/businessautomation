"use client";

import { STORAGE_KEYS } from "@/lib/storage";
import type { RealEstateDemoPayload } from "@/lib/types";
import { ClipboardCheck, Send } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

interface SummaryLead {
  ownerName: string;
  businessName: string;
  email: string;
  whatsApp: string;
  interestLevel: string;
  painPoint: string;
}

const emptyLead: SummaryLead = {
  ownerName: "",
  businessName: "",
  email: "",
  whatsApp: "",
  interestLevel: "Interested - want more info",
  painPoint: "",
};

export function SendSummaryCTA({ compact = false }: { compact?: boolean }) {
  const [lead, setLead] = useState<SummaryLead>(emptyLead);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const payload = window.localStorage.getItem(STORAGE_KEYS.demoPayload);
    if (!payload) {
      return;
    }

    try {
      const parsed = JSON.parse(payload) as Partial<RealEstateDemoPayload>;
      setLead((current) => ({
        ...current,
        ownerName: parsed.ownerName || current.ownerName,
        businessName: parsed.businessName || current.businessName,
        email: parsed.ownerEmail || current.email,
        whatsApp: parsed.ownerWhatsApp || current.whatsApp,
        interestLevel: parsed.interestLevel || current.interestLevel,
        painPoint: parsed.painPoint || current.painPoint
      }));
    } catch {
      // Ignore stale local demo data.
    }
  }, []);

  function update<K extends keyof SummaryLead>(key: K, value: SummaryLead[K]) {
    setLead((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    window.localStorage.setItem(STORAGE_KEYS.summaryLead, JSON.stringify(lead));

    const savedPayload = window.localStorage.getItem(STORAGE_KEYS.demoPayload);
    if (savedPayload) {
      try {
        const payload = JSON.parse(savedPayload) as RealEstateDemoPayload;
        await fetch("/api/demo/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: lead.ownerName,
            businessName: lead.businessName || payload.businessName,
            email: lead.email,
            whatsapp: lead.whatsApp,
            interestLevel: lead.interestLevel,
            painPoint: lead.painPoint,
            demoType: "Real Estate",
            suggestedPackage: payload.suggestedPackage || "Starter Setup",
            status: "Summary Sent"
          })
        });
      } catch {
        // The UI should remain calm during field demos. Local capture still succeeds.
      }
    }

    setIsSending(false);
    setSent(true);
  }

  return (
    <article className={compact ? "rounded-lg border border-black/10 bg-white p-5" : "panel p-5 sm:p-6"}>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-teal/10 p-3 text-teal">
          <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
            Send Summary
          </p>
          <h2 className="text-2xl font-black text-ink">Send this automation summary</h2>
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
          <span className="field-label">Interest Level</span>
          <select
            className="field-input mt-2"
            value={lead.interestLevel}
            onChange={(event) => update("interestLevel", event.target.value)}
          >
            <option>Just exploring</option>
            <option>Interested - want more info</option>
            <option>Ready to talk pricing</option>
            <option>Ready to move forward</option>
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className="field-label">Pain Point</span>
          <textarea
            className="field-input mt-2 min-h-24 resize-y"
            value={lead.painPoint}
            onChange={(event) => update("painPoint", event.target.value)}
            placeholder="What should the follow-up focus on?"
          />
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className="primary-button w-full" disabled={isSending}>
            <Send className="h-4 w-4" aria-hidden="true" />
            {isSending ? "Preparing Summary" : "Send Me This Automation Summary"}
          </button>
        </div>
      </form>
      {sent ? (
        <p className="mt-4 rounded-md bg-teal/10 p-3 text-sm font-semibold text-teal">
          Summary request captured. If live automation is configured, the lead details are ready
          for the MindfulTech Demo Leads sheet.
        </p>
      ) : null}
    </article>
  );
}
