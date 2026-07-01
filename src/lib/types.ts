export type Industry =
  | "Real Estate"
  | "Hotel"
  | "Restaurant"
  | "Property Manager"
  | "Tour Operator"
  | "Wellness"
  | "Other";

export type DemoMode = "Street Demo" | "Full Demo";

export type InterestLevel = "Just curious" | "Interested" | "Ready for quote";

export interface OpportunitySnapshotInput {
  businessName: string;
  industry: Industry;
  websiteOrInstagram?: string;
  estimatedLeadsPerMonth: string;
  averageDealValue: string;
  currentResponseTime: string;
  painPoint: string;
}

export interface OpportunitySnapshotResult {
  riskLevel: "Low" | "Moderate" | "High" | "Critical";
  estimatedMonthlyLeadsAtRisk: string;
  revenueLeakEstimate: string;
  recommendedAutomation: string;
  suggestedPackage: "Starter Setup" | "Standard Setup";
  summary: string;
}

export interface RealEstateDemoPayload {
  businessName: string;
  industry: "Real Estate";
  customerName: string;
  inquiry: string;
  channel: string;
  budget: string;
  timeline: string;
  propertyType: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerWhatsApp?: string;
  interestLevel?: string;
  painPoint?: string;
  demoType?: DemoMode;
  suggestedPackage?: string;
  followUpStatus?: string;
  source: "Mindful Tech Demo";
  summaryRequested?: boolean;
}

export interface SummaryResultPayload {
  leadType?: string;
  urgencyScore?: number;
  urgencyLabel?: string;
  estimatedOpportunity?: string;
  draftResponse?: string;
  spanishDraftResponse?: string;
  recommendedAction?: string;
  riskNote?: string;
}

export interface DemoResult {
  leadType: string;
  urgencyScore: number;
  urgencyLabel: string;
  estimatedOpportunity: string;
  draftResponse: string;
  spanishDraftResponse: string;
  recommendedAction: string;
  riskNote: string;
  logged: boolean;
  notificationSent: boolean;
  message?: string;
  fallback?: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  customerName: string;
  inquiry: string;
  channel: string;
  budget: string;
  timeline: string;
  propertyType: string;
}
