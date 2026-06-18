import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { CodeBlock } from "@/components/CodeBlock";
import { curriculum, type Module, type Lesson } from "@/lib/curriculum";

export const Route = createFileRoute("/curriculum/$module/$lesson")({
  head: ({ params }) => {
    const m = curriculum.find((x) => x.id === params.module);
    const l = m?.lessons.find((x) => x.slug === params.lesson);
    return {
      meta: [
        { title: `${l?.title ?? "Lesson"} — Kernel` },
        { name: "description", content: l?.summary ?? "Python lesson." },
      ],
    };
  },
  loader: ({ params }) => {
    const m = curriculum.find((x) => x.id === params.module);
    const l = m?.lessons.find((x) => x.slug === params.lesson);
    if (!m || !l) throw notFound();
    const idx = m.lessons.findIndex((x) => x.slug === l.slug);
    return {
      module: m,
      lesson: l,
      prev: m.lessons[idx - 1] ?? null,
      next: m.lessons[idx + 1] ?? null,
    };
  },
  component: LessonPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-bold text-foreground">Lesson not found</h1>
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

function LessonPage() {
  const { module: m, lesson, prev, next } = Route.useLoaderData() as {
    module: Module;
    lesson: Lesson;
    prev: Lesson | null;
    next: Lesson | null;
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Link to="/curriculum" className="hover:text-emerald">CURRICULUM</Link>
          <span>/</span>
          <Link to="/curriculum/$module" params={{ module: m.id }} className="hover:text-emerald">
            {m.title.toUpperCase()}
          </Link>
        </nav>

        <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">{lesson.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{lesson.summary}</p>

        <div className="mt-12 space-y-8">
          <p className="text-base leading-relaxed text-foreground/90">{lesson.body}</p>
          {lesson.code && <CodeBlock code={lesson.code} filename={`${lesson.slug}.py`} />}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          {prev ? (
            <Link
              to="/curriculum/$module/$lesson"
              params={{ module: m.id, lesson: prev.slug }}
              className="group"
            >
              <div className="font-mono text-xs text-muted-foreground">← PREVIOUS</div>
              <div className="mt-1 font-bold text-foreground group-hover:text-emerald">{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to="/curriculum/$module/$lesson"
              params={{ module: m.id, lesson: next.slug }}
              className="group text-right"
            >
              <div className="font-mono text-xs text-muted-foreground">NEXT →</div>
              <div className="mt-1 font-bold text-foreground group-hover:text-emerald">{next.title}</div>
            </Link>
          ) : <div />}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
