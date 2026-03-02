import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import {
  NextIcon,
  ReactIcon,
  TailwindIcon,
  GithubIcon,
  SupabaseIcon,
  ShadcnIcon,
  SlackIcon,
  NotionIcon,
} from "@/registry/blocks/social-icons/icons";

interface Logo {
  name: string;
  icon: React.ReactNode;
}

interface Logo01Props {
  label?: string;
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const defaultLogos: Logo[] = [
  { name: "Next.js", icon: <NextIcon className="size-7" /> },
  { name: "React", icon: <ReactIcon className="size-7" /> },
  { name: "Tailwind CSS", icon: <TailwindIcon className="size-7" /> },
  { name: "GitHub", icon: <GithubIcon className="size-7" /> },
  { name: "Supabase", icon: <SupabaseIcon className="size-7" /> },
  { name: "Shadcn/ui", icon: <ShadcnIcon className="size-7" /> },
  { name: "Slack", icon: <SlackIcon className="size-7" /> },
  { name: "Notion", icon: <NotionIcon className="size-7" /> },
];

const LogoCard = ({ logo }: { logo: Logo }) => (
  <div className="mx-4 flex size-20 shrink-0 items-center justify-center rounded-xl border bg-card">
    {logo.icon}
  </div>
);

const Logo01 = ({
  label = "Our Partners",
  heading = "We work with the best partners",
  logos = defaultLogos,
  className,
}: Logo01Props) => {
  const mid = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, mid);
  const row2 = logos.slice(mid);

  return (
    <section className={cn("overflow-hidden py-12 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          {label && (
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              {label}
            </p>
          )}
          <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
            {heading}
          </h2>
        </div>
      </div>
      <div className="relative flex flex-col gap-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {row1.map((logo, i) => (
            <LogoCard key={`r1-${i}`} logo={logo} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {row2.map((logo, i) => (
            <LogoCard key={`r2-${i}`} logo={logo} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background" />
      </div>
    </section>
  );
};

export { Logo01 };
