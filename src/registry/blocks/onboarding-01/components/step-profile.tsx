"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { NavigationButtons } from "./navigation-buttons";
import type { OnboardingProfile } from "../types/onboarding";

interface StepProfileProps {
  data: OnboardingProfile;
  onChange: (data: OnboardingProfile) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  className?: string;
}

const roles = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "product", label: "Product Manager" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "other", label: "Other" },
];

export function StepProfile({
  data,
  onChange,
  onNext,
  onBack,
  onSkip,
  className,
}: StepProfileProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof OnboardingProfile, value: string) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!data.name?.trim()) {
      newErrors.name = "Name is required";
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
        <h2 className="text-2xl font-bold tracking-tight">Set up your profile</h2>
        <p className="text-muted-foreground">
          Tell us a bit about yourself so we can personalize your experience.
        </p>
      </div>

      <div className="space-y-4 max-w-sm mx-auto">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="size-24">
              <AvatarImage src={data.avatar} />
              <AvatarFallback className="text-2xl">
                {data.name?.slice(0, 2).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute -bottom-1 -right-1 size-8 rounded-full"
            >
              <Camera className="size-4" />
            </Button>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Full name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={data.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Doe"
            className={cn(errors.name && "border-destructive")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">What's your role?</Label>
          <Select value={data.role || ""} onValueChange={(v) => handleChange("role", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
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
        className="max-w-sm mx-auto"
      />
    </div>
  );
}
