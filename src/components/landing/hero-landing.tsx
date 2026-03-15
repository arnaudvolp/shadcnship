"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoLanding } from "@/components/landing/logo-landing";
import Background02 from "@/registry/blocks/background-02/background";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

interface HeroLandingProps {
  badge?: string;
  heading?: React.ReactNode;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      icon?: React.ReactNode;
      openInNewPage?: boolean;
    };
    secondary?: {
      text: string;
      url: string;
      icon?: React.ReactNode;
      openInNewPage?: boolean;
    };
  };
  logos?: React.ReactNode[];
  logosLabel?: string;
  className?: string;
}

const HeroLanding = ({
  badge = "100% Free & Open Source",
  heading = (
    <>
      Everything you need to{" "}
      <span className="text-muted-foreground">ship faster</span>
    </>
  ),
  description = "Pre-built landing page components for React. Just copy the code and focus on what matters — your product.",
  buttons = {
    primary: {
      text: "Browse Components",
      url: "#",
      icon: <ArrowUpRight className="size-4" />,
    },
    secondary: { text: "View Docs", url: "#" },
  },
  className,
}: HeroLandingProps) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full flex-col overflow-hidden",
        className,
      )}
    >
      <Background02 className="-z-1" mask="center" />
      <div className="flex flex-1 items-center justify-center py-12 md:py-24">
        <div className="container mx-auto w-full px-6 text-center md:px-12">
          <motion.div {...fadeUp(0)}>
            <Badge
              variant="secondary"
              className="border border-border py-1"
              asChild
            >
              <a href="#">{badge}</a>
            </Badge>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="mx-auto mt-4 flex max-w-5xl flex-col text-4xl leading-tight font-medium tracking-tight md:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {description}
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="mx-auto mt-6 grid max-w-sm grid-cols-1 gap-4 md:w-fit md:max-w-none md:grid-cols-2"
          >
            {buttons?.primary && (
              <Button
                size="lg"
                className="w-full rounded-full md:w-auto"
                asChild
              >
                <a
                  href={buttons.primary.url}
                  target={buttons.primary.openInNewPage ? "_blank" : ""}
                >
                  {buttons.primary.text} {buttons.primary.icon}
                </a>
              </Button>
            )}
            {buttons?.secondary && (
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full md:w-auto"
                asChild
              >
                <a
                  href={buttons.secondary.url}
                  target={buttons.secondary.openInNewPage ? "_blank" : ""}
                >
                  {buttons.secondary.text} {buttons.secondary.icon}
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div {...fadeUp(0.45)}>
        <LogoLanding className="border-t bg-background" />
      </motion.div>
    </section>
  );
};

export { HeroLanding };
