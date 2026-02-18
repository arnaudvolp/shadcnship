"use client";

import { cn } from "@/lib/utils";
import { MemberRow } from "./member-row";
import type { TeamMember, TeamRole } from "../types/team";

interface MemberListProps {
  members: TeamMember[];
  currentUserId?: string;
  canManage?: boolean;
  onUpdateRole?: (memberId: string, role: TeamRole) => void;
  onRemove?: (memberId: string) => void;
  className?: string;
}

export function MemberList({
  members,
  currentUserId,
  canManage,
  onUpdateRole,
  onRemove,
  className,
}: MemberListProps) {
  // Sort members: owners first, then admins, then by name
  const sortedMembers = [...members].sort((a, b) => {
    const roleOrder: Record<TeamRole, number> = {
      owner: 0,
      admin: 1,
      member: 2,
      viewer: 3,
    };
    const roleDiff = roleOrder[a.role] - roleOrder[b.role];
    if (roleDiff !== 0) return roleDiff;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className={cn("divide-y", className)}>
      {sortedMembers.map((member) => (
        <MemberRow
          key={member.id}
          member={member}
          currentUserId={currentUserId}
          canManage={canManage}
          onUpdateRole={onUpdateRole}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
