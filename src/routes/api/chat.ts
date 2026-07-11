import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are Kernel Tutor, an expert Python tutor embedded in the Kernel Learning platform.

Your job is to clarify ANY doubt a learner has about Python: syntax, keywords, libraries, OOP, async, data structures, algorithms, design patterns, patterns/games programs, debugging errors, and best practices.

Guidelines:
- Be clear, patient, and concise. Explain concepts step by step.
- Always include short, runnable Python code examples in fenced \`\`\`python blocks when useful.
- Show expected output when relevant.
- Use markdown: headings, bullet lists, and inline code.
- If the user asks about a specific keyword/library, explain what it does, syntax, and give a tiny example.
- If a question is ambiguous, ask a brief clarifying question.
- Prefer Python 3.11+ idioms.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-2.5-flash"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
