import { createFallbackRealEstateResult } from "./demo";
import type { DemoResult, RealEstateDemoPayload, Scenario } from "./types";

export interface IndustryConfig {
  id: string;
  name: string;
  description: string;
  iconName: string;
  status: "live" | "preview";
  scenarios: Scenario[];
  aiRoles: { name: string; description: string }[];
  workflowSteps: string[];
  createFallbackResult: (payload: RealEstateDemoPayload) => DemoResult;
}

/* ── Real Estate ─────────────────────────────────────── */
const realEstateScenarios: Scenario[] = [
  {
    id: "buyer",
    title: "Buyer Lead",
    description: "Clear budget, beach-area condo, arriving soon.",
    customerName: "Sarah",
    inquiry: "I am visiting Tamarindo next week and looking for a 2-bedroom condo under $450k near the beach.",
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

/* ── Law Firm ────────────────────────────────────────── */
const lawFirmScenarios: Scenario[] = [
  {
    id: "new-client",
    title: "New Client Inquiry",
    description: "Individual seeking legal representation urgently.",
    customerName: "Carlos",
    inquiry: "I was involved in a car accident last week and need to speak with someone as soon as possible about my options.",
    channel: "Website",
    budget: "",
    timeline: "This week",
    propertyType: "Personal Injury"
  },
  {
    id: "contract-review",
    title: "Contract Review Request",
    description: "Business owner needs a commercial contract reviewed before signing.",
    customerName: "Patricia",
    inquiry: "I have a commercial lease agreement I need reviewed before I sign next Friday. Can someone look at it?",
    channel: "Email",
    budget: "",
    timeline: "By Friday",
    propertyType: "Business / Commercial"
  },
  {
    id: "consultation",
    title: "Consultation Request",
    description: "Family law matter needing a discreet initial consultation.",
    customerName: "Roberto",
    inquiry: "I need confidential advice regarding a family situation. I would prefer to speak with someone in English or Spanish.",
    channel: "WhatsApp",
    budget: "",
    timeline: "This week",
    propertyType: "Family Law"
  },
  {
    id: "case-status",
    title: "Existing Client — Case Status",
    description: "Current client requesting an update on their open matter.",
    customerName: "Linda",
    inquiry: "Hi, I have not heard an update on my case in two weeks. Can someone let me know where things stand?",
    channel: "Email",
    budget: "",
    timeline: "Immediate",
    propertyType: "Case Follow-Up"
  }
];

function createLawFirmFallback(payload: RealEstateDemoPayload): DemoResult {
  const inquiry = payload.inquiry.toLowerCase();
  const timeline = payload.timeline.toLowerCase();
  const matterType = payload.propertyType;

  const isUrgent =
    timeline.includes("this week") ||
    timeline.includes("immediate") ||
    inquiry.includes("urgent") ||
    inquiry.includes("as soon as possible") ||
    inquiry.includes("before");

  const isExistingClient = matterType === "Case Follow-Up";

  const leadType = isExistingClient
    ? "Existing Client"
    : matterType || "New Inquiry";

  const urgencyScore = isExistingClient
    ? 88
    : isUrgent
      ? 82
      : 54;

  const urgencyLabel =
    urgencyScore >= 80 ? "High Priority" : urgencyScore >= 55 ? "Standard Priority" : "Low Priority";

  const draftResponse = isExistingClient
    ? `Hi ${payload.customerName}, thank you for reaching out. We want to make sure you feel informed every step of the way. I will flag your file for a status update and have someone from your legal team contact you by end of day with a full update.`
    : matterType === "Family Law"
      ? `Hi ${payload.customerName}, thank you for contacting us. We understand these matters require discretion and care. I would like to schedule a confidential consultation at your earliest convenience — available in both English and Spanish. Please let me know your preferred time and we will confirm right away.`
      : matterType === "Business / Commercial"
        ? `Hi ${payload.customerName}, thank you for reaching out. A commercial agreement review ahead of signing is exactly the kind of matter we handle. Given your Friday deadline, I would recommend we schedule a brief review call tomorrow so we have time to flag any concerns before you commit.`
        : `Hi ${payload.customerName}, thank you for contacting us. I understand you are dealing with a time-sensitive situation. I would like to connect you with the right attorney as quickly as possible — can we schedule a brief call today or tomorrow to understand your situation and next steps?`;

  const spanishDraftResponse = isExistingClient
    ? `Hola ${payload.customerName}, gracias por comunicarse con nosotros. Queremos asegurarnos de que se sienta informado en cada paso. Voy a marcar su expediente para una actualización de estado y alguien de su equipo legal se pondrá en contacto con usted antes del final del día.`
    : matterType === "Family Law"
      ? `Hola ${payload.customerName}, gracias por contactarnos. Entendemos que estos asuntos requieren discreción y cuidado. Nos gustaría programar una consulta confidencial a la brevedad posible — disponible en inglés y español. Por favor háganos saber su disponibilidad y confirmaremos de inmediato.`
      : matterType === "Business / Commercial"
        ? `Hola ${payload.customerName}, gracias por contactarnos. La revisión de un contrato comercial antes de firmar es exactamente el tipo de asunto que manejamos. Dado su plazo del viernes, recomiendo programar una llamada breve mañana para identificar cualquier punto de atención antes de que se comprometa.`
        : `Hola ${payload.customerName}, gracias por contactar con nuestra firma. Entiendo que está en una situación urgente. Me gustaría conectarle con el abogado adecuado lo antes posible — ¿podemos agendar una llamada hoy o mañana para entender su situación y los próximos pasos?`;

  return {
    leadType,
    urgencyScore,
    urgencyLabel,
    estimatedOpportunity: isExistingClient
      ? "Client retention — respond quickly to preserve relationship"
      : urgencyScore >= 80
        ? "High-priority new matter — time-sensitive intake"
        : "New matter inquiry — needs prompt qualification",
    draftResponse,
    spanishDraftResponse,
    recommendedAction: isExistingClient
      ? "Assign attorney to send case update today."
      : urgencyScore >= 80
        ? "Contact within the hour — time-sensitive matter."
        : "Reply today and schedule initial consultation.",
    riskNote: isExistingClient
      ? "Slow responses to existing clients are a leading cause of referral loss."
      : isUrgent
        ? "This prospect may contact another firm if they do not hear back today."
        : "A prompt, professional reply sets the tone for the entire client relationship.",
    logged: false,
    notificationSent: false,
    fallback: true,
    message: "Demo simulation loaded."
  };
}

/* ── Registry ─────────────────────────────────────────── */
export const industryRegistry: Record<string, IndustryConfig> = {
  "real-estate": {
    id: "real-estate",
    name: "Real Estate",
    description: "Buyer, seller, renter, and investor classification for agencies.",
    iconName: "Building2",
    status: "live",
    scenarios: realEstateScenarios,
    workflowSteps: [
      "Lead Received",
      "AI Analyzing",
      "Lead Classified",
      "Urgency Scored",
      "Draft Created",
      "Logged to Sheet",
      "Notification Sent"
    ],
    aiRoles: [
      { name: "AI Intake Specialist", description: "Classifies lead type and intent in seconds." },
      { name: "AI Sales Assistant", description: "Drafts a personalized follow-up in English and Spanish." },
      { name: "AI Inbox Manager", description: "Alerts the owner the moment a hot lead arrives." },
      { name: "AI Operations Manager", description: "Logs every lead to Google Sheets automatically." }
    ],
    createFallbackResult: (payload) =>
      createFallbackRealEstateResult(payload, { simulatedOnly: true })
  },
  "law-firm": {
    id: "law-firm",
    name: "Law Firm",
    description: "New client intake, matter triage, and existing client follow-up.",
    iconName: "Scale",
    status: "live",
    scenarios: lawFirmScenarios,
    workflowSteps: [
      "Inquiry Received",
      "AI Analyzing",
      "Matter Classified",
      "Priority Scored",
      "Draft Prepared",
      "Logged to Matter Sheet",
      "Attorney Notified"
    ],
    aiRoles: [
      { name: "AI Client Intake Specialist", description: "Classifies matter type and urgency at the moment of contact." },
      { name: "AI Legal Drafting Assistant", description: "Prepares a professional response in English and Spanish." },
      { name: "AI Inbox Manager", description: "Alerts the responsible attorney immediately for high-priority matters." },
      { name: "AI Compliance Sentinel", description: "Flags sensitive matters requiring immediate escalation." }
    ],
    createFallbackResult: createLawFirmFallback
  },
  "property-management": {
    id: "property-management",
    name: "Property Management",
    description: "Maintenance requests, tenant inquiries, and owner reporting.",
    iconName: "Home",
    status: "preview",
    scenarios: [],
    workflowSteps: [],
    aiRoles: [],
    createFallbackResult: () => ({
      leadType: "Tenant Request",
      urgencyScore: 60,
      urgencyLabel: "Standard",
      estimatedOpportunity: "Tenant retention opportunity",
      draftResponse: "",
      spanishDraftResponse: "",
      recommendedAction: "Follow up today.",
      riskNote: "",
      logged: false,
      notificationSent: false,
      fallback: true
    })
  }
};

export function getIndustry(id: string): IndustryConfig {
  return industryRegistry[id] ?? industryRegistry["real-estate"];
}
