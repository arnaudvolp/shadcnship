import { Blocks } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Feature11Card {
  img?: string;
  title: string;
  description: string;
}

interface Feature11Props {
  badge?: { text: string; icon?: React.ReactNode };
  title?: string;
  description?: string;
  cards?: Feature11Card[];
  className?: string;
}

const Feature11 = ({
  badge = {
    text: "How it Works",
    icon: <Blocks className="size-3.5" />,
  },
  title = "Ship faster with\nproduction-ready blocks.",
  description = "Pre-built, customizable blocks for your landing page. Copy the code, adapt it to your brand, and go live in minutes.",
  cards = [
    {
      img: "https://www.shadcnship.com/images/placeholders/hero-architecture-7.webp",
      title: "Copy & Customize",
      description:
        "Every block is self-contained and fully editable. No dependencies to manage — just paste into your project and make it yours.",
    },
    {
      img: "https://www.shadcnship.com/images/placeholders/hero-architecture-5.webp",
      title: "Built with shadcn/ui",
      description:
        "All blocks use shadcn/ui components and Tailwind CSS. Accessible by default, dark mode ready, and consistent with your design system.",
    },
  ],
  className,
}: Feature11Props) => {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <Badge
            variant="outline"
            className="w-fit gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
          >
            {badge.icon}
            {badge.text}
          </Badge>

          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-16">
            <h2 className="text-4xl font-medium tracking-tight whitespace-pre-line md:text-5xl">
              {title}
            </h2>
            <p className="max-w-lg text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col gap-4">
              {/* Card container */}
              <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-muted p-4 lg:p-8">
                {card.img ? (
                  <img
                    src={card.img}
                    alt={card.title}
                    className="h-full w-full rounded-xl object-cover shadow-sm"
                  />
                ) : (
                  <div className="h-full w-full rounded-xl bg-muted-foreground/10" />
                )}
              </div>

              {/* Card text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature11;
export type { Feature11Props, Feature11Card };
