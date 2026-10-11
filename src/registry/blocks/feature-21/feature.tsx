import {
  Copy,
  LayoutTemplate,
  Sparkles,
  SquareDashedMousePointer,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LogoIcon } from "../social-icons/icons";

interface Feature21Column {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Feature21Props {
  label?: string | null;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  seamLabel?: string | null;
  columns?: Feature21Column[];
  className?: string;
}

const defaultColumns: Feature21Column[] = [
  {
    icon: Copy,
    title: "Copy & Paste Ready",
    description:
      "Copy any component directly into your project. No dependencies, just pure code you own.",
  },
  {
    icon: LayoutTemplate,
    title: "Pre-built Templates",
    description:
      "Start with production-ready templates for common layouts and patterns.",
  },
  {
    icon: Sparkles,
    title: "Developer Experience",
    description:
      "Built with TypeScript, fully typed, and optimized for modern frameworks.",
  },
  {
    icon: SquareDashedMousePointer,
    title: "Fully Customizable",
    description:
      "Every component is built with Tailwind CSS. Modify styles easily.",
  },
];

const Feature21 = ({
  label,
  title = "Everything You Need to Build Faster",
  description = "Production-ready blocks built with shadcn/ui and Tailwind CSS. Copy, customize, and ship.",
  image = "https://www.shadcnship.com/images/placeholders/product-design-2.webp",
  imageAlt = "Product preview",
  seamLabel = "Copy + Ship",
  columns = defaultColumns,
  className,
}: Feature21Props) => (
  <section className={cn("container mx-auto px-6 py-12 md:py-24", className)}>
    <div className="flex flex-col items-center gap-4 text-center">
      {label && (
        <Badge variant="secondary" className="rounded-full">
          {label}
        </Badge>
      )}
      <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>

    <div className="mx-auto mt-12 max-w-5xl">
      <Card className="relative items-center justify-center overflow-hidden rounded-2xl bg-muted p-6 shadow-none md:p-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[repeating-conic-gradient(var(--border)_0_0.3deg,transparent_0.3deg_12deg)] mask-radial-from-transparent mask-radial-from-30% mask-radial-to-black"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-80 -translate-x-3/4 -translate-y-1/2 rounded-full border"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-80 -translate-x-1/4 -translate-y-1/2 rounded-full border"
        />
        <div className="relative flex w-full max-w-xl flex-col items-center gap-6 md:flex-row">
          <div className="aspect-square w-full max-w-60 overflow-hidden rounded-2xl border bg-background p-2 md:max-w-none md:flex-1">
            <img
              src={image}
              alt={imageAlt}
              className="size-full rounded-lg object-cover"
            />
          </div>
          {seamLabel && (
            <Badge
              variant="outline"
              className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background px-3 py-1 whitespace-nowrap shadow-sm"
            >
              {seamLabel}
            </Badge>
          )}
          <div className="flex aspect-square w-full max-w-60 items-center justify-center rounded-2xl border bg-background md:max-w-none md:flex-1">
            <LogoIcon className="size-16 dark:invert" />
          </div>
        </div>
      </Card>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((column) => (
          <li key={column.title} className="flex flex-col gap-4">
            <div
              className="flex size-10 items-center justify-center rounded-lg border bg-background"
              aria-hidden="true"
            >
              <column.icon className="size-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">{column.title}</h3>
              <p className="text-sm text-muted-foreground">
                {column.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Feature21;
