# Field Demo QA Checklist — Mindful Consultations Business Automation Demo

**Version:** V1  
**Last updated:** 2026-06-24  
**Maintained by:** Claude Code (QA Reviewer role)  
**Run before:** Any cold field demo with a real prospect  
**Run after:** Any Codex deployment to Netlify

---

## How to Use This Checklist

- Run Section 1–4 every time Codex delivers a new build
- Run Section 5–8 once n8n and Google Sheets are configured
- Run Section 9 (Field Demo Readiness) before every new prospect location visit
- Mark each item with: ✅ Pass | ❌ Fail | ⚠️ Partial | N/A
- If any P0 item fails, do not use the demo with a real prospect until fixed

---

## Section 1 — Mobile Testing

**Device targets:** iPhone SE (375px), iPhone 14 (390px), any Android mid-range  
**Connection target:** Test at both full WiFi and throttled 3G

### 1.1 Layout

| # | Test | Priority | Result |
|---|---|---|---|
| 1.1.1 | Landing page renders without horizontal scroll on 375px | P0 | |
| 1.1.2 | All 5 landing page sections visible and readable on mobile | P0 | |
| 1.1.3 | Scanner form renders and all fields are usable on mobile | P0 | |
| 1.1.4 | Demo mode selector is clearly visible and tappable | P0 | |
| 1.1.5 | Preloaded scenario cards render side-by-side or stacked cleanly | P0 | |
| 1.1.6 | Real estate demo form is fully usable on mobile | P0 | |
| 1.1.7 | Dashboard cards stack vertically and are readable without zooming | P0 | |
| 1.1.8 | Workflow timeline is visible and readable on mobile | P0 | |
| 1.1.9 | CTA buttons are visible above the fold on dashboard | P0 | |
| 1.1.10 | Quote page renders and booking link is tappable | P0 | |

### 1.2 Touch Interaction

| # | Test | Priority | Result |
|---|---|---|---|
| 1.2.1 | All tap targets are minimum 44px height | P0 | |
| 1.2.2 | Form fields are easy to tap and keyboard opens correctly | P0 | |
| 1.2.3 | Scenario cards are easy to tap on mobile | P0 | |
| 1.2.4 | "Generate Spanish Version" button is easy to tap | P0 | |
| 1.2.5 | No accidental tap triggers (buttons not too close together) | P1 | |

### 1.3 Performance on Mobile

| # | Test | Priority | Result |
|---|---|---|---|
| 1.3.1 | Landing page loads in under 3 seconds on WiFi | P0 | |
| 1.3.2 | Dashboard appears within 15 seconds of form submit on WiFi | P0 | |
| 1.3.3 | Workflow timeline animation is smooth (no jank) on mobile | P1 | |
| 1.3.4 | App does not crash or freeze during full demo flow on mobile | P0 | |

---

## Section 2 — Fake Data / Static Flow Testing

Test the complete demo flow without any n8n connection. This verifies the frontend works independently.

### 2.1 Preloaded Scenarios

| # | Test | Priority | Result |
|---|---|---|---|
| 2.1.1 | "Buyer Lead" card prefills form with correct inquiry text | P0 | |
| 2.1.2 | "Seller Lead" card prefills form with correct inquiry text | P0 | |
| 2.1.3 | "Renter Lead" card prefills form with correct inquiry text | P0 | |
| 2.1.4 | "Investor Lead" card prefills form with correct inquiry text | P0 | |
| 2.1.5 | Prefilled form can be submitted without manual editing | P0 | |

### 2.2 Dashboard Static State

