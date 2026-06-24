# Codex Implementation Roadmap — Mindful Consultations Business Automation Demo

**Internal name:** Mindful Tech Business Scanner / Demo Kit  
**Public name:** Mindful Consultations — Business Automation Demo  
**Version:** V1  
**Last updated:** 2026-06-24  
**Maintained by:** Claude Code (Product Architect role)  
**Implementation owner:** Codex

---

## Overview

This document is the authoritative Codex build guide for V1. It covers build phases, required pages, required components, API route specification, fallback behavior, environment variables, deployment notes, and acceptance criteria.

Codex should not deviate from this scope without authorization. If a feature is not listed here, do not build it.

---

## Environment Variables

Codex must support these variables via `.env.local` (local) and Netlify environment settings (production):

```
N8N_REAL_ESTATE_WEBHOOK_URL=       # Full URL of the n8n webhook trigger node
MINDFUL_BOOKING_URL=               # Mindful Tech booking/quote page URL
```

**Rules:**
- All webhook calls must go through the Next.js API route — never directly from the browser
- Never expose these values in client-side JavaScript bundles
- Both variables must be present for the live flow to work
- If either is missing, the app should fall into fallback mode silently

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| API routes | Next.js Route Handlers (`/api/...`) |
| Deployment | Netlify |
| Node version | 18+ |

---

## Build Phases

### Phase 1 — UI Skeleton + Landing Page

**Goal:** App loads, looks premium, no backend required.

Tasks:
- Initialize Next.js project: `mindful-business-scanner`
- Configure Tailwind CSS
- Set up global layout (font, color tokens, mobile-safe viewport)
- Build `/` landing page with all sections
- Add placeholder navigation
- Verify mobile-first rendering on 375px viewport

**Visual style:**
- Color palette: black / cream / soft gold OR black / white / muted blue
- Large typography, strong whitespace, clean cards
- No clutter, no technical jargon in copy

**Landing page sections (in order):**
1. Hero — headline, subheadline, primary CTA button
2. Problem — 3 pain points visible to business owners
3. What the Demo Does — simple outcome list
4. Industries — real estate (active), hotels (preview), restaurants (preview)
5. Objection FAQ
6. Footer CTA

**Copy:**
- Hero headline: "Stop Losing Leads Because No One Responded Fast Enough."
- Alternative: "Turn Missed Messages Into Booked Conversations."
- Subheadline: "Mindful Consultations helps local businesses capture leads, draft follow-ups, and alert owners before opportunities go cold."
- All public-facing copy uses "Mindful Consultations" — not "scanner" as the main brand

---

### Phase 2 — Business Scanner Form + Opportunity Snapshot

**Goal:** User can fill out scanner form and see a static Opportunity Snapshot.

Tasks:
- Build `/scanner` page with `BusinessScannerForm` component
- Build `OpportunitySnapshot` component (static output, no API required yet)
- Build `RevenueLeakCard` component
- Implement basic form validation

**Scanner form fields:**

| Field | Type | Required |
|---|---|---|
| Business Name | text | yes |
| Industry | select | yes |
| Website / Instagram | text | no |
| Estimated Leads Per Month | number | yes |
| Average Deal / Customer Value | number | yes |
| Current Response Time | select | yes |
| Biggest Pain Point | textarea | yes |

**Industry options:** Real Estate, Hotel, Restaurant, Property Manager, Tour Operator, Wellness, Other

**Response time options:** Same hour, Same day, Next day, 2–3 days, Longer / Not sure

**Opportunity Snapshot output (computed client-side, no API):**
- Estimated monthly leads at risk (based on response time input)
- Opportunity range label: Low / Moderate / High / Critical
- Recommended automation tier
- Suggested package (Starter $1,500 or Standard $2,500)
- "Run Live Demo" CTA button

**Revenue leak language rules:**
- Always use: "estimated," "potential," "based on your inputs," "opportunity range," "possible"
- Never show inflated dollar amounts tied to property values
- Example good: "Even one missed serious buyer could represent thousands in potential commission opportunity."
- Example bad: "You are losing $800,000."

---

### Phase 3 — Demo Mode Selector + Real Estate Demo Form

**Goal:** User can select a demo mode and fill out the real estate lead form.

Tasks:
- Build `/demo` page with `DemoModeSelector` component
- Build `/demo/real-estate` page with `RealEstateDemoForm` component
- Build `PreloadedScenarioCards` component (4 scenarios)
- Implement prefill behavior when a scenario card is clicked

**Demo modes:**
- Street Demo (60–90 sec) — uses preloaded scenario, minimal inputs
- Full Demo (3–5 min) — custom lead entry

