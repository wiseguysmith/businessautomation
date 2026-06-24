import { DemoDisclaimer } from "@/components/DemoDisclaimer";
import { OpportunitySnapshotForm } from "@/components/OpportunitySnapshotForm";

export default function PreviewPage() {
  return (
    <main className="page-shell py-10 sm:py-14">
      <OpportunitySnapshotForm />
      <div className="mt-6">
        <DemoDisclaimer />
      </div>
    </main>
  );
}
