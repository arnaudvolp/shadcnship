"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import {
  StepProgress,
  StepCompanyType,
  StepCompanySize,
  StepFunding,
  StepUseCase,
  StepComplete,
} from "./components";
import { LogoIcon } from "@/registry/blocks/social-icons/icons";
import type {
  OnboardingFormData,
  OnboardingProps,
  CompanyType,
  CompanySize,
  FundingAmount,
  UseCase,
} from "./types/onboarding";

// =============================================================================
// Initial State
// =============================================================================

const initialFormData: OnboardingFormData = {
  companyType: null,
  companySize: null,
  fundingAmount: null,
  useCases: [],
  fullName: "",
  role: "",
};

const TOTAL_STEPS = 5;

// =============================================================================
// Onboarding Component
// =============================================================================

export default function Onboarding({
  logo,
  onComplete,
  className,
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Trigger confetti on completion
  useEffect(() => {
    if (isComplete) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isComplete]);

  // Check if current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyType !== null;
      case 2:
        return formData.companySize !== null;
      case 3:
        return formData.fundingAmount !== null;
      case 4:
        return formData.useCases.length > 0;
      default:
        return true;
    }
  };

  // Handle next step
  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete onboarding
      setIsSubmitting(true);
      try {
        if (onComplete) {
          await onComplete(formData);
        }
        setIsComplete(true);
      } catch (error) {
        console.error("Failed to complete onboarding:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Update form data
  const updateFormData = (updates: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  // Render current step content
  const renderStepContent = () => {
    if (isComplete) {
      return <StepComplete />;
    }

    switch (currentStep) {
      case 1:
        return (
          <StepCompanyType
            value={formData.companyType}
            onChange={(v) => updateFormData({ companyType: v })}
          />
        );
      case 2:
        return (
          <StepCompanySize
            value={formData.companySize}
            onChange={(v) => updateFormData({ companySize: v })}
          />
        );
      case 3:
        return (
          <StepFunding
            value={formData.fundingAmount}
            onChange={(v) => updateFormData({ fundingAmount: v })}
          />
        );
      case 4:
        return (
          <StepUseCase
            values={formData.useCases}
            onChange={(v) => updateFormData({ useCases: v })}
          />
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Almost there!
              </h1>
              <p className="text-muted-foreground">
                Review your selections and complete the setup.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Company Type</span>
                <span className="font-medium capitalize">
                  {formData.companyType?.replace(/_/g, " ") || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Company Size</span>
                <span className="font-medium">
                  {formData.companySize || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Funding</span>
                <span className="font-medium capitalize">
                  {formData.fundingAmount?.replace(/_/g, " ") || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Use Cases</span>
                <span className="font-medium capitalize text-right">
                  {formData.useCases.length > 0
                    ? formData.useCases.map((u) => u.replace(/_/g, " ")).join(", ")
                    : "None selected"}
                </span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Default logo
  const displayLogo = logo || <LogoIcon className="size-10" />;

  return (
    <div
      className={cn(
        "min-h-screen flex items-start justify-center bg-muted/30 p-4 pt-16 md:pt-24",
        className
      )}
    >
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="mb-8">{displayLogo}</div>

          {/* Progress */}
          {!isComplete && (
            <StepProgress
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              className="mb-8"
            />
          )}

          {/* Content - Fixed height container */}
          <div className="min-h-[320px] mb-8">{renderStepContent()}</div>

          {/* Navigation */}
          {!isComplete && (
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={cn(currentStep === 1 && "invisible")}
              >
                <ArrowLeft className="size-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : null}
                {currentStep === TOTAL_STEPS ? "Complete Setup" : "Continue"}
                {currentStep < TOTAL_STEPS && !isSubmitting && (
                  <ArrowRight className="size-4 ml-2" />
                )}
              </Button>
            </div>
          )}

          {/* Complete action */}
          {isComplete && (
            <div className="flex justify-center">
              <Button size="lg">
                Go to Dashboard
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
