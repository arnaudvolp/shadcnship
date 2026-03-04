const logos = [
  {
    name: "Next.js",
    icon: <NextIcon className="size-6" />,
  },
  {
    name: "Shadcn/ui",
    icon: <ShadcnIcon className="size-5" />,
  },
  {
    name: "React",
    icon: <ReactIcon className="size-6" />,
  },
  {
    name: "Tailwind CSS",
    icon: <TailwindIcon className="size-6" />,
  },
];

import { cn } from "@/lib/utils";
import {
  NextIcon,
  ReactIcon,
  ShadcnIcon,
  TailwindIcon,
} from "@/registry/blocks/social-icons/icons";

const LogoLanding = ({ className }: { className?: string }) => {
  return (
    <section className={cn("py-8", className)}>
      <div className="container mx-auto flex items-center justify-center gap-x-6 px-6">
        <div className="flex items-center justify-center gap-x-6 gap-y-6 md:flex-wrap">
          <p className="text-center text-sm text-muted-foreground md:hidden">
            Built with
          </p>
          {logos.slice(0, 2).map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 transition-colors hover:text-muted-foreground"
            >
              {logo.icon}
            </div>
          ))}
          <p className="hidden text-center text-sm text-muted-foreground md:block">
            Built with the tools you already love
          </p>
          {logos.slice(2).map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 transition-colors hover:text-muted-foreground"
            >
              {logo.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { LogoLanding };