| # | Test | Priority | Result |
|---|---|---|---|
| 2.2.1 | Workflow timeline animates through all 7 states in sequence | P0 | |
| 2.2.2 | All 9 dashboard cards render with static demo data | P0 | |
| 2.2.3 | "AI Draft Ready for Approval" label is clearly visible | P0 | |
| 2.2.4 | "Your team stays in control." message is visible | P0 | |
| 2.2.5 | Demo disclaimer is visible on dashboard | P0 | |
| 2.2.6 | Lead type badge displays correctly (Buyer, Seller, etc.) | P0 | |
| 2.2.7 | Urgency score displays as a number out of 100 | P0 | |
| 2.2.8 | Urgency label (Hot Lead / Warm Lead / Low Priority) displays correctly | P0 | |
| 2.2.9 | "Logged to MindfulTech Demo Leads" status shows green checkmark | P0 | |
| 2.2.10 | "Notification prepared for info@mindfultech.services" shows correctly | P0 | |

### 2.3 Spanish Draft Toggle

| # | Test | Priority | Result |
|---|---|---|---|
| 2.3.1 | Spanish draft section is NOT visible on page load | P0 | |
| 2.3.2 | "Generate Spanish Version" button is NOT visible before English draft appears | P0 | |
| 2.3.3 | "Generate Spanish Version" button IS visible after English draft appears | P0 | |
| 2.3.4 | Clicking the button reveals the Spanish draft below the English draft | P0 | |
| 2.3.5 | Spanish draft text is in Spanish (not English repeated) | P0 | |
| 2.3.6 | Spanish draft is clearly labeled as a secondary element | P1 | |

### 2.4 Language and Copy

| # | Test | Priority | Result |
|---|---|---|---|
| 2.4.1 | No public-facing text uses "scanner" as the primary brand label | P1 | |
| 2.4.2 | Revenue/opportunity language uses cautious terms (estimated, potential, possible) | P0 | |
| 2.4.3 | No guaranteed income or financial outcome claims visible | P0 | |
| 2.4.4 | No n8n, webhook, API, or JSON terminology visible to prospect | P0 | |
| 2.4.5 | "Mindful Consultations" is used as the public-facing name | P1 | |

---

## Section 3 — n8n Success Flow Testing

Run this section after n8n workflow is fully configured and active.

### 3.1 Webhook Connectivity

| # | Test | Priority | Result |
|---|---|---|---|
| 3.1.1 | `POST /api/demo/real-estate` returns 200 with valid JSON | P0 | |
| 3.1.2 | n8n workflow execution log shows successful run in n8n dashboard | P0 | |
| 3.1.3 | OpenAI node receives the correct user message | P0 | |
| 3.1.4 | OpenAI response is valid JSON matching the defined schema | P0 | |

### 3.2 Response Quality

| # | Test | Priority | Result |
|---|---|---|---|
| 3.2.1 | `leadType` is one of the 6 allowed values | P0 | |
| 3.2.2 | `urgencyScore` is an integer between 0 and 100 | P0 | |
| 3.2.3 | `urgencyLabel` matches the score range (Hot/Warm/Low) | P0 | |
| 3.2.4 | `draftResponse` is in English, professional, no emojis | P0 | |
| 3.2.5 | `spanishDraftResponse` is in Spanish, professional, no emojis | P0 | |
| 3.2.6 | `recommendedAction` is a single actionable sentence | P0 | |
| 3.2.7 | `estimatedOpportunity` uses cautious language, no dollar guarantees | P0 | |
| 3.2.8 | `logged: true` and `notificationSent: true` in response | P0 | |

### 3.3 Urgency Score Sanity Check

Run these 4 scenarios and verify scores are roughly in the expected range. Scores need not be exact.

| # | Scenario | Expected Range | Actual Score | Result |
|---|---|---|---|---|
| 3.3.1 | Buyer Lead (visiting next week, $450k budget) | 85–100 | | |
| 3.3.2 | Seller Lead (owns villa, no timeline) | 55–75 | | |
| 3.3.3 | Renter Lead (3-month rental next month) | 60–80 | | |
| 3.3.4 | Investor Lead (exploring Guanacaste) | 45–70 | | |

---

## Section 4 — n8n Failure / Fallback Testing

### 4.1 Timeout Fallback

