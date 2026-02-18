"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Monitor, Smartphone, Laptop, LogOut, Shield } from "lucide-react";
import type { SecuritySettings as SecuritySettingsType, Session } from "../types/settings";

interface SecuritySettingsProps {
  security: SecuritySettingsType;
  onUpdatePassword?: (currentPassword: string, newPassword: string) => Promise<void>;
  onToggle2FA?: (enabled: boolean) => Promise<void>;
  onRevokeSession?: (sessionId: string) => Promise<void>;
  className?: string;
}

const deviceIcons: Record<string, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  laptop: Laptop,
};

function SessionItem({
  session,
  onRevoke,
}: {
  session: Session;
  onRevoke?: (id: string) => void;
}) {
  const Icon = deviceIcons[session.device.toLowerCase()] || Monitor;

  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
          <Icon className="size-5 text-muted-foreground" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{session.browser}</p>
            {session.current && (
              <Badge variant="secondary" className="text-xs">
                Current
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{session.location}</p>
          <p className="text-xs text-muted-foreground">
            Last active: {formatLastActive(session.lastActive)}
          </p>
        </div>
      </div>
      {!session.current && onRevoke && (
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={() => onRevoke(session.id)}
        >
          <LogOut className="size-4" />
        </Button>
      )}
    </div>
  );
}

function formatLastActive(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function SecuritySettings({
  security,
  onUpdatePassword,
  onToggle2FA,
  onRevokeSession,
  className,
}: SecuritySettingsProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [is2FALoading, setIs2FALoading] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdatePassword || newPassword !== confirmPassword) return;

    setIsLoading(true);
    try {
      await onUpdatePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FAToggle = async (enabled: boolean) => {
    if (!onToggle2FA) return;

    setIs2FALoading(true);
    try {
      await onToggle2FA(enabled);
    } finally {
      setIs2FALoading(false);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading || !currentPassword || !newPassword || newPassword !== confirmPassword}>
                {isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
                Update password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="size-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Authenticator App</p>
                <p className="text-xs text-muted-foreground">
                  {security.twoFactorEnabled
                    ? "Two-factor authentication is enabled"
                    : "Protect your account with 2FA"}
                </p>
              </div>
            </div>
            <Switch
              checked={security.twoFactorEnabled}
              onCheckedChange={handle2FAToggle}
              disabled={is2FALoading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage and monitor your active login sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {security.sessions.map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                onRevoke={onRevokeSession}
              />
            ))}
          </div>
          {security.sessions.length > 1 && onRevokeSession && (
            <>
              <Separator className="my-4" />
              <Button variant="outline" className="text-destructive hover:text-destructive">
                Sign out of all other sessions
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
