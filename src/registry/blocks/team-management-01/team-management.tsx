"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus, Users, Search } from "lucide-react";
import {
  MemberList,
  InviteList,
  InviteMemberDialog,
} from "./components";
import type {
  Team,
  TeamMember,
  TeamInvite,
  TeamRole,
  TeamManagementProps,
} from "./types/team";

// =============================================================================
// Demo Data
// =============================================================================

const demoTeam: Team = {
  id: "team_1",
  name: "Acme Inc",
  slug: "acme-inc",
  maxMembers: 10,
  members: [
    {
      id: "user_1",
      name: "John Doe",
      email: "john@acme.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      role: "owner",
      joinedAt: "2024-01-15T10:00:00Z",
      status: "active",
    },
    {
      id: "user_2",
      name: "Jane Smith",
      email: "jane@acme.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      role: "admin",
      joinedAt: "2024-02-20T14:30:00Z",
      status: "active",
    },
    {
      id: "user_3",
      name: "Bob Wilson",
      email: "bob@acme.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
      role: "member",
      joinedAt: "2024-03-10T09:15:00Z",
      status: "active",
    },
    {
      id: "user_4",
      name: "Alice Brown",
      email: "alice@acme.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
      role: "member",
      joinedAt: "2024-04-05T16:45:00Z",
      status: "active",
    },
    {
      id: "user_5",
      name: "Charlie Davis",
      email: "charlie@acme.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
      role: "viewer",
      joinedAt: "2024-05-12T11:20:00Z",
      status: "active",
    },
  ],
  invites: [
    {
      id: "invite_1",
      email: "newuser@example.com",
      role: "member",
      status: "pending",
      invitedBy: { id: "user_1", name: "John Doe" },
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "invite_2",
      email: "developer@company.com",
      role: "admin",
      status: "pending",
      invitedBy: { id: "user_1", name: "John Doe" },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

// =============================================================================
// Demo Actions (for preview mode)
// =============================================================================

async function demoInvite(
  setTeam: React.Dispatch<React.SetStateAction<Team>>,
  email: string,
  role: TeamRole
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newInvite: TeamInvite = {
    id: `invite_${Date.now()}`,
    email,
    role,
    status: "pending",
    invitedBy: { id: "user_1", name: "John Doe" },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  setTeam((prev) => ({
    ...prev,
    invites: [...prev.invites, newInvite],
  }));
}

async function demoUpdateRole(
  setTeam: React.Dispatch<React.SetStateAction<Team>>,
  memberId: string,
  role: TeamRole
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  setTeam((prev) => ({
    ...prev,
    members: prev.members.map((m) =>
      m.id === memberId ? { ...m, role } : m
    ),
  }));
}

async function demoRemoveMember(
  setTeam: React.Dispatch<React.SetStateAction<Team>>,
  memberId: string
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  setTeam((prev) => ({
    ...prev,
    members: prev.members.filter((m) => m.id !== memberId),
  }));
}

async function demoCancelInvite(
  setTeam: React.Dispatch<React.SetStateAction<Team>>,
  inviteId: string
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  setTeam((prev) => ({
    ...prev,
    invites: prev.invites.filter((i) => i.id !== inviteId),
  }));
}

async function demoResendInvite(
  setTeam: React.Dispatch<React.SetStateAction<Team>>,
  inviteId: string
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  setTeam((prev) => ({
    ...prev,
    invites: prev.invites.map((i) =>
      i.id === inviteId
        ? {
            ...i,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          }
        : i
    ),
  }));
}

// =============================================================================
// Team Management Component
// =============================================================================

export default function TeamManagement({
  team: externalTeam,
  currentUserId = "user_1",
  onInvite,
  onUpdateRole,
  onRemoveMember,
  onCancelInvite,
  onResendInvite,
  isLoading,
  className,
}: TeamManagementProps) {
  const [internalTeam, setInternalTeam] = useState<Team>(demoTeam);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Use external team if provided, otherwise use internal state
  const team = externalTeam ?? internalTeam;
  const setTeam = externalTeam ? () => {} : setInternalTeam;

  // Check if current user can manage team
  const currentMember = team.members.find((m) => m.id === currentUserId);
  const canManage =
    currentMember?.role === "owner" || currentMember?.role === "admin";

  // Filter members by search
  const filteredMembers = team.members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers with fallback to demo actions
  const handleInvite = async (email: string, role: TeamRole) => {
    if (onInvite) {
      await onInvite(email, role);
    } else {
      await demoInvite(setInternalTeam, email, role);
    }
  };

  const handleUpdateRole = (memberId: string, role: TeamRole) => {
    if (onUpdateRole) {
      onUpdateRole(memberId, role);
    } else {
      demoUpdateRole(setInternalTeam, memberId, role);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (onRemoveMember) {
      onRemoveMember(memberId);
    } else {
      demoRemoveMember(setInternalTeam, memberId);
    }
  };

  const handleCancelInvite = (inviteId: string) => {
    if (onCancelInvite) {
      onCancelInvite(inviteId);
    } else {
      demoCancelInvite(setInternalTeam, inviteId);
    }
  };

  const handleResendInvite = (inviteId: string) => {
    if (onResendInvite) {
      onResendInvite(inviteId);
    } else {
      demoResendInvite(setInternalTeam, inviteId);
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Users className="size-5" />
                Team Members
              </CardTitle>
              <CardDescription>
                {team.members.length} member{team.members.length !== 1 ? "s" : ""}
                {team.maxMembers && ` of ${team.maxMembers} maximum`}
              </CardDescription>
            </div>
            {canManage && (
              <Button onClick={() => setInviteDialogOpen(true)}>
                <UserPlus className="size-4 mr-2" />
                Invite Member
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Pending Invites */}
          {canManage && team.invites.length > 0 && (
            <InviteList
              invites={team.invites}
              onCancel={handleCancelInvite}
              onResend={handleResendInvite}
            />
          )}

          {/* Members List */}
          {filteredMembers.length > 0 ? (
            <MemberList
              members={filteredMembers}
              currentUserId={currentUserId}
              canManage={canManage}
              onUpdateRole={handleUpdateRole}
              onRemove={handleRemoveMember}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No members found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Dialog */}
      <InviteMemberDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        onInvite={handleInvite}
      />
    </div>
  );
}
