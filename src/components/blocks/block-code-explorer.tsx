"use client";

import { BlockCode } from "./block-code";
import { BlockCodeSidebar } from "./block-code-sidebar";
import { useBlockContext } from "@/providers/block-provider";

export function BlockCodeExplorer() {
  const { block, filesCode, activeFilePath, setActiveFilePath } = useBlockContext();
  const files = block.files || [];

  const activeFileData = filesCode[activeFilePath];

  // Show simple BlockCode if only one file
  if (files.length <= 1) {
    return (
      <div className="border-t">
        {activeFileData && (
          <BlockCode
            code={activeFileData.code}
            highlightedCode={activeFileData.highlightedCode}
            fileName={activeFileData.fileName}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex border-t">
      <BlockCodeSidebar
        files={files}
        activeFile={activeFilePath}
        onFileSelect={setActiveFilePath}
      />
      <div className="flex-1 min-w-0">
        {activeFileData && (
          <BlockCode
            key={activeFilePath}
            code={activeFileData.code}
            highlightedCode={activeFileData.highlightedCode}
            fileName={activeFileData.fileName}
          />
        )}
      </div>
    </div>
  );
}
