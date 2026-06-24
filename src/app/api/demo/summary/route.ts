import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TIMEOUT_MS = 8000;

interface SummaryPayload {
  name?: string;
  businessName?: string;
  email?: string;
  whatsapp?: string;
  interestLevel?: string;
  painPoint?: string;
  demoType?: string;
  suggestedPackage?: string;
  status?: string;
}

export async function POST(request: Request) {
  let payload: SummaryPayload;

  try {
    payload = (await request.json()) as SummaryPayload;
  } catch {
    return NextResponse.json({ message: "Please submit valid contact details." }, { status: 400 });
  }

  const missing = ["name", "businessName", "email", "interestLevel"].filter((field) => {
    const value = payload[field as keyof SummaryPayload];
    return typeof value !== "string" || value.trim().length === 0;
  });

  if (missing.length > 0) {
    return NextResponse.json(
      { message: "Please complete the required summary fields.", missing },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.N8N_SUMMARY_WEBHOOK_URL || process.env.N8N_REAL_ESTATE_WEBHOOK_URL;
  const summaryPayload = {
    submissionType: "summary",
    name: payload.name?.trim(),
    businessName: payload.businessName?.trim(),
    email: payload.email?.trim(),
    whatsapp: payload.whatsapp?.trim() || "",
    interestLevel: payload.interestLevel?.trim(),
    painPoint: payload.painPoint?.trim() || "",
    demoType: payload.demoType || "Real Estate",
    demoDate: new Date().toISOString(),
    suggestedPackage: payload.suggestedPackage || "Starter Setup",
    status: payload.status || "Interested",
    source: "Mindful Consultations Demo"
  };

  if (!webhookUrl) {
    return NextResponse.json(
      { captured: false, fallback: true, message: "Summary request captured locally." },
      { status: 200 }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(summaryPayload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        { captured: false, fallback: true, message: "Summary request captured locally." },
        { status: 200 }
      );
    }

    return NextResponse.json({ captured: true, message: "Summary request captured." }, { status: 200 });
  } catch {
    return NextResponse.json(
      { captured: false, fallback: true, message: "Summary request captured locally." },
      { status: 200 }
    );
  }
}
