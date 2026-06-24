import { DashboardView } from "@/components/DashboardView";
import { ObjectionFAQ } from "@/components/ObjectionFAQ";

export default function DashboardPage() {
  return (
    <main className="page-shell py-10 sm:py-14">
      <DashboardView />
      <ObjectionFAQ />
    </main>
  );
}
