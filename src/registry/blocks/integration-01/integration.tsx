import { cn } from "@/lib/utils";
import {
  ChatGptIcon,
  ClaudeIcon,
  GeminiIcon,
  GoogleIcon,
  NotionIcon,
  ReplitIcon,
  SlackIcon,
} from "@/components/social-icons";

interface IntegrationIcon {
  icon: React.ReactNode;
  className?: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface Integration01Props {
  tagline?: string;
  heading?: string;
  description?: string;
  integrations?: IntegrationIcon[];
  testimonial?: Testimonial;
  className?: string;
}

const IntegrationIconBubble = ({
  icon,
  className,
  size = "md",
}: IntegrationIcon & { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "size-8 ",
    md: "size-8 md:size-10",
    lg: "size-8 md:size-12",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border bg-white/5 backdrop-blur-xs",
        sizeClasses[size],
        className,
      )}
    >
      {icon}
    </div>
  );
};

const Integration01 = ({
  tagline = "Seamless integrations",
  heading = "Works with your favorite tools",
  description = "Connect with the apps you already use. Our components integrate seamlessly with your existing workflow, from AI assistants to collaboration tools.",
  integrations = [
    { icon: <SlackIcon className="w-full p-1.5" /> },
    { icon: <NotionIcon className="w-full p-1.5" /> },
    { icon: <ChatGptIcon className="w-full p-1.5 dark:invert" /> },
    { icon: <ClaudeIcon className="w-full p-1.5" /> },
    { icon: <NotionIcon className="w-full p-1.5" /> },
    { icon: <ReplitIcon className="w-full p-1.5" /> },
    { icon: <GoogleIcon className="w-full p-1.5" /> },
    { icon: <GeminiIcon className="w-full p-1.5" /> },
    { icon: <ReplitIcon className="w-full p-1.5" /> },
  ],
  testimonial = {
    quote:
      "The integration with our existing stack was effortless. We connected Slack, Notion, and our AI tools in minutes. It just works.",
    author: "Sarah Chen",
    role: "Engineering Lead at Acme",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  className,
}: Integration01Props) => {
  // Calculate positions on a flat elliptical arc (quadratic bezier curve)
  // Curve goes from (0, 100) through (50, 30) to (100, 100)
  const getPositionOnCurve = (index: number, total: number) => {
    // t goes from 0 to 1 across all icons
    const t = index / (total - 1);

    // Quadratic bezier: P = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
    // P0 = (0, 100), P1 = (50, 30), P2 = (100, 100)
    const p0 = { x: 0, y: 75 };
    const p1 = { x: 50, y: -50 }; // Control point - lower = flatter curve
    const p2 = { x: 100, y: 75 };

    const x =
      Math.pow(1 - t, 2) * p0.x +
      2 * (1 - t) * t * p1.x +
      Math.pow(t, 2) * p2.x;
    const y =
      Math.pow(1 - t, 2) * p0.y +
      2 * (1 - t) * t * p1.y +
      Math.pow(t, 2) * p2.y;

    return { x, y };
  };

  // Limit to 5 icons on mobile
  const mobileIntegrations = integrations.slice(0, 5);

  const renderIntegrationArc = (
    icons: IntegrationIcon[],
    className?: string,
  ) => {
    const count = icons.length;
    return (
      <div className={cn("relative aspect-3/1", className)}>
        {/* SVG curve */}
        <svg
          className="absolute inset-0 size-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 0 75 Q 50 -50 100 75"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-border"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Integration icons positioned along the curve */}
        {icons.map((integration, index) => {
          const pos = getPositionOnCurve(index, count);
          const isCenter = index === Math.floor(count / 2);

          return (
            <div
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            >
              <IntegrationIconBubble
                icon={integration.icon}
                size={isCenter ? "md" : "md"}
                className={isCenter ? "border-primary" : ""}
              />
            </div>
          );
        })}

        {/* Opacity masks for fade effect on edges */}
        <div className="pointer-events-none absolute inset-y-0 -left-8 w-1/4 bg-linear-to-r from-background to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 -right-8 w-1/4 bg-linear-to-l from-background to-transparent md:w-24" />
      </div>
    );
  };

  return (
    <section
      className={cn(
        "container mx-auto px-6 py-12 md:py-24 overflow-hidden",
        className,
      )}
    >
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium">{tagline}</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </div>

      {/* Integration visualization */}
      <div className="relative mx-auto mt-12 max-w-5xl">
        {/* Mobile version - 5 icons max */}
        {renderIntegrationArc(mobileIntegrations, "md:hidden")}

        {/* Desktop version - all icons */}
        {renderIntegrationArc(integrations, "hidden md:block")}

        {/* Testimonial */}
        <div className="md:absolute md:-bottom-6 lg:bottom-10 left-0 right-0 mx-auto mt-8  max-w-lg text-center">
          <p className="text-sm md:text-base font-medium">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            {testimonial.avatar && (
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="size-10 rounded-full object-cover"
              />
            )}
            <div className="text-left">
              <p className="text-sm font-medium">{testimonial.author}</p>
              <p className="text-xs text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Integration01 };
