"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TabsContent } from "@/components/ui/tabs";
import {
  SettingsLayout,
  ProfileForm,
  NotificationSettings,
  SecuritySettings,
  BillingSettings,
  AppearanceSettings,
} from "./components";
import type { SettingsTab, SettingsState, SettingsProps } from "./types/settings";

// =============================================================================
// Demo Settings Data
// =============================================================================

const demoSettings: SettingsState = {
  profile: {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    avatar: "https://avatar.vercel.sh/johndoe",
    bio: "Software engineer passionate about building great products.",
    company: "Acme Inc.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    phone: "+1 (555) 000-0000",
  },
  notifications: {
    emailMarketing: true,
    emailProduct: true,
    emailSecurity: true,
    pushEnabled: true,
    pushMentions: true,
    pushComments: false,
    pushUpdates: true,
  },
  security: {
    twoFactorEnabled: false,
    sessions: [
      {
        id: "1",
        device: "Desktop",
        browser: "Chrome on macOS",
        location: "San Francisco, CA",
        lastActive: new Date().toISOString(),
        current: true,
      },
      {
        id: "2",
        device: "Mobile",
        browser: "Safari on iPhone",
        location: "San Francisco, CA",
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        current: false,
      },
      {
        id: "3",
        device: "Laptop",
        browser: "Firefox on Windows",
        location: "New York, NY",
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        current: false,
      },
    ],
  },
  billing: {
    plan: "pro",
    billingCycle: "monthly",
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: {
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiresAt: "12/25",
    },
  },
  appearance: {
    theme: "system",
    accentColor: "blue",
    fontSize: "medium",
    reducedMotion: false,
  },
};

// =============================================================================
// Demo Actions
// =============================================================================

const createDemoActions = (
  settings: SettingsState,
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>
) => ({
  onUpdateProfile: async (data: Partial<SettingsState["profile"]>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSettings((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...data },
    }));
  },
  onUpdateNotifications: async (data: Partial<SettingsState["notifications"]>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...data },
    }));
  },
  onUpdatePassword: async (currentPassword: string, newPassword: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Password updated");
  },
  onToggle2FA: async (enabled: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, twoFactorEnabled: enabled },
    }));
  },
  onRevokeSession: async (sessionId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        sessions: prev.security.sessions.filter((s) => s.id !== sessionId),
      },
    }));
  },
  onUpdateAppearance: async (data: Partial<SettingsState["appearance"]>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSettings((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, ...data },
    }));
  },
});

// =============================================================================
// Main Component
// =============================================================================

export default function Settings01({
  defaultTab = "profile",
  settings: propSettings,
  onUpdateProfile,
  onUpdateNotifications,
  onUpdatePassword,
  onToggle2FA,
  onRevokeSession,
  onUpdateAppearance,
  className,
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(defaultTab);
  const [internalSettings, setInternalSettings] = useState<SettingsState>(demoSettings);

  // Merge prop settings with demo settings
  const settings: SettingsState = {
    ...internalSettings,
    ...propSettings,
    profile: { ...internalSettings.profile, ...propSettings?.profile },
    notifications: { ...internalSettings.notifications, ...propSettings?.notifications },
    security: { ...internalSettings.security, ...propSettings?.security },
    billing: { ...internalSettings.billing, ...propSettings?.billing },
    appearance: { ...internalSettings.appearance, ...propSettings?.appearance },
  };

  // Create demo actions if not provided
  const demoActions = createDemoActions(internalSettings, setInternalSettings);

  return (
    <div className={cn("p-6", className)}>
      <SettingsLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <TabsContent value="profile">
          <ProfileForm
            profile={settings.profile}
            onUpdate={onUpdateProfile ?? demoActions.onUpdateProfile}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings
            preferences={settings.notifications}
            onUpdate={onUpdateNotifications ?? demoActions.onUpdateNotifications}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings
            security={settings.security}
            onUpdatePassword={onUpdatePassword ?? demoActions.onUpdatePassword}
            onToggle2FA={onToggle2FA ?? demoActions.onToggle2FA}
            onRevokeSession={onRevokeSession ?? demoActions.onRevokeSession}
          />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSettings
            billing={settings.billing}
            onManageBilling={() => console.log("Manage billing")}
            onChangePlan={() => console.log("Change plan")}
          />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSettings
            appearance={settings.appearance}
            onUpdate={onUpdateAppearance ?? demoActions.onUpdateAppearance}
          />
        </TabsContent>
      </SettingsLayout>
    </div>
  );
}

// =============================================================================
// Named Exports
// =============================================================================

export { Settings01 };

// Re-export types
export type {
  SettingsTab,
  UserProfile,
  NotificationPreferences,
  SecuritySettings as SecuritySettingsType,
  Session,
  BillingInfo,
  AppearanceSettings as AppearanceSettingsType,
  SettingsState,
  SettingsProps,
} from "./types/settings";
