import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CreditCard,
  Download,
  HelpCircle,
  LayoutTemplate,
  Layers,
  MousePointerClick,
  X,
} from "lucide-react";
import {
  NextIcon,
  ReactIcon,
  TailwindIcon,
  SupabaseIcon,
  ShadcnIcon,
  GithubIcon,
  LogoIcon,
} from "@/registry/blocks/social-icons/icons";

// ---- Visuals ----

const nodes = [
  { x: 75, y: 45, Icon: LayoutTemplate, name: "Hero", meta: "5 BLOCKS" },
  { x: 240, y: 45, Icon: CreditCard, name: "Pricing", meta: "3 VARIANTS" },
  { x: 405, y: 45, Icon: MousePointerClick, name: "CTA", meta: "4 STYLES" },
  { x: 160, y: 130, Icon: Layers, name: "Feature", meta: "7 BLOCKS" },
  { x: 320, y: 130, Icon: HelpCircle, name: "FAQ", meta: "2 LAYOUTS" },
] as const;

const FlowVisual = () => (
  <div className="relative aspect-24/11 flex-1 overflow-hidden rounded-lg bg-muted/50">
    {/* Lines */}
    <svg
      className="absolute inset-0 size-full text-border"
      viewBox="0 0 480 220"
      fill="none"
      aria-hidden
    >
      {/* Row 1 horizontals */}
      <line
        x1="110"
        y1="45"
        x2="200"
        y2="45"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="280"
        y1="45"
        x2="380"
        y2="45"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Pricing down to branch */}
      <line
        x1="240"
        y1="63"
        x2="240"
        y2="80"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Branch horizontal + verticals down */}
      <line
        x1="160"
        y1="80"
        x2="320"
        y2="80"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="160"
        y1="80"
        x2="160"
        y2="112"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="320"
        y1="80"
        x2="320"
        y2="112"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Row 2 down + converge horizontal */}
      <line
        x1="160"
        y1="148"
        x2="160"
        y2="165"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="320"
        y1="148"
        x2="320"
        y2="165"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="160"
        y1="165"
        x2="320"
        y2="165"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Down to Import */}
      <line
        x1="240"
        y1="165"
        x2="240"
        y2="177"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Junction dots */}
      <circle cx="240" cy="80" r="3" fill="currentColor" />
      <circle cx="240" cy="165" r="3" fill="currentColor" />
    </svg>

    {/* Nodes */}
    {nodes.map(({ x, y, Icon, name, meta }) => (
      <div
        key={name}
        className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border bg-background px-3 py-2 shadow-sm"
        style={{ left: `${(x / 480) * 100}%`, top: `${(y / 220) * 100}%` }}
      >
        <Icon className="size-4 shrink-0 text-primary" strokeWidth={1.5} />
        <div>
          <p className="text-xs leading-none font-medium">{name}</p>
          <p className="mt-1 text-[10px] tracking-wider text-muted-foreground uppercase">
            {meta}
          </p>
        </div>
      </div>
    ))}

    {/* Import button */}
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-sm"
      style={{ left: "50%", top: `${(195 / 220) * 100}%` }}
    >
      <Download className="size-3.5" strokeWidth={1.5} />
      Import
    </div>
  </div>
);

const CustomizeVisual = () => (
  <div className="flex-1 rounded-lg bg-muted/50 p-4">
    <div className="flex flex-col gap-2">
      {[
        { label: "Ghost", cls: "text-muted-foreground" },
        {
          label: "Outline",
          cls: "border border-border bg-background text-foreground",
        },
        { label: "Default", cls: "bg-foreground text-background shadow-sm" },
        { label: "Secondary", cls: "bg-secondary text-secondary-foreground" },
        { label: "Link", cls: "text-primary" },
      ].map(({ label, cls }) => (
        <div
          key={label}
          className={cn(
            "flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium",
            cls,
          )}
        >
          {label}
        </div>
      ))}
    </div>
  </div>
);

const TypeScriptVisual = () => (
  <div className="flex-1 rounded-lg bg-muted/50 p-4">
    <div className="overflow-hidden rounded-md border bg-background">
      {/* Tabs */}
      <div className="flex items-center border-b px-3">
        {["Usage", "Types", "API"].map((tab, i) => (
          <div
            key={tab}
            className={cn(
              "px-3 py-2.5 text-xs font-medium",
              i === 0
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground",
            )}
          >
            {tab}
          </div>
        ))}
        <div className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-muted">
          <X className="size-2" />
        </div>
      </div>
      {/* Code lines as skeletons */}
      <div className="flex flex-col gap-2.5 p-6">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-9/12" />
        <Skeleton className="mt-4 h-3 w-10/12" />
        <Skeleton className="h-3 w-10/12" />
        <Skeleton className="h-3 w-8/12" />
        <Skeleton className="h-3 w-6/12" />
        <Skeleton className="h-3 w-6/12" />
        <Skeleton className="h-3 w-6/12" />
      </div>
    </div>
  </div>
);

