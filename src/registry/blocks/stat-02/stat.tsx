import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
}

interface Stat02Props {
  heading?: string;
  description?: string;
  stats?: StatItem[];
  className?: string;
}

const Stat02 = ({
  heading = "Trusted by Developers",
  description = "Production-ready components built with shadcn/ui and Tailwind CSS. Copy, customize, and ship faster.",
  stats = [
    { value: "50+", label: "Ready-to-Use Blocks" },
    { value: "1000+", label: "Developers Using" },
    { value: "100%", label: "Free & Open Source" },
  ],
  className,
}: Stat02Props) => {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="mt-2 mx-auto max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-md border md:flex-row">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-1 flex-col md:flex-row">
              <div className="flex-1 py-12 text-center">
                <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
              {i < stats.length - 1 && (
                <div className="h-px w-full bg-border md:h-auto md:w-px" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stat02 };
