import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "../social-icons/icons";

interface Cta01Props {
  title?: string;
  description?: string;
  logo?: React.ReactNode;
  buttons?: {
    text: string;
    url?: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  }[];
  className?: string;
}

const Cta01 = ({
  title = "Ship faster. Build better.",
  description = "Production-ready shadcn/ui blocks for your next project.",
  logo = <LogoIcon className="size-16 dark:invert" />,
  buttons = [
    {
      text: "Get started now",
      url: "#",
      icon: <ArrowUpRight className="size-4" />,
    },
  ],
  className,
}: Cta01Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <div className="flex flex-col gap-8 overflow-hidden rounded-lg border p-8 lg:flex-row lg:items-center lg:p-16">
      {logo && logo}
      <div className="flex flex-1 flex-col justify-center">
        <h2 className="text-3xl leading-tight font-medium tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground md:text-lg">{description}</p>
      </div>
      {buttons && buttons.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row">
          {buttons.map((btn, i) => (
            <Button
              key={i}
              variant={btn.variant ?? "default"}
              size="lg"
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
  </section>
);

export { Cta01 };
