// =============================================================================
// File Upload Types
// =============================================================================

export type FileStatus = "idle" | "uploading" | "success" | "error";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: FileStatus;
  error?: string;
  url?: string;
  preview?: string;
}

export interface FileUploadConfig {
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  multiple?: boolean;
}

export interface FileUploadProps {
  config?: FileUploadConfig;
  files?: UploadedFile[];
  onFilesChange?: (files: UploadedFile[]) => void;
  onUpload?: (file: File) => Promise<{ url: string }>;
  onRemove?: (fileId: string) => void;
  disabled?: boolean;
  className?: string;
}

export interface DropzoneProps {
  onDrop: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FilePreviewProps {
  file: UploadedFile;
  onRemove: (id: string) => void;
  className?: string;
}
