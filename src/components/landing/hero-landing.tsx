"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoLanding } from "@/components/landing/logo-landing";
import { Background02 } from "@/registry/blocks/background-02/background";

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
        "flex flex-col w-full min-h-screen overflow-hidden relative",
        className,
      )}
    >
      <Background02 className="-z-1" mask="center" />
      <div className="flex-1 flex items-center justify-center py-12 md:py-24">
        <div className="container w-full mx-auto text-center px-6 md:px-12">
          <motion.div {...fadeUp(0)}>
            <Badge
              variant="secondary"
              className="py-1 border border-border"
              asChild
            >
              <a href="#">{badge}</a>
            </Badge>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl flex flex-col font-medium leading-tight tracking-tight max-w-5xl mx-auto"
          >
            {heading}
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            {description}
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm md:max-w-none md:w-fit"
          >
            {buttons?.primary && (
              <Button
                size="lg"
                className="w-full md:w-auto rounded-full"
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
                className="w-full md:w-auto rounded-full"
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
