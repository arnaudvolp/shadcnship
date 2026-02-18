// =============================================================================
// Team Management Types
// =============================================================================

export type TeamRole = "owner" | "admin" | "member" | "viewer";

export type InviteStatus = "pending" | "accepted" | "expired" | "declined";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: TeamRole;
  joinedAt: string;
  status?: "active" | "inactive";
}

export interface TeamInvite {
  id: string;
  email: string;
  role: TeamRole;
  status: InviteStatus;
  invitedBy: {
    id: string;
    name: string;
  };
  createdAt: string;
  expiresAt: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  members: TeamMember[];
  invites: TeamInvite[];
  maxMembers?: number;
}

export interface TeamManagementProps {
  team?: Team;
  currentUserId?: string;
  onInvite?: (email: string, role: TeamRole) => Promise<void>;
  onUpdateRole?: (memberId: string, role: TeamRole) => Promise<void>;
  onRemoveMember?: (memberId: string) => Promise<void>;
  onCancelInvite?: (inviteId: string) => Promise<void>;
  onResendInvite?: (inviteId: string) => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (email: string, role: TeamRole) => Promise<void>;
}

export interface MemberRowProps {
  member: TeamMember;
  currentUserId?: string;
  onUpdateRole?: (memberId: string, role: TeamRole) => void;
  onRemove?: (memberId: string) => void;
}
