import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  text: string;
  suffix?: string;
  icon?: React.ReactNode;
}

interface Stat03Props {
  label?: string;
  title?: string;
  description?: string;
  mainImage?: string;
  secondaryImages?: [string, string];
  stats?: [StatItem, StatItem, StatItem];
  className?: string;
}

const Stat03 = ({
  label = "Our Success",
  title = "Performance Insights",
  description = "Transform insights into action effortlessly with our intuitive SaaS platform. Elevate your user experiences and drive success.",
  mainImage = "https://www.shadcnship.com/images/placeholders/hero-architecture-7.webp",
  secondaryImages = [
    "https://www.shadcnship.com/images/placeholders/hero-architecture-5.webp",
    "https://www.shadcnship.com/images/placeholders/hero-architecture-6.webp",
  ],
  stats = [
    { value: "2M+", text: "Total Downloads" },
    {
      value: "98%",
      text: "User Satisfaction Score",
      icon: <Star className="size-5 fill-foreground" />,
    },
    { value: "4.9", text: "Average Rating", suffix: "/ 5" },
  ],
  className,
}: Stat03Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    {/* Header */}
    <div className="mb-12 flex flex-col items-center gap-2 text-center">
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-muted-foreground md:text-lg">
        {description}
      </p>
    </div>

    {/* Bento grid */}
    <div className="mx-auto grid max-w-5xl auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4">
      {/* Main image — full width on mobile (row-span-2), col 1 on desktop */}
      <div className="col-span-2 row-span-2 overflow-hidden rounded-xl md:col-span-1">
        <img src={mainImage} alt="" className="size-full object-cover" />
      </div>

      {/* Stat 1 — half width mobile, col 2 desktop */}
      <div className="col-span-1 flex flex-col justify-between rounded-xl bg-muted p-4 md:p-5">
        <p className="text-sm text-muted-foreground">{stats[0].text}</p>
        <p className="text-3xl font-medium tracking-tight md:text-5xl">
          {stats[0].value}
        </p>
      </div>

      {/* Stat 2 — half width mobile, col 3–4 desktop */}
      <div className="col-span-1 flex flex-col justify-between rounded-xl bg-muted p-4 md:col-span-2 md:p-5">
        {stats[1].icon}
        <div>
          <p className="text-3xl font-medium tracking-tight md:text-5xl">
            {stats[1].value}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{stats[1].text}</p>
        </div>
      </div>

      {/* Stat 3 — half width mobile, col 2 desktop */}
      <div className="col-span-1 flex flex-col justify-end rounded-xl bg-muted p-4 md:p-5">
        <p className="text-3xl font-medium tracking-tight md:text-5xl">
          {stats[2].value}
          {stats[2].suffix && (
            <span className="text-lg text-muted-foreground md:text-xl">
              {stats[2].suffix}
            </span>
          )}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{stats[2].text}</p>
      </div>

      {/* Secondary image 1 — half width mobile, col 3 desktop */}
      <div className="col-span-1 overflow-hidden rounded-xl">
        <img
          src={secondaryImages[0]}
          alt=""
          className="size-full object-cover"
        />
      </div>

      {/* Secondary image 2 — full width mobile, col 4 desktop */}
      <div className="col-span-2 overflow-hidden rounded-xl md:col-span-1">
        <img
          src={secondaryImages[1]}
          alt=""
          className="size-full object-cover"
        />
      </div>
    </div>
  </section>
);

export default Stat03;
