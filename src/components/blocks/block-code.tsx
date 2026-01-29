"use client";

import { useState, useMemo } from "react";
import { Check, Copy, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlockCodeProps {
  code: string;
  highlightedCode?: string;
  fileName?: string;
}

export function BlockCode({ code, highlightedCode, fileName }: BlockCodeProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split code into lines for line numbers
  const lines = useMemo(() => code.split("\n"), [code]);
  const lineCount = lines.length;

  // Generate line numbers
  const lineNumbers = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  }, [lineCount]);

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-accent/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileCode className="size-4" />
          <span>{fileName || "component.tsx"}</span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="size-8"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>

      {/* Code area with line numbers */}
      <div className="flex overflow-x-auto text-sm">
        {/* Line numbers gutter */}
        <div className="shrink-0 select-none border-r bg-accent/30 text-muted-foreground text-right py-4 px-4">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code content */}
        {highlightedCode ? (
          <div
            className="shiki-wrapper flex-1 min-w-0 [&>pre]:p-4 [&>pre]:bg-transparent! [&_.line]:leading-6"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <pre className="flex-1 min-w-0 p-4">
            <code>
              {lines.map((line, i) => (
                <div key={i} className="leading-6 ">
                  {line || " "}
                </div>
              ))}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}
