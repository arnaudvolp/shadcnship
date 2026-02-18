"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Phone,
  Video,
  MoreVertical,
  Search,
  Bell,
  BellOff,
  Pin,
  Trash2,
  Users,
} from "lucide-react";
import type { ChatConversation, ChatUser } from "../types/chat";

interface ConversationHeaderProps {
  conversation: ChatConversation;
  currentUser?: ChatUser;
  className?: string;
}

export function ConversationHeader({
  conversation,
  currentUser,
  className,
}: ConversationHeaderProps) {
  const isGroup = conversation.type === "group";
  const otherParticipant = conversation.participants.find(
    (p) => p.id !== currentUser?.id
  );

  const displayName = isGroup
    ? conversation.name
    : otherParticipant?.name || "Unknown";
  const displayAvatar = isGroup
    ? conversation.avatar
    : otherParticipant?.avatar;
  const status = !isGroup ? otherParticipant?.status : undefined;

  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    busy: "bg-red-500",
    offline: "bg-gray-400",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b bg-background",
        className
      )}
    >
      {/* Left: Avatar and info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="size-10">
            <AvatarImage src={displayAvatar} />
            <AvatarFallback>
              {isGroup ? (
                <Users className="size-5" />
              ) : (
                displayName?.slice(0, 2).toUpperCase()
              )}
            </AvatarFallback>
          </Avatar>
          {status && (
            <span
              className={cn(
                "absolute bottom-0 right-0 size-3 rounded-full border-2 border-background",
                statusColors[status]
              )}
            />
          )}
        </div>
        <div>
          <h3 className="font-medium">{displayName}</h3>
          <p className="text-xs text-muted-foreground">
            {isGroup
              ? `${conversation.participants.length} members`
              : status === "online"
                ? "Online"
                : status === "away"
                  ? "Away"
                  : status === "busy"
                    ? "Busy"
                    : otherParticipant?.lastSeen
                      ? `Last seen ${otherParticipant.lastSeen}`
                      : "Offline"}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Phone className="size-5" />
          <span className="sr-only">Voice call</span>
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Video className="size-5" />
          <span className="sr-only">Video call</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="size-5" />
          <span className="sr-only">Search</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="size-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              {conversation.isMuted ? (
                <>
                  <Bell className="size-4 mr-2" />
                  Unmute
                </>
              ) : (
                <>
                  <BellOff className="size-4 mr-2" />
                  Mute
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pin className="size-4 mr-2" />
              {conversation.isPinned ? "Unpin" : "Pin"} conversation
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="size-4 mr-2" />
              Delete conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
