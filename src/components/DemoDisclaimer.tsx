import { ShieldCheck } from "lucide-react";

export function DemoDisclaimer() {
  return (
    <div className="rounded-lg border border-gold/35 bg-gold/10 p-4 text-sm leading-6 text-stone-800">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
        <p>
          This is a Mindful Tech demo environment. It does not connect to your
          live systems. A production setup can connect to your website forms, email,
          WhatsApp, Google Sheets, CRM, or other tools after implementation.
        </p>
      </div>
    </div>
  );
}
