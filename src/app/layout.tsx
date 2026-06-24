import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mindful Consultations Business Automation Demo",
  description:
    "A premium field demo for showing local businesses how faster lead response can protect opportunities."
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
        <header className="sticky top-0 z-40 border-b border-black/10 bg-cream/88 backdrop-blur">
          <nav className="page-shell flex h-16 items-center justify-between">
            <Link href="/" className="flex min-h-11 flex-col justify-center leading-none">
              <span className="text-sm font-black uppercase tracking-[0.18em] text-ink">
                Mindful Consultations
              </span>
              <span className="mt-1 text-xs font-semibold text-stone-600">
                Business Automation Demo
              </span>
            </Link>
            <div className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-black/5 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/demo/real-estate" className="primary-button hidden sm:inline-flex">
              Run Demo
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