const spokes = [
  { x: 70, y: 55, Icon: NextIcon },
  { x: 70, y: 110, Icon: ReactIcon },
  { x: 70, y: 165, Icon: TailwindIcon },
  { x: 410, y: 55, Icon: SupabaseIcon },
  { x: 410, y: 110, Icon: ShadcnIcon },
  { x: 410, y: 165, Icon: GithubIcon },
] as const;

const IntegrateVisual = () => (
  <div className="relative aspect-24/11 flex-1 overflow-hidden rounded-lg bg-muted/50">
    {/* Lines */}
    <svg
      className="absolute inset-0 size-full text-border"
      viewBox="0 0 480 220"
      fill="none"
      aria-hidden
    >
      {/* Main horizontal line: React — ShadcnShip — Shadcn */}
      <line
        x1="70"
        y1="110"
        x2="410"
        y2="110"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Next: right to branch point (1/3), then down to center line */}
      <line
        x1="70"
        y1="55"
        x2="127"
        y2="55"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="127"
        y1="55"
        x2="127"
        y2="110"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Tailwind: right to same branch point, then up to center line */}
      <line
        x1="70"
        y1="165"
        x2="127"
        y2="165"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="127"
        y1="165"
        x2="127"
        y2="110"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Supabase: left to branch point (1/3), then down to center line */}
      <line
        x1="410"
        y1="55"
        x2="353"
        y2="55"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="353"
        y1="55"
        x2="353"
        y2="110"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Github: left to same branch point, then up to center line */}
      <line
        x1="410"
        y1="165"
        x2="353"
        y2="165"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="353"
        y1="165"
        x2="353"
        y2="110"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Junction dots */}
      <circle cx="127" cy="110" r="3" fill="currentColor" />
      <circle cx="353" cy="110" r="3" fill="currentColor" />
    </svg>

    {/* Spoke icons */}
    {spokes.map(({ x, y, Icon }) => (
      <div
        key={`${x}-${y}`}
        className="absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border bg-background shadow-sm"
        style={{ left: `${(x / 480) * 100}%`, top: `${(y / 220) * 100}%` }}
      >
        <Icon className="size-5" />
      </div>
    ))}

    {/* Center: shadcnship logo */}
    <div
      className="absolute flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border-2 bg-background shadow-md"
      style={{ left: "50%", top: "50%" }}
    >
      <LogoIcon className="size-7" />
    </div>
  </div>
);

// ---- Card wrapper ----

const BentoCard = ({
  tag,
  title,
  description,
  visual,
  className,
}: {
  tag: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  className?: string;
}) => (
  <Card className={cn("flex flex-col gap-4 p-6 shadow-none", className)}>
    <div>
      <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {tag}
      </p>
      <h3 className="mt-2 text-xl font-medium">{title}</h3>
    </div>
    <div className="rounded-lg border">{visual}</div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Card>
);

// ---- Main component ----

interface Feature10Props {
  label?: string;
  heading?: string;
  className?: string;
}

const Feature10 = ({ label, heading, className }: Feature10Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    {(label || heading) && (
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
        {label && (
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            {label}
          </p>
        )}
        {heading && (
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        )}
      </div>
    )}
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <BentoCard
          tag="Copy"
          title="Copy. Paste. Ship."
          description="Every block is ready to drop into your project. No setup, no configuration — just copy the code and ship."
          visual={<FlowVisual />}
          className="md:col-span-3"
        />
        <BentoCard
          tag="shadcn/ui"
          title="Every variant, ready to use"
          description="All shadcn/ui button variants included out of the box — ghost, outline, default, secondary, and more."
          visual={<CustomizeVisual />}
          className="md:col-span-2"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BentoCard
          tag="TypeScript"
          title="Type-safe out of the box"
          description="Every component ships with full TypeScript types and IntelliSense support for a better developer experience."
          visual={<TypeScriptVisual />}
        />
        <BentoCard
          tag="Integrate"
          title="Plugs into your stack"
          description="Built for Next.js, React, and Tailwind CSS. Compatible with shadcn/ui and any modern React framework."
          visual={<IntegrateVisual />}
        />
      </div>
    </div>
  </section>
);

export { Feature10 };
