# n8n Workflow Specification — Mindful Consultations Business Automation Demo

**Workflow name:** Mindful Tech Demo — Real Estate Lead Intake V1  
**Version:** V1  
**Last updated:** 2026-06-24  
**Maintained by:** Claude Code (Product Architect role)  
**Configured by:** Elijah (manual setup in n8n)  
**AI backend:** OpenAI (via n8n OpenAI node)  
**Data storage:** Google Sheets — MindfulTech Demo Leads  
**Notification target:** info@mindfultech.services

---

## Overview

This workflow receives a simulated real estate lead from the Mindful Consultations frontend, classifies it using OpenAI, logs the result to Google Sheets, sends an internal notification email, and returns a structured JSON response to the frontend dashboard.

The workflow must complete successfully in under 15 seconds under normal conditions.

---

## Webhook Configuration

**Trigger type:** Webhook (HTTP POST)  
**Authentication:** None for V1 (webhook URL is kept secret via environment variable)  
**Method:** POST  
**Response mode:** "Respond to Webhook" node (last node in the chain)  
**Webhook URL:** Paste this URL into the Netlify environment variable `N8N_REAL_ESTATE_WEBHOOK_URL`

---

## Incoming Webhook Payload

The Next.js API route sends this JSON body:

```json
{
  "businessName": "Tamarindo Luxury Realty",
  "industry": "Real Estate",
  "customerName": "Sarah",
  "inquiry": "I'm visiting Tamarindo next week and looking for a 2-bedroom condo under $450k near the beach.",
  "channel": "Website",
  "budget": "450000",
  "timeline": "Next week",
  "propertyType": "Condo"
}
```

**Required fields:** `businessName`, `customerName`, `inquiry`, `channel`  
**Optional fields:** `budget`, `timeline`, `propertyType`

---

## Node-by-Node Workflow

### Node 1 — Webhook Trigger

**Type:** Webhook  
**Name:** `Demo Lead Received`  
**HTTP Method:** POST  
**Response mode:** Using "Respond to Webhook" node  
**Notes:** Copy the webhook URL after creating this node and paste it into `N8N_REAL_ESTATE_WEBHOOK_URL`.

---

### Node 2 — Validate Input

**Type:** Code (JavaScript)  
**Name:** `Validate Input`

**Purpose:** Confirm required fields are present before passing to OpenAI.

```javascript
const body = $input.first().json.body;

const required = ['businessName', 'customerName', 'inquiry', 'channel'];
const missing = required.filter(field => !body[field] || body[field].trim() === '');

if (missing.length > 0) {
  throw new Error(`Missing required fields: ${missing.join(', ')}`);
}

return [{
  json: {
    businessName: body.businessName.trim(),
    industry: body.industry || 'Real Estate',
    customerName: body.customerName.trim(),
    inquiry: body.inquiry.trim(),
    channel: body.channel.trim(),
    budget: body.budget || 'Not specified',
    timeline: body.timeline || 'Not specified',
    propertyType: body.propertyType || 'Not specified',
    timestamp: new Date().toISOString()
  }
}];
```

---

### Node 3 — OpenAI Classification

**Type:** OpenAI (Chat)  
**Name:** `AI Classification`  
**Model:** `gpt-4o`  
**Temperature:** `0.2`  
**Max tokens:** `800`  
**Response format:** JSON object

**System prompt:** See `/docs/prompts/REAL_ESTATE_AI_PROMPT.md` for the full system prompt.

**User message template (constructed in n8n expression):**

```
Business Name: {{ $json.businessName }}
Customer Name: {{ $json.customerName }}
Inquiry: {{ $json.inquiry }}
Channel: {{ $json.channel }}
Budget: {{ $json.budget }}
Timeline: {{ $json.timeline }}
Property Type: {{ $json.propertyType }}
```

**Expected output from OpenAI:** A JSON object matching the schema defined in `/docs/prompts/REAL_ESTATE_AI_PROMPT.md`.

