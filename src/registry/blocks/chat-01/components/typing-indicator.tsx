"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ChatUser } from "../types/chat";

interface TypingIndicatorProps {
  users: ChatUser[];
  className?: string;
}

export function TypingIndicator({ users, className }: TypingIndicatorProps) {
  if (users.length === 0) return null;

  const displayText =
    users.length === 1
      ? `${users[0].name} is typing`
      : users.length === 2
        ? `${users[0].name} and ${users[1].name} are typing`
        : `${users[0].name} and ${users.length - 1} others are typing`;

  return (
    <div className={cn("flex items-center gap-2 px-4 py-2", className)}>
      <div className="flex -space-x-2">
        {users.slice(0, 3).map((user) => (
          <Avatar key={user.id} className="size-6 border-2 border-background">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-[10px]">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-muted-foreground">{displayText}</span>
        <div className="flex gap-0.5">
          <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
          <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
          <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
