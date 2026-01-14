"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlockCodeProps {
  code: string;
}

export function BlockCode({ code }: BlockCodeProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-4 z-10"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>

      <pre className="overflow-x-auto rounded-lg border bg-muted p-4">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  );
}
