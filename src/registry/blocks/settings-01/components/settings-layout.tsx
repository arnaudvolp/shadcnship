"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, CreditCard, Palette } from "lucide-react";
import type { SettingsTab } from "../types/settings";

interface SettingsLayoutProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  children: React.ReactNode;
  className?: string;
}

const tabs = [
  { id: "profile" as const, label: "Profile", icon: User },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "security" as const, label: "Security", icon: Shield },
  { id: "billing" as const, label: "Billing", icon: CreditCard },
  { id: "appearance" as const, label: "Appearance", icon: Palette },
];

export function SettingsLayout({
  activeTab,
  onTabChange,
  children,
  className,
}: SettingsLayoutProps) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="space-y-1 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as SettingsTab)}>
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 px-4 py-2"
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
}
