import { DemoWizard } from "@/components/DemoWizard";

export default function LawFirmDemoPage() {
  return (
    <main className="page-shell py-10 sm:py-16">
      <DemoWizard defaultIndustryId="law-firm" />
    </main>
  );
}
