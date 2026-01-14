"use client";

import { useBlockContext } from "./block-provider";

export function BlockPreview() {
  const { block, theme, iframeRef } = useBlockContext();

  return (
    <div className="relative w-full overflow-hidden rounded-lg border bg-background">
      <iframe
        ref={iframeRef}
        src={`/blocks/${block.name}/preview?theme=${theme}`}
        className="w-full border-0"
        style={{ height: "600px" }}
        title={`Preview of ${block.title}`}
      />
    </div>
  );
}
