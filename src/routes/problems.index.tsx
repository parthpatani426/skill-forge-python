import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { problems } from "@/lib/curriculum";

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: "border-emerald/30 text-emerald",
  Medium: "border-amber-500/30 text-amber-400",
  Hard: "border-orange-500/30 text-orange-400",
  Expert: "border-rose-500/30 text-rose-400",
};

export const Route = createFileRoute("/problems/")({
  head: () => ({
    meta: [
      { title: "Practice Labs — Kernel" },
      { name: "description", content: "Curated Python problems: patterns, algorithms, data structures, and design. Every problem ships with a Pythonic solution." },
      { property: "og:title", content: "Practice Labs — Kernel" },
      { property: "og:description", content: "Curated Python problems with Pythonic solutions." },
    ],
  }),
  component: ProblemsIndex,
});

function ProblemsIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-16">
          <div className="mb-4 font-mono text-sm text-emerald">// PRACTICE_LABS</div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            Patterns & Problems
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            From classic pattern printing to graph algorithms. Every problem ships with a clean,
            idiomatic Python solution and the reasoning behind it.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <Link
              key={p.slug}
              to="/problems/$slug"
              params={{ slug: p.slug }}
              className="group rounded-xl border border-border bg-surface/40 p-6 transition-all hover:border-emerald/40 hover:bg-surface"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase ${DIFFICULTY_STYLES[p.difficulty]}`}>
                  {p.difficulty}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{p.category}</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-emerald">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.prompt}</p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
