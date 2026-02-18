"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Monitor } from "lucide-react";
import { NavigationButtons } from "./navigation-buttons";
import type { OnboardingPreferences } from "../types/onboarding";

interface StepPreferencesProps {
  data: OnboardingPreferences;
  onChange: (data: OnboardingPreferences) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  className?: string;
}

const themes: { id: OnboardingPreferences["theme"]; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

export function StepPreferences({
  data,
  onChange,
  onNext,
  onBack,
  onSkip,
  className,
}: StepPreferencesProps) {
  const handleThemeChange = (theme: OnboardingPreferences["theme"]) => {
    onChange({ ...data, theme });
  };

  const handleToggle = (field: keyof OnboardingPreferences, value: boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Your preferences</h2>
        <p className="text-muted-foreground">
          Customize your experience. You can change these later in settings.
        </p>
      </div>

      <div className="space-y-6 max-w-sm mx-auto">
        {/* Theme selection */}
        <div className="space-y-3">
          <Label>Theme</Label>
          <div className="grid grid-cols-3 gap-3">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isSelected = data.theme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleThemeChange(theme.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/20"
                  )}
                >
                  <Icon className={cn("size-5", isSelected && "text-primary")} />
                  <span className={cn("text-sm font-medium", isSelected && "text-primary")}>
                    {theme.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification preferences */}
        <div className="space-y-4">
          <Label>Notifications</Label>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications" className="cursor-pointer text-sm font-medium">
                Email notifications
              </Label>
              <p className="text-xs text-muted-foreground">
                Receive updates about your account
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={data.emailNotifications}
              onCheckedChange={(v) => handleToggle("emailNotifications", v)}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="space-y-0.5">
              <Label htmlFor="weeklyDigest" className="cursor-pointer text-sm font-medium">
                Weekly digest
              </Label>
              <p className="text-xs text-muted-foreground">
                Get a summary of your activity
              </p>
            </div>
            <Switch
              id="weeklyDigest"
              checked={data.weeklyDigest}
              onCheckedChange={(v) => handleToggle("weeklyDigest", v)}
            />
          </div>
        </div>
      </div>

      <NavigationButtons
        onNext={onNext}
        onBack={onBack}
        onSkip={onSkip}
        className="max-w-sm mx-auto"
      />
    </div>
  );
}
