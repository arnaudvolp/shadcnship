"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Users, Building, Building2 } from "lucide-react";
import { NavigationButtons } from "./navigation-buttons";
import type { OnboardingWorkspace } from "../types/onboarding";

interface StepWorkspaceProps {
  data: OnboardingWorkspace;
  onChange: (data: OnboardingWorkspace) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
  className?: string;
}

const teamSizes: { id: OnboardingWorkspace["teamSize"]; label: string; description: string; icon: typeof User }[] = [
  { id: "just-me", label: "Just me", description: "Personal workspace", icon: User },
  { id: "small", label: "2-10", description: "Small team", icon: Users },
  { id: "medium", label: "11-50", description: "Growing team", icon: Building },
  { id: "large", label: "50+", description: "Large organization", icon: Building2 },
];

const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "agency", label: "Agency" },
  { value: "other", label: "Other" },
];

export function StepWorkspace({
  data,
  onChange,
  onNext,
  onBack,
  onSkip,
  isLoading,
  className,
}: StepWorkspaceProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof OnboardingWorkspace, value: string) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!data.workspaceName?.trim()) {
      newErrors.workspaceName = "Workspace name is required";
    }
    if (!data.teamSize) {
      newErrors.teamSize = "Please select a team size";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Create your workspace</h2>
        <p className="text-muted-foreground">
          Set up your workspace to collaborate with your team.
        </p>
      </div>

      <div className="space-y-6 max-w-sm mx-auto">
        {/* Workspace name */}
        <div className="space-y-2">
          <Label htmlFor="workspaceName">
            Workspace name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="workspaceName"
            value={data.workspaceName || ""}
            onChange={(e) => handleChange("workspaceName", e.target.value)}
            placeholder="My Workspace"
            className={cn(errors.workspaceName && "border-destructive")}
          />
          {errors.workspaceName && (
            <p className="text-xs text-destructive">{errors.workspaceName}</p>
          )}
        </div>

        {/* Team size */}
        <div className="space-y-3">
          <Label>
            Team size <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {teamSizes.map((size) => {
              const Icon = size.icon;
              const isSelected = data.teamSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => handleChange("teamSize", size.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-4 rounded-lg border-2 transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/20",
                    errors.teamSize && "border-destructive/50"
                  )}
                >
                  <Icon className={cn("size-5", isSelected && "text-primary")} />
                  <span className={cn("text-sm font-medium", isSelected && "text-primary")}>
                    {size.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{size.description}</span>
                </button>
              );
            })}
          </div>
          {errors.teamSize && (
            <p className="text-xs text-destructive">{errors.teamSize}</p>
          )}
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label htmlFor="industry">Industry (optional)</Label>
          <Select value={data.industry || ""} onValueChange={(v) => handleChange("industry", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <NavigationButtons
        onNext={handleNext}
        onBack={onBack}
        onSkip={onSkip}
        nextLabel="Create workspace"
        isLoading={isLoading}
        className="max-w-sm mx-auto"
      />
    </div>
  );
}
