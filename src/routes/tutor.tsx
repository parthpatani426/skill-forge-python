import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/tutor")({
  head: () => ({
    meta: [
      { title: "AI Tutor — Kernel" },
      { name: "description", content: "Ask the Kernel AI Tutor anything about Python: keywords, syntax, libraries, OOP, async, patterns, algorithms, and debugging." },
    ],
  }),
  component: TutorPage,
});

const SUGGESTIONS = [
  "Explain Python decorators with an example",
  "What is the difference between list, tuple, and set?",
  "Show me how async/await works in Python",
  "Explain the yield keyword and generators",
  "How do I read a CSV file with pandas?",
  "Write a program to print a diamond pattern",
];

function TutorPage() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error, stop } = useChat({ transport });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = async () => {
    const text = input.trim();
    if (!text || isBusy) return;
    setInput("");
    await sendMessage({ text });
    inputRef.current?.focus();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8 lg:px-8">
        <header className="mb-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-emerald font-bold text-background">AI</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Kernel AI Tutor</h1>
              <p className="text-sm text-muted-foreground">
                Clarify any doubt — keywords, syntax, libraries, patterns, algorithms, debugging.
              </p>
            </div>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto rounded-xl border border-hairline bg-card/40 p-4 sm:p-6"
          style={{ minHeight: "50vh", maxHeight: "65vh" }}
        >
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 py-12 text-center">
              <div>
                <h2 className="text-lg font-semibold">Ask me anything about Python</h2>
                <p className="mt-1 text-sm text-muted-foreground">Try one of these to get started:</p>
              </div>
              <div className="grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setInput("");
                      void sendMessage({ text: s });
                    }}
                    disabled={isBusy}
                    className="rounded-lg border border-hairline bg-background/60 px-3 py-2 text-left text-sm text-muted-foreground transition hover:border-emerald hover:text-foreground disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} parts={m.parts} />
              ))}
              {status === "submitted" && (
                <div className="text-sm text-muted-foreground">Thinking…</div>
              )}
              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {error.message || "Something went wrong. Please try again."}
                </div>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="mt-4 flex items-end gap-2 rounded-xl border border-hairline bg-card/60 p-3"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void submit();
              }
            }}
            rows={2}
            placeholder="Ask about a keyword, library, error, algorithm…"
            className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          {isBusy ? (
            <button
              type="button"
              onClick={() => stop()}
              className="rounded-lg border border-hairline px-4 py-2 text-sm font-medium hover:bg-background"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-lg bg-emerald px-4 py-2 text-sm font-bold text-background transition hover:brightness-110 disabled:opacity-50"
            >
              Send
            </button>
          )}
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}

type Part = { type: string; text?: string };

function MessageBubble({ role, parts }: { role: string; parts: readonly Part[] }) {
  const text = parts.map((p) => (p.type === "text" ? p.text ?? "" : "")).join("");
  const isUser = role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-sm bg-emerald px-4 py-2.5 text-sm text-background"
            : "max-w-[95%] text-sm text-foreground"
        }
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-background prose-pre:border prose-pre:border-hairline prose-code:text-emerald">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