**Preloaded scenario cards:**

| Label | Prefill Inquiry |
|---|---|
| Buyer Lead | "I'm visiting Tamarindo next week and looking for a 2-bedroom condo under $450k near the beach." |
| Seller Lead | "I own a villa near Playa Langosta and want to know what it might sell for." |
| Renter Lead | "I'm looking for a 3-month rental starting next month." |
| Investor Lead | "I'm interested in income-producing properties in Guanacaste." |

**Real estate demo form fields:**

| Field | Type | Required |
|---|---|---|
| Business Name | text | yes |
| Customer Name | text | yes |
| Inquiry | textarea | yes |
| Channel | select | yes |
| Budget | text | no |
| Timeline | text | no |
| Property Type | select | no |

**Channel options:** Website, WhatsApp, Email, Instagram, Walk-in

**Property Type options:** Condo, House, Villa, Land, Commercial, Not specified

---

### Phase 4 — Fake Dashboard + Workflow Timeline (Static)

**Goal:** Demo dashboard works fully with static/fake data before any API is connected.

Tasks:
- Build `/dashboard` page with static demo result
- Build `WorkflowTimeline` component with animated progress states
- Build all dashboard cards (see component list)
- Add `DemoDisclaimer` component
- Ensure dashboard looks like a business command center, not a developer tool

**Workflow timeline states (animate in sequence, ~1 second each):**
1. Lead Received
2. AI Analyzing
3. Lead Classified
4. Urgency Scored
5. Draft Created
6. Logged to Demo Sheet
7. Notification Sent

**Dashboard cards:**

| Card | Content |
|---|---|
| New Lead Received | Customer name, channel, timestamp |
| AI Classification | Lead type (Buyer / Seller / Renter / Investor) with badge |
| Urgency Score | Score out of 100 with label (Hot / Warm / Low Priority) |
| Estimated Opportunity | Text description |
| AI Draft Response | Full draft text, "AI Draft Ready for Approval" label |
| Spanish Draft | Hidden; appears only after English draft is visible, triggered by "Generate Spanish Version" button |
| Recommended Next Action | Action text |
| Logged to Demo Sheet | Green checkmark + "Logged to MindfulTech Demo Leads" |
| Owner Notification | "Notification prepared for info@mindfultech.services" |
| Human Approval Note | "The system prepares the response. Your team stays in control." |
| CTA | "Send Me This Automation Summary" + "Request Setup Quote" |

**Demo disclaimer (always visible on dashboard):**
> "This is a Mindful Consultations demo environment. It does not connect to your live systems. A production setup can connect to your website forms, email, WhatsApp, Google Sheets, CRM, or other tools after implementation."

---

### Phase 5 — API Route + n8n Integration

**Goal:** Real estate form submits to n8n; live AI result replaces fake data on dashboard.

**API route:** `POST /api/demo/real-estate`  
This route is server-side only. The browser never calls n8n directly.

**Request payload:**

```typescript
{
  businessName: string;
  industry: "Real Estate";
  customerName: string;
  inquiry: string;
  channel: "Website" | "WhatsApp" | "Email" | "Instagram" | "Walk-in";
  budget?: string;
  timeline?: string;
  propertyType?: string;
}
```

**Expected successful response:**

```typescript
{
  leadType: "Buyer" | "Seller" | "Renter" | "Investor" | "General Inquiry" | "Low Quality / Spam";
  urgencyScore: number;           // 0–100
  urgencyLabel: "Hot Lead" | "Warm Lead" | "Low Priority";
  estimatedOpportunity: string;
  draftResponse: string;
  spanishDraftResponse: string;
  recommendedAction: string;
  riskNote: string;
  logged: boolean;
  notificationSent: boolean;
}
```

**API route implementation rules:**
- Set a 15-second timeout on the fetch to n8n
- On any error (timeout, non-200, malformed JSON), return `{ fallback: true }` with status 200
- Never return n8n errors, stack traces, or webhook URLs to the client
- Validate required fields before forwarding to n8n; return 400 with a clean message if fields are missing

---

### Phase 6 — Fallback Mode

**Goal:** Demo never visibly fails in the field.

**Trigger condition:** n8n does not respond within 8–10 seconds, or returns an error.

**Fallback behavior:**
- The workflow timeline still animates normally
- The dashboard populates with a prebuilt realistic static result
- No error message is shown to the prospect
- A small internal indicator (e.g., a subtle `[Demo Mode]` badge visible only if `NODE_ENV=development`) may be added for debugging

