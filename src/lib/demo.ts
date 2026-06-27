import type {
  DemoResult,
  OpportunitySnapshotInput,
  OpportunitySnapshotResult,
  RealEstateDemoPayload,
  Scenario
} from "./types";

export const realEstateScenarios: Scenario[] = [
  {
    id: "buyer",
    title: "Buyer Lead",
    description: "Clear budget, beach-area condo, arriving soon.",
    customerName: "Sarah",
    inquiry:
      "I am visiting Tamarindo next week and looking for a 2-bedroom condo under $450k near the beach.",
    channel: "Website",
    budget: "450000",
    timeline: "Next week",
    propertyType: "Condo"
  },
  {
    id: "seller",
    title: "Seller Lead",
    description: "Villa owner exploring a potential listing.",
    customerName: "Michael",
    inquiry: "I own a villa near Playa Langosta and want to know what it might sell for.",
    channel: "Email",
    budget: "",
    timeline: "This month",
    propertyType: "Villa"
  },
  {
    id: "renter",
    title: "Renter Lead",
    description: "Medium-term rental request with a near-term start date.",
    customerName: "Ana",
    inquiry: "I am looking for a 3-month rental starting next month.",
    channel: "WhatsApp",
    budget: "3500",
    timeline: "Next month",
    propertyType: "Rental"
  },
  {
    id: "investor",
    title: "Investor Lead",
    description: "Income-property inquiry for Guanacaste.",
    customerName: "Daniel",
    inquiry: "I am interested in income-producing properties in Guanacaste.",
    channel: "Instagram",
    budget: "",
    timeline: "Exploring options",
    propertyType: "Investment Property"
  }
];

export const workflowSteps = [
  "Lead Received",
  "AI Analyzing",
  "Lead Classified",
  "Urgency Scored",
  "Draft Created",
  "Logged to Demo Sheet",
  "Notification Sent"
];

export const defaultRealEstatePayload: RealEstateDemoPayload = {
  businessName: "Tamarindo Luxury Realty",
  industry: "Real Estate",
  customerName: "Sarah",
  inquiry:
    "Looking for a 2-bedroom condo near the beach under $450k. I will be in Tamarindo next week.",
  channel: "Website",
  budget: "450000",
  timeline: "Next week",
  propertyType: "Condo",
  ownerName: "",
  ownerEmail: "",
  ownerWhatsApp: "",
  interestLevel: "",
  source: "Mindful Tech Demo"
};

export function createOpportunitySnapshot(
  input: OpportunitySnapshotInput
): OpportunitySnapshotResult {
  const leads = Number.parseInt(input.estimatedLeadsPerMonth || "0", 10);
  const value = Number.parseInt(input.averageDealValue || "0", 10);
  const responseTime = input.currentResponseTime.toLowerCase();
  const responseRisk = responseTime.includes("longer") || responseTime.includes("2-3")
    ? "Critical"
    : responseTime.includes("next")
      ? "High"
      : responseTime.includes("same day")
        ? "Moderate"
        : "Low";
  const volumeRisk = leads >= 40 ? "Critical" : leads >= 20 ? "High" : leads >= 10 ? "Moderate" : "Low";
  const riskLevel = highestRisk(responseRisk, volumeRisk);
  const suggestedPackage =
    riskLevel === "High" || riskLevel === "Critical" ? "Standard Setup" : "Starter Setup";
  const atRiskLow = Math.max(1, Math.round(leads * riskMultiplier(riskLevel)));
  const atRiskHigh = Math.max(atRiskLow + 1, Math.round(leads * (riskMultiplier(riskLevel) + 0.08)));

  const revenueLeakEstimate =
    input.industry === "Real Estate"
      ? "Even one serious buyer or seller going cold can represent a meaningful commission opportunity."
      : "A small number of missed inquiries each month can create a noticeable opportunity gap.";

  return {
    riskLevel,
    estimatedMonthlyLeadsAtRisk: `${atRiskLow}-${atRiskHigh} possible leads per month`,
    revenueLeakEstimate,
    recommendedAutomation:
      "Lead intake, urgency scoring, response drafting, Google Sheets logging, and owner notification.",
    suggestedPackage,
    summary: `Based on your inputs, ${input.businessName || "this business"} may benefit from a faster lead response system that prepares follow-up before opportunities go cold.`
  };
}

