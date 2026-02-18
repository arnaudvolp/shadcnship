"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paperclip, ArrowUp, X, FileIcon, Globe, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSend: (content: string, attachments?: File[]) => void;
  onTyping?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  onTyping,
  disabled,
  placeholder = "Message Assistant...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<Map<number, string>>(new Map());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleSend = useCallback(() => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage && attachments.length === 0) return;

    onSend(trimmedMessage, attachments.length > 0 ? attachments : undefined);
    setMessage("");
    setAttachments([]);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Focus back on textarea
    textareaRef.current?.focus();
  }, [message, attachments, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    onTyping?.();

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
    e.target.value = ""; // Reset input
  };

  const removeAttachment = (index: number) => {
    // Revoke the blob URL to prevent memory leak
    const urlToRevoke = previewUrls.get(index);
    if (urlToRevoke) {
      URL.revokeObjectURL(urlToRevoke);
      setPreviewUrls((prev) => {
        const next = new Map(prev);
        next.delete(index);
        return next;
      });
    }
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const getFilePreview = (file: File, index: number) => {
    if (file.type.startsWith("image/")) {
      // Check if we already have a URL for this index
      if (previewUrls.has(index)) {
        return previewUrls.get(index);
      }
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => new Map(prev).set(index, url));
      return url;
    }
    return null;
  };

  const hasContent = message.trim() || attachments.length > 0;

  return (
    <div className="p-4">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {attachments.map((file, index) => {
            const imagePreview = getFilePreview(file, index);
            return (
              <div
                key={index}
                className="relative group rounded-lg border bg-muted overflow-hidden"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={file.name}
                    className="size-16 object-cover"
                  />
                ) : (
                  <div className="size-16 flex flex-col items-center justify-center p-2">
                    <FileIcon className="size-6 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground truncate max-w-full">
                      {file.name.split(".").pop()?.toUpperCase()}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeAttachment(index)}
                  className="absolute -top-1 -right-1 size-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="size-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main input container - ChatGPT style */}
      <div className="relative rounded-2xl border bg-muted/50 shadow-sm">
        {/* Textarea */}
        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent px-4 py-3.5 pr-24 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70"
          rows={1}
        />

        {/* Bottom action bar */}
        <TooltipProvider>
          <div className="flex items-center justify-between px-3 pb-3">
            {/* Left actions */}
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled}
                    aria-label="Attach file"
                  >
                    <Paperclip className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach file</TooltipContent>
              </Tooltip>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                aria-label="Upload files"
              />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg"
                    disabled={disabled}
                    aria-label="Search the web"
                  >
                    <Globe className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search the web</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg"
                    disabled={disabled}
                    aria-label="Use tools"
                  >
                    <Sparkles className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Use tools</TooltipContent>
              </Tooltip>
            </div>

            {/* Send button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className={cn(
                    "size-8 rounded-lg transition-all",
                    hasContent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground cursor-not-allowed"
                  )}
                  onClick={handleSend}
                  disabled={disabled || !hasContent}
                  aria-label="Send message"
                >
                  <ArrowUp className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Disclaimer text */}
      <p className="text-[11px] text-muted-foreground text-center mt-2">
        Assistant can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}
