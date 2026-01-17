"use client";

import { Tag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BlockCategory } from "@/types/blocks";

interface BlocksCategoryFilterProps {
  categories: BlockCategory[];
  value: string;
  onChange: (value: string) => void;
}

export function BlocksCategoryFilter({
  categories,
  value,
  onChange,
}: BlocksCategoryFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-fit">
        <Tag className="size-4 mr-2 text-muted-foreground" />
        <SelectValue placeholder="All categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.name} value={category.name}>
            {category.icon} {category.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
