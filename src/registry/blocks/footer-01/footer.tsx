import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterItem {
  title: string;
  links: FooterLink[];
}

interface Footer01Props {
  logo?: React.ReactNode;
  slogan?: string;
  items?: FooterItem[];
  copyright?: string;
  socialLinks?: { icon: React.ReactNode; href: string }[];
  className?: string;
}

const Footer01 = ({
  logo = (
    <div className="flex items-center gap-2">
      <img src="/logo.svg" alt="Shadcnship" className="size-6 dark:invert" />
      <span className="font-semibold">Shadcnship</span>
    </div>
  ),
  slogan = "Production-ready Shadcn blocks, connected to Supabase, Stripe, and Resend.",
  items = [
    {
      title: "Product",
      links: [
        { text: "Overview", href: "#" },
        { text: "Features", href: "#" },
        { text: "Pricing", href: "#" },
        { text: "Releases", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About us", href: "#" },
        { text: "Careers", href: "#" },
        { text: "News", href: "#" },
        { text: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Blog", href: "#" },
        { text: "Events", href: "#" },
        { text: "Tutorials", href: "#" },
        { text: "Support", href: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", href: "#" },
        { text: "Instagram", href: "#" },
        { text: "LinkedIn", href: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Shadcnship. All rights reserved.`,
  socialLinks = [
    {
      icon: <Github className="size-5" />,
      href: "#",
    },
    {
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "#",
    },
  ],
  className,
}: Footer01Props) => {
  const colsTemplate = `repeat(${items.length}, 1fr)`;

  return (
    <footer className={cn("w-full border-t", className)}>
      <div className="container mx-auto px-6 py-12 md:px-12">
        {/* Top section */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Logo + slogan */}
          <div className="lg:w-64 lg:shrink-0">
            {logo}
            <p className="mt-4 text-sm text-muted-foreground">{slogan}</p>
          </div>

          {/* Nav groups */}
          <div
            className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-(--cols)"
            style={{ "--cols": colsTemplate } as React.CSSProperties}
          >
            {items.map((item) => (
              <div key={item.title}>
                <h3 className="mb-4 text-sm font-semibold">{item.title}</h3>
                <ul className="space-y-3">
                  {item.links.map((link) => (
                    <li key={link.text}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">{copyright}</p>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer01 };
