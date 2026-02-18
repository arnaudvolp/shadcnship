"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  X,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import type { UploadedFile } from "../types/file-upload";

interface FilePreviewProps {
  file: UploadedFile;
  onRemove: (id: string) => void;
  className?: string;
}

const fileIcons: Record<string, typeof File> = {
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
  pdf: FileText,
  document: FileText,
  spreadsheet: FileSpreadsheet,
  archive: FileArchive,
  default: File,
};

function getFileIcon(type: string): typeof File {
  if (type.startsWith("image/")) return fileIcons.image;
  if (type.startsWith("video/")) return fileIcons.video;
  if (type.startsWith("audio/")) return fileIcons.audio;
  if (type === "application/pdf") return fileIcons.pdf;
  if (type.includes("document") || type.includes("word")) return fileIcons.document;
  if (type.includes("sheet") || type.includes("excel")) return fileIcons.spreadsheet;
  if (type.includes("zip") || type.includes("archive") || type.includes("compressed")) return fileIcons.archive;
  return fileIcons.default;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function FilePreview({ file, onRemove, className }: FilePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const Icon = getFileIcon(file.type);
  const isImage = file.type.startsWith("image/");

  useEffect(() => {
    if (isImage && file.file) {
      const url = URL.createObjectURL(file.file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file.file, isImage]);

  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 rounded-lg border p-3 transition-colors",
        file.status === "error" && "border-destructive/50 bg-destructive/5",
        file.status === "success" && "border-green-500/50 bg-green-500/5",
        className
      )}
    >
      {/* Preview/Icon */}
      <div className="relative size-12 shrink-0 rounded-md bg-muted overflow-hidden flex items-center justify-center">
        {isImage && preview ? (
          <img
            src={preview}
            alt={file.name}
            className="size-full object-cover"
          />
        ) : (
          <Icon className="size-6 text-muted-foreground" />
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{file.name}</p>
          {file.status === "success" && (
            <CheckCircle className="size-4 text-green-500 shrink-0" />
          )}
          {file.status === "error" && (
            <AlertCircle className="size-4 text-destructive shrink-0" />
          )}
          {file.status === "uploading" && (
            <Loader2 className="size-4 text-primary shrink-0 animate-spin" />
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          {formatBytes(file.size)}
          {file.error && (
            <span className="text-destructive ml-2">• {file.error}</span>
          )}
        </p>

        {file.status === "uploading" && (
          <Progress value={file.progress} className="h-1" />
        )}
      </div>

      {/* Remove Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        onClick={() => onRemove(file.id)}
      >
        <X className="size-4" />
        <span className="sr-only">Remove file</span>
      </Button>
    </div>
  );
}
