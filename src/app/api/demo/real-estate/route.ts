import {
  createFallbackRealEstateResult,
  isDemoResult
} from "@/lib/demo";
import type { RealEstateDemoPayload } from "@/lib/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TIMEOUT_MS = 8000;

export async function POST(request: Request) {
  let payload: RealEstateDemoPayload;

  try {
    payload = (await request.json()) as RealEstateDemoPayload;
  } catch {
    return NextResponse.json({ message: "Please submit a valid demo request." }, { status: 400 });
  }

  const missing = ["businessName", "customerName", "inquiry", "channel"].filter((field) => {
    const value = payload[field as keyof RealEstateDemoPayload];
    return typeof value !== "string" || value.trim().length === 0;
  });

  if (missing.length > 0) {
    return NextResponse.json(
      { message: "Please complete the required demo fields.", missing },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.N8N_REAL_ESTATE_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      createFallbackRealEstateResult(payload, { simulatedOnly: true }),
      { status: 200 }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        industry: "Real Estate",
        source: payload.source || "Mindful Tech Demo"
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        createFallbackRealEstateResult(payload, { simulatedOnly: true }),
        { status: 200 }
      );
    }

    const json = await response.json();
    const candidate = Array.isArray(json) ? json[0] : json;

    if (!isDemoResult(candidate)) {
      return NextResponse.json(
        createFallbackRealEstateResult(payload, { simulatedOnly: true }),
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        ...candidate,
        message: "Live automation response received."
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      createFallbackRealEstateResult(payload, { simulatedOnly: true }),
      { status: 200 }
    );
  }
}
