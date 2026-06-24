import { DemoDisclaimer } from "@/components/DemoDisclaimer";
import { SendSummaryCTA } from "@/components/SendSummaryCTA";
import Link from "next/link";

export default function SummaryPage() {
  return (
    <main className="page-shell py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <SendSummaryCTA />
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/quote" className="primary-button">
            Request Setup Quote
          </Link>
          <Link href="/dashboard" className="secondary-button">
            Back to Dashboard
          </Link>
        </div>
        <div className="mt-6">
          <DemoDisclaimer />
        </div>
      </div>
    </main>
  );
}
