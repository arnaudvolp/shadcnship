"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Monitor, Loader2 } from "lucide-react";
import type { AppearanceSettings as AppearanceSettingsType } from "../types/settings";

interface AppearanceSettingsProps {
  appearance: AppearanceSettingsType;
  onUpdate?: (data: Partial<AppearanceSettingsType>) => Promise<void>;
  className?: string;
}

const themes = [
  { id: "light" as const, label: "Light", icon: Sun },
  { id: "dark" as const, label: "Dark", icon: Moon },
  { id: "system" as const, label: "System", icon: Monitor },
];

const fontSizes = [
  { id: "small" as const, label: "Small" },
  { id: "medium" as const, label: "Medium" },
  { id: "large" as const, label: "Large" },
];

const accentColors = [
  { id: "zinc", color: "#71717a" },
  { id: "red", color: "#ef4444" },
  { id: "orange", color: "#f97316" },
  { id: "yellow", color: "#eab308" },
  { id: "green", color: "#22c55e" },
  { id: "blue", color: "#3b82f6" },
  { id: "purple", color: "#a855f7" },
  { id: "pink", color: "#ec4899" },
];

export function AppearanceSettings({
  appearance,
  onUpdate,
  className,
}: AppearanceSettingsProps) {
  const [formData, setFormData] = useState(appearance);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = <K extends keyof AppearanceSettingsType>(
    field: K,
    value: AppearanceSettingsType[K]
  ) => {
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
      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Select your preferred color theme for the interface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isSelected = formData.theme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleChange("theme", theme.id)}
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
        </CardContent>
      </Card>

      {/* Accent Color */}
      <Card>
        <CardHeader>
          <CardTitle>Accent Color</CardTitle>
          <CardDescription>
            Choose an accent color for buttons and interactive elements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {accentColors.map((color) => {
              const isSelected = formData.accentColor === color.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => handleChange("accentColor", color.id)}
                  className={cn(
                    "size-8 rounded-full transition-all",
                    isSelected && "ring-2 ring-offset-2 ring-offset-background"
                  )}
                  style={{
                    backgroundColor: color.color,
                    "--tw-ring-color": color.color,
                  } as React.CSSProperties}
                >
                  <span className="sr-only">{color.id}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Font Size */}
      <Card>
        <CardHeader>
          <CardTitle>Font Size</CardTitle>
          <CardDescription>
            Adjust the font size for better readability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.fontSize}
            onValueChange={(v) => handleChange("fontSize", v as AppearanceSettingsType["fontSize"])}
            className="flex gap-4"
          >
            {fontSizes.map((size) => (
              <div key={size.id} className="flex items-center space-x-2">
                <RadioGroupItem value={size.id} id={size.id} />
                <Label htmlFor={size.id} className="cursor-pointer">
                  {size.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>
            Configure accessibility settings for a better experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reducedMotion" className="cursor-pointer">
                Reduced motion
              </Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions.
              </p>
            </div>
            <Switch
              id="reducedMotion"
              checked={formData.reducedMotion}
              onCheckedChange={(v) => handleChange("reducedMotion", v)}
            />
          </div>
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
