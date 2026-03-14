import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NotionIcon,
  SlackIcon,
  GithubIcon,
  SupabaseIcon,
  ClaudeIcon,
  PostHogIcon,
} from "@/registry/blocks/social-icons/icons";

interface IntegrationItems {
  icon: React.ReactNode;
  name: string;
  description: string;
}

interface Feature09Props {
  label?: string;
  title?: string;
  description?: string;
  link?: { text: string; url: string };
  integrations?: IntegrationItems[];
  className?: string;
}

const defaultIntegrations: IntegrationItems[] = [
  {
    icon: <NotionIcon className="size-8" />,
    name: "Notion",
    description: "Manage your docs and knowledge base in one place.",
  },
  {
    icon: <SlackIcon className="size-8" />,
    name: "Slack",
    description: "Communicate instantly and keep teams aligned in real time.",
  },
  {
    icon: <GithubIcon className="size-8" />,
    name: "GitHub",
    description: "Track code changes and collaborate on pull requests.",
  },
  {
    icon: <SupabaseIcon className="size-8" />,
    name: "Supabase",
    description: "Connect auth, database, and storage in minutes.",
  },
  {
    icon: <ClaudeIcon className="size-8" />,
    name: "Claude",
    description: "Add AI capabilities powered by Anthropic out of the box.",
  },
  {
    icon: <PostHogIcon className="size-8" />,
    name: "PostHog",
    description: "Track analytics and understand your user behavior.",
  },
];

const Feature09 = ({
  label = "Integrations",
  title = "Works with your stack",
  description = "Pre-built blocks that plug into the tools your team already relies on — no configuration required.",
  link = { text: "View all integrations", url: "#" },
  integrations = defaultIntegrations,
  className,
}: Feature09Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <h2 className="max-w-2xl text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="text-muted-foreground md:text-lg">{description}</p>
      {link && (
        <a
          href={link.url}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {link.text}
          <ArrowUpRight className="size-3.5" />
        </a>
      )}
    </div>

    <div className="mt-10 overflow-hidden rounded-md border bg-card">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {integrations.map((integration, i) => (
          <div
            key={integration.name}
            className={cn(
              "flex flex-col items-center gap-3 p-8 text-center",
              i < integrations.length - 1 && "border-b md:border-b-0",
              i % 3 !== 2 && "md:border-r",
              i < 3 && "md:border-b",
            )}
          >
            <div className="flex size-14 items-center justify-center rounded-xl border bg-background shadow-sm">
              {integration.icon}
            </div>
            <div>
              <p className="font-semibold">{integration.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {integration.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Feature09;
