import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { curriculum, type Module } from "@/lib/curriculum";

export const Route = createFileRoute("/curriculum/$module/")({
  head: ({ params }) => {
    const m = curriculum.find((x) => x.id === params.module);
    return {
      meta: [
        { title: `${m?.title ?? "Module"} — Kernel` },
        { name: "description", content: m?.description ?? "Python module." },
      ],
    };
  },
  loader: ({ params }) => {
    const m = curriculum.find((x) => x.id === params.module);
    if (!m) throw notFound();
    return { module: m };
  },
  component: ModulePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-bold text-foreground">Module not found</h1>
        <Link to="/curriculum" className="mt-6 inline-block text-emerald hover:underline">
          ← Back to curriculum
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
        <button onClick={reset} className="mt-6 text-emerald hover:underline">Try again</button>
      </div>
    </div>
  ),
});

function ModulePage() {
  const { module: m } = Route.useLoaderData() as { module: Module };
  return (
    <div className="min-h-screen bg-background">


      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">
        <Link to="/curriculum" className="font-mono text-xs text-muted-foreground hover:text-emerald">
          ← CURRICULUM
        </Link>
        <div className="mb-12 mt-6">
          <div className="mb-3 font-mono text-sm text-emerald">PHASE {m.phase} — {m.phaseName}</div>
          <h1 className="text-5xl font-bold tracking-tight text-foreground">{m.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{m.description}</p>
        </div>

        <ol className="space-y-3">
          {m.lessons.map((l, i) => (
            <li key={l.slug}>
              <Link
                to="/curriculum/$module/$lesson"
                params={{ module: m.id, lesson: l.slug }}
                className="group flex items-center gap-6 rounded-xl border border-border bg-surface/40 p-6 transition-all hover:border-emerald/40 hover:bg-surface"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-border bg-background font-mono text-sm text-muted-foreground group-hover:border-emerald/40 group-hover:text-emerald">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-emerald">{l.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{l.summary}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground group-hover:text-emerald">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </div>
  );
}