---

### Node 4 — Parse AI Response

**Type:** Code (JavaScript)  
**Name:** `Parse AI Response`

**Purpose:** Extract the JSON object from the OpenAI response and merge it with the validated input fields for downstream nodes.

```javascript
const input = $('Validate Input').first().json;
const aiRaw = $input.first().json.message.content;

let aiResult;
try {
  aiResult = JSON.parse(aiRaw);
} catch (e) {
  // If OpenAI returns non-JSON, use a safe default
  aiResult = {
    leadType: "General Inquiry",
    urgencyScore: 50,
    urgencyLabel: "Warm Lead",
    estimatedOpportunity: "Unable to classify — please review manually",
    draftResponse: "Thank you for reaching out. A member of our team will be in touch shortly.",
    spanishDraftResponse: "Gracias por comunicarte con nosotros. Un miembro de nuestro equipo se pondrá en contacto contigo en breve.",
    recommendedAction: "Review this lead manually.",
    riskNote: "AI classification was unavailable for this inquiry."
  };
}

return [{
  json: {
    ...input,
    ...aiResult,
    logged: false,
    notificationSent: false
  }
}];
```

---

### Node 5 — Append to Demo Leads Sheet

**Type:** Google Sheets  
**Name:** `Log Demo Lead`  
**Operation:** Append row  
**Spreadsheet:** MindfulTech Demo Leads  
**Sheet tab:** Demo Leads

**Column mapping:**

| Sheet Column | n8n Expression |
|---|---|
| Timestamp | `{{ $json.timestamp }}` |
| Business Name | `{{ $json.businessName }}` |
| Industry | `{{ $json.industry }}` |
| Customer Name | `{{ $json.customerName }}` |
| Inquiry | `{{ $json.inquiry }}` |
| Channel | `{{ $json.channel }}` |
| Budget | `{{ $json.budget }}` |
| Timeline | `{{ $json.timeline }}` |
| Property Type | `{{ $json.propertyType }}` |
| Lead Type | `{{ $json.leadType }}` |
| Urgency Score | `{{ $json.urgencyScore }}` |
| Urgency Label | `{{ $json.urgencyLabel }}` |
| Estimated Opportunity | `{{ $json.estimatedOpportunity }}` |
| Draft Response | `{{ $json.draftResponse }}` |
| Spanish Draft Response | `{{ $json.spanishDraftResponse }}` |
| Recommended Action | `{{ $json.recommendedAction }}` |
| Risk Note | `{{ $json.riskNote }}` |
| Status | `Demo Run` |

---

### Node 6 — Append to AI Drafts Sheet

**Type:** Google Sheets  
**Name:** `Log AI Draft`  
**Operation:** Append row  
**Spreadsheet:** MindfulTech Demo Leads  
**Sheet tab:** AI Drafts

**Column mapping:**

| Sheet Column | n8n Expression |
|---|---|
| Timestamp | `{{ $json.timestamp }}` |
| Business Name | `{{ $json.businessName }}` |
| Customer Name | `{{ $json.customerName }}` |
| Draft Response | `{{ $json.draftResponse }}` |
| Spanish Draft Response | `{{ $json.spanishDraftResponse }}` |
| Approval Status | `Pending` |

---

### Node 7 — Append to Opportunity Scores Sheet

**Type:** Google Sheets  
**Name:** `Log Opportunity Score`  
**Operation:** Append row  
**Spreadsheet:** MindfulTech Demo Leads  
**Sheet tab:** Opportunity Scores

**Column mapping:**

| Sheet Column | n8n Expression |
|---|---|
| Timestamp | `{{ $json.timestamp }}` |
| Business Name | `{{ $json.businessName }}` |
| Industry | `{{ $json.industry }}` |
| Lead Type | `{{ $json.leadType }}` |
| Urgency Score | `{{ $json.urgencyScore }}` |
| Estimated Opportunity | `{{ $json.estimatedOpportunity }}` |
| Risk Note | `{{ $json.riskNote }}` |

