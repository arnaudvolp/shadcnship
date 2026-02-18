"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dropzone, FileList } from "./components";
import { Trash2 } from "lucide-react";
import type { UploadedFile, FileUploadProps, FileUploadConfig } from "./types/file-upload";

// =============================================================================
// Default Configuration
// =============================================================================

const defaultConfig: FileUploadConfig = {
  maxFiles: 10,
  maxSize: 10 * 1024 * 1024, // 10MB
  acceptedTypes: ["image/*", "application/pdf", ".doc", ".docx", ".xls", ".xlsx"],
  multiple: true,
};

// =============================================================================
// Demo Upload Function
// =============================================================================

const demoUpload = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<{ url: string }> => {
  // Simulate upload progress
  for (let i = 0; i <= 100; i += 10) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    onProgress(i);
  }
  return { url: URL.createObjectURL(file) };
};

// =============================================================================
// Helper Functions
// =============================================================================

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function parseAcceptedTypes(types?: string[]): Record<string, string[]> | undefined {
  if (!types) return undefined;

  const accept: Record<string, string[]> = {};
  types.forEach((type) => {
    if (type.startsWith(".")) {
      // File extension
      const mimeType = getMimeType(type);
      if (mimeType) {
        accept[mimeType] = accept[mimeType] || [];
        accept[mimeType].push(type);
      }
    } else {
      // MIME type
      accept[type] = [];
    }
  });
  return accept;
}

function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".csv": "text/csv",
  };
  return mimeTypes[extension] || "application/octet-stream";
}

// =============================================================================
// Main Component
// =============================================================================

export default function FileUpload01({
  config = defaultConfig,
  files: controlledFiles,
  onFilesChange,
  onUpload,
  onRemove,
  disabled = false,
  className,
}: FileUploadProps) {
  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>([]);

  // Use controlled or internal state
  const files = controlledFiles ?? internalFiles;
  const setFiles = useCallback(
    (updater: UploadedFile[] | ((prev: UploadedFile[]) => UploadedFile[])) => {
      const newFiles = typeof updater === "function" ? updater(files) : updater;
      if (onFilesChange) {
        onFilesChange(newFiles);
      } else {
        setInternalFiles(newFiles);
      }
    },
    [files, onFilesChange]
  );

  const mergedConfig = { ...defaultConfig, ...config };
  const accept = parseAcceptedTypes(mergedConfig.acceptedTypes);

  const handleDrop = useCallback(
    async (droppedFiles: File[]) => {
      // Check max files limit
      const remainingSlots = (mergedConfig.maxFiles || 10) - files.length;
      const filesToAdd = droppedFiles.slice(0, remainingSlots);

      // Create file entries
      const newFiles: UploadedFile[] = filesToAdd.map((file) => ({
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "idle" as const,
      }));

      // Add to state
      setFiles((prev) => [...prev, ...newFiles]);

      // Upload each file
      for (const uploadFile of newFiles) {
        try {
          // Set uploading status
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id ? { ...f, status: "uploading" as const } : f
            )
          );

          // Upload with progress
          const uploadFn = onUpload || ((file: File) => demoUpload(file, (progress) => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadFile.id ? { ...f, progress } : f
              )
            );
          }));

          const result = await uploadFn(uploadFile.file);

          // Set success status
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, status: "success" as const, progress: 100, url: result.url }
                : f
            )
          );
        } catch (error) {
          // Set error status
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? {
                    ...f,
                    status: "error" as const,
                    error: error instanceof Error ? error.message : "Upload failed",
                  }
                : f
            )
          );
        }
      }
    },
    [files.length, mergedConfig.maxFiles, setFiles, onUpload]
  );

  const handleRemove = useCallback(
    (fileId: string) => {
      if (onRemove) {
        onRemove(fileId);
      }
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    },
    [setFiles, onRemove]
  );

  const handleClearAll = useCallback(() => {
    setFiles([]);
  }, [setFiles]);

  const uploadingCount = files.filter((f) => f.status === "uploading").length;
  const successCount = files.filter((f) => f.status === "success").length;
  const errorCount = files.filter((f) => f.status === "error").length;

  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Drag and drop files or click to browse
            </CardDescription>
          </div>
          {files.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-muted-foreground"
            >
              <Trash2 className="size-4 mr-2" />
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dropzone */}
        <Dropzone
          onDrop={handleDrop}
          accept={accept}
          maxSize={mergedConfig.maxSize}
          maxFiles={mergedConfig.maxFiles}
          multiple={mergedConfig.multiple}
          disabled={disabled || files.length >= (mergedConfig.maxFiles || 10)}
        />

        {/* File List */}
        <FileList files={files} onRemove={handleRemove} />

        {/* Status Summary */}
        {files.length > 0 && (
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>
              {files.length} file{files.length !== 1 ? "s" : ""} selected
              {mergedConfig.maxFiles && ` (max ${mergedConfig.maxFiles})`}
            </span>
            <div className="flex items-center gap-3">
              {uploadingCount > 0 && (
                <span className="text-primary">Uploading: {uploadingCount}</span>
              )}
              {successCount > 0 && (
                <span className="text-green-500">Completed: {successCount}</span>
              )}
              {errorCount > 0 && (
                <span className="text-destructive">Failed: {errorCount}</span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// =============================================================================
// Named Exports
// =============================================================================

export { FileUpload01 };

// Re-export types
export type {
  UploadedFile,
  FileUploadConfig,
  FileUploadProps,
  FileStatus,
} from "./types/file-upload";