function highestRisk(
  first: OpportunitySnapshotResult["riskLevel"],
  second: OpportunitySnapshotResult["riskLevel"]
) {
  const order: OpportunitySnapshotResult["riskLevel"][] = ["Low", "Moderate", "High", "Critical"];
  return order[Math.max(order.indexOf(first), order.indexOf(second))];
}

function riskMultiplier(riskLevel: OpportunitySnapshotResult["riskLevel"]) {
  if (riskLevel === "Critical") {
    return 0.22;
  }
  if (riskLevel === "High") {
    return 0.16;
  }
  if (riskLevel === "Moderate") {
    return 0.1;
  }
  return 0.04;
}

export function createFallbackRealEstateResult(
  payload: RealEstateDemoPayload,
  options: { simulatedOnly?: boolean } = {}
): DemoResult {
  const inquiry = payload.inquiry.toLowerCase();
  const timeline = payload.timeline.toLowerCase();
  const budget = payload.budget.trim();

  const leadType = classifyLead(inquiry, payload.propertyType);
  const urgencyScore = scoreLead(inquiry, timeline, budget, payload.channel, leadType);
  const urgencyLabel =
    urgencyScore >= 80 ? "Hot Lead" : urgencyScore >= 50 ? "Warm Lead" : "Low Priority";
  const customerName = payload.customerName || "there";

  return {
    leadType,
    urgencyScore,
    urgencyLabel,
    estimatedOpportunity: estimateOpportunity(leadType, urgencyScore),
    draftResponse: createEnglishDraft(payload, leadType, customerName),
    spanishDraftResponse: createSpanishDraft(payload, leadType, customerName),
    recommendedAction: recommendAction(leadType, urgencyScore),
    riskNote:
      urgencyScore >= 80
        ? "This lead may go cold if not contacted quickly."
        : "This inquiry should be handled with a clear next step so the conversation does not drift.",
    logged: !options.simulatedOnly,
    notificationSent: !options.simulatedOnly,
    fallback: options.simulatedOnly,
    message: options.simulatedOnly ? "Demo simulation loaded." : "Live automation response received."
  };
}

export function isDemoResult(value: unknown): value is DemoResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const result = value as Record<string, unknown>;
  return (
    typeof result.leadType === "string" &&
    typeof result.urgencyScore === "number" &&
    typeof result.urgencyLabel === "string" &&
    typeof result.estimatedOpportunity === "string" &&
    typeof result.draftResponse === "string" &&
    typeof result.spanishDraftResponse === "string" &&
    typeof result.recommendedAction === "string" &&
    typeof result.riskNote === "string" &&
    typeof result.logged === "boolean" &&
    typeof result.notificationSent === "boolean"
  );
}

function classifyLead(inquiry: string, propertyType: string) {
  const combined = `${inquiry} ${propertyType.toLowerCase()}`;
  if (combined.includes("sell") || combined.includes("villa") || combined.includes("valuation")) {
    return "Seller";
  }
  if (combined.includes("rental") || combined.includes("rent")) {
    return "Renter";
  }
  if (
    combined.includes("income") ||
    combined.includes("invest") ||
    combined.includes("cash flow")
  ) {
    return "Investor";
  }
  if (
    combined.includes("buy") ||
    combined.includes("budget") ||
    combined.includes("condo") ||
    combined.includes("bedroom")
  ) {
    return "Buyer";
  }
  if (combined.length < 20) {
    return "Low Quality / Spam";
  }
  return "General Inquiry";
}

