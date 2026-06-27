"use client";

import { DemoResult } from "@/lib/types";
import { Languages, MessageSquareText } from "lucide-react";
import { useState } from "react";

type Lang = "en" | "es";

export function AIDraftCard({ result }: { result: DemoResult }) {
  const [lang, setLang] = useState<Lang>("en");

  const draft = lang === "en" ? result.draftResponse : result.spanishDraftResponse;
  const roleName = lang === "en" ? "AI Sales Assistant" : "AI Bilingual Communications Officer";

  return (
    <article className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gold/15 p-3 text-gold">
            <MessageSquareText className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
              {roleName}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">
              Draft Response
            </p>
            <h2 className="mt-0.5 text-lg font-black text-ink">Ready for your approval</h2>
          </div>
        </div>

        {/* Language toggle */}
        <div className="flex flex-shrink-0 items-center gap-1 rounded-full border border-black/10 bg-black/[0.03] p-1">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
              lang === "en"
                ? "bg-ink text-cream shadow-sm"
                : "text-stone-500 hover:text-ink"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("es")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              lang === "es"
                ? "bg-ink text-cream shadow-sm"
                : "text-stone-500 hover:text-ink"
            }`}
          >
            <Languages className="h-3 w-3" aria-hidden="true" />
            ES
          </button>
        </div>
      </div>

      {lang === "es" && (
        <div className="mt-4 flex items-center gap-2 rounded-md border border-teal/20 bg-teal/8 px-3 py-2">
          <Languages className="h-3.5 w-3.5 flex-shrink-0 text-teal" aria-hidden="true" />
          <p className="text-xs font-semibold text-teal">
            Spanish version ready — no extra setup required.
          </p>
        </div>
      )}

      <div className="mt-4 rounded-lg border border-black/10 bg-cream p-4">
        <p className="text-sm leading-7 text-stone-800">{draft}</p>
      </div>

      {lang === "en" && (
        <p className="mt-3 text-xs text-stone-400">
          Tap <span className="font-bold">ES</span> to see the Spanish version — already drafted.
        </p>
      )}
    </article>
  );
}
