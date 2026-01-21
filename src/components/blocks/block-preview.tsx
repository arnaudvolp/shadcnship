"use client";

import { useBlockContext } from "../../providers/block-provider";
import type { ScreenSize } from "@/types/blocks";

const screenWidths: Record<ScreenSize, string> = {
  mobile: "375px",
  tablet: "768px",
  desktop: "100%",
};

export function BlockPreview() {
  const { block, screenSize, iframeRef, previewBasePath } = useBlockContext();

  return (
    <div className="relative w-full overflow-hidden border-t bg-accent">
      <div
        className="mx-auto transition-all duration-300 w-full shadow-sm h-[700px] overflow-auto"
        style={{ width: screenWidths[screenSize] }}
      >
        <iframe
          ref={iframeRef}
          src={`${previewBasePath}/${block.name}/preview`}
          height="100%" width="100%"

          title={`Preview of ${block.title}`}
        />
      </div>
    </div>
  );
}
