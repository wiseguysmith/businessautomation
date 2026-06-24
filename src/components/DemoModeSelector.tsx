import { ArrowRight, Clock3, Gauge, MonitorSmartphone } from "lucide-react";
import Link from "next/link";

const modes = [
  {
    title: "Street Demo",
    time: "60-90 seconds",
    goal: "Spark interest quickly with a preloaded lead scenario.",
    icon: Clock3
  },
  {
    title: "Full Demo",
    time: "3-5 minutes",
    goal: "Capture details, show the dashboard, and move toward summary or quote.",
    icon: MonitorSmartphone
  }
];

export function DemoModeSelector() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="panel p-6">
        <p className="eyebrow">Demo Mode</p>
        <h1 className="mt-3 text-4xl font-black tracking-normal text-ink">
          Choose the right pace for the conversation.
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-700">
          Both paths lead to the same real estate automation preview. The difference is how
          much context you collect before showing the dashboard.
        </p>
        <Link href="/demo/real-estate" className="primary-button mt-6">
          Start Real Estate Demo
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <div className="grid gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <article key={mode.title} className="panel p-5">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-teal/10 p-3 text-teal">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-black text-ink">{mode.title}</h2>
                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold text-stone-600">
                      {mode.time}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-700">{mode.goal}</p>
                </div>
              </div>
            </article>
          );
        })}
        <article className="rounded-lg border border-black/10 bg-ink p-5 text-cream">
          <div className="flex items-center gap-3">
            <Gauge className="h-5 w-5 text-gold" aria-hidden="true" />
            <h2 className="text-xl font-black">Live V1 Vertical</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-stone-200">
            Real estate is fully enabled. Hotel and restaurant language is available as a
            preview only, without separate workflows.
          </p>
        </article>
      </div>
    </div>
  );
}
