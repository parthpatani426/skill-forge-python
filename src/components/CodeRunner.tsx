import { useEffect, useRef, useState } from "react";

// Pyodide is loaded from CDN on first run to keep initial bundle small.
const PYODIDE_VERSION = "0.26.4";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`;

type PyodideInterface = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
  setStdin: (opts: { stdin: () => string | null }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (opts?: { indexURL?: string }) => Promise<PyodideInterface>;
    __pyodidePromise?: Promise<PyodideInterface>;
  }
}

function loadScriptOnce(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[data-pyodide]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.pyodide = "1";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Pyodide"));
    document.head.appendChild(s);
  });
}

async function getPyodide(onStatus?: (s: string) => void) {
  if (window.__pyodidePromise) return window.__pyodidePromise;
  window.__pyodidePromise = (async () => {
    onStatus?.("Downloading Python runtime (~10MB, one-time)…");
    await loadScriptOnce(PYODIDE_URL);
    onStatus?.("Initialising interpreter…");
    const py = await window.loadPyodide!({
      indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
    });
    return py;
  })();
  return window.__pyodidePromise;
}

export function CodeRunner({
  code,
  needsInput = false,
}: {
  code: string;
  needsInput?: boolean;
}) {
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "done" | "error">("idle");
  const [stdin, setStdin] = useState("");
  const [open, setOpen] = useState(false);
  const pyRef = useRef<PyodideInterface | null>(null);

  // Heuristic — show stdin box if code uses input()
  const autoNeedsInput = needsInput || /\binput\s*\(/.test(code);

  async function run() {
    setOutput("");
    setStatus("loading");
    try {
      if (!pyRef.current) {
        pyRef.current = await getPyodide((s) => setOutput(s));
      }
      const py = pyRef.current;
      let buf = "";
      py.setStdout({ batched: (s) => { buf += s; setOutput(buf); } });
      py.setStderr({ batched: (s) => { buf += s; setOutput(buf); } });
      if (autoNeedsInput) {
        const lines = stdin.split("\n");
        let i = 0;
        py.setStdin({ stdin: () => (i < lines.length ? lines[i++] : null) });
      }
      setStatus("running");
      setOutput("");
      buf = "";
      await py.runPythonAsync(code);
      setStatus("done");
    } catch (e) {
      setOutput((prev) => prev + "\n" + String(e));
      setStatus("error");
    }
  }

  useEffect(() => () => { /* nothing; pyodide is shared */ }, []);

  return (
    <div className="mt-3 rounded-lg border border-border bg-background/40">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setOpen(true); run(); }}
            disabled={status === "loading" || status === "running"}
            className="rounded-md bg-emerald px-3 py-1 text-xs font-bold text-background transition-all hover:brightness-110 disabled:opacity-50"
          >
            {status === "loading" ? "Loading…" : status === "running" ? "Running…" : "▶ Run"}
          </button>
          {open && (
            <button
              onClick={() => { setOpen(false); setOutput(""); setStatus("idle"); }}
              className="font-mono text-[10px] uppercase text-muted-foreground hover:text-emerald"
            >
              hide
            </button>
          )}
        </div>
        <span className="font-mono text-[10px] uppercase text-muted-foreground">
          {status === "error" ? "ERROR" : status === "done" ? "OK" : "PYTHON 3.12 · BROWSER"}
        </span>
      </div>
      {open && (
        <div className="space-y-2 p-3">
          {autoNeedsInput && (
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase text-muted-foreground">
                stdin (one value per line)
              </label>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                rows={3}
                placeholder="Type input here, one line per input() call"
                className="w-full rounded border border-border bg-background px-2 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-emerald focus:outline-none"
              />
              <button
                onClick={run}
                disabled={status === "loading" || status === "running"}
                className="mt-1 font-mono text-[10px] uppercase text-emerald hover:underline disabled:opacity-50"
              >
                ▶ re-run with new input
              </button>
            </div>
          )}
          <div>
            <div className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">output</div>
            <pre className={`max-h-72 overflow-auto whitespace-pre-wrap rounded bg-background p-3 font-mono text-xs ${status === "error" ? "text-red-400" : "text-foreground/90"}`}>
              {output || (status === "loading" ? "Loading…" : status === "running" ? "Running…" : "(no output yet)")}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
