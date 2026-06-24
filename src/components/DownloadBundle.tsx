// Centralised metadata for the downloadable source bundle.
// Bump VERSION + BUILT_AT whenever you re-zip /public/downloads/.
export const BUNDLE = {
  version: "1.0.0",
  builtAt: "2026-06-24",
  sizeLabel: "355 KB",
  href: "/downloads/kernel-python-v1.0.0.zip",
  filename: "kernel-python-v1.0.0.zip",
};

export function DownloadBundleButton({
  variant = "solid",
  className = "",
}: {
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-bold transition-all";
  const styles =
    variant === "solid"
      ? "bg-emerald text-background hover:brightness-110 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
      : "border border-emerald/40 text-emerald hover:bg-emerald/10";
  return (
    <a
      href={BUNDLE.href}
      download={BUNDLE.filename}
      className={`${base} ${styles} ${className}`}
      aria-label={`Download full project source zip, version ${BUNDLE.version}`}
    >
      <span aria-hidden>⬇</span>
      <span>Download source</span>
      <span className="rounded-full bg-background/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
        v{BUNDLE.version} · {BUNDLE.sizeLabel}
      </span>
    </a>
  );
}

export function DownloadBundleCard() {
  return (
    <section className="mx-auto my-12 max-w-5xl rounded-2xl border border-emerald/30 bg-gradient-to-br from-emerald/10 via-surface/40 to-background p-8 lg:p-10">
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-widest text-emerald">
            // SOURCE_BUNDLE
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground lg:text-3xl">
            Download the entire project
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Every route, component, lesson, problem and project in one zip — ready to unpack,
            <code className="mx-1 rounded bg-background px-1.5 py-0.5 font-mono text-xs">bun install</code>
            and run locally.
          </p>
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase text-muted-foreground">
            <div><dt className="inline text-emerald">version </dt><dd className="inline">v{BUNDLE.version}</dd></div>
            <div><dt className="inline text-emerald">built </dt><dd className="inline">{BUNDLE.builtAt}</dd></div>
            <div><dt className="inline text-emerald">size </dt><dd className="inline">{BUNDLE.sizeLabel}</dd></div>
            <div><dt className="inline text-emerald">file </dt><dd className="inline">{BUNDLE.filename}</dd></div>
          </dl>
        </div>
        <DownloadBundleButton />
      </div>
    </section>
  );
}
