"use client";

import { Button } from "@/components/ui/button";
import { V0Logo } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function V0Button({ url }: { url: string }) {
  const v0Url = `https://v0.dev/chat/api/open?url=${encodeURIComponent(url)}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon-sm" asChild>
          <a href={v0Url} target="_blank" rel="noopener noreferrer">
            <V0Logo className="size-4" />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Open in v0</p>
      </TooltipContent>
    </Tooltip>
  );
}
