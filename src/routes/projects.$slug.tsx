import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { RunnableCode } from "@/components/RunnableCode";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    const title = p ? `${p.title} — Project` : "Project";
    return {
      meta: [
        { title },
        { name: "description", content: p?.summary ?? "Python project with line-by-line explanation." },
      ],
    };
  },
  loader: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="mb-3 text-3xl font-bold">Project not found</h1>
        <Link to="/projects" className="text-emerald hover:underline">← Back to projects</Link>
      </main>
    </div>
  ),
  component: ProjectDetail,
});

function splitLines(code: string) {
  return code.split("\n").map((line) => {
    const hashIdx = (() => {
      // skip # inside strings (basic heuristic)
      let inS: string | null = null;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (inS) { if (c === inS && line[i - 1] !== "\\") inS = null; continue; }
        if (c === '"' || c === "'") { inS = c; continue; }
        if (c === "#") return i;
      }
      return -1;
    })();
    if (hashIdx === -1) return { code: line, comment: "" };
    return {
      code: line.slice(0, hashIdx).replace(/\s+$/, ""),
      comment: line.slice(hashIdx + 1).trim(),
    };
  });
}

function ProjectDetail() {
  const p = Route.useLoaderData();
  const lines = useMemo(() => splitLines(p.code), [p.code]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <Link to="/projects" className="mb-8 inline-block font-mono text-xs text-muted-foreground hover:text-emerald">
          ← ALL_PROJECTS
        </Link>
        <div className="mb-2 font-mono text-xs uppercase text-emerald">{p.category}</div>
        <h1 className="mb-3 text-4xl font-bold tracking-tight lg:text-5xl">{p.title}</h1>
        <p className="mb-6 max-w-3xl text-lg text-muted-foreground">{p.summary}</p>
        <div className="mb-10 flex flex-wrap gap-2">
          {p.stack.map((s: string) => (
            <span key={s} className="rounded border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground">
              {s}
            </span>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="mb-3 font-mono text-sm uppercase text-emerald">// source · runnable</h2>
          <RunnableCode code={p.code} filename={`${p.slug}.py`} />
        </section>

        <section>
          <h2 className="mb-3 font-mono text-sm uppercase text-emerald">// line-by-line walkthrough</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Every line of source, paired with the comment that explains what it does and why.
          </p>
          <div className="overflow-hidden rounded-xl border border-border bg-surface/40">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-background/40 font-mono text-[10px] uppercase text-muted-foreground">
                <tr>
                  <th className="w-12 px-3 py-2 text-right">#</th>
                  <th className="px-3 py-2 text-left">Code</th>
                  <th className="px-3 py-2 text-left">Explanation</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((ln, i) => (
                  <tr key={i} className="border-t border-hairline align-top">
                    <td className="px-3 py-2 text-right font-mono text-[11px] text-code-comment">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="whitespace-pre px-3 py-2 font-mono text-[12px] text-foreground/90">
                      {ln.code || "\u00A0"}
                    </td>
                    <td className="px-3 py-2 text-foreground/80">
                      {ln.comment || <span className="text-muted-foreground/50">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
