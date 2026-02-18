"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import type { NotificationPreferences } from "../types/settings";

interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onUpdate?: (data: Partial<NotificationPreferences>) => Promise<void>;
  className?: string;
}

interface SettingItemProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function SettingItem({ id, label, description, checked, onCheckedChange }: SettingItemProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex-1 space-y-0.5">
        <Label htmlFor={id} className="text-sm font-medium cursor-pointer">
          {label}
        </Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export function NotificationSettings({
  preferences,
  onUpdate,
  className,
}: NotificationSettingsProps) {
  const [formData, setFormData] = useState(preferences);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (field: keyof NotificationPreferences, value: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!onUpdate) return;

    setIsLoading(true);
    try {
      await onUpdate(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Configure which emails you'd like to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingItem
            id="emailMarketing"
            label="Marketing emails"
            description="Receive emails about new features and product updates."
            checked={formData.emailMarketing}
            onCheckedChange={(v) => handleToggle("emailMarketing", v)}
          />
          <Separator />
          <SettingItem
            id="emailProduct"
            label="Product updates"
            description="Get notified when we release new features or improvements."
            checked={formData.emailProduct}
            onCheckedChange={(v) => handleToggle("emailProduct", v)}
          />
          <Separator />
          <SettingItem
            id="emailSecurity"
            label="Security alerts"
            description="Receive important security notifications about your account."
            checked={formData.emailSecurity}
            onCheckedChange={(v) => handleToggle("emailSecurity", v)}
          />
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Configure push notifications on your devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingItem
            id="pushEnabled"
            label="Enable push notifications"
            description="Allow notifications to be sent to your device."
            checked={formData.pushEnabled}
            onCheckedChange={(v) => handleToggle("pushEnabled", v)}
          />
          {formData.pushEnabled && (
            <>
              <Separator />
              <SettingItem
                id="pushMentions"
                label="Mentions"
                description="Notify when someone mentions you."
                checked={formData.pushMentions}
                onCheckedChange={(v) => handleToggle("pushMentions", v)}
              />
              <Separator />
              <SettingItem
                id="pushComments"
                label="Comments"
                description="Notify when someone comments on your content."
                checked={formData.pushComments}
                onCheckedChange={(v) => handleToggle("pushComments", v)}
              />
              <Separator />
              <SettingItem
                id="pushUpdates"
                label="Updates"
                description="Notify about important updates and activity."
                checked={formData.pushUpdates}
                onCheckedChange={(v) => handleToggle("pushUpdates", v)}
              />
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
          Save preferences
        </Button>
      </div>
    </div>
  );
}
