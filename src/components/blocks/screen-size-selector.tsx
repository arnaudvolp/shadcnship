"use client";

import { Monitor, Tablet, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBlockContext } from "./block-provider";
import type { ScreenSize } from "@/types/blocks";

const screenSizes: { name: ScreenSize; icon: typeof Monitor; label: string }[] = [
  { name: "mobile", icon: Smartphone, label: "Mobile" },
  { name: "tablet", icon: Tablet, label: "Tablet" },
  { name: "desktop", icon: Monitor, label: "Desktop" },
];

export function ScreenSizeSelector() {
  const { screenSize, setScreenSize } = useBlockContext();

  return (
    <div className="hidden md:flex items-center gap-1 rounded-md border p-1">
      {screenSizes.map(({ name, icon: Icon, label }) => (
        <Tooltip key={name}>
          <TooltipTrigger asChild>
            <Button
              variant={screenSize === name ? "secondary" : "ghost"}
              size="icon-sm"
              className="size-7"
              onClick={() => setScreenSize(name)}
            >
              <Icon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
