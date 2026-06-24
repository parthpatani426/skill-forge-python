import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { DownloadBundleCard } from "@/components/DownloadBundle";

import { CodeBlock } from "@/components/CodeBlock";
import { curriculum, problems } from "@/lib/curriculum";
import keyboardImg from "@/assets/keyboard.jpg";
import codeVizImg from "@/assets/codeviz.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kernel — Master Python from Scratch to Advanced" },
      { name: "description", content: "Production-first Python curriculum with real-world projects and 400+ practice problems. Go from zero to architect." },
      { property: "og:title", content: "Kernel — Master Python from Scratch to Advanced" },
      { property: "og:description", content: "Production-first Python curriculum with real-world projects and 400+ practice problems." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const heroCode = `def singleton(cls):
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

# Lesson 42: Registry Design Patterns`;

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO */}
      <header className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald" />
            </span>
            NEW: PYTHON 3.12 ADVANCED PATTERNS
          </div>
          <h1 className="mb-6 text-6xl font-bold leading-[0.9] tracking-tight text-foreground lg:text-7xl">
            Master the <span className="text-emerald">Logic</span> behind the Code.
          </h1>
          <p className="mb-10 max-w-lg text-xl leading-relaxed text-muted-foreground">
            From absolute beginner to enterprise-ready engineer. Build production-grade data pipelines, async APIs, and complex system architectures.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/curriculum"
              className="rounded-lg bg-foreground px-8 py-4 font-bold text-background transition-all hover:bg-foreground/90"
            >
              Begin Curriculum
            </Link>
            <Link
              to="/projects"
              className="rounded-lg border border-border bg-surface px-8 py-4 font-bold text-foreground transition-all hover:bg-surface-2"
            >
              View Real-world Projects
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-emerald/10 blur-3xl" />
          <div className="relative">
            <CodeBlock code={heroCode} filename="advanced_decorators.py" />
            <div className="mt-px rounded-b-xl border-t border-emerald/10 bg-emerald/5 p-4">
              <p className="font-mono text-xs text-emerald"># Lesson 42: Implementing Registry Design Patterns</p>
            </div>
          </div>
        </div>
      </header>

      {/* ROADMAP */}
      <section className="mx-auto max-w-7xl border-t border-hairline px-6 py-24 lg:px-8">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="mb-4 text-4xl font-bold text-foreground">The Mastery Roadmap</h2>
            <p className="text-muted-foreground">Three distinct phases designed for career placement.</p>
          </div>
          <div className="flex gap-2">
            <span className="rounded border border-border bg-surface px-4 py-1 font-mono text-xs text-muted-foreground">
              {curriculum.reduce((n, m) => n + m.lessons.length, 0)} LESSONS
            </span>
            <span className="rounded border border-border bg-surface px-4 py-1 font-mono text-xs text-muted-foreground">
              {problems.length}+ PROBLEMS
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {curriculum.map((m, idx) => (
            <Link
              key={m.id}
              to="/curriculum/$module"
              params={{ module: m.id }}
              className={`group rounded-2xl border p-8 transition-all hover:border-emerald/40 ${
                idx === 2 ? "border-emerald/20 bg-surface" : "border-border bg-surface/40"
              }`}
            >
              <div className="mb-4 font-mono text-sm text-emerald">PHASE {m.phase}</div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">{m.phaseName}</h3>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
              <ul className="space-y-3 text-xs text-muted-foreground">
                {m.lessons.slice(0, 4).map((l) => (
                  <li key={l.slug} className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-emerald" />
                    {l.title}
                  </li>
                ))}
              </ul>
              <div className="mt-8 font-mono text-xs text-emerald opacity-0 transition-opacity group-hover:opacity-100">
                EXPLORE →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* REAL WORLD */}
      <section className="bg-foreground px-6 py-24 text-background lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-5xl font-bold leading-tight">Solve real-world problems, not just tutorials.</h2>
              <div className="space-y-6">
                {[
                  { n: "01", t: "The Pattern Lab", d: "Practice the 23 GoF design patterns implemented strictly in Pythonic style." },
                  { n: "02", t: "Algorithm Forge", d: "Curated problems that frequently appear in senior engineer interviews at top companies." },
                  { n: "03", t: "Project Sandboxes", d: "Build a real-time analytics engine or a custom blockchain from the ground up." },
                ].map((row) => (
                  <div key={row.n} className="flex gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-emerald text-background">
                      <span className="text-xl font-bold tracking-tighter">{row.n}</span>
                    </div>
                    <div>
                      <h4 className="mb-1 text-lg font-bold">{row.t}</h4>
                      <p className="text-background/60">{row.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={keyboardImg}
                alt="Mechanical keyboard glowing under code"
                loading="lazy"
                width={600}
                height={600}
                className="aspect-square w-full rounded-2xl object-cover"
              />
              <img
                src={codeVizImg}
                alt="Abstract code data flow"
                loading="lazy"
                width={600}
                height={600}
                className="mt-12 aspect-square w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline px-6 py-24 text-center lg:px-8">
        <h2 className="mb-6 text-4xl font-bold text-foreground">Ready to go from scratch to advanced?</h2>
        <p className="mx-auto mb-10 max-w-xl text-muted-foreground">
          Open access to the full curriculum, practice labs, and projects. No paywalls.
        </p>
        <Link
          to="/curriculum"
          className="inline-block rounded-xl bg-emerald px-12 py-5 text-lg font-black text-background transition-all hover:brightness-110 active:scale-95"
        >
          Start Learning — Free & Open
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
