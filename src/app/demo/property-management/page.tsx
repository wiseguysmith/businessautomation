import { DemoWizard } from "@/components/DemoWizard";

export default function PropertyManagementDemoPage() {
  return (
    <main className="page-shell py-10 sm:py-16">
      <DemoWizard defaultIndustryId="property-management" />
    </main>
  );
}
