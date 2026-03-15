import { cn } from "@/lib/utils";
import Background03 from "@/components/background-03";

interface StatItem {
  value: string;
  text: string;
}

interface Stat02Props {
  title?: string;
  description?: string;
  stats?: StatItem[];
  className?: string;
}

const Stat02 = ({
  title = "Trusted by Developers",
  description = "Production-ready components built with shadcn/ui and Tailwind CSS. Copy, customize, and ship faster.",
  stats = [
    { value: "50+", text: "Ready-to-Use Blocks" },
    { value: "1000+", text: "Developers Using" },
    { value: "100%", text: "Free & Open Source" },
  ],
  className,
}: Stat02Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <div className="mb-8 flex flex-col items-center gap-4 text-center">
      <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-muted-foreground md:text-lg">
        {description}
      </p>
    </div>
    <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-md border md:flex-row">
      {stats.map((stat, i) => (
        <div key={stat.text} className="flex flex-1 flex-col md:flex-row">
          <div className="flex flex-1 flex-col items-center gap-2 py-12 text-center">
            <p className="text-4xl font-medium md:text-5xl">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.text}</p>
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
  </section>
);

export default Stat02;
