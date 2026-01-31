"use client";

import { useMemo } from "react";
import { File, Folder, ChevronRight } from "lucide-react";
import { pathToTree, type TreeNode, type NodeItem } from "to-path-tree";
import { cn } from "@/lib/utils";
import type { RegistryFile, Stack } from "@/types/blocks";

interface BlockCodeSidebarProps {
  files: RegistryFile[];
  activeFile: string;
  onFileSelect: (path: string) => void;
  availableStacks?: Stack[];
}

// Maps display paths to actual file paths
type PathMap = Map<string, string>;

function FileItem({
  item,
  activeFile,
  onFileSelect,
  pathMap,
  depth = 0,
}: {
  item: NodeItem<unknown>;
  activeFile: string;
  onFileSelect: (path: string) => void;
  pathMap: PathMap;
  depth?: number;
}) {
  // item.path starts with "/" so we remove it to match our pathMap keys
  const displayPath = item.path.startsWith("/")
    ? item.path.slice(1)
    : item.path;
  const actualPath = pathMap.get(displayPath) || item.path;
  const isActive = actualPath === activeFile;

  return (
    <button
      onClick={() => onFileSelect(actualPath)}
      className={cn(
        "flex w-full items-center gap-1.5 px-2 py-1.5 text-sm transition-colors hover:bg-accent/50",
        isActive && "bg-accent text-accent-foreground",
      )}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      <File className="size-3.5 shrink-0" />
      <span className="truncate">{item.file}</span>
    </button>
  );
}

function DirectoryNode({
  node,
  activeFile,
  onFileSelect,
  pathMap,
  depth = 0,
}: {
  node: TreeNode<unknown>;
  activeFile: string;
  onFileSelect: (path: string) => void;
  pathMap: PathMap;
  depth?: number;
}) {
  const subDirs = node.subDirectory ? Object.values(node.subDirectory) : [];

  return (
    <div>
      {/* Show folder name if not root */}
      {node.name !== "root" && (
        <div
          className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-muted-foreground"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <ChevronRight className="size-3.5 shrink-0" />
          <Folder className="size-3.5 shrink-0" />
          <span>{node.name}</span>
        </div>
      )}

      {/* Render files in this directory */}
      {node.items.map((item) => (
        <FileItem
          key={item.path}
          item={item}
          activeFile={activeFile}
          onFileSelect={onFileSelect}
          pathMap={pathMap}
          depth={node.name === "root" ? depth : depth + 1}
        />
      ))}

      {/* Render subdirectories */}
      {subDirs.map((subDir) => (
        <DirectoryNode
          key={subDir.path}
          node={subDir}
          activeFile={activeFile}
          onFileSelect={onFileSelect}
          pathMap={pathMap}
          depth={node.name === "root" ? depth : depth + 1}
        />
      ))}
    </div>
  );
}

export function BlockCodeSidebar({
  files,
  activeFile,
  onFileSelect,
  availableStacks = [],
}: BlockCodeSidebarProps) {
  // Build tree from display paths (targets or filenames)
  // For stack-specific files, flatten the path by removing the stack folder
  const { tree, pathMap } = useMemo(() => {
    const getDisplayPath = (f: RegistryFile): string => {
      const basePath = f.target || f.path.split("/").pop() || "";

      // If there are available stacks, flatten stack-specific paths
      if (availableStacks.length > 0) {
        for (const stack of availableStacks) {
          // Match patterns like "components/waitlist-01/supabase/file.ts"
          const stackFolderPattern = new RegExp(`/${stack}/`);
          if (stackFolderPattern.test(basePath)) {
            // Remove the stack folder from the path
            return basePath.replace(stackFolderPattern, "/");
          }
        }
      }

      return basePath;
    };

    const displayPaths = files.map(getDisplayPath);
    const tree = pathToTree(displayPaths);

    // Create map from display path to actual file path
    const pathMap: PathMap = new Map();
    files.forEach((f) => {
      const displayPath = getDisplayPath(f);
      pathMap.set(displayPath, f.path);
    });

    return { tree, pathMap };
  }, [files, availableStacks]);

  return (
    <div className="w-48 shrink-0 border-r bg-accent/20">
      <div className="px-3 py-5 text-xs font-medium uppercase tracking-wider text-muted-foreground border-b">
        <span> Files </span>
      </div>
      <div className="py-1">
        <DirectoryNode
          node={tree}
          activeFile={activeFile}
          onFileSelect={onFileSelect}
          pathMap={pathMap}
        />
      </div>
    </div>
  );
}
