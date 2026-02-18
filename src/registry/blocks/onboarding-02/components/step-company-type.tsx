"use client";

import { ChipSelect } from "./chip-select";
import type { CompanyType } from "../types/onboarding";

interface StepCompanyTypeProps {
  value: CompanyType | null;
  onChange: (value: CompanyType) => void;
}

const companyTypeOptions: { value: CompanyType; label: string }[] = [
  { value: "bootstrapped_startup", label: "Bootstrapped Tech Startup" },
  { value: "software_agency", label: "Software & Design Agency" },
  { value: "freelancer", label: "Freelancer & Solopreneur" },
  { value: "ecommerce", label: "eCommerce business" },
  { value: "consulting", label: "Small Consulting & Advisory Firm" },
  { value: "university", label: "University" },
  { value: "tech_enterprise", label: "Tech Enterprise" },
  { value: "pre_seed", label: "Pre-Seed & Seed Startup" },
  { value: "seed", label: "Pre-Seed & Seed Startup" },
  { value: "vc_firm", label: "VC Firm" },
  { value: "other", label: "Other" },
];

export function StepCompanyType({ value, onChange }: StepCompanyTypeProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Tell us about your company
        </h1>
        <p className="text-muted-foreground">
          Workspaces are shared environments where teams can collaborate on
          tasks, cycles and projects.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-medium">What kind of company are you?</h2>
        <ChipSelect
          options={companyTypeOptions}
          value={value}
          onChange={(v) => onChange(v as CompanyType)}
        />
      </div>
    </div>
  );
}
