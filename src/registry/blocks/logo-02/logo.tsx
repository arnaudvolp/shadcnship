"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ArrowRight } from "lucide-react";

interface Client {
  name: string;
  logo?: string;
  industry: string;
  technology?: string;
  featured?: { title: string; description: string; href: string };
}

interface Logo02Props {
  label?: string;
  title?: string;
  description?: string;
  clients?: Client[];
  industries?: string[];
  technologies?: string[];
  showFilters?: boolean;
  columns?: 3 | 4 | 5 | 6;
  className?: string;
}

const ClientCard = ({ client }: { client: Client }) => {
  const isFeatured = !!client.featured;
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[180px] flex-col items-center justify-center p-6 transition-colors",
        isFeatured
          ? "bg-primary text-primary-foreground"
          : "bg-background hover:bg-muted/50",
      )}
    >
      <div className="flex w-full flex-1 items-center justify-center">
        {client.logo ? (
          <img
            src={client.logo}
            alt={client.name}
            className={cn(
              "max-h-12 max-w-[140px] object-contain",
              isFeatured
                ? "brightness-0 invert"
                : "grayscale transition-all hover:grayscale-0",
            )}
          />
        ) : (
          <span
            className={cn(
              "text-xl font-medium tracking-tight",
              isFeatured ? "text-primary-foreground" : "text-foreground",
            )}
          >
            {client.name}
          </span>
        )}
      </div>
      {isFeatured && client.featured && (
        <div className="mt-4 flex flex-col gap-4 text-center">
          <p className="text-sm leading-relaxed opacity-90">
            {client.featured.description}
          </p>
          <a
            href={client.featured.href}
            className="inline-flex items-center justify-center gap-1 text-center text-sm font-medium transition-all hover:gap-2"
          >
            Learn more <ArrowRight className="size-4" />
          </a>
        </div>
      )}
      <div className="absolute bottom-3 left-3">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            isFeatured
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {client.industry}
        </span>
      </div>
    </div>
  );
};

const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between border-b bg-background px-4 py-3 transition-colors hover:bg-muted/50"
      >
        <span className="text-sm text-muted-foreground">{value || label}</span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 left-0 z-20 max-h-60 overflow-auto border border-t-0 bg-background shadow-lg">
            <button
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-2 text-left text-sm transition-colors hover:bg-muted",
                !value && "bg-muted",
              )}
            >
              {label}
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm transition-colors hover:bg-muted",
                  value === opt && "bg-muted",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Logo02 = ({
  label = "Trusted by",
  title = "Our Clients",
  description = "We are proud of contributing to the success of the world's leading brands",
  clients = [
    { name: "Google", industry: "Software", technology: "AI" },
    {
      name: "Anthropic",
      industry: "AI",
      technology: "AI",
      featured: {
        title: "Case Study",
        description:
          "See how we partnered with Anthropic to build safer and more capable AI systems at scale.",
        href: "#",
      },
    },
    { name: "Tesla", industry: "Automotive", technology: "AI" },
    { name: "Stripe", industry: "Fintech", technology: "Cloud" },
    { name: "Vercel", industry: "Software", technology: "Cloud" },
    { name: "OpenAI", industry: "AI", technology: "AI" },
    { name: "Figma", industry: "Design" },
    { name: "Linear", industry: "Software" },
    { name: "Notion", industry: "Productivity", technology: "Cloud" },
    { name: "Resend", industry: "Fintech", technology: "Cloud" },
  ],
  industries = [
    "AI",
    "Software",
    "Fintech",
    "Automotive",
    "Design",
    "Productivity",
  ],
  technologies = ["Cloud", "AI"],
  showFilters = true,
  columns = 5,
  className,
}: Logo02Props) => {
  const [industryFilter, setIndustryFilter] = useState("");
  const [technologyFilter, setTechnologyFilter] = useState("");

  const filteredClients = useMemo(
    () =>
      clients.filter(
        (c) =>
          (!industryFilter || c.industry === industryFilter) &&
          (!technologyFilter || c.technology === technologyFilter),
      ),
    [clients, industryFilter, technologyFilter],
  );

  const gridCols = {
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  }[columns];

  return (
    <section className={cn("container mx-auto py-12 md:py-24", className)}>
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
        {label && (
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            {label}
          </p>
        )}
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground md:text-lg">{description}</p>
        )}
      </div>
      {showFilters && (
        <div className="mx-auto mb-8 flex max-w-2xl gap-4">
          <FilterDropdown
            label="All Industries"
            options={industries}
            value={industryFilter}
            onChange={setIndustryFilter}
          />
          <FilterDropdown
            label="All Technologies"
            options={technologies}
            value={technologyFilter}
            onChange={setTechnologyFilter}
          />
        </div>
      )}
      <div className={cn("grid border-t border-l sm:grid-cols-2", gridCols)}>
        {filteredClients.map((client, i) => (
          <div key={i} className="border-r border-b">
            <ClientCard client={client} />
          </div>
        ))}
      </div>
      {filteredClients.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No clients match the selected filters
        </div>
      )}
    </section>
  );
};

export default Logo02;