| # | Test | Priority | Result |
|---|---|---|---|
| 4.1.1 | Set `N8N_REAL_ESTATE_WEBHOOK_URL` to an invalid URL temporarily | — | |
| 4.1.2 | Submit the Buyer Lead scenario | — | |
| 4.1.3 | Workflow timeline still animates through all 7 states | P0 | |
| 4.1.4 | Dashboard displays a complete, realistic fallback result | P0 | |
| 4.1.5 | No error message or red alert is shown to the user | P0 | |
| 4.1.6 | No n8n URL, webhook path, or API error appears in the UI | P0 | |
| 4.1.7 | Spanish draft fallback text is visible after clicking the button | P0 | |
| 4.1.8 | Fallback activates within 10–12 seconds of form submit | P0 | |
| Restore | Restore correct `N8N_REAL_ESTATE_WEBHOOK_URL` after this test | — | |

### 4.2 Slow Network Fallback

| # | Test | Priority | Result |
|---|---|---|---|
| 4.2.1 | Throttle browser network to Slow 3G in DevTools | — | |
| 4.2.2 | Submit the Buyer Lead scenario | — | |
| 4.2.3 | App does not show a blank screen or spinner indefinitely | P0 | |
| 4.2.4 | Fallback activates if n8n does not respond within 10 seconds | P0 | |
| 4.2.5 | Full dashboard still displays without manual intervention | P0 | |

### 4.3 Missing Environment Variables

| # | Test | Priority | Result |
|---|---|---|---|
| 4.3.1 | Remove `N8N_REAL_ESTATE_WEBHOOK_URL` from `.env.local` | — | |
| 4.3.2 | Submit the Buyer Lead scenario | — | |
| 4.3.3 | App falls back silently — no crash, no exposed error | P0 | |
| Restore | Restore environment variable after this test | — | |

---

## Section 5 — OpenAI Output Testing

Run these with the actual n8n + OpenAI integration active.

| # | Test | Priority | Result |
|---|---|---|---|
| 5.1 | Buyer Lead: score is 80+ and label is "Hot Lead" | P0 | |
| 5.2 | Buyer Lead: draft response addresses the buyer's specific need | P0 | |
| 5.3 | Seller Lead: classified correctly as "Seller" | P0 | |
| 5.4 | Renter Lead: classified correctly as "Renter" | P0 | |
| 5.5 | Investor Lead: classified correctly as "Investor" | P0 | |
| 5.6 | Spanish draft is in Spanish for all scenarios | P0 | |
| 5.7 | Draft response contains no emojis | P0 | |
| 5.8 | Draft response does not claim specific property availability | P0 | |
| 5.9 | `estimatedOpportunity` does not contain specific dollar guarantee | P0 | |
| 5.10 | Custom inquiry ("Hi do you sell houses") returns "General Inquiry" or low score | P1 | |

---

## Section 6 — Google Sheets Logging Testing

| # | Test | Priority | Result |
|---|---|---|---|
| 6.1 | Run Buyer Lead scenario end-to-end with n8n active | — | |
| 6.2 | New row appears in "Demo Leads" tab within 30 seconds | P0 | |
| 6.3 | "Demo Leads" row contains correct Business Name | P0 | |
| 6.4 | "Demo Leads" row contains correct Lead Type | P0 | |
| 6.5 | "Demo Leads" row contains correct Urgency Score | P0 | |
| 6.6 | "Demo Leads" row contains English draft response | P0 | |
| 6.7 | "Demo Leads" row contains Spanish draft response | P0 | |
| 6.8 | New row appears in "AI Drafts" tab | P0 | |
| 6.9 | New row appears in "Opportunity Scores" tab | P0 | |
| 6.10 | Run "Send Me This Automation Summary" form submission | — | |
| 6.11 | New row appears in "Sales Opportunities" tab | P0 | |
| 6.12 | Status in Sales Opportunities is "Demo Shown" or "Interested" | P1 | |

---

## Section 7 — Gmail Notification Testing

