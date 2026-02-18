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
import { RoleSelect, RoleBadge } from "./role-select";
import { MoreHorizontal, UserMinus, LogOut } from "lucide-react";
import type { TeamMember, TeamRole } from "../types/team";
import { formatDistanceToNow } from "date-fns";

interface MemberRowProps {
  member: TeamMember;
  currentUserId?: string;
  canManage?: boolean;
  onUpdateRole?: (memberId: string, role: TeamRole) => void;
  onRemove?: (memberId: string) => void;
  className?: string;
}

export function MemberRow({
  member,
  currentUserId,
  canManage = false,
  onUpdateRole,
  onRemove,
  className,
}: MemberRowProps) {
  const isCurrentUser = member.id === currentUserId;
  const isOwner = member.role === "owner";

  const formatJoinDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src={member.avatar} />
          <AvatarFallback>
            {member.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              {member.name}
              {isCurrentUser && (
                <span className="text-muted-foreground ml-1">(you)</span>
              )}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">{member.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-xs text-muted-foreground hidden sm:block">
          Joined {formatJoinDate(member.joinedAt)}
        </p>

        {canManage && !isOwner ? (
          <RoleSelect
            value={member.role}
            onValueChange={(role) => onUpdateRole?.(member.id, role)}
            disabledRoles={["owner"]}
          />
        ) : (
          <RoleBadge role={member.role} />
        )}

        {(canManage || isCurrentUser) && !isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isCurrentUser ? (
                <DropdownMenuItem
                  onClick={() => onRemove?.(member.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="size-4 mr-2" />
                  Leave team
                </DropdownMenuItem>
              ) : (
                canManage && (
                  <DropdownMenuItem
                    onClick={() => onRemove?.(member.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <UserMinus className="size-4 mr-2" />
                    Remove member
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
