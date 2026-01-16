"use client";

import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BlockFullscreenButtonProps {
  blockName: string;
}

export function BlockFullscreenButton({ blockName }: BlockFullscreenButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => window.open(`/blocks/${blockName}/preview`, "_blank")}
        >
          <Maximize2 className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Open in new tab</p>
      </TooltipContent>
    </Tooltip>
  );
}
