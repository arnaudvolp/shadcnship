import { cn } from "@/lib/utils";

interface ErrorLink {
  text: string;
  href: string;
}

interface Error01Props {
  code?: string;
  title?: string;
  description?: string;
  homeLink?: ErrorLink;
  className?: string;
}

const linkClassName =
  "rounded-sm transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

const Error01 = ({
  code = "404",
  title = "Sorry, this page doesn't exist.",
  description = "The page you're looking for may have moved or never existed. Check the address, or head back to the",
  homeLink = { text: "homepage", href: "/" },
  className,
}: Error01Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <div className="relative w-full max-w-5xl">
          {/* Decorative watermark: an SVG scales with its container, no arbitrary font size needed */}
          <svg
            viewBox="0 0 300 120"
            className="mx-auto w-full max-w-3xl fill-current font-semibold text-muted-foreground/15"
            aria-hidden="true"
            focusable="false"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fontSize="130"
              letterSpacing="-6"
            >
              {code}
            </text>
          </svg>
          <h1 className="absolute inset-x-0 bottom-0 text-3xl leading-tight font-medium tracking-tight md:bottom-1/12 md:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>

        <p className="max-w-lg text-sm text-muted-foreground md:text-base">
          {description}{" "}
          <a
            href={homeLink.href}
            className={cn(
              linkClassName,
              "text-foreground underline underline-offset-4",
            )}
          >
            {homeLink.text}
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Error01;
