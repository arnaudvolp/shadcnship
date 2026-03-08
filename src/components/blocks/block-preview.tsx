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
        className="mx-auto h-[750px] w-full overflow-auto shadow-sm transition-all duration-300"
        style={{ width: screenWidths[screenSize] }}
      >
        <iframe
          ref={iframeRef}
          src={`${previewBasePath}/${block.name}/preview`}
          height="100%"
          width="100%"
          title={`Preview of ${block.title}`}
        />
      </div>
    </div>
  );
}
