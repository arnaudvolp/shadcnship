import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface StatItem {
  value: string;
  label: string;
}

interface Stat01Props {
  heading?: string;
  description?: string;
  stats?: StatItem[];
  className?: string;
}

const Stat01 = ({
  heading = "Trusted by Developers",
  description = "Production-ready components built with shadcn/ui and Tailwind CSS. Copy, customize, and ship faster.",
  stats = [
    { value: "50+", label: "Ready-to-Use Blocks" },
    { value: "1000+", label: "Developers Using" },
    { value: "100%", label: "Free & Open Source" },
  ],
  className,
}: Stat01Props) => {
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
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="py-12 text-center shadow-none">
              <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stat01 };
