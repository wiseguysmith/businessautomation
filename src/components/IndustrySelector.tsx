"use client";

import type { Industry } from "@/lib/types";
import { Building2, Compass, Hotel, Leaf, MoreHorizontal, Utensils, Wrench } from "lucide-react";

const options: Array<{
  value: Industry;
  label: string;
  note: string;
  status: string;
  icon: typeof Building2;
}> = [
  {
    value: "Real Estate",
    label: "Real Estate",
    note: "Buyer, seller, renter, and investor leads.",
    status: "Live V1",
    icon: Building2
  },
  {
    value: "Hotel",
    label: "Hotel",
    note: "Guest requests and booking inquiries.",
    status: "Preview",
    icon: Hotel
  },
  {
    value: "Restaurant",
    label: "Restaurant",
    note: "Reservations, reviews, and response drafts.",
    status: "Preview",
    icon: Utensils
  },
  {
    value: "Property Manager",
    label: "Property Manager",
    note: "Owner updates, rental requests, and maintenance intake.",
    status: "Preview",
    icon: Wrench
  },
  {
    value: "Tour Operator",
    label: "Tour Operator",
    note: "Booking inquiries, schedule questions, and follow-up.",
    status: "Preview",
    icon: Compass
  },
  {
    value: "Wellness",
    label: "Wellness",
    note: "Appointment requests, client questions, and reminders.",
    status: "Preview",
    icon: Leaf
  },
  {
    value: "Other",
    label: "Other",
    note: "Use the same intake idea for another local service business.",
    status: "Preview",
    icon: MoreHorizontal
  }
];

export function IndustrySelector({
  value,
  onChange
}: {
  value: Industry;
  onChange: (value: Industry) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {options.map((option) => {
        const Icon = option.icon;
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-lg border p-4 text-left transition ${
              active
                ? "border-gold bg-gold/12 shadow-soft"
                : "border-black/10 bg-white/80 hover:border-gold/60"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <Icon className="h-5 w-5 text-teal" aria-hidden="true" />
              <span className="rounded-full bg-black/5 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-stone-600">
                {option.status}
              </span>
            </div>
            <div className="mt-4 text-sm font-black text-ink">{option.label}</div>
            <p className="mt-2 text-xs leading-5 text-stone-600">{option.note}</p>
          </button>
        );
      })}
    </div>
  );
}
