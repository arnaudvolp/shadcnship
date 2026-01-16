"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { usePackageManager } from "@/providers/package-manager-provider";
import { packageManagers, type PackageManager } from "@/config/package-managers";

interface BlockInstallCommandProps {
  blockName: string;
}

export function BlockInstallCommand({ blockName }: BlockInstallCommandProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const { packageManager, setPackageManager, isHydrated } = usePackageManager();

  const currentPM = packageManagers[packageManager];
  const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "";
  const blockUrl = `${registryUrl}/r/${blockName}.json`;

  const handleCopy = () => {
    copyToClipboard(currentPM.command(blockUrl));
  };

  if (!isHydrated) {
    return (
      <ButtonGroup>
        <Button variant="outline" size="sm" className="gap-2 text-sm" disabled>
          <span className="size-4" />
          <span className="font-normal">Loading...</span>
        </Button>
        <Button variant="outline" size="icon-sm" className="px-1.5 w-7" disabled>
          <ChevronDown className="size-3.5" />
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-sm"
        onClick={handleCopy}
      >
        {isCopied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <currentPM.logo className="size-4" />
        )}
        <span className="inline md:hidden font-normal">Copy</span>
        <span className="hidden md:inline font-normal">
          {currentPM.displayCommand(blockName)}
        </span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm" className="px-1.5 w-7">
            <ChevronDown className="size-3.5" />
            <span className="sr-only">Select package manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-32">
          {Object.entries(packageManagers).map(([key, pm]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setPackageManager(key as PackageManager)}
              className="cursor-pointer gap-2"
            >
              <pm.logo className="size-4" />
              <span className="flex-1">{pm.name}</span>
              {packageManager === key && (
                <Check className="size-4 text-green-500" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
