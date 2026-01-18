import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Card, CardContent } from "@/components/ui/card";

interface Logo {
  name: string;
  src: string;
}

interface Logo01Props {
  label?: string;
  title?: string;
  logos?: Logo[];
  className?: string;
}

const defaultLogos: Logo[] = [
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel/000000/ffffff" },
  {
    name: "Next.js",
    src: "https://cdn.simpleicons.org/nextdotjs/000000/ffffff",
  },
  { name: "React", src: "https://cdn.simpleicons.org/react" },
  { name: "Tailwind CSS", src: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript" },
  { name: "Prisma", src: "https://cdn.simpleicons.org/prisma/000000/ffffff" },
  { name: "Stripe", src: "https://cdn.simpleicons.org/stripe" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/000000/ffffff" },
];

const Logo01 = ({
  label = "Our Partners",
  title = "We work with the best partners",
  logos = defaultLogos,
  className,
}: Logo01Props) => {
  const mid = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, mid);
  const row2 = logos.slice(mid);

  return (
    <section className={cn("overflow-hidden py-12 md:py-24", className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-8 text-center">
          {label && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">{title}</h2>
        </div>
      </div>

      <div className="relative flex flex-col gap-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {row1.map((logo, i) => (
            <Card key={`r1-${i}`} className="h-16 w-40 shrink-0 p-6">
              <CardContent className="flex h-full items-center justify-center p-0">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 max-w-full object-contain"
                />
              </CardContent>
            </Card>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {row2.map((logo, i) => (
            <Card key={`r2-${i}`} className="h-16 w-40 shrink-0 p-6">
              <CardContent className="flex h-full items-center justify-center p-0">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 max-w-full object-contain"
                />
              </CardContent>
            </Card>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bbg-linear-to-l from-background" />
      </div>
    </section>
  );
};

export { Logo01 };
