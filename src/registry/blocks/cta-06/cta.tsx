import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogoIcon } from "../social-icons/icons";

interface Cta06Props {
  title?: string;
  accent?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  image?: string;
  className?: string;
}

/* 4x4 cells on mobile (2x2 card, side columns cropped in half), 8x8 from md and 10x8 from lg (2x2 card) */
const MOBILE_TILES = 12;
const TABLET_TILES = 60;
const DESKTOP_TILES = 76;

const Cta06 = ({
  title = "Start building",
  accent = "now.",
  description = "Production-ready blocks that follow your theme. Copy, paste, ship.",
  buttonText = "Get started",
  buttonUrl = "#",
  image = "https://www.shadcnship.com/images/placeholders/hero-architecture-12.webp",
  className,
}: Cta06Props) => (
  <section
    className={cn(
      "my-12 w-full overflow-hidden md:my-0 md:h-screen",
      className,
    )}
  >
    <div className="mx-auto px-6 md:h-full md:px-0">
      <div className="relative -mx-6 aspect-3/4 overflow-hidden md:mx-0 md:aspect-auto md:h-full">
        <div className="absolute top-1/2 left-1/2 grid w-4/3 -translate-x-1/2 -translate-y-1/2 grid-cols-4 gap-2 md:w-11/10 md:grid-cols-8 md:gap-3 lg:grid-cols-10">
          {Array.from({ length: DESKTOP_TILES }).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={cn(
                "aspect-square cursor-pointer rounded-lg bg-muted/50 transition-all duration-300 hover:bg-muted md:rounded-xl",
                i >= MOBILE_TILES && "hidden md:block",
                i >= TABLET_TILES && "md:hidden lg:block",
              )}
            />
          ))}
          <Card className="relative col-span-2 col-start-2 row-span-2 row-start-2 justify-end overflow-hidden rounded-2xl p-0 shadow-none md:col-start-4 md:row-start-4 lg:col-start-5">
            <img
              src={image}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/30"
            />
            <div className="relative flex flex-col items-center gap-2 p-4 text-center">
              <div
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-full border bg-background/60"
              >
                <LogoIcon className="size-4 dark:invert" />
              </div>
              <h2 className="text-xl leading-tight font-medium tracking-tight xl:text-3xl">
                {title}{" "}
                {accent && (
                  <span className="font-serif font-normal italic">
                    {accent}
                  </span>
                )}
              </h2>
              {description && (
                <p className="max-w-xs text-sm text-foreground/70">
                  {description}
                </p>
              )}
              {buttonText && (
                <Button
                  className="h-8 min-w-48 rounded-full px-3 text-xs"
                  size="lg"
                  asChild
                >
                  <a href={buttonUrl}>
                    {buttonText}
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>
);

export default Cta06;
