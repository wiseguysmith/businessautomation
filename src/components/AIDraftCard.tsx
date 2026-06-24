"use client";

import { DemoResult } from "@/lib/types";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";
import { SpanishDraftButton } from "./SpanishDraftButton";

export function AIDraftCard({ result }: { result: DemoResult }) {
  const [showSpanish, setShowSpanish] = useState(false);

  return (
    <article className="panel p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-gold/15 p-3 text-gold">
          <MessageSquareText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
            AI Draft Response
          </p>
          <h2 className="text-xl font-black text-ink">Ready for approval</h2>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-black/10 bg-cream p-4">
        <p className="text-sm leading-7 text-stone-800">{result.draftResponse}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        {!showSpanish ? (
          <SpanishDraftButton onClick={() => setShowSpanish(true)} />
        ) : (
          <span className="rounded-full bg-teal/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-teal">
            Spanish version ready
          </span>
        )}
      </div>

      {showSpanish ? (
        <div className="mt-4 rounded-lg border border-teal/20 bg-teal/10 p-4">
          <p className="text-sm leading-7 text-stone-800">{result.spanishDraftResponse}</p>
        </div>
      ) : null}
    </article>
  );
}
