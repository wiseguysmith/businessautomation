"use client";

import { BellRing, CheckCircle2, Sheet } from "lucide-react";
import { useEffect, useState } from "react";

export function NotificationMoment({
  businessName,
  logged,
  notificationSent,
  fallback
}: {
  businessName: string;
  logged: boolean;
  notificationSent: boolean;
  fallback?: boolean;
}) {
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowEmail(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-3">

      {/* Sheet log */}
      <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-white p-4">
        <div className="rounded-full bg-teal/10 p-2 text-teal">
          <Sheet className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-500">
            Google Sheets
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-ink">
            {logged ? "Logged to MindfulTech Demo Leads" : "Entry prepared"}
          </p>
        </div>
        <CheckCircle2 className="ml-auto h-5 w-5 flex-shrink-0 text-teal" aria-hidden="true" />
      </div>

      {/* Email notification — the demo moment */}
      {showEmail && (
        <div
          className={`rounded-lg border p-4 transition-all duration-500 ${
            notificationSent && !fallback
              ? "border-gold/40 bg-gold/8"
              : "border-black/10 bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`rounded-full p-2 ${
                notificationSent && !fallback
                  ? "bg-gold/15 text-gold"
                  : "bg-black/5 text-stone-400"
              }`}
            >
              <BellRing className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-500">
                Owner Notification
              </p>
              {notificationSent && !fallback ? (
                <>
                  <p className="mt-1 text-sm font-black text-ink">
                    Email sent to info@mindfultech.services
                  </p>
                  <div className="mt-3 rounded-md border border-black/8 bg-white p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
                      Subject
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink">
                      New Hot Lead — {businessName}
                    </p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400">
                      Preview
                    </p>
                    <p className="mt-1 text-xs leading-5 text-stone-600">
                      A new lead has been classified and a draft response is ready for
                      your review.
                    </p>
                  </div>
                  <p className="mt-3 text-xs font-semibold text-gold">
                    Check your phone — this just arrived.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    Notification prepared
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    In a live setup, this fires to info@mindfultech.services
                    the moment a lead arrives.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
