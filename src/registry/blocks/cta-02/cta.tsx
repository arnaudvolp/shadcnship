import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Iphone } from "@/components/ui/iphone";

interface Cta02Props {
  title?: string;
  description?: string;
  buttons?: {
    text: string;
    url?: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  }[];
  img?: string;
  className?: string;
}

const Cta02 = ({
  title = "Ship faster. Build better.",
  description = "Production-ready shadcn/ui blocks for your next project.",
  buttons = [
    {
      text: "Get started now",
      url: "#",
      icon: <ArrowUpRight className="size-4" />,
    },
    { text: "View Docs", url: "#", variant: "outline" },
  ],
  img = "https://www.shadcnship.com/images/image-preview.webp",
  className,
}: Cta02Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <Card className="grid items-center gap-8 p-8 pb-0 shadow-none md:grid-cols-3">
      <div className="flex flex-col gap-2 text-center md:col-span-2 md:text-left">
        <h2 className="text-4xl font-medium lg:text-5xl">{title}</h2>
        <p className="text-muted-foreground md:text-lg">{description}</p>
        {buttons && buttons.length > 0 && (
          <div className="mt-2 flex flex-col gap-4 sm:flex-row md:mb-8">
            {buttons.map((btn, i) => (
              <Button
                key={i}
                size="lg"
                variant={btn.variant ?? "default"}
                asChild
              >
                <a href={btn.url}>
                  {btn.text} {btn.icon}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="hiddedn max-h-60 self-end overflow-hidden md:block">
        <Iphone src={img ?? undefined} />
      </div>
    </Card>
  </section>
);

export default Cta02;
