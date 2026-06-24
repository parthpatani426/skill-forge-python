import { Link } from "@tanstack/react-router";
import { BUNDLE } from "./DownloadBundle";


export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded bg-emerald font-bold text-background">
            K
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">KERNEL</span>
        </Link>
        <div className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/curriculum" className="transition-colors hover:text-emerald" activeProps={{ className: "text-foreground" }}>
            Curriculum
          </Link>
          <Link to="/problems" className="transition-colors hover:text-emerald" activeProps={{ className: "text-foreground" }}>
            Practice Labs
          </Link>
          <Link to="/reference" className="transition-colors hover:text-emerald" activeProps={{ className: "text-foreground" }}>
            Reference
          </Link>
          <Link to="/projects" className="transition-colors hover:text-emerald" activeProps={{ className: "text-foreground" }}>
            Projects
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={BUNDLE.href}
            download={BUNDLE.filename}
            title={`Download full project source (v${BUNDLE.version}, ${BUNDLE.sizeLabel})`}
            className="hidden items-center gap-2 rounded-full border border-emerald/40 px-3.5 py-1.5 font-mono text-[11px] uppercase text-emerald transition-all hover:bg-emerald/10 sm:inline-flex"
          >
            <span aria-hidden>⬇</span>
            <span>zip</span>
            <span className="text-muted-foreground">v{BUNDLE.version}</span>
          </a>
          <Link
            to="/curriculum"
            className="rounded-full bg-emerald px-5 py-2 text-sm font-bold text-background transition-all hover:brightness-110"
          >
            Start Learning
          </Link>
        </div>

      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs font-mono text-muted-foreground md:flex-row">
        <p>© 2026 KERNEL LEARNING. ALL SYSTEMS OPERATIONAL.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-emerald">Changelog</a>
          <a href="#" className="hover:text-emerald">Documentation</a>
          <a href="#" className="hover:text-emerald">Status</a>
        </div>
      </div>
    </footer>
  );
}
