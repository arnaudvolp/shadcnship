import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Banner01Props {
  title?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  className?: string;
}

const Banner01 = ({
  title = "Shadcn 2026",
  description = "Join us in Paris from June 20 - 24 to see what's coming next.",
  button = {
    text: "Register now",
    url: "#",
  },
  className,
}: Banner01Props) => {
  return (
    <div
      className={cn("w-full bg-primary text-neutral-50 fixed top-0", className)}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <p className="text-sm">
          <span className="font-semibold">{title}</span>
          <span className="mx-2 text-neutral-400 dark:text-neutral-500">·</span>
          <span className="text-neutral-300 dark:text-neutral-600">
            {description}
          </span>
        </p>
        {button && (
          <a
            href={button.url}
            className="group flex shrink-0 items-center gap-1 text-sm font-medium transition-colors hover:text-neutral-300 dark:hover:text-neutral-600"
          >
            {button.text}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </div>
  );
};

export { Banner01 };
