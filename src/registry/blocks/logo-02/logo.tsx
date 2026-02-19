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
  tagline?: string;
  heading?: string;
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
    <div className={cn("relative flex flex-col items-center justify-center p-6 min-h-[180px] transition-colors h-full", isFeatured ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted/50")}>
      <div className="flex-1 flex items-center justify-center w-full">
        {client.logo ? (
          <img src={client.logo} alt={client.name} className={cn("max-h-12 max-w-[140px] object-contain", isFeatured ? "brightness-0 invert" : "grayscale hover:grayscale-0 transition-all")} />
        ) : (
          <span className={cn("text-xl font-bold tracking-tight", isFeatured ? "text-primary-foreground" : "text-foreground")}>{client.name}</span>
        )}
      </div>
      {isFeatured && client.featured && (
        <div className="mt-4 text-center space-y-3">
          <p className="text-sm leading-relaxed opacity-90">{client.featured.description}</p>
          <a href={client.featured.href} className="inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">
            Learn more <ArrowRight className="size-3.5" />
          </a>
        </div>
      )}
      <div className="absolute bottom-3 left-3">
        <span className={cn("inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full", isFeatured ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground")}>{client.industry}</span>
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex-1">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-3 border-b bg-background hover:bg-muted/50 transition-colors">
        <span className="text-sm text-muted-foreground">{value || label}</span>
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 z-20 bg-background border border-t-0 shadow-lg max-h-60 overflow-auto">
            <button onClick={() => { onChange(""); setIsOpen(false); }} className={cn("w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors", !value && "bg-muted")}>{label}</button>
            {options.map((opt) => (
              <button key={opt} onClick={() => { onChange(opt); setIsOpen(false); }} className={cn("w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors", value === opt && "bg-muted")}>{opt}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Logo02 = ({
  tagline = "Trusted by",
  heading = "Our Clients",
  description = "We are proud of contributing to the success of the world's leading brands",
  clients = [
    { name: "Aramex", industry: "Logistics" },
    { name: "Gazprom", industry: "Gas", featured: { title: "Case Study", description: "See How We helped European gas market data go digital for the first time", href: "#" } },
    { name: "ESET", industry: "Computer Software" },
    { name: "Blackboard", industry: "Retail" },
    { name: "Sky Media", industry: "Fintech", technology: "Cloud" },
    { name: "HAVAS", industry: "Media & Entertainment" },
    { name: "TAIT", industry: "Logistics" },
    { name: "Acino", industry: "Oil & Gas", technology: "AI" },
    { name: "PACE", industry: "Computer Software" },
    { name: "Teleologica", industry: "Retail", technology: "Cloud" },
  ],
  industries = ["Logistics", "Oil & Gas", "Computer Software", "Retail", "Fintech", "Media & Entertainment"],
  technologies = ["Cloud", "AI", "Blockchain", "IoT"],
  showFilters = true,
  columns = 5,
  className,
}: Logo02Props) => {
  const [industryFilter, setIndustryFilter] = useState("");
  const [technologyFilter, setTechnologyFilter] = useState("");

  const filteredClients = useMemo(() => clients.filter((c) => (!industryFilter || c.industry === industryFilter) && (!technologyFilter || c.technology === technologyFilter)), [clients, industryFilter, technologyFilter]);
  const gridCols = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" }[columns];

  return (
    <section className={cn("container mx-auto px-6 py-12 md:py-24", className)}>
      <div className="mx-auto max-w-2xl text-center mb-12">
        {tagline && <p className="text-sm font-medium text-muted-foreground">{tagline}</p>}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">{heading}</h2>
        {description && <p className="mt-4 text-muted-foreground">{description}</p>}
      </div>
      {showFilters && (
        <div className="flex gap-4 mb-8 max-w-2xl mx-auto">
          <FilterDropdown label="All Industries" options={industries} value={industryFilter} onChange={setIndustryFilter} />
          <FilterDropdown label="All Technologies" options={technologies} value={technologyFilter} onChange={setTechnologyFilter} />
        </div>
      )}
      <div className={cn("grid sm:grid-cols-2 border-l border-t", gridCols)}>
        {filteredClients.map((client, i) => (
          <div key={i} className="border-r border-b"><ClientCard client={client} /></div>
        ))}
      </div>
      {filteredClients.length === 0 && <div className="text-center py-12 text-muted-foreground">No clients match the selected filters</div>}
    </section>
  );
};

export { Logo02 };
