"use client";

import type { Scenario } from "@/lib/types";
import { ChevronRight } from "lucide-react";

export function PreloadedScenarioCards({
  scenarios,
  selectedId,
  onSelect
}: {
  scenarios: Scenario[];
  selectedId: string;
  onSelect: (scenario: Scenario) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {scenarios.map((scenario) => {
        const selected = scenario.id === selectedId;
        return (
          <button
            key={scenario.id}
            type="button"
            onClick={() => onSelect(scenario)}
            className={`rounded-lg border p-4 text-left transition ${
              selected
                ? "border-gold bg-gold/10 shadow-soft"
                : "border-black/10 bg-white/85 hover:border-gold/60"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-black text-ink">{scenario.title}</h3>
              <ChevronRight className="h-4 w-4 text-gold" aria-hidden="true" />
            </div>
            <p className="mt-2 text-xs leading-5 text-stone-600">{scenario.description}</p>
          </button>
        );
      })}
    </div>
  );
}