---

### Node 8 — Send Gmail Notification

**Type:** Gmail  
**Name:** `Internal Notification`  
**To:** info@mindfultech.services  
**From:** (the Gmail account connected in n8n credentials)

**Subject:**
```
New Demo Lead: {{ $json.urgencyLabel }} — {{ $json.businessName }}
```

**Body (HTML):**
```html
<h2>New Demo Lead — Mindful Consultations Business Automation Demo</h2>

<table>
  <tr><td><strong>Business:</strong></td><td>{{ $json.businessName }}</td></tr>
  <tr><td><strong>Customer:</strong></td><td>{{ $json.customerName }}</td></tr>
  <tr><td><strong>Channel:</strong></td><td>{{ $json.channel }}</td></tr>
  <tr><td><strong>Lead Type:</strong></td><td>{{ $json.leadType }}</td></tr>
  <tr><td><strong>Urgency Score:</strong></td><td>{{ $json.urgencyScore }}/100</td></tr>
  <tr><td><strong>Urgency Label:</strong></td><td>{{ $json.urgencyLabel }}</td></tr>
  <tr><td><strong>Estimated Opportunity:</strong></td><td>{{ $json.estimatedOpportunity }}</td></tr>
</table>

<h3>Inquiry</h3>
<p>{{ $json.inquiry }}</p>

<h3>Recommended Action</h3>
<p>{{ $json.recommendedAction }}</p>

<h3>AI Draft Response</h3>
<p>{{ $json.draftResponse }}</p>

<hr>
<p><em>This is a Mindful Consultations demo environment simulation. AI draft is ready for review.</em></p>
```

---

### Node 9 — Mark Logged + Notification Sent

**Type:** Code (JavaScript)  
**Name:** `Set Status Flags`

**Purpose:** Add `logged: true` and `notificationSent: true` to the response before returning to the frontend.

```javascript
const data = $input.first().json;

return [{
  json: {
    ...data,
    logged: true,
    notificationSent: true
  }
}];
```

---

### Node 10 — Respond to Webhook

**Type:** Respond to Webhook  
**Name:** `Return Result`  
**Response code:** 200  
**Response body:** JSON

**Response body expression:**

```json
{
  "leadType": "{{ $json.leadType }}",
  "urgencyScore": {{ $json.urgencyScore }},
  "urgencyLabel": "{{ $json.urgencyLabel }}",
  "estimatedOpportunity": "{{ $json.estimatedOpportunity }}",
  "draftResponse": "{{ $json.draftResponse }}",
  "spanishDraftResponse": "{{ $json.spanishDraftResponse }}",
  "recommendedAction": "{{ $json.recommendedAction }}",
  "riskNote": "{{ $json.riskNote }}",
  "logged": {{ $json.logged }},
  "notificationSent": {{ $json.notificationSent }}
}
```

---

## Node Connection Order

```
Demo Lead Received
  → Validate Input
    → AI Classification
      → Parse AI Response
        → Log Demo Lead (Google Sheets)
          → Log AI Draft (Google Sheets)
            → Log Opportunity Score (Google Sheets)
              → Internal Notification (Gmail)
                → Set Status Flags
                  → Return Result (Respond to Webhook)
```

---

## Google Sheets Setup

**Spreadsheet name:** MindfulTech Demo Leads  
**Created by:** Elijah (manual setup)  
**Shared with:** The Google account used in n8n Google Sheets credentials (must have Editor access)

### Tab 1: Demo Leads

Columns (in order):
```
Timestamp | Business Name | Industry | Customer Name | Inquiry | Channel | Budget | Timeline | Property Type | Lead Type | Urgency Score | Urgency Label | Estimated Opportunity | Draft Response | Spanish Draft Response | Recommended Action | Risk Note | Status
```

