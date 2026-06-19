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

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 mb-4 font-mono text-xs uppercase tracking-widest text-emerald">
      {children}
    </h2>
  );
}

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

        <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          {lesson.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{lesson.summary}</p>

        <div className="mt-10 space-y-8">
          <p className="text-base leading-relaxed text-foreground/90">{lesson.body}</p>
          {lesson.code && <CodeBlock code={lesson.code} filename={`${lesson.slug}.py`} />}
        </div>

        {lesson.sections?.map((s, i) => (
          <section key={i}>
            <H2>{`${String(i + 1).padStart(2, "0")} · ${s.heading}`}</H2>
            <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
              {s.body}
            </p>
            {s.code && (
              <div className="mt-5">
                <CodeBlock code={s.code} filename={`${lesson.slug}-${i + 1}.py`} />
              </div>
            )}
          </section>
        ))}

        {lesson.keywords && lesson.keywords.length > 0 && (
          <section>
            <H2>Keywords & built-ins introduced</H2>
            <div className="grid gap-3 md:grid-cols-2">
              {lesson.keywords.map((k) => (
                <div
                  key={k.name}
                  className="rounded-lg border border-border bg-surface/40 p-4"
                >
                  <div className="font-mono text-sm font-bold text-emerald">{k.name}</div>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                    {k.description}
                  </p>
                  {k.example && (
                    <pre className="mt-2 overflow-x-auto rounded bg-background/60 p-2 font-mono text-[12px] text-foreground/80">
                      {k.example}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {lesson.syntax && lesson.syntax.length > 0 && (
          <section>
            <H2>Syntax rules</H2>
            <ul className="space-y-4">
              {lesson.syntax.map((s, i) => (
                <li key={i} className="rounded-lg border border-border bg-surface/40 p-4">
                  <p className="text-sm text-foreground/90">{s.rule}</p>
                  <pre className="mt-2 overflow-x-auto rounded bg-background/60 p-2 font-mono text-[12px] text-foreground/80">
                    {s.example}
                  </pre>
                </li>
              ))}
            </ul>
          </section>
        )}

        {lesson.pitfalls && lesson.pitfalls.length > 0 && (
          <section>
            <H2>Common pitfalls</H2>
            <ul className="space-y-2 text-sm text-foreground/90">
              {lesson.pitfalls.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-emerald">!</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {lesson.whyItMatters && (
          <section>
            <H2>Why it matters</H2>
            <p className="rounded-lg border-l-2 border-emerald bg-surface/40 p-4 text-base leading-relaxed text-foreground/90">
              {lesson.whyItMatters}
            </p>
          </section>
        )}

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          {prev ? (
            <Link
              to="/curriculum/$module/$lesson"
              params={{ module: m.id, lesson: prev.slug }}
              className="group"
            >
              <div className="font-mono text-xs text-muted-foreground">← PREVIOUS</div>
              <div className="mt-1 font-bold text-foreground group-hover:text-emerald">
                {prev.title}
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to="/curriculum/$module/$lesson"
              params={{ module: m.id, lesson: next.slug }}
              className="group text-right"
            >
              <div className="font-mono text-xs text-muted-foreground">NEXT →</div>
              <div className="mt-1 font-bold text-foreground group-hover:text-emerald">
                {next.title}
              </div>
            </Link>
          ) : <div />}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
