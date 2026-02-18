"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, FileUp } from "lucide-react";

interface DropzoneProps {
  onDrop: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Dropzone({
  onDrop,
  accept,
  maxSize,
  maxFiles,
  multiple = true,
  disabled = false,
  className,
}: DropzoneProps) {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize,
    maxFiles,
    multiple,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
        isDragActive && !isDragReject && "border-primary bg-primary/5",
        isDragReject && "border-destructive bg-destructive/5",
        !isDragActive && !isDragReject && "border-muted-foreground/25 hover:border-muted-foreground/50",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-2 text-center">
        <div
          className={cn(
            "rounded-full p-3 transition-colors",
            isDragActive && !isDragReject && "bg-primary/10",
            isDragReject && "bg-destructive/10",
            !isDragActive && "bg-muted"
          )}
        >
          {isDragActive ? (
            <FileUp className={cn("size-6", isDragReject ? "text-destructive" : "text-primary")} />
          ) : (
            <Upload className="size-6 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">
            {isDragActive
              ? isDragReject
                ? "File type not accepted"
                : "Drop files here"
              : "Drag & drop files here"}
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse
          </p>
        </div>

        {(maxSize || accept) && (
          <div className="text-xs text-muted-foreground mt-2">
            {accept && (
              <p>
                Accepted: {Object.values(accept).flat().join(", ")}
              </p>
            )}
            {maxSize && (
              <p>Max size: {formatBytes(maxSize)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