| # | Test | Priority | Result |
|---|---|---|---|
| 7.1 | Run Buyer Lead scenario end-to-end with n8n active | — | |
| 7.2 | Email arrives at info@mindfultech.services within 60 seconds | P0 | |
| 7.3 | Subject line includes the urgency label and business name | P0 | |
| 7.4 | Email body contains Lead Type, Urgency Score, Inquiry, Draft Response | P0 | |
| 7.5 | Email does not contain raw JSON, webhook URLs, or API keys | P0 | |
| 7.6 | Email disclaimer is present ("This is a demo environment simulation") | P1 | |
| 7.7 | Run Seller Lead scenario — separate notification email arrives | P1 | |

---

## Section 8 — Netlify Deployment Testing

| # | Test | Priority | Result |
|---|---|---|---|
| 8.1 | `npm run build` completes without errors locally | P0 | |
| 8.2 | Netlify deploy completes without errors | P0 | |
| 8.3 | Production URL loads the landing page correctly | P0 | |
| 8.4 | Environment variables `N8N_REAL_ESTATE_WEBHOOK_URL` and `MINDFUL_BOOKING_URL` are set in Netlify | P0 | |
| 8.5 | `POST /api/demo/real-estate` works on the production Netlify URL | P0 | |
| 8.6 | Booking CTA links to the correct `MINDFUL_BOOKING_URL` in production | P0 | |
| 8.7 | No API keys, webhook URLs, or secrets appear in browser network tab | P0 | |
| 8.8 | App loads correctly in Chrome, Safari, and Firefox | P1 | |
| 8.9 | HTTPS is active on production URL | P0 | |

---

## Section 9 — Field Demo Readiness Checklist

Run this before every real prospect visit. Takes about 5 minutes.

### Device Check

| # | Check | Result |
|---|---|---|
| 9.1 | Phone battery is above 50% | |
| 9.2 | Screen brightness is set to full | |
| 9.3 | Phone is not in Low Power Mode | |
| 9.4 | Laptop is charged if bringing laptop | |
| 9.5 | Mobile hotspot is available as WiFi backup | |

### App Check

| # | Check | Result |
|---|---|---|
| 9.6 | App loads on phone at the production URL | |
| 9.7 | Run one Buyer Lead scenario from start to dashboard | |
| 9.8 | Dashboard loads within 15 seconds (or fallback activates) | |
| 9.9 | Spanish draft toggle works | |
| 9.10 | Quote CTA links to the correct booking page | |
| 9.11 | Send Summary form submits without error | |

### Content Check

| # | Check | Result |
|---|---|---|
| 9.12 | All 4 scenario cards are visible | |
| 9.13 | Dashboard copy is professional and prospect-safe | |
| 9.14 | No test data or placeholder text visible on any page | |
| 9.15 | Demo disclaimer is visible on dashboard | |

### Fallback Check

| # | Check | Result |
|---|---|---|
| 9.16 | Enable airplane mode briefly and rerun demo — fallback activates cleanly | |
| 9.17 | Fallback dashboard is complete and realistic | |
| 9.18 | No error messages appear during fallback | |

---

## Known Acceptable Limitations in V1

These items are not bugs — they are intentional V1 scope decisions.

| Item | Note |
|---|---|
| Hotels and restaurants show no live workflow | Preview cards only — V2 feature |
| Spanish toggle requires English draft first | By design — per product spec |
| No saved demo sessions | V2 feature |
| No client login | Not a SaaS product |
| No real WhatsApp integration | V2 feature |
| Urgency scores may vary slightly between demo runs | Normal AI behavior — acceptable variance |
| Google Sheets updates are not real-time visible to prospect | Prospect does not need to see the sheet during demo |

---

## Bug Severity Reference

| Level | Definition | Action |
|---|---|---|
| P0 — Critical | Demo fails, crashes, or exposes internal data to prospect | Do not demo until fixed |
| P1 — High | Feature works but visually broken or copy is wrong | Fix before next demo session |
| P2 — Medium | Minor UX issue, non-blocking | Fix in next Codex iteration |
| P3 — Low | Polish or enhancement | Add to V2 backlog |