**Prebuilt fallback result (Buyer Lead scenario):**

```typescript
const FALLBACK_RESULT = {
  leadType: "Buyer",
  urgencyScore: 88,
  urgencyLabel: "Hot Lead",
  estimatedOpportunity: "High-value buyer lead with near-term timeline",
  draftResponse: "Hi Sarah, thank you for reaching out to us. Based on what you've shared — a 2-bedroom condo near Tamarindo under $450k with a visit planned for next week — we have several properties that may match your criteria. I'd recommend a short call so we can prepare the best options before you arrive. When is a good time to connect?",
  spanishDraftResponse: "Hola Sarah, gracias por escribirnos. Basándonos en lo que nos has compartido — un condominio de 2 habitaciones cerca de Tamarindo por menos de $450k con una visita planeada para la próxima semana — contamos con varias propiedades que podrían ajustarse a tus necesidades. Te recomendaría una breve llamada para preparar las mejores opciones antes de tu llegada. ¿Cuándo sería un buen momento para hablar?",
  recommendedAction: "Respond immediately and schedule a short call before the prospect visits.",
  riskNote: "This lead may go cold if not contacted within the hour.",
  logged: true,
  notificationSent: true
}
```

Each preloaded scenario should have a matching fallback result. This allows any of the 4 scenario cards to produce a realistic outcome without n8n.

---

### Phase 7 — Send Summary CTA + Sales Pipeline Logging

**Goal:** Prospect can submit their contact info and be captured in Google Sheets.

Tasks:
- Build `/summary` page with `SendSummaryCTA` component
- Form submits to `POST /api/demo/summary` which calls n8n
- Build `/quote` page with `QuoteCTA` component linking to `MINDFUL_BOOKING_URL`
- Add `ObjectionFAQ` component to `/quote` page

**Summary form fields:**

| Field | Type | Required |
|---|---|---|
| Name | text | yes |
| Business Name | text | yes |
| Email | email | yes |
| WhatsApp | text | no |
| Interest Level | select | yes |

**Interest Level options:** Just exploring, Interested — want more info, Ready to talk pricing, Ready to move forward

**After submission:** Show a thank-you message; do not redirect away from demo flow.

---

### Phase 8 — Spanish Draft Toggle

**Goal:** Spanish version appears only after English draft is visible, via secondary button.

**Rules:**
- `spanishDraftResponse` is received in the API response but hidden by default
- "Generate Spanish Version" button appears only after `draftResponse` is displayed
- Clicking the button reveals the Spanish draft below the English draft
- No separate API call is needed — the Spanish draft is already in the initial response
- In fallback mode, use the Spanish fallback text from the fallback result object

---

### Phase 9 — Mobile Polish + Field Testing

**Goal:** Demo works flawlessly on a phone in the field.

Tasks:
- Test all pages on 375px viewport (iPhone SE)
- Test all pages on 390px viewport (iPhone 14)
- Verify tap targets are minimum 44px
- Verify no horizontal scroll on any page
- Verify workflow timeline animation is smooth on mobile
- Verify dashboard cards are readable without zooming
- Test with slow network (throttle to 3G in DevTools)
- Verify fallback activates correctly on slow network

---

## Required Pages

| Route | Component/Page | Priority |
|---|---|---|
| `/` | Landing page | P0 |
| `/scanner` | Business scanner form | P0 |
| `/demo` | Demo mode selector | P0 |
| `/demo/real-estate` | Real estate demo form | P0 |
| `/dashboard` | Live demo dashboard | P0 |
| `/summary` | Send summary CTA | P0 |
| `/quote` | Quote / booking CTA | P0 |
| `/results` | Opportunity snapshot (scanner output) | P1 |

---

## Required Components

| Component | Page(s) | Notes |
|---|---|---|
| `HeroSection` | `/` | Headline, subheadline, CTA |
| `BusinessScannerForm` | `/scanner` | All fields with validation |
| `IndustrySelector` | `/scanner`, `/demo` | Real estate active; others preview |
| `DemoModeSelector` | `/demo` | Street Demo vs Full Demo |
| `PreloadedScenarioCards` | `/demo/real-estate` | 4 cards, prefill on click |
| `RealEstateDemoForm` | `/demo/real-estate` | All fields with validation |
| `OpportunitySnapshot` | `/results` | Client-side computed output |
| `RevenueLeakCard` | `/results` | Cautious financial language |
| `WorkflowTimeline` | `/dashboard` | Animated, 7 steps |
| `LeadClassificationCard` | `/dashboard` | Lead type with badge |
| `UrgencyScoreCard` | `/dashboard` | Score + label |
| `AIDraftCard` | `/dashboard` | English draft, approval label |
| `SpanishDraftToggle` | `/dashboard` | Hidden until English draft visible |
| `OwnerNotificationCard` | `/dashboard` | Notification status |
| `HumanApprovalCard` | `/dashboard` | "Your team stays in control" |
| `DemoDisclaimer` | `/dashboard` | Always visible |
| `SendSummaryCTA` | `/summary` | Form + thank-you state |
| `QuoteCTA` | `/quote` | Links to `MINDFUL_BOOKING_URL` |
| `ObjectionFAQ` | `/quote` | 6 Q&A items |

