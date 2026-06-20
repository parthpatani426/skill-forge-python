import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { pythonReference } from "@/lib/curriculum";

export const Route = createFileRoute("/reference/")({
  head: () => ({
    meta: [
      { title: "Python Reference — Kernel" },
      {
        name: "description",
        content:
          "Every Python keyword, built-in, standard library module, third-party staple and operator — explained in plain English.",
      },
      { property: "og:title", content: "Python Reference — Kernel" },
      {
        property: "og:description",
        content:
          "Every Python keyword, built-in, standard library module, third-party staple and operator — explained in plain English.",
      },
    ],
  }),
  component: ReferenceIndex,
});

function ReferenceIndex() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!needle) return pythonReference;
    return pythonReference
      .map((cat) => ({
        ...cat,
        entries: cat.entries.filter(
          (e) =>
            e.name.toLowerCase().includes(needle) ||
            e.description.toLowerCase().includes(needle) ||
            (e.example?.toLowerCase().includes(needle) ?? false),
        ),
      }))
      .filter((cat) => cat.entries.length > 0);
  }, [needle]);

  const totalMatches = filtered.reduce((n, c) => n + c.entries.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-12">
          <div className="mb-4 font-mono text-sm text-emerald">// LANGUAGE_REFERENCE</div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            The Python Reference
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Every keyword, every essential built-in, every standard-library module and every
            third-party library worth knowing — with a one-line, plain-English explanation.
          </p>
        </div>

        <div className="sticky top-16 z-40 -mx-6 mb-8 border-y border-hairline bg-background/90 px-6 py-4 backdrop-blur-md lg:-mx-8 lg:px-8">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, built-ins, libraries… (e.g. lambda, zip, requests)"
            className="w-full rounded-lg border border-border bg-surface/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald focus:outline-none"
          />
          {needle && (
            <p className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">
              {totalMatches} match{totalMatches === 1 ? "" : "es"} for “{query}”
            </p>
          )}
        </div>

        {!needle && (
          <nav className="mb-12 flex flex-wrap gap-2">
            {pythonReference.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="rounded-full border border-border bg-surface/40 px-4 py-1.5 font-mono text-xs uppercase text-muted-foreground transition-colors hover:border-emerald hover:text-emerald"
              >
                {cat.title}
              </a>
            ))}
          </nav>
        )}

        <div className="space-y-20">
          {filtered.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-32">
              <div className="mb-6 border-b border-hairline pb-4">
                <div className="mb-2 font-mono text-xs uppercase text-emerald">
                  {cat.entries.length} {needle ? "MATCH" : "ENTRIES"}{cat.entries.length === 1 ? "" : needle ? "ES" : ""}
                </div>
                <h2 className="text-3xl font-bold text-foreground">{cat.title}</h2>
                <p className="mt-2 max-w-3xl text-muted-foreground">{cat.intro}</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {cat.entries.map((e) => (
                  <div
                    key={e.name}
                    className="rounded-lg border border-border bg-surface/40 p-4 transition-colors hover:border-emerald/40"
                  >
                    <div className="font-mono text-sm font-bold text-emerald break-words">
                      {e.name}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                      {e.description}
                    </p>
                    {e.example && (
                      <pre className="mt-2 overflow-x-auto rounded bg-background/60 p-2 font-mono text-[12px] text-foreground/80">
                        {e.example}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {needle && filtered.length === 0 && (
            <p className="rounded-lg border border-border bg-surface/40 p-8 text-center text-muted-foreground">
              No reference entries match “{query}”.
            </p>
          )}
        </div>

        <div className="mt-20 rounded-2xl border border-border bg-surface/40 p-8 text-center">
          <p className="font-mono text-xs uppercase text-emerald">Keep learning</p>
          <h3 className="mt-3 text-2xl font-bold text-foreground">
            Reference is shallow. Lessons are deep.
          </h3>
          <Link
            to="/curriculum"
            className="mt-5 inline-block rounded-full bg-emerald px-6 py-2.5 text-sm font-bold text-background transition-all hover:brightness-110"
          >
            Read the curriculum →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
