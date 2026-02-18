// =============================================================================
// Onboarding Types (Modern)
// =============================================================================

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
}

export type CompanyType =
  | "bootstrapped_startup"
  | "software_agency"
  | "freelancer"
  | "ecommerce"
  | "consulting"
  | "university"
  | "tech_enterprise"
  | "pre_seed"
  | "seed"
  | "vc_firm"
  | "other";

export type CompanySize = "1-10" | "11-50" | "51-200" | "201-500" | "500+";

export type FundingAmount =
  | "no_funding"
  | "less_than_3m"
  | "less_than_10m"
  | "less_than_50m"
  | "more_than_50m";

export type UseCase =
  | "project_management"
  | "documentation"
  | "team_collaboration"
  | "product_roadmap"
  | "engineering"
  | "design"
  | "marketing"
  | "sales"
  | "other";

export interface OnboardingFormData {
  // Step 1: Company type
  companyType: CompanyType | null;
  // Step 2: Company size
  companySize: CompanySize | null;
  // Step 3: Funding
  fundingAmount: FundingAmount | null;
  // Step 4: Use case
  useCases: UseCase[];
  // Step 5: Personal info
  fullName: string;
  role: string;
}

export interface OnboardingProps {
  steps?: OnboardingStep[];
  logo?: React.ReactNode;
  onComplete?: (data: OnboardingFormData) => Promise<void>;
  className?: string;
}

export interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export interface ChipSelectProps {
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
  multiSelect?: boolean;
  selectedValues?: string[];
  onMultiChange?: (values: string[]) => void;
}
