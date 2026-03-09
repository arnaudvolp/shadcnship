import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description?: string;
  highlights?: string[];
  img?: string;
  type?: "feature" | "improvement" | "fix" | "breaking";
}

interface Changelog01Props {
  label?: string;
  title?: string;
  description?: string;
  entries?: ChangelogEntry[];
  className?: string;
}

const typeColors: Record<string, string> = {
  feature: "bg-emerald-100 text-emerald-700",
  improvement: "bg-blue-100 text-blue-700",
  fix: "bg-amber-100 text-amber-700",
  breaking: "bg-red-100 text-red-700",
};

const typeLabels: Record<string, string> = {
  feature: "New Feature",
  improvement: "Improvement",
  fix: "Bug Fix",
  breaking: "Breaking Change",
};

const ChangelogEntryCard = ({
  version,
  date,
  title,
  description,
  highlights,
  img,
  type,
}: ChangelogEntry) => (
  <div className="relative pb-12 pl-8 last:pb-0">
    <div className="absolute top-3 bottom-0 left-[7px] w-px bg-border last:hidden" />
    <div className="absolute top-1.5 left-0 size-4 rounded-full border-2 border-primary bg-primary" />
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="font-mono text-xs">
          {version}
        </Badge>
        {type && (
          <Badge className={cn("text-xs font-medium", typeColors[type])}>
            {typeLabels[type]}
          </Badge>
        )}
      </div>
      <h3 className="text-xl font-medium tracking-tight">{title}</h3>
      <span className="text-sm text-muted-foreground">{date}</span>
      {description && (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      )}
      {img && (
        <div className="overflow-hidden rounded-md border bg-muted/30">
          <img
            src={img}
            alt={title}
            className="aspect-video w-full object-cover"
          />
        </div>
      )}
      {highlights && highlights.length > 0 && (
        <ul className="flex flex-col gap-2 pt-2">
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const Changelog01 = ({
  label = "Changelog",
  title = "Our journey",
  description = "Follow along as we ship new features, improvements, and fixes to make our product better every day.",
  entries = [
    {
      version: "v2.4.0",
      date: "January 15, 2025",
      title: "AI-Powered Code Suggestions",
      description:
        "Introducing intelligent code suggestions powered by machine learning. Get real-time recommendations as you type.",
      img: "https://www.shadcnship.com/images/image-preview.webp",
      type: "feature",
      highlights: [
        "Context-aware code completions",
        "Support for 15+ programming languages",
        "Customizable suggestion preferences",
      ],
    },
    {
      version: "v2.3.2",
      date: "January 8, 2025",
      title: "Performance Improvements",
      description:
        "We've optimized the core engine for faster load times and smoother interactions across the platform.",
      type: "improvement",
      highlights: [
        "50% faster initial page load",
        "Reduced memory footprint",
        "Improved caching strategy",
      ],
    },
    {
      version: "v2.3.1",
      date: "December 20, 2024",
      title: "Bug Fixes & Stability",
      description:
        "Addressed several reported issues to improve overall stability and user experience.",
      type: "fix",
      highlights: [
        "Fixed authentication edge cases",
        "Resolved file sync conflicts",
        "Corrected timezone display issues",
      ],
    },
    {
      version: "v2.3.0",
      date: "December 10, 2024",
      title: "Team Collaboration Features",
      description:
        "Real-time collaboration tools that make working with your team seamless and intuitive.",
      img: "https://www.shadcnship.com/images/image-preview.webp",
      highlights: [
        "Live cursor tracking",
        "Inline comments and mentions",
        "Activity feed and notifications",
      ],
    },
  ],
  className,
}: Changelog01Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <div className="mx-auto max-w-5xl">
      <div className="mb-12 flex flex-col gap-4">
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
        <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground md:text-lg">{description}</p>
      </div>
      <div className="relative">
        {entries.map((entry, index) => (
          <ChangelogEntryCard key={index} {...entry} />
        ))}
      </div>
    </div>
  </section>
);

export { Changelog01 };
