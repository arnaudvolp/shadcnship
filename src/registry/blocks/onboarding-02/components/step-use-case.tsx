"use client";

import { ChipSelect } from "./chip-select";
import type { UseCase } from "../types/onboarding";

interface StepUseCaseProps {
  values: UseCase[];
  onChange: (values: UseCase[]) => void;
}

const useCaseOptions: { value: UseCase; label: string }[] = [
  { value: "project_management", label: "Project Management" },
  { value: "documentation", label: "Documentation" },
  { value: "team_collaboration", label: "Team Collaboration" },
  { value: "product_roadmap", label: "Product Roadmap" },
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "other", label: "Other" },
];

export function StepUseCase({ values, onChange }: StepUseCaseProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          How will you use the platform?
        </h1>
        <p className="text-muted-foreground">
          Select all that apply. This helps us customize your workspace.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-medium">
          What will you primarily use this for?
        </h2>
        <ChipSelect
          options={useCaseOptions}
          multiSelect
          selectedValues={values}
          onMultiChange={(v) => onChange(v as UseCase[])}
        />
      </div>
    </div>
  );
}
