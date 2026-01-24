import { cn } from "@/lib/utils";

interface Socials {
  icon?: React.ReactElement;
  href?: string;
}

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  socials?: Socials[];
}

interface Team01Props {
  tagline?: string;
  heading?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

// Custom Icons for the team section you can also import them from lucide-react
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TeamMemberCard = ({ name, role, image, socials }: TeamMember) => {
  return (
    <div className="group relative overflow-hidden rounded-xl">
      <div className="aspect-3/4 w-full bg-accent">
        {image && (
          <img
            src={image}
            alt={name}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-white/80">{role}</p>
        </div>
        {socials && (
          <div className="flex gap-2">
            {socials.map((social, index) => (
              <a
                href={social.href}
                key={index}
                className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Team01 = ({
  tagline = "Our team",
  heading = "Meet the Team",
  description = "We're a passionate group of designers and developers building beautiful, accessible components for the modern web.",
  members = [
    {
      name: "Sarah Chen",
      role: "Lead Designer",
      socials: [
        { icon: <LinkedInIcon className="size-4" />, href: "#" },
        { icon: <XIcon className="size-4" />, href: "#" },
      ],
    },
    {
      name: "Marcus Johnson",
      role: "Senior Developer",
      socials: [
        { icon: <LinkedInIcon className="size-4" />, href: "#" },
        { icon: <XIcon className="size-4" />, href: "#" },
      ],
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      socials: [
        { icon: <LinkedInIcon className="size-4" />, href: "#" },
        { icon: <XIcon className="size-4" />, href: "#" },
      ],
    },
  ],
  className,
}: Team01Props) => {
  return (
    <section className={cn("container mx-auto px-6 py-12 md:py-24", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium">{tagline}</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => (
          <TeamMemberCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
};

export { Team01 };
