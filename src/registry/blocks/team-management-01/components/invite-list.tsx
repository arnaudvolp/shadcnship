"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RoleBadge } from "./role-select";
import { Mail, X, RefreshCw, Clock } from "lucide-react";
import type { TeamInvite } from "../types/team";
import { formatDistanceToNow } from "date-fns";

interface InviteListProps {
  invites: TeamInvite[];
  onCancel?: (inviteId: string) => void;
  onResend?: (inviteId: string) => void;
  className?: string;
}

export function InviteList({
  invites,
  onCancel,
  onResend,
  className,
}: InviteListProps) {
  const pendingInvites = invites.filter((i) => i.status === "pending");

  if (pendingInvites.length === 0) {
    return null;
  }

  const formatExpiry = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (date < new Date()) {
        return "Expired";
      }
      return `Expires ${formatDistanceToNow(date, { addSuffix: true })}`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Mail className="size-4" />
        Pending Invitations ({pendingInvites.length})
      </h4>
      <div className="divide-y rounded-lg border">
        {pendingInvites.map((invite) => (
          <div
            key={invite.id}
            className="flex items-center justify-between py-3 px-4"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                <Mail className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{invite.email}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {formatExpiry(invite.expiresAt)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <RoleBadge role={invite.role} />
              <div className="flex items-center gap-1">
                {onResend && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => onResend(invite.id)}
                  >
                    <RefreshCw className="size-4" />
                    <span className="sr-only">Resend invite</span>
                  </Button>
                )}
                {onCancel && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive hover:text-destructive"
                    onClick={() => onCancel(invite.id)}
                  >
                    <X className="size-4" />
                    <span className="sr-only">Cancel invite</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
