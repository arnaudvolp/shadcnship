"use client";

import { useBlockContext } from "../../providers/block-provider";
import type { ScreenSize } from "@/types/blocks";

const screenWidths: Record<ScreenSize, string> = {
  mobile: "375px",
  tablet: "768px",
  desktop: "100%",
};

export function BlockPreview() {
  const { block, theme, screenSize, iframeRef } = useBlockContext();

  return (
    <div className="relative w-full overflow-hidden rounded-lg border bg-muted/50">
      <div
        className="mx-auto bg-background transition-all duration-300"
        style={{ width: screenWidths[screenSize] }}
      >
        <iframe
          ref={iframeRef}
          src={`/blocks/${block.name}/preview?theme=${theme}`}
          className="w-full border-0"
          style={{ height: "600px" }}
          title={`Preview of ${block.title}`}
        />
      </div>
    </div>
  );
}
