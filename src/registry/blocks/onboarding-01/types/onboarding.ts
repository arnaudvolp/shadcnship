// =============================================================================
// Onboarding Types
// =============================================================================

export type OnboardingStep = "welcome" | "profile" | "preferences" | "workspace" | "complete";

export interface OnboardingProfile {
  name: string;
  avatar?: string;
  role?: string;
}

export interface OnboardingPreferences {
  theme: "light" | "dark" | "system";
  emailNotifications: boolean;
  weeklyDigest: boolean;
}

export interface OnboardingWorkspace {
  workspaceName: string;
  teamSize: "just-me" | "small" | "medium" | "large";
  industry?: string;
}

export interface OnboardingData {
  profile: OnboardingProfile;
  preferences: OnboardingPreferences;
  workspace: OnboardingWorkspace;
}

export interface OnboardingState {
  currentStep: OnboardingStep;
  data: Partial<OnboardingData>;
  isLoading: boolean;
  error: string | null;
}

export interface OnboardingProps {
  defaultStep?: OnboardingStep;
  onComplete?: (data: OnboardingData) => Promise<void>;
  onStepChange?: (step: OnboardingStep) => void;
  onSkip?: () => void;
  showConfetti?: boolean;
  className?: string;
}

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
}
