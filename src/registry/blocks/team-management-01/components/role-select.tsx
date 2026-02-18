"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, User, Eye } from "lucide-react";
import type { TeamRole } from "../types/team";

interface RoleSelectProps {
  value: TeamRole;
  onValueChange: (value: TeamRole) => void;
  disabled?: boolean;
  disabledRoles?: TeamRole[];
  className?: string;
}

const roleConfig: Record<TeamRole, { label: string; icon: typeof Crown; description: string }> = {
  owner: {
    label: "Owner",
    icon: Crown,
    description: "Full access, can delete team",
  },
  admin: {
    label: "Admin",
    icon: Shield,
    description: "Manage members and settings",
  },
  member: {
    label: "Member",
    icon: User,
    description: "Can create and edit",
  },
  viewer: {
    label: "Viewer",
    icon: Eye,
    description: "Read-only access",
  },
};

export function RoleSelect({
  value,
  onValueChange,
  disabled,
  disabledRoles = ["owner"],
  className,
}: RoleSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn("w-[130px]", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(roleConfig) as TeamRole[]).map((role) => {
          const config = roleConfig[role];
          const Icon = config.icon;
          const isDisabled = disabledRoles.includes(role);
          return (
            <SelectItem key={role} value={role} disabled={isDisabled}>
              <div className="flex items-center gap-2">
                <Icon className="size-4" />
                <span>{config.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export function RoleBadge({ role }: { role: TeamRole }) {
  const config = roleConfig[role];
  const Icon = config.icon;

  const variants: Record<TeamRole, "default" | "secondary" | "outline"> = {
    owner: "default",
    admin: "secondary",
    member: "outline",
    viewer: "outline",
  };

  return (
    <Badge variant={variants[role]} className="gap-1">
      <Icon className="size-3" />
      {config.label}
    </Badge>
  );
}

export { roleConfig };
