import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { projects } from "@/lib/curriculum";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Real-world Projects — Kernel" },
      { name: "description", content: "Build production Python systems: scrapers, APIs, ML services, schedulers, and trading bots." },
      { property: "og:title", content: "Real-world Projects — Kernel" },
      { property: "og:description", content: "Production Python systems built from the ground up." },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-16">
          <div className="mb-4 font-mono text-sm text-emerald">// CAPSTONE_PROJECTS</div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            Build for the real world
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Six capstone projects modeled after the systems engineers actually ship. Each one is a complete codebase with tests, Docker, and a deploy story.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, idx) => (
            <article
              key={p.slug}
              className="group rounded-2xl border border-border bg-surface/40 p-8 transition-all hover:border-emerald/40 hover:bg-surface"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-emerald">PROJECT_{String(idx + 1).padStart(2, "0")}</span>
                <Link
                  to="/curriculum"
                  className="font-mono text-xs text-muted-foreground hover:text-emerald"
                >
                  PREREQUISITES →
                </Link>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-foreground group-hover:text-emerald">{p.title}</h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">{p.summary}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 border-t border-hairline pt-4 text-sm text-muted-foreground">
                {p.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-emerald" />
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
