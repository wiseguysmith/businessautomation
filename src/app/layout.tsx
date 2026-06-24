import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mindful Consultations — Business Automation Demo",
  description:
    "A premium field demo for showing local businesses how faster lead response, AI classification, and owner alerts keep opportunities from going cold.",
  metadataBase: new URL("https://demo.mindfultech.services"),
  openGraph: {
    title: "Mindful Consultations — Business Automation Demo",
    description:
      "See how faster lead response, AI classification, and owner alerts keep opportunities from going cold.",
    url: "https://demo.mindfultech.services",
    siteName: "Mindful Consultations"
  }
};

const navItems = [
  { href: "/preview", label: "Snapshot" },
  { href: "/demo", label: "Demo" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/quote", label: "Quote" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur">
          <nav className="page-shell flex h-14 items-center justify-between">
            <Link href="/" className="flex min-h-11 items-center gap-2.5 leading-none">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-sm font-black uppercase tracking-[0.16em] text-cream">
                Mindful Consultations
              </span>
            </Link>
            <div className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-stone-400 transition hover:bg-white/8 hover:text-cream"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/demo/real-estate" className="hidden rounded-md bg-gold px-4 py-2 text-sm font-bold text-ink transition hover:bg-[#d9be7a] sm:inline-flex">
              Run Demo
            </Link>
          </nav>
        </header>
        {children}
        <footer className="bg-ink">
          <div className="page-shell flex flex-col gap-4 py-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <span className="text-sm font-black uppercase tracking-[0.16em] text-cream">
                  Mindful Consultations
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-500">
                A Mindful Tech demo environment. Calm over chaos.
              </p>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <a
                href="https://mindfultech.services"
                className="text-xs font-semibold text-stone-400 transition hover:text-gold"
                target="_blank"
                rel="noreferrer"
              >
                mindfultech.services
              </a>
              <p className="text-xs text-stone-600">
                This is a demo environment. It does not connect to any live systems.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
