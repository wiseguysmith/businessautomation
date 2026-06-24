# Mindful Consultations - Business Automation Demo

Premium, mobile-first Next.js demo app for Mindful Consultations. V1 is a field-sales demo for Tamarindo real estate agencies: enter a business, choose or customize a lead scenario, run the demo, and show a polished opportunity dashboard.

## What Is Built

- `/` premium landing page
- `/preview` and `/scanner` Opportunity Snapshot form
- `/results` Opportunity Snapshot output
- `/demo` mode selector
- `/demo/real-estate` real estate lead demo with four preloaded scenarios
- `/dashboard` live result dashboard with classification, urgency, draft response, logging status, owner notification status, human approval language, summary CTA, and quote CTA
- `/summary` prospect summary capture
- `/quote` booking and setup-package CTA
- `POST /api/demo/real-estate` server route for n8n forwarding with 8-second fallback
- `POST /api/demo/summary` server route for prospect capture forwarding

## File Structure

```text
src/app/                     App Router pages and API routes
src/app/api/demo/real-estate Real estate n8n webhook bridge
src/app/api/demo/summary     Prospect summary capture bridge
src/components/              Reusable demo UI components
src/lib/                     Shared types, fallback logic, demo data, storage keys
public/hero-command-center.png
netlify.toml
```

## Environment Variables

Required:

```bash
N8N_REAL_ESTATE_WEBHOOK_URL=
MINDFUL_BOOKING_URL=
```

Optional if n8n uses a separate summary-capture workflow:

```bash
N8N_SUMMARY_WEBHOOK_URL=
```

Do not expose webhook URLs in the browser. The frontend calls only the Next.js API routes.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

To test fallback mode, leave `N8N_REAL_ESTATE_WEBHOOK_URL` blank and run a real estate demo. The UI should show “Demo simulation loaded.” and still display a complete dashboard.

## Netlify Deploy

- Repository target: `https://github.com/wiseguysmith/businessautomation.git`
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `18`
- Netlify plugin: `@netlify/plugin-nextjs`

Set these in the Netlify dashboard:

```bash
N8N_REAL_ESTATE_WEBHOOK_URL=
MINDFUL_BOOKING_URL=
```

## n8n Connection

Create/use the n8n workflow for real estate lead intake, then paste the webhook trigger URL into `N8N_REAL_ESTATE_WEBHOOK_URL`.

Expected frontend payload includes:

- business name
- industry
- customer name
- inquiry
- channel
- budget
- timeline
- property type
- optional owner/prospect details
- source: `Mindful Consultations Demo`

n8n should log to the Google Sheet named `MindfulTech Demo Leads` and notify `info@mindfultech.services`.

## Booking URL

Place the Mindful Tech booking page URL in:

```bash
MINDFUL_BOOKING_URL=
```

If it is missing, `/quote` shows “Booking link not configured yet.”

## Assumptions

- Real estate is the only fully working V1 vertical.
- Hotels, restaurants, and other industries are preview-only.
- n8n owns OpenAI prompting, Google Sheets, and email notification behavior.
- The app must stay demo-safe: no login, Supabase, real WhatsApp, CRM, PDF reports, or full hotel/restaurant workflows in V1.

## Remaining TODOs

- Add actual Netlify environment values.
- Configure n8n and Google Sheet permissions.
- Run the Claude QA checklist on mobile after deployment.
- Push to the GitHub repository when you are ready for source control operations.
