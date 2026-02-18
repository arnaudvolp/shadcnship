"use client";

import { cn } from "@/lib/utils";
import { FilePreview } from "./file-preview";
import type { UploadedFile } from "../types/file-upload";

interface FileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  className?: string;
}

export function FileList({ files, onRemove, className }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {files.map((file) => (
        <FilePreview key={file.id} file={file} onRemove={onRemove} />
      ))}
    </div>
  );
}