function scoreLead(
  inquiry: string,
  timeline: string,
  budget: string,
  channel: string,
  leadType: string
) {
  let score = 42;
  const highSignals = ["next week", "this week", "tomorrow", "today", "showing", "call"];
  const mediumSignals = ["next month", "this month", "soon", "visiting", "interested"];

  if (highSignals.some((signal) => inquiry.includes(signal) || timeline.includes(signal))) {
    score += 26;
  }
  if (mediumSignals.some((signal) => inquiry.includes(signal) || timeline.includes(signal))) {
    score += 14;
  }
  if (budget) {
    score += 12;
  }
  if (inquiry.includes("2-bedroom") || inquiry.includes("3-month") || inquiry.includes("near")) {
    score += 8;
  }
  if (["Website", "WhatsApp", "Walk-in"].includes(channel)) {
    score += 5;
  }
  if (leadType === "Low Quality / Spam") {
    score -= 32;
  }

  return Math.max(12, Math.min(98, score));
}

function estimateOpportunity(leadType: string, score: number) {
  if (leadType === "Buyer" && score >= 80) {
    return "High-value buyer lead";
  }
  if (leadType === "Seller") {
    return "Potential listing opportunity";
  }
  if (leadType === "Investor") {
    return "Potential repeat-buyer relationship";
  }
  if (leadType === "Renter") {
    return "Possible rental placement and future buyer relationship";
  }
  return score >= 50 ? "Qualified follow-up opportunity" : "Lower-priority inquiry";
}

function createEnglishDraft(payload: RealEstateDemoPayload, leadType: string, customerName: string) {
  const business = payload.businessName || "our team";
  if (leadType === "Seller") {
    return `Hi ${customerName}, thank you for reaching out. We can help you understand the current market around ${payload.propertyType || "your property"} and prepare a realistic next step. I would recommend a short call so ${business} can learn a little more about the property and your timing before suggesting a valuation path.`;
  }
  if (leadType === "Renter") {
    return `Hi ${customerName}, thanks for your message. We can help review available rental options that match your timing and preferred area. Since you are looking for a defined stay, I would suggest a quick call or message thread today so we can confirm dates, budget, and must-haves.`;
  }
  if (leadType === "Investor") {
    return `Hi ${customerName}, thank you for reaching out. Income-producing properties can vary widely by area, rental strategy, and ownership goals. I would recommend a short call so we can understand your investment criteria and prepare relevant options before sending anything over.`;
  }
  return `Hi ${customerName}, thank you for reaching out. Based on your budget and timeline, we can help you explore ${payload.propertyType || "property"} options near Tamarindo. Since your timing sounds active, I would recommend scheduling a short call so we can understand your preferences and prepare options before you arrive.`;
}

function createSpanishDraft(payload: RealEstateDemoPayload, leadType: string, customerName: string) {
  if (leadType === "Seller") {
    return `Hola ${customerName}, gracias por escribirnos. Podemos ayudarle a entender el mercado actual para su propiedad y preparar un siguiente paso claro. Recomiendo agendar una llamada breve para conocer la propiedad, su objetivo y su fecha ideal antes de sugerir una ruta de valoracion.`;
  }
  if (leadType === "Renter") {
    return `Hola ${customerName}, gracias por su mensaje. Podemos revisar opciones de alquiler que se ajusten a sus fechas y preferencias. Como busca una estadia definida, recomiendo confirmar hoy las fechas, presupuesto y prioridades para avanzar con opciones relevantes.`;
  }
  if (leadType === "Investor") {
    return `Hola ${customerName}, gracias por escribirnos. Las propiedades con potencial de ingresos dependen de la zona, la estrategia de alquiler y sus metas. Recomiendo una llamada breve para entender sus criterios de inversion y preparar opciones relevantes.`;
  }
  return `Hola ${customerName}, gracias por escribirnos. Segun su presupuesto y fecha de visita, podemos ayudarle a explorar opciones de ${payload.propertyType || "propiedad"} cerca de Tamarindo. Como su fecha parece activa, recomiendo agendar una llamada breve para entender sus preferencias y preparar opciones antes de su llegada.`;
}

function recommendAction(leadType: string, score: number) {
  if (score >= 80) {
    return "Respond immediately and schedule a short call.";
  }
  if (leadType === "Seller") {
    return "Reply today and collect property details for a valuation conversation.";
  }
  if (leadType === "Renter") {
    return "Confirm dates, budget, and must-haves before sending options.";
  }
  return "Send a helpful follow-up and ask one qualifying question.";
}
