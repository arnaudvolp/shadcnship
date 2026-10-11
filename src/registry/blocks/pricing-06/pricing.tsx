import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FeatureGroup {
  title: string;
  items: string[];
}

interface Pricing06Props {
  title?: string;
  subtitle?: string;
  highlight?: string;
  description?: string;
  intro?: {
    title: string;
    description: string;
    cta: { text: string; url: string };
  };
  notes?: { title: string; description: string }[];
  plan?: {
    badge?: string;
    name: string;
    price: string;
    period: string;
    cta: { text: string; url: string };
    featureGroups: FeatureGroup[];
  };
  className?: string;
}

const Pricing06 = ({
  title = "Everything you need.",
  subtitle = "One flat",
  highlight = "monthly rate.",
  description = "Skip the tiers and the add-ons. Get every feature, unlimited requests, and a dedicated team for a single monthly price.",
  intro = {
    title: "Start with a call",
    description:
      "Book a 15-minute call to see how we work and whether the plan fits your roadmap.",
    cta: { text: "Book a call", url: "#" },
  },
  notes = [
    {
      title: "Pause anytime",
      description:
        "Pause or cancel your subscription whenever you need. Unused days roll over to next month.",
    },
    {
      title: "Satisfaction guarantee",
      description:
        "Not happy after the first week? Get 75% of your payment back, no questions asked.",
    },
  ],
  plan = {
    badge: "2 spots left",
    name: "Full partnership",
    price: "$3,995",
    period: "/month",
    cta: { text: "Get started", url: "#" },
    featureGroups: [
      {
        title: "What's included",
        items: [
          "One request at a time",
          "48-hour average delivery",
          "Unlimited revisions",
          "Unlimited brand assets",
          "Progress tracking",
        ],
      },
      {
        title: "How we work",
        items: [
          "Shared project workspace",
          "Dedicated chat channel",
          "Weekly sync call",
          "Async video updates",
          "Cancel anytime",
        ],
      },
    ],
  },
  className,
}: Pricing06Props) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-16 md:py-24",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="max-w-2xl text-4xl font-medium tracking-tight md:text-5xl">
            {title}
            {(subtitle || highlight) && <br />}
            {subtitle}{" "}
            {highlight && (
              <em className="font-serif font-normal italic">{highlight}</em>
            )}
          </h2>
          <p className="max-w-xl text-muted-foreground">{description}</p>
        </div>

        <Card className="mx-auto mt-12 grid max-w-5xl gap-0 overflow-hidden p-0 md:grid-cols-5">
          {/* Plan column: first on mobile, right on desktop */}
          <div className="flex flex-col gap-6 bg-primary p-6 text-primary-foreground md:order-last md:col-span-3 md:p-8">
            <div className="flex flex-col gap-3">
              {plan.badge && (
                <Badge variant="secondary" className="w-fit">
                  {plan.badge}
                </Badge>
              )}
              <h3 className="text-2xl font-medium">{plan.name}</h3>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="flex items-baseline gap-1">
                  <span className="text-5xl font-semibold">{plan.price}</span>
                  <span className="text-primary-foreground/70">
                    {plan.period}
                  </span>
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a href={plan.cta.url}>{plan.cta.text}</a>
                </Button>
              </div>
            </div>

            <Separator className="bg-primary-foreground/20" />

            <div className="grid gap-6 md:grid-cols-2">
              {plan.featureGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-3">
                  <h4 className="text-sm font-medium">{group.title}</h4>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-primary-foreground/80"
                      >
                        <Check className="size-4 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Intro column */}
          <div className="flex flex-col gap-8 bg-muted/50 p-6 md:col-span-2 md:p-8">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-md border bg-background">
                  <Zap className="size-4" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-medium">{intro.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {intro.description}
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href={intro.cta.url}>{intro.cta.text}</a>
              </Button>
            </div>

            {notes.map((note) => (
              <div key={note.title} className="flex flex-col gap-1">
                <h4 className="text-sm font-medium">{note.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Pricing06;
