"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlocksSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BlocksSearch({ value, onChange }: BlocksSearchProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search blocks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
