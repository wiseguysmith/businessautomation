# V1 Scope — Mindful Consultations Business Automation Demo

**Internal product name:** Mindful Tech Business Scanner / Demo Kit  
**Public-facing name:** Mindful Consultations — Business Automation Demo  
**Version:** V1  
**Last updated:** 2026-06-24  
**Maintained by:** Claude Code (Product Architect role)

---

## 1. What This Product Is

Mindful Consultations Business Automation Demo is a **field-sales demo environment** owned by Mindful Tech / Mindful Consultations.

It allows Elijah/WISE to walk into a local business, simulate a realistic customer inquiry, and show the business owner how Mindful Consultations can help them capture leads faster, draft follow-ups, score urgency, log opportunities, and notify their team — before any paid setup exists.

**V1 does not connect to the prospect's real systems.**  
It simulates what a production automation setup would do after a paid engagement.

This makes the demo:
- Safe to run with any prospect
- Fast enough for a 60–90 second street introduction
- Controlled and reliable in field conditions
- Easy for a non-technical owner to understand
- Effective at creating the "I need this" feeling

The real product is not the app. **The real product is the sales moment.**

---

## 2. Primary Business Goal

Close paid automation projects priced at:

| Package | Price |
|---|---|
| Starter Setup | $1,500 |
| Standard Setup | $2,500 |
| Support Retainer | $500/month |

**The demo should create a clear feeling:** "If this was running every day, we would probably capture more leads and waste less time."

That feeling — not a feature list — is what closes the deal.

---

## 3. What Is In V1 Scope

### Pages

| Route | Purpose |
|---|---|
| `/` | Premium landing page |
| `/scanner` | Business scanner intake form |
| `/demo` | Demo mode selector |
| `/demo/real-estate` | Real estate lead simulation form with preloaded scenarios |
| `/results` | Opportunity Snapshot output |
| `/dashboard` | Live demo dashboard (most important screen) |
| `/summary` | Send Automation Summary CTA |
| `/quote` | Quote CTA + booking link |

### Core Features

1. **Premium landing page** — hero, problem statement, what the demo does, industry preview, CTA
2. **Business scanner form** — collects business name, industry, lead volume, deal value, response time, pain point; outputs an Opportunity Snapshot
3. **Real estate demo form** — collects business name, customer name, inquiry, channel, budget, timeline, property type
4. **Preloaded scenario cards** — one-click sample leads (Buyer, Seller, Renter, Investor) that prefill the form
5. **Fake loading / workflow timeline** — animated progress states (Lead Received → AI Analyzing → Classified → Scored → Draft Created → Logged → Notification Sent)
6. **Live demo dashboard** — classification, urgency score, estimated opportunity, AI draft, recommended action, logged status, notification status, CTA
7. **Human approval layer** — explicit "AI Draft Ready for Approval" label; message: "The system prepares the response. Your team stays in control."
8. **Spanish draft toggle** — appears as secondary button only after English draft is visible; label: "Generate Spanish Version"
9. **Fallback mode** — if n8n/OpenAI does not respond within 8–10 seconds, show a prebuilt realistic result silently
10. **Send Summary CTA** — captures prospect name, business name, email, WhatsApp, interest level into Google Sheets via n8n
11. **Quote CTA** — links to `MINDFUL_BOOKING_URL` environment variable; also logs prospect info to Google Sheets
12. **Demo disclaimer** — visible on dashboard: "This is a Mindful Consultations demo environment. It does not connect to your live systems."
13. **Objection FAQ** — after dashboard or quote CTA
14. **Google Sheets logging** — Demo Leads tab, AI Drafts tab, Opportunity Scores tab, Sales Opportunities tab
15. **Internal email notification** — to `info@mindfultech.services` on each demo run

### Working Vertical

- **Real estate (Tamarindo, Costa Rica)** — fully working with AI classification, urgency scoring, draft generation, logging, and notification

### Preview Verticals (lightweight only, no backend)

- Hotels — static preview card only
- Restaurants — static preview card only

### Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js + TypeScript + Tailwind CSS |
| API route | Next.js `/api/demo/real-estate` |
| Automation backend | n8n |
| AI | OpenAI (via n8n node) |
| Data storage | Google Sheets (MindfulTech Demo Leads) |
| Notification | Gmail (via n8n) |
| Deployment | Netlify |

---

## 4. What Is NOT In V1 (Do Not Build Yet)

