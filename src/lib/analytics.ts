type EventName =
  | "demo_started"
  | "industry_selected"
  | "scenario_selected"
  | "demo_completed"
  | "dashboard_viewed"
  | "spanish_toggled"
  | "booking_cta_clicked"
  | "summary_submitted";

interface EventPayload {
  industry?: string;
  scenario?: string;
  businessName?: string;
  fallback?: boolean;
  [key: string]: unknown;
}

interface AnalyticsEvent {
  event: EventName;
  payload: EventPayload;
  ts: string;
}

const SESSION_KEY = "mt_analytics";
const MAX_EVENTS = 50;

export function track(event: EventName, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  const entry: AnalyticsEvent = {
    event,
    payload,
    ts: new Date().toISOString()
  };

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    const events: AnalyticsEvent[] = raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
    events.push(entry);
    if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(events));
  } catch {
    // localStorage may be unavailable
  }
}

export function getSessionEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
  } catch {
    return [];
  }
}

export function clearSessionEvents() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}