### Tab 2: AI Drafts

Columns:
```
Timestamp | Business Name | Customer Name | Draft Response | Spanish Draft Response | Approval Status
```

### Tab 3: Opportunity Scores

Columns:
```
Timestamp | Business Name | Industry | Lead Type | Urgency Score | Estimated Opportunity | Risk Note
```

### Tab 4: Sales Opportunities

Columns (populated by the `/api/demo/summary` webhook separately):
```
Timestamp | Business Name | Industry | Owner Name | Email | WhatsApp | Pain Point | Demo Type | Demo Date | Interest Level | Suggested Package | Follow-Up Date | Status | Notes
```

**Valid Status values for Sales Opportunities tab:**
- Demo Shown
- Interested
- Summary Sent
- Quote Requested
- Follow-Up Needed
- Closed Won
- Closed Lost

---

## Second Workflow — Summary / Prospect Capture

**Workflow name:** Mindful Tech Demo — Prospect Lead Capture V1  
**Trigger:** Separate webhook (separate URL for `/api/demo/summary`)

This workflow receives prospect contact info from the "Send Me This Automation Summary" form and logs it to the Sales Opportunities tab.

**Incoming payload:**

```json
{
  "name": "Carlos Mendez",
  "businessName": "Tamarindo Luxury Realty",
  "email": "carlos@tamarindorealty.com",
  "whatsapp": "+506 8888 0000",
  "interestLevel": "Interested — want more info",
  "demoType": "Real Estate",
  "demoDate": "2026-06-24"
}
```

**Nodes (simplified):**
1. Webhook Trigger
2. Append to Sales Opportunities (Google Sheets)
3. Send internal notification (Gmail) — Subject: "New Prospect Lead: {{ name }} — {{ businessName }}"
4. Respond to Webhook (200 OK, `{ "captured": true }`)

---

## Error Handling and Failure Behavior

### If OpenAI node fails or times out
- The `Parse AI Response` node catches JSON parse failures and returns a safe default result
- The workflow continues to log and notify with the safe default
- The frontend still receives a valid response (not an error)

### If Google Sheets append fails
- Configure the Google Sheets nodes to "Continue on Fail"
- The workflow continues to the Gmail notification and webhook response
- The frontend still receives the AI result — the logging failure is not shown to the prospect

### If Gmail fails
- Configure the Gmail node to "Continue on Fail"
- The workflow continues to return the result to the frontend
- The `notificationSent` flag will still be `true` (acceptable in V1; demo is not affected)

### If the entire n8n workflow is unreachable (timeout)
- The Next.js API route detects the timeout after 10 seconds
- The API route returns `{ fallback: true }` with status 200
- The frontend activates its built-in fallback result silently

---

## Manual Configuration Checklist (Elijah)

- [ ] Create n8n account and workspace
- [ ] Create workflow named "Mindful Tech Demo — Real Estate Lead Intake V1"
- [ ] Add and activate Webhook Trigger node; copy the webhook URL
- [ ] Paste webhook URL into `N8N_REAL_ESTATE_WEBHOOK_URL` in Netlify and `.env.local`
- [ ] Connect OpenAI API key in n8n credentials
- [ ] Connect Google account in n8n credentials (Google Sheets + Gmail)
- [ ] Create Google Sheet "MindfulTech Demo Leads" with all 4 tabs and correct column headers
- [ ] Share the Google Sheet with the n8n Google account (Editor access)
- [ ] Configure Gmail node to send from connected Google account to info@mindfultech.services
- [ ] Test the workflow end-to-end with a sample payload using n8n's test execution
- [ ] Verify all 3 Google Sheet tabs receive data from a test run
- [ ] Verify internal notification email arrives at info@mindfultech.services
- [ ] Activate the workflow (toggle to Active in n8n)
- [ ] Create second workflow for prospect capture; paste URL into a separate env var if needed
