import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { RunnableCode } from "@/components/RunnableCode";
import { problems, type Problem } from "@/lib/curriculum";

export const Route = createFileRoute("/problems/$slug")({
  head: ({ params }) => {
    const p = problems.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${p?.title ?? "Problem"} — Kernel` },
        { name: "description", content: p?.prompt ?? "Python problem." },
      ],
    };
  },
  loader: ({ params }) => {
    const p = problems.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { problem: p };
  },
  component: ProblemPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-bold text-foreground">Problem not found</h1>
        <Link to="/problems" className="mt-6 inline-block text-emerald hover:underline">
          ← Back to labs
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

function ProblemPage() {
  const { problem: p } = Route.useLoaderData() as { problem: Problem };
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <Link to="/problems" className="font-mono text-xs text-muted-foreground hover:text-emerald">
          ← PRACTICE LABS
        </Link>

        <div className="mt-6 mb-3 flex items-center gap-3">
          <span className="rounded border border-emerald/30 px-2 py-0.5 font-mono text-[10px] uppercase text-emerald">
            {p.difficulty}
          </span>
          <span className="font-mono text-[10px] uppercase text-muted-foreground">{p.category}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">{p.title}</h1>

        <section className="mt-10 space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-emerald">Prompt</h2>
          <p className="text-lg leading-relaxed text-foreground/90">{p.prompt}</p>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald">Example</h2>
          <pre className="overflow-x-auto rounded-xl border border-border bg-surface/40 p-6 font-mono text-sm leading-relaxed text-foreground/90">
{p.example}
          </pre>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald">Pythonic Solution</h2>
          <RunnableCode code={p.solution} filename={`${p.slug}.py`} />
        </section>

        {p.explanation && (
          <section className="mt-10">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald">
              How the solution works
            </h2>
            <p className="rounded-lg border-l-2 border-emerald bg-surface/40 p-4 text-base leading-relaxed text-foreground/90">
              {p.explanation}
            </p>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
