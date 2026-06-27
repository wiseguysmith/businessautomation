"use client";

import { track } from "@/lib/analytics";
import { STORAGE_KEYS } from "@/lib/storage";
import type { RealEstateDemoPayload } from "@/lib/types";
import { ClipboardCheck, Send } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

interface SummaryLead {
  ownerName: string;
  email: string;
  whatsApp: string;
}

export function SendSummaryCTA({ compact = false }: { compact?: boolean }) {
  const [lead, setLead] = useState<SummaryLead>({ ownerName: "", email: "", whatsApp: "" });
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("Real Estate");
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEYS.demoPayload);
    if (!raw) return;
    try {
      const payload = JSON.parse(raw) as Partial<RealEstateDemoPayload>;
      setBusinessName(payload.businessName || "");
      setIndustry(payload.industry || "Real Estate");
      setLead((l) => ({
        ...l,
        ownerName: payload.ownerName || l.ownerName,
        email: payload.ownerEmail || l.email,
        whatsApp: payload.ownerWhatsApp || l.whatsApp
      }));
    } catch {
      // ignore
    }
  }, []);

  function update<K extends keyof SummaryLead>(key: K, value: SummaryLead[K]) {
    setLead((l) => ({ ...l, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSending(true);

    const summaryLead = { ...lead, businessName };
    window.localStorage.setItem(STORAGE_KEYS.summaryLead, JSON.stringify(summaryLead));
    track("summary_submitted", { industry });

    try {
      await fetch("/api/demo/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.ownerName,
          businessName,
          email: lead.email,
          whatsapp: lead.whatsApp,
          interestLevel: "Interested - want more info",
          demoType: industry,
          status: "Summary Sent",
          source: "Mindful Tech Demo"
        })
      });
    } catch {
      // Silent — local capture already succeeded
    }

    setIsSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <article className={compact ? "rounded-lg border border-black/10 bg-white p-5" : "panel p-5 sm:p-6"}>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-teal/10 p-3 text-teal">
            <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal">Captured</p>
            <h2 className="text-xl font-black text-ink">You're in the sheet.</h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          {businessName ? `${businessName} is` : "You're"} logged to the MindfulTech Demo Leads sheet.
          Expect a follow-up from the Mindful Tech team.
        </p>
      </article>
    );
  }

  return (
    <article className={compact ? "rounded-lg border border-black/10 bg-white p-5" : "panel p-5 sm:p-6"}>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-teal/10 p-3 text-teal">
          <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
            Get This Result
          </p>
          <h2 className="text-xl font-black text-ink">Send me this demo summary.</h2>
        </div>
      </div>
      {businessName && (
        <p className="mt-2 text-sm text-stone-500">
          We'll send a follow-up for <span className="font-semibold text-ink">{businessName}</span>.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        <label>
          <span className="field-label">Your name</span>
          <input
            className="field-input mt-2"
            value={lead.ownerName}
            onChange={(e) => update("ownerName", e.target.value)}
            placeholder="First name"
            required
          />
        </label>
        <label>
          <span className="field-label">Email</span>
          <input
            className="field-input mt-2"
            type="email"
            value={lead.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@yourbusiness.com"
            required
          />
        </label>
        <label>
          <span className="field-label">WhatsApp <span className="normal-case font-normal text-stone-400">(optional)</span></span>
          <input
            className="field-input mt-2"
            value={lead.whatsApp}
            onChange={(e) => update("whatsApp", e.target.value)}
            placeholder="+506 ..."
          />
        </label>
        <button type="submit" className="primary-button mt-1 w-full" disabled={isSending}>
          <Send className="h-4 w-4" aria-hidden="true" />
          {isSending ? "Sending..." : "Send Summary"}
        </button>
      </form>
    </article>
  );
}
