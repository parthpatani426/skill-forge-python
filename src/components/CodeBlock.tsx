import { useMemo } from "react";

const KEYWORDS = new Set([
  "def", "class", "return", "if", "elif", "else", "for", "while", "in",
  "not", "and", "or", "is", "None", "True", "False", "import", "from",
  "as", "with", "try", "except", "finally", "raise", "yield", "lambda",
  "pass", "break", "continue", "async", "await", "self",
]);
const BUILTINS = new Set([
  "print", "len", "range", "int", "float", "str", "list", "dict", "set",
  "tuple", "bool", "type", "id", "input", "open", "enumerate", "zip",
  "map", "filter", "sorted", "sum", "min", "max", "abs", "round",
]);

function tokenize(line: string) {
  const tokens: { text: string; cls: string }[] = [];
  let i = 0;
  while (i < line.length) {
    const ch = line[i];
    if (ch === "#") {
      tokens.push({ text: line.slice(i), cls: "text-code-comment italic" });
      break;
    }
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) j++;
      tokens.push({ text: line.slice(i, j + 1), cls: "text-code-str" });
      i = j + 1;
      continue;
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++;
      const word = line.slice(i, j);
      let cls = "text-code-fg";
      if (KEYWORDS.has(word)) cls = "text-code-key font-medium";
      else if (BUILTINS.has(word)) cls = "text-code-fn";
      else if (line[j] === "(") cls = "text-code-fn";
      tokens.push({ text: word, cls });
      i = j;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), cls: "text-code-num" });
      i = j;
      continue;
    }
    tokens.push({ text: ch, cls: "text-code-fg/70" });
    i++;
  }
  return tokens;
}

export function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const lines = useMemo(() => code.split("\n"), [code]);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="size-3 rounded-full bg-surface-2" />
          <div className="size-3 rounded-full bg-surface-2" />
          <div className="size-3 rounded-full bg-surface-2" />
        </div>
        {filename && (
          <div className="ml-3 font-mono text-[10px] text-muted-foreground">{filename}</div>
        )}
      </div>
      <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="w-6 shrink-0 select-none text-right text-code-comment">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="whitespace-pre">
                {tokenize(line).map((t, i) => (
                  <span key={i} className={t.cls}>{t.text}</span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
