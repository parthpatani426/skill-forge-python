import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { projects, projectCategories } from "@/lib/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Python Projects — 100+ runnable programs with line-by-line code" },
      { name: "description", content: "100+ Python projects: every line commented and runnable in the browser. Patterns, games, algorithms, data structures, web, files, OOP and more." },
      { property: "og:title", content: "Python Projects — 100+ explained programs" },
      { property: "og:description", content: "Run each project in the browser and read every line of source with its explanation." },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        p.summary.toLowerCase().includes(needle) ||
        p.slug.includes(needle) ||
        p.stack.some((s) => s.toLowerCase().includes(needle))
      );
    });
  }, [q, cat]);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-12">
          <div className="mb-4 font-mono text-sm text-emerald">// PROJECT_LIBRARY · {projects.length}+ PROGRAMS</div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            {projects.length}+ Python projects, fully explained
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Every project ships with its complete source code, runs in the browser, and includes a
            line-by-line explanation of every keyword, library call, and syntax rule.
          </p>
        </div>

        <div className="sticky top-0 z-10 mb-8 -mx-2 rounded-xl bg-background/85 px-2 py-3 backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search title, library, slug…"
              className="w-full rounded-lg border border-border bg-surface/60 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-emerald focus:outline-none"
            />
            <div className="flex flex-wrap gap-1.5">
              {(["All", ...projectCategories] as string[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded border px-2.5 py-1 font-mono text-[10px] uppercase transition-colors ${
                    cat === c
                      ? "border-emerald bg-emerald/10 text-emerald"
                      : "border-border bg-background text-muted-foreground hover:text-emerald"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">
            {filtered.length} / {projects.length} shown
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, idx) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group rounded-xl border border-border bg-surface/40 p-6 transition-all hover:border-emerald/40 hover:bg-surface"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-emerald">{p.category}</span>
                <span className="font-mono text-[10px] text-muted-foreground">#{String(idx + 1).padStart(3, "0")}</span>
              </div>
              <h2 className="mb-2 text-lg font-bold text-foreground group-hover:text-emerald">{p.title}</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-border bg-surface/40 p-12 text-center font-mono text-sm text-muted-foreground">
            no projects match "{q}" in {cat}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
