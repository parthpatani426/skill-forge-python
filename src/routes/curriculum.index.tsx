import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { curriculum } from "@/lib/curriculum";

export const Route = createFileRoute("/curriculum/")({
  head: () => ({
    meta: [
      { title: "Curriculum — Kernel" },
      { name: "description", content: "The complete Python curriculum. Three phases, eighteen lessons, from syntax to production deployment." },
      { property: "og:title", content: "Curriculum — Kernel" },
      { property: "og:description", content: "The complete Python curriculum. Three phases, eighteen lessons, from syntax to production deployment." },
    ],
  }),
  component: CurriculumIndex,
});

function CurriculumIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-16">
          <div className="mb-4 font-mono text-sm text-emerald">// COMPLETE_PYTHON_COURSE</div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            The Full Curriculum
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Eighteen lessons across three phases. Every lesson ships with runnable code, exercises, and a real-world context.
          </p>
        </div>

        <div className="space-y-16">
          {curriculum.map((m) => (
            <section key={m.id}>
              <div className="mb-8 flex items-end justify-between border-b border-hairline pb-4">
                <div>
                  <div className="mb-2 font-mono text-sm text-emerald">PHASE {m.phase}</div>
                  <h2 className="text-3xl font-bold text-foreground">{m.title}</h2>
                  <p className="mt-2 text-muted-foreground">{m.description}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {m.lessons.length} LESSONS
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {m.lessons.map((l, i) => (
                  <Link
                    key={l.slug}
                    to="/curriculum/$module/$lesson"
                    params={{ module: m.id, lesson: l.slug }}
                    className="group rounded-xl border border-border bg-surface/40 p-6 transition-all hover:border-emerald/40 hover:bg-surface"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs text-emerald opacity-0 transition-opacity group-hover:opacity-100">
                        OPEN →
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-emerald">
                      {l.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{l.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
