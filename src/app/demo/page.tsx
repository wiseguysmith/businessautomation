import { DemoModeSelector } from "@/components/DemoModeSelector";
import { DemoDisclaimer } from "@/components/DemoDisclaimer";

export default function DemoPage() {
  return (
    <main className="page-shell py-10 sm:py-14">
      <DemoModeSelector />
      <div className="mt-6">
        <DemoDisclaimer />
      </div>
    </main>
  );
}
