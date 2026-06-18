import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Kernel" },
      { name: "description", content: "Free to start. Lifetime access for serious developers." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    name: "Free",
    price: "$0",
    tagline: "Get started with the foundations.",
    features: ["Phase 01 lessons", "20 practice problems", "Community access"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Lifetime",
    price: "$299",
    tagline: "The full curriculum, forever.",
    features: [
      "All 3 phases, 18 lessons",
      "All 100+ practice problems",
      "All capstone projects",
      "Project code reviews",
      "Lifetime updates",
    ],
    cta: "Get Lifetime Access",
    highlight: true,
  },
  {
    name: "Team",
    price: "Custom",
    tagline: "For engineering teams.",
    features: ["Volume licensing", "Private cohort", "SSO + analytics", "Dedicated support"],
    cta: "Contact Sales",
    highlight: false,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-16 text-center">
          <div className="mb-4 font-mono text-sm text-emerald">// PRICING</div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            Pay once. Master Python forever.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            No subscriptions. No upsells. One curriculum, three tiers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-8 ${
                t.highlight ? "border-emerald/40 bg-surface" : "border-border bg-surface/40"
              }`}
            >
              <div className="mb-2 font-mono text-xs text-emerald">{t.name.toUpperCase()}</div>
              <div className="mb-2 text-5xl font-bold text-foreground">{t.price}</div>
              <p className="mb-8 text-sm text-muted-foreground">{t.tagline}</p>
              <ul className="mb-8 space-y-3 text-sm text-muted-foreground">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="size-1.5 rounded-full bg-emerald" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/curriculum"
                className={`block rounded-lg px-5 py-3 text-center font-bold transition-all ${
                  t.highlight
                    ? "bg-emerald text-background hover:brightness-110"
                    : "border border-border bg-background text-foreground hover:bg-surface-2"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
