import {
  BadgeCheck,
  Building2,
  CircleCheck,
  Headphones,
  Heart,
  Layers,
  Megaphone,
  MessageSquare,
  ShoppingCart,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Stat08Metric {
  value: string;
  label: string;
}

interface Stat08Tag {
  icon: LucideIcon;
  label: string;
}

interface Stat08Props {
  metrics?: Stat08Metric[];
  title?: string;
  tags?: Stat08Tag[];
  className?: string;
}

interface OrbitItem {
  position: string;
  className?: string;
  node: React.ReactNode;
}

const defaultMetrics: Stat08Metric[] = [
  { value: "50+", label: "Ready-to-use blocks" },
  { value: "1000+", label: "Developers using" },
  { value: "100%", label: "Free & open source" },
];

const defaultTags: Stat08Tag[] = [
  { icon: ShoppingCart, label: "SaaS landing page" },
  { icon: Layers, label: "Ready-to-use blocks" },
  { icon: TrendingUp, label: "Pricing" },
  { icon: Headphones, label: "Support" },
];

const avatar = (n: number, className: string) => (
  <Avatar className={cn("shadow-sm", className)}>
    <AvatarImage
      src={`https://www.shadcnship.com/images/avatars/avatar-${n}.webp`}
      alt=""
    />
    <AvatarFallback className="text-xs">{n}</AvatarFallback>
  </Avatar>
);

const pill = (icon: React.ReactNode, label: string) => (
  <Badge
    variant="outline"
    className="gap-1 bg-background whitespace-nowrap shadow-sm"
  >
    {icon}
    {label}
  </Badge>
);

const iconTile = (icon: React.ReactNode, className: string) => (
  <div
    className={cn(
      "flex size-8 items-center justify-center border bg-background shadow-sm",
      className,
    )}
  >
    {icon}
  </div>
);

/* Positions are fractions of the ring box (left-N/40 top-N/40), angles run clockwise. */
const outerItems: OrbitItem[] = [
  {
    position: "left-40/40 top-17/40",
    className: "max-md:invisible",
    node: pill(<ThumbsUp className="size-3" />, "24"),
  },
  {
    position: "left-33/40 top-5/40",
    node: avatar(2, "size-8 md:size-10"),
  },
  {
    position: "left-20/40 top-0",
    node: (
      <Badge
        variant="outline"
        className="gap-1.5 bg-background pl-1 whitespace-nowrap shadow-sm"
      >
        <Avatar className="size-5">
          <AvatarImage
            src="https://www.shadcnship.com/images/avatars/avatar-1.webp"
            alt=""
          />
          <AvatarFallback className="text-xs">1</AvatarFallback>
        </Avatar>
        12 new posts
      </Badge>
    ),
  },
  {
    position: "left-7/40 top-5/40",
    node: avatar(6, "size-8 md:size-10"),
  },
  {
    position: "left-0 top-17/40",
    className: "max-md:invisible",
    node: (
      <Badge variant="secondary" className="gap-1 whitespace-nowrap shadow-sm">
        <CircleCheck className="size-3" />
        Voting completed
      </Badge>
    ),
  },
  {
    position: "left-3/40 top-30/40",
    className: "max-md:invisible",
    node: pill(<MessageSquare className="size-3" />, "8"),
  },
  {
    position: "left-13/40 top-39/40",
    node: avatar(5, "size-8 md:size-10"),
  },
  {
    position: "left-27/40 top-39/40",
    className: "max-md:invisible",
    node: pill(<Sparkles className="size-3" />, "New creator"),
  },
  {
    position: "left-37/40 top-30/40",
    className: "max-md:invisible",
    node: pill(<Heart className="size-3" />, "12"),
  },
];

const innerItems: OrbitItem[] = [
  {
    position: "left-39/40 top-13/40",
    node: iconTile(<BadgeCheck className="size-4" />, "rounded-full"),
  },
  {
    position: "left-28/40 top-2/40",
    node: avatar(3, "size-6 md:size-8"),
  },
  {
    position: "left-13/40 top-1/40",
    node: iconTile(<Building2 className="size-4" />, "rounded-md"),
  },
  {
    position: "left-2/40 top-12/40",
    className: "max-md:invisible",
    node: pill(<ThumbsUp className="size-3" />, "12"),
  },
  {
    position: "left-1/40 top-27/40",
    node: avatar(4, "size-6 md:size-8"),
  },
  {
    position: "left-12/40 top-38/40",
    className: "max-md:invisible",
    node: pill(<Star className="size-3" />, "4.9"),
  },
  {
    position: "left-27/40 top-39/40",
    node: avatar(1, "size-6 md:size-8"),
  },
  {
    position: "left-38/40 top-28/40",
    node: iconTile(<Megaphone className="size-4" />, "rounded-md"),
  },
];

/* The ring turns clockwise; each item turns the other way so it stays upright. */
const Orbit = ({
  items,
  spin,
  className,
}: {
  items: OrbitItem[];
  spin: string;
  className: string;
}) => (
  <div
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute top-full left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border motion-reduce:animate-none",
      spin,
      className,
    )}
  >
    {items.map((item) => (
      <div
        key={item.position}
        className={cn(
          "absolute z-10 -translate-x-1/2 -translate-y-1/2 animate-spin direction-[reverse] motion-reduce:animate-none",
          spin,
          item.position,
          item.className,
        )}
      >
        {item.node}
      </div>
    ))}
  </div>
);

const Stat08 = ({
  metrics = defaultMetrics,
  title = "Trusted by developers building with shadcn/ui",
  tags = defaultTags,
  className,
}: Stat08Props) => (
  <section
    className={cn(
      "container mx-auto overflow-x-clip px-6 py-12 md:py-24",
      className,
    )}
  >
    <div className="relative mx-auto max-w-4xl">
      <div className="relative aspect-video overflow-x-visible overflow-y-clip">
        <Orbit
          items={outerItems}
          spin="[animation-duration:120s]"
          className="w-19/20"
        />
        <Orbit
          items={innerItems}
          spin="[animation-duration:90s]"
          className="w-7/10"
        />
      </div>
      <dl className="z-20 mt-6 flex justify-center gap-6 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:gap-12">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col-reverse items-center gap-1 text-center"
          >
            <dt className="text-sm text-muted-foreground">{metric.label}</dt>
            <dd className="text-3xl font-medium tracking-tight md:text-5xl">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>

    <div className="mt-8 flex flex-col items-center gap-8 text-center">
      <h2 className="max-w-lg text-4xl leading-tight font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      {tags.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <li key={tag.label}>
              <Badge variant="outline" className="gap-2 px-3 py-1.5 text-sm">
                <tag.icon className="size-4" aria-hidden="true" />
                {tag.label}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

export default Stat08;