---

## API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/demo/real-estate` | POST | Forward lead to n8n, return AI result or fallback |
| `/api/demo/summary` | POST | Forward prospect info to n8n for Google Sheets logging |

Both routes must:
- Run server-side only
- Never expose environment variables to the client
- Handle n8n timeouts gracefully
- Return clean, typed JSON responses

---

## Netlify Deployment Requirements

- Framework: Next.js
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18
- Environment variables must be set in Netlify dashboard (not committed to repo):
  - `N8N_REAL_ESTATE_WEBHOOK_URL`
  - `MINDFUL_BOOKING_URL`
- Netlify Functions are not required — Next.js API routes handle server-side logic
- Enable automatic deploys from main branch

**`.env.local` (local dev, never committed):**
```
N8N_REAL_ESTATE_WEBHOOK_URL=
MINDFUL_BOOKING_URL=
```

**`netlify.toml` (committed):**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## Acceptance Criteria

### Phase 1 (Landing Page)
- [ ] App loads at root URL on both desktop and mobile
- [ ] Hero headline renders correctly
- [ ] All 5 landing page sections visible and readable on 375px viewport
- [ ] No horizontal scroll on mobile
- [ ] Primary CTA button navigates to `/scanner` or `/demo`

### Phase 2 (Scanner Form)
- [ ] All 7 scanner form fields render and validate
- [ ] Form cannot be submitted with required fields empty
- [ ] Opportunity Snapshot renders with cautious language
- [ ] Revenue leak card never shows inflated dollar claims

### Phase 3 (Demo Form + Scenarios)
- [ ] All 4 preloaded scenario cards visible
- [ ] Clicking a card prefills the real estate demo form correctly
- [ ] All demo form fields render and validate
- [ ] Form submits correctly

### Phase 4 (Fake Dashboard)
- [ ] Workflow timeline animates through all 7 states
- [ ] All dashboard cards render with static data
- [ ] "AI Draft Ready for Approval" label is visible
- [ ] "Your team stays in control." message is visible
- [ ] Demo disclaimer is visible
- [ ] Spanish draft is hidden by default
- [ ] "Generate Spanish Version" button is visible only after English draft appears
- [ ] Clicking the button reveals Spanish draft

### Phase 5 (API + n8n)
- [ ] `POST /api/demo/real-estate` forwards payload to n8n webhook
- [ ] Successful n8n response populates dashboard with live AI data
- [ ] API route does not expose webhook URL or API keys to browser
- [ ] API route returns 400 for missing required fields

### Phase 6 (Fallback)
- [ ] Simulating n8n timeout (e.g., wrong URL) causes fallback result to display
- [ ] No error message is shown to the user during fallback
- [ ] Workflow timeline still animates during fallback
- [ ] Fallback result is realistic and complete

### Phase 7 (Summary + Quote)
- [ ] Summary form captures all fields
- [ ] Submission calls `/api/demo/summary` successfully
- [ ] Quote CTA links to correct `MINDFUL_BOOKING_URL`
- [ ] Objection FAQ is visible on quote page

### Phase 8 (Spanish)
- [ ] Spanish draft does not appear on page load
- [ ] "Generate Spanish Version" button appears only after English draft is shown
- [ ] Spanish draft text is accurate (from n8n response or fallback)

### Phase 9 (Mobile)
- [ ] Full demo flow works on iPhone SE (375px) without horizontal scroll
- [ ] Workflow timeline readable and animated on mobile
- [ ] All tap targets ≥ 44px
- [ ] No visible errors in browser console during demo flow

---

## What Codex Should NOT Build

- Login or authentication
- Client dashboards
- Supabase integration
- Real WhatsApp webhook receiver
- Full hotel or restaurant workflow backend
- Frugal / external quote tool integration (V2)
- PDF report generation
- Admin panel
- Any page or feature not listed in this document

If Codex encounters a scope question, it should ask for clarification rather than adding features.
