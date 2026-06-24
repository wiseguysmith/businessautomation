import { BellRing } from "lucide-react";

export function OwnerNotificationCard({
  logged,
  notificationSent,
  fallback
}: {
  logged: boolean;
  notificationSent: boolean;
  fallback?: boolean;
}) {
  const sheetStatus = logged ? "Logged to MindfulTech Demo Leads" : "Demo sheet entry prepared";
  const notificationStatus = notificationSent
    ? "Owner notification sent"
    : "Owner notification prepared";

  return (
    <article className="panel p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-teal/10 p-3 text-teal">
          <BellRing className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
            Logging and Notification
          </p>
          <h2 className="text-xl font-black text-ink">
            {fallback ? "Simulation status" : "Automation status"}
          </h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        <div className="rounded-md bg-black/[0.035] p-3 text-sm font-semibold text-stone-800">
          {sheetStatus}
        </div>
        <div className="rounded-md bg-black/[0.035] p-3 text-sm font-semibold text-stone-800">
          {notificationStatus}: info@mindfultech.services
        </div>
      </div>
    </article>
  );
}
