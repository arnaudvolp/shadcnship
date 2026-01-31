import { SupabaseIcon } from "@/components/icons";

export type Stack = "supabase" | "postgres";

export interface StackConfig {
  id: Stack;
  icon?: React.ReactNode;
  label: string;
  description: string;
}

export const stackConfigs: StackConfig[] = [
  {
    id: "supabase",
    icon: <SupabaseIcon className="size-4" />,
    label: "Supabase",
    description: "Supabase integration",
  },
  { id: "postgres", label: "PostgreSQL", description: "Raw PostgreSQL/SQL" },
];

export function getStackConfig(id: Stack): StackConfig | undefined {
  return stackConfigs.find((stack) => stack.id === id);
}
