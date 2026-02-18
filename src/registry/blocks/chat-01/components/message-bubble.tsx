"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, CheckCheck, Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { ChatMessage } from "../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
}

export function MessageBubble({
  message,
  isOwn,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group py-6 px-4 md:px-6",
        isOwn ? "bg-transparent" : "bg-muted/40"
      )}
    >
      <div className="max-w-3xl mx-auto flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          {isOwn ? (
            <Avatar className="size-8 border">
              <AvatarImage src={message.sender.avatar} />
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {message.sender.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="size-8 border bg-background">
              <AvatarImage src={message.sender.avatar} />
              <AvatarFallback className="text-xs">
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2 overflow-hidden">
          {/* Sender name */}
          <p className="text-sm font-semibold">
            {isOwn ? "You" : message.sender.name}
          </p>

          {/* Message content */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </p>
          </div>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="rounded-xl overflow-hidden border"
                >
                  {attachment.type === "image" ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-w-xs max-h-64 object-cover"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted">
                      <span className="text-sm">{attachment.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Actions - only for assistant messages */}
          {!isOwn && (
            <div className="flex items-center gap-1 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy message"}
              >
                {copied ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="size-8" aria-label="Like">
                <ThumbsUp className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8" aria-label="Dislike">
                <ThumbsDown className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8" aria-label="Regenerate">
                <RotateCcw className="size-4" />
              </Button>
            </div>
          )}

          {/* Status for own messages */}
          {isOwn && message.status && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {message.status === "read" ? (
                <CheckCheck className="size-3.5 text-blue-500" />
              ) : message.status === "delivered" ? (
                <CheckCheck className="size-3.5" />
              ) : (
                <Check className="size-3.5" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
