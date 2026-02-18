"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CompanySize } from "../types/onboarding";

interface StepCompanySizeProps {
  value: CompanySize | null;
  onChange: (value: CompanySize) => void;
}

const companySizeOptions: { value: CompanySize; label: string }[] = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

export function StepCompanySize({ value, onChange }: StepCompanySizeProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          How large is your company?
        </h1>
        <p className="text-muted-foreground">
          This helps us tailor your experience and recommend the right plan for
          your team.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-medium">How large is your company?</h2>
        <Select
          value={value || ""}
          onValueChange={(v) => onChange(v as CompanySize)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            {companySizeOptions.map((opt) => (
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
