import { cn } from "@/lib/utils";
import { Background03 } from "@/registry/blocks/background-03/background";

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
    <section className={cn("container mx-auto py-12 md:py-24", className)}>
      <div className="px-6 md:px-12">
        <div className="mb-8 text-center">
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
                <div className="relative min-h-8 w-full md:w-8">
                  <Background03
                    lineWidth={1}
                    spacing={6}
                    lineColor="var(--border)"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stat02 };
