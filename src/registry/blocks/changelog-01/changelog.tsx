import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description?: string;
  highlights?: string[];
  image?: string;
  type?: "feature" | "improvement" | "fix" | "breaking";
}

interface Changelog01Props {
  tagline?: string;
  heading?: string;
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
  image,
  type,
}: ChangelogEntry) => {
  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border last:hidden " />

      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 size-4 rounded-full border-2 border-primary bg-primary" />

      {/* Content */}
      <div className="space-y-3">
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

        <h3 className="text-xl font-semibold tracking-tight mb-0">{title}</h3>

        <span className="text-sm text-muted-foreground"> {date}</span>

        {description && (
          <p className="text-muted-foreground leading-relaxed mt-4">
            {description}
          </p>
        )}

        {image && (
          <div className="overflow-hidden rounded-xl border bg-accent">
            <img
              src={image}
              alt={title}
              className="w-full object-cover aspect-video"
            />
          </div>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="space-y-2 pt-2">
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
};

const Changelog01 = ({
  tagline = "Changelog",
  heading = "Our journey",
  description = "Follow along as we ship new features, improvements, and fixes to make our product better every day.",
  entries = [
    {
      version: "v2.4.0",
      date: "January 15, 2025",
      title: "AI-Powered Code Suggestions",
      description:
        "Introducing intelligent code suggestions powered by machine learning. Get real-time recommendations as you type.",
      image: "https://www.shadcnship.com/images/image-preview.webp",
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
      image: "https://www.shadcnship.com/images/image-preview.webp",
      highlights: [
        "Live cursor tracking",
        "Inline comments and mentions",
        "Activity feed and notifications",
      ],
    },
  ],
  className,
}: Changelog01Props) => {
  return (
    <section className={cn("container mx-auto px-6 py-12 md:py-24", className)}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <span className="text-sm font-medium uppercase tracking-wider">
              {tagline}
            </span>
          </div>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {entries.map((entry, index) => (
            <ChangelogEntryCard key={index} {...entry} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Changelog01 };
