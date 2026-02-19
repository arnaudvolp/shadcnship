"use client";

import { useEffect, useMemo } from "react";
import { BlockCode } from "./block-code";
import { BlockCodeSidebar } from "./block-code-sidebar";
import { useBlockContext } from "@/providers/block-provider";

export function BlockCodeExplorer() {
  const { block, filesCode, activeFilePath, setActiveFilePath, selectedStack, availableStacks } = useBlockContext();
  const allFiles = block.files || [];

  // Filter files based on selected stack
  const files = useMemo(() => {
    // If no stacks are available, show all files
    if (availableStacks.length === 0) {
      return allFiles;
    }

    return allFiles.filter((file) => {
      // Check if this file is in a stack-specific folder
      const isStackFile = availableStacks.some((stack) =>
        file.path.includes(`/${stack}/`)
      );

      if (!isStackFile) {
        // Always show non-stack files (base component files)
        return true;
      }

      // For stack-specific files, only show the ones matching the selected stack
      if (selectedStack) {
        return file.path.includes(`/${selectedStack}/`);
      }

      // If no stack selected, hide all stack files
      return false;
    });
  }, [allFiles, selectedStack, availableStacks]);

  // Reset active file if it's no longer in the filtered list
  useEffect(() => {
    const isActiveFileVisible = files.some((file) => file.path === activeFilePath);
    if (!isActiveFileVisible && files.length > 0) {
      setActiveFilePath(files[0].path);
    }
  }, [files, activeFilePath, setActiveFilePath]);

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
        availableStacks={availableStacks}
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
