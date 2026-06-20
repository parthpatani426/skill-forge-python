import { CodeBlock } from "./CodeBlock";
import { CodeRunner } from "./CodeRunner";

export function RunnableCode({
  code,
  filename,
  runnable = true,
}: {
  code: string;
  filename?: string;
  runnable?: boolean;
}) {
  return (
    <div>
      <CodeBlock code={code} filename={filename} />
      {runnable && <CodeRunner code={code} />}
    </div>
  );
}
