import { DemoDisclaimer } from "@/components/DemoDisclaimer";
import { ObjectionFAQ } from "@/components/ObjectionFAQ";
import { QuoteCTA } from "@/components/QuoteCTA";

export default function QuotePage() {
  const bookingUrl = process.env.MINDFUL_BOOKING_URL || "https://calendly.com/mindful_tech";

  return (
    <main className="page-shell py-10 sm:py-14">
      <QuoteCTA bookingUrl={bookingUrl} />
      <div className="mt-6">
        <DemoDisclaimer />
      </div>
      <ObjectionFAQ />
    </main>
  );
}
