import { cn } from "@/lib/utils";
import { LinkedInIcon, XIcon } from "@/registry/blocks/social-icons/icons";

interface Socials {
  icon?: React.ReactElement;
  href?: string;
}

interface TeamMember {
  name: string;
  role: string;
  img?: string;
  socials?: Socials[];
}

interface Team01Props {
  label?: string;
  title?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

const TeamMemberCard = ({ name, role, img, socials }: TeamMember) => (
  <div className="group relative overflow-hidden rounded-xl">
    <div className="aspect-3/4 w-full bg-muted/30">
      {img && (
        <img
          src={img}
          alt={name}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </div>
    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-white">{name}</h3>
        <p className="text-sm text-white/80">{role}</p>
      </div>
      {socials && (
        <div className="flex gap-2">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
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

const Team01 = ({
  label = "Our team",
  title = "Meet the Team",
  description = "We're a passionate group of designers and developers building beautiful, accessible components for the modern web.",
  members = [
    {
      name: "Sarah Chen",
      role: "Lead Designer",
      img: "https://www.shadcnship.com/mages/avatars/avatar-1.webp",
      socials: [
        { icon: <LinkedInIcon className="size-4" />, href: "#" },
        { icon: <XIcon className="size-4" />, href: "#" },
      ],
    },
    {
      name: "Marcus Johnson",
      role: "Senior Developer",
      img: "https://www.shadcnship.com/mages/avatars/avatar-4.webp",
      socials: [
        { icon: <LinkedInIcon className="size-4" />, href: "#" },
        { icon: <XIcon className="size-4" />, href: "#" },
      ],
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      img: "https://www.shadcnship.com/mages/avatars/avatar-5.webp",
      socials: [
        { icon: <LinkedInIcon className="size-4" />, href: "#" },
        { icon: <XIcon className="size-4" />, href: "#" },
      ],
    },
  ],
  className,
}: Team01Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="text-muted-foreground md:text-lg">{description}</p>
    </div>
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, index) => (
        <TeamMemberCard key={index} {...member} />
      ))}
    </div>
  </section>
);

export default Team01;