| Item | Reason |
|---|---|
| User login / auth | Not a SaaS platform |
| Client dashboards | Not a client portal |
| Supabase database | V2 item |
| Real WhatsApp integration | V2 item |
| Hotel full workflow | V2 item |
| Restaurant full workflow | V2 item |
| PDF opportunity reports | V2 item |
| CRM integrations | V2 item |
| Frugal quote integration | V2 item (URL/tool not yet confirmed) |
| Client approval dashboard | V2 item |
| Recurring owner reports | V2 item |
| Full multilingual infrastructure | V2 item (V1 has single Spanish toggle only) |
| Google Business Profile automation | V2 item |
| Saved demo sessions | V2 item |
| Real-time WhatsApp webhook | V2 item |

---

## 5. Product Principles

1. **Sales demo first.** Every design decision serves the sales moment, not technical completeness.
2. **Beautiful simulated experience before live automation.** The fake loading timeline IS the product in V1.
3. **Real estate fully working first.** Hotels and restaurants are preview cards only.
4. **Mobile-first.** The primary demo device may be Elijah's phone on a street corner.
5. **Fast enough for a 60–90 second street demo.** Full demo should complete in 3–5 minutes.
6. **Fallback mode is mandatory.** The demo cannot visibly fail in front of a prospect.
7. **The dashboard feels like a business command center, not a developer tool.** No raw JSON, no n8n screenshots, no API errors visible to prospects.
8. **Human approval language always visible.** The AI drafts. The human approves. This reduces purchase fear.
9. **Cautious financial language always.** Use: estimated, potential, possible, based on your inputs, opportunity range. Never: guaranteed, you will earn, you are losing $X.
10. **Do not expose backend machinery to prospects.** No webhook URLs, API keys, n8n canvas, or AI prompt chains in the UI.

---

## 6. Primary User Flow

### Street Demo (60–90 seconds)
1. Elijah opens the app on phone or laptop
2. Selects a preloaded scenario (e.g., "Buyer Lead")
3. Hits "Run Demo"
4. Workflow timeline animates for ~5 seconds
5. Dashboard appears: classification, urgency score, AI draft, recommended action
6. Elijah says: "This is what a live system would do for your business."

### Full Demo (3–5 minutes)
1. Elijah enters business name and industry
2. Business scanner outputs an Opportunity Snapshot
3. Elijah selects or enters a custom lead inquiry
4. Demo runs with live n8n + OpenAI (or fallback)
5. Full dashboard displays
6. Elijah offers to send the Automation Summary
7. Prospect fills in name, email, WhatsApp — captured to Google Sheets
8. CTA routes to booking page (`MINDFUL_BOOKING_URL`)

---

## 7. Public Language Guide

| Use | Avoid |
|---|---|
| Mindful Consultations | Mindful Tech Business Scanner (public) |
| Business Automation Demo | "The Scanner" as main public identity |
| Lead Response Demo | Technical jargon |
| Opportunity Snapshot | "Webhook," "n8n," "API" |
| Business Automation Preview | Guaranteed revenue claims |
| Estimated, potential, possible | "You are losing $X" |
| AI Draft Ready for Approval | "AI will send this automatically" |
| Your team stays in control | Raw JSON output |

---

## 8. Success Criteria

### Product Success
- [ ] Demo runs end-to-end in under 3 minutes
- [ ] Street demo runs in under 90 seconds using preloaded scenario
- [ ] AI result returns in under 30 seconds on normal connection
- [ ] Fallback mode activates silently if n8n/OpenAI takes over 10 seconds
- [ ] Lead is logged correctly to Google Sheets after each demo
- [ ] Summary CTA captures prospect contact info
- [ ] Business owner understands the dashboard without any explanation
- [ ] Demo works correctly on both phone and laptop

### Sales Success (post-launch targets)
- 20 businesses approached
- 10 demos shown
- 5 summaries sent
- 5 follow-up calls booked
- 2 paid setup projects closed
- 1 support retainer closed

### Emotional Success
The owner says: **"Could this work for my business?"**

That is the real KPI.

---

## 9. Open Questions / Missing Information

| Item | Status | Action Required |
|---|---|---|
| `MINDFUL_BOOKING_URL` | Not yet provided | Elijah must supply the Mindful Tech booking page URL |
| `N8N_REAL_ESTATE_WEBHOOK_URL` | Not yet set up | Elijah must configure n8n and paste webhook URL into env |
| Frugal / Frugality quoting tool | Not confirmed for V1 | Clarify if this is an existing URL or a V2 item |
| Google Sheet share permissions | Not configured | Elijah must share MindfulTech Demo Leads sheet with n8n Google account |
| Gmail sender identity in n8n | Not configured | Elijah must connect Gmail credential in n8n |
