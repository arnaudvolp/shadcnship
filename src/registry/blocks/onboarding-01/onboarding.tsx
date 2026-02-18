"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  StepIndicator,
  StepWelcome,
  StepProfile,
  StepPreferences,
  StepWorkspace,
  StepComplete,
} from "./components";
import type {
  OnboardingStep,
  OnboardingData,
  OnboardingProfile,
  OnboardingPreferences,
  OnboardingWorkspace,
  OnboardingProps,
} from "./types/onboarding";

// =============================================================================
// Step Order
// =============================================================================

const stepOrder: OnboardingStep[] = ["welcome", "profile", "preferences", "workspace", "complete"];

// =============================================================================
// Default Data
// =============================================================================

const defaultData: OnboardingData = {
  profile: {
    name: "",
    avatar: undefined,
    role: undefined,
  },
  preferences: {
    theme: "system",
    emailNotifications: true,
    weeklyDigest: true,
  },
  workspace: {
    workspaceName: "",
    teamSize: "just-me",
    industry: undefined,
  },
};

// =============================================================================
// Main Component
// =============================================================================

export default function Onboarding01({
  defaultStep = "welcome",
  onComplete,
  onStepChange,
  onSkip,
  showConfetti = true,
  className,
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(defaultStep);
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [isLoading, setIsLoading] = useState(false);

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
    onStepChange?.(step);
  };

  const goToNextStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      goToStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      goToStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleProfileChange = (profile: OnboardingProfile) => {
    setData((prev) => ({ ...prev, profile }));
  };

  const handlePreferencesChange = (preferences: OnboardingPreferences) => {
    setData((prev) => ({ ...prev, preferences }));
  };

  const handleWorkspaceChange = (workspace: OnboardingWorkspace) => {
    setData((prev) => ({ ...prev, workspace }));
  };

  const handleWorkspaceSubmit = async () => {
    setIsLoading(true);
    try {
      await onComplete?.(data);
      goToNextStep();
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    console.log("Onboarding complete:", data);
    // Navigate to dashboard or close modal
  };

  const handleSkip = () => {
    onSkip?.();
    handleFinish();
  };

  const renderStep = () => {
    switch (currentStep) {
      case "welcome":
        return <StepWelcome onNext={goToNextStep} />;
      case "profile":
        return (
          <StepProfile
            data={data.profile}
            onChange={handleProfileChange}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
            onSkip={handleSkip}
          />
        );
      case "preferences":
        return (
          <StepPreferences
            data={data.preferences}
            onChange={handlePreferencesChange}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
            onSkip={handleSkip}
          />
        );
      case "workspace":
        return (
          <StepWorkspace
            data={data.workspace}
            onChange={handleWorkspaceChange}
            onNext={handleWorkspaceSubmit}
            onBack={goToPreviousStep}
            onSkip={handleSkip}
            isLoading={isLoading}
          />
        );
      case "complete":
        return (
          <StepComplete
            workspaceName={data.workspace.workspaceName || "My Workspace"}
            showConfetti={showConfetti}
            onFinish={handleFinish}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex items-center justify-center min-h-[600px] p-4", className)}>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 sm:p-8">
          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} className="mb-8" />

          {/* Current Step Content */}
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
}

// =============================================================================
// Named Exports
// =============================================================================

export { Onboarding01 };

// Re-export types
export type {
  OnboardingStep,
  OnboardingProfile,
  OnboardingPreferences,
  OnboardingWorkspace,
  OnboardingData,
  OnboardingState,
  OnboardingProps,
} from "./types/onboarding";
