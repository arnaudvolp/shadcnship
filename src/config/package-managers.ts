import { NpmLogo, PnpmLogo, YarnLogo, BunLogo } from "@/components/ui/icons";
import { SVGProps } from "react";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

interface PackageManagerConfig {
  name: string;
  command: (url: string) => string;
  displayCommand: (blockName: string) => string;
  logo: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export const packageManagers: Record<PackageManager, PackageManagerConfig> = {
  npm: {
    name: "npm",
    command: (url: string) => `npx shadcn@latest add ${url}`,
    displayCommand: (blockName: string) => `npx shadcn add ${blockName}`,
    logo: NpmLogo,
  },
  pnpm: {
    name: "pnpm",
    command: (url: string) => `pnpm dlx shadcn@latest add ${url}`,
    displayCommand: (blockName: string) => `pnpm dlx shadcn add ${blockName}`,
    logo: PnpmLogo,
  },
  yarn: {
    name: "Yarn",
    command: (url: string) => `npx shadcn@latest add ${url}`,
    displayCommand: (blockName: string) => `yarn dlx shadcn add ${blockName}`,
    logo: YarnLogo,
  },
  bun: {
    name: "Bun",
    command: (url: string) => `bunx --bun shadcn@latest add ${url}`,
    displayCommand: (blockName: string) => `bunx shadcn add ${blockName}`,
    logo: BunLogo,
  },
};
