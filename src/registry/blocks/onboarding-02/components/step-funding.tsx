"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FundingAmount } from "../types/onboarding";

interface StepFundingProps {
  value: FundingAmount | null;
  onChange: (value: FundingAmount) => void;
}

const fundingOptions: { value: FundingAmount; label: string }[] = [
  { value: "no_funding", label: "No funding" },
  { value: "less_than_3m", label: "Less than $3m" },
  { value: "less_than_10m", label: "Less than $10m" },
  { value: "less_than_50m", label: "Less than $50m" },
  { value: "more_than_50m", label: "More than $50m" },
];

export function StepFunding({ value, onChange }: StepFundingProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Tell us about your funding
        </h1>
        <p className="text-muted-foreground">
          This helps us understand your stage and provide relevant resources.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-medium">
          How much have you raised so far?
        </h2>
        <Select
          value={value || ""}
          onValueChange={(v) => onChange(v as FundingAmount)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select funding amount" />
          </SelectTrigger>
          <SelectContent>
            {fundingOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
