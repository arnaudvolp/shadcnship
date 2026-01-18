import { cn } from "@/lib/utils";
import { Github, Sparkles } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterMenuItem {
  title: string;
  links: FooterLink[];
}

interface Footer01Props {
  logo?: React.ReactNode;
  tagline?: string;
  menuItems?: FooterMenuItem[];
  copyright?: string;
  socialLinks?: { icon: React.ReactNode; href: string }[];
  className?: string;
}

const Footer01 = ({
  logo = (
    <div className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Sparkles className="size-4" />
      </div>
      <span className="font-semibold">Shadcn Blocks</span>
    </div>
  ),
  tagline = "Production-ready UI blocks built with shadcn/ui and Tailwind CSS.",
  menuItems = [
    {
      title: "Product",
      links: [
        { label: "Overview", href: "#" },
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Releases", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "News", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "#" },
        { label: "Events", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Twitter", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Shadcn Blocks. All rights reserved.`,
  socialLinks = [
    {
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "#",
    },
    {
      icon: <Github className="size-5" />,
      href: "#",
    },
  ],
  className,
}: Footer01Props) => {
  const count = menuItems.length;
  const desktopGridTemplate = `1.5fr ${Array(count).fill("1fr").join(" ")}`;
  const tabletGridTemplate = Array(count <= 3 ? 3 : count)
    .fill("1fr")
    .join(" ");

  return (
    <footer className={cn("border-t", className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-8 max-w-sm lg:hidden">
          {logo}
          <p className="mt-4 text-sm text-muted-foreground">{tagline}</p>
        </div>

        <div
          className="grid grid-cols-2 gap-8 md:grid-cols-(--tablet-cols) lg:grid-cols-(--desktop-cols)"
          style={
            {
              "--tablet-cols": tabletGridTemplate,
              "--desktop-cols": desktopGridTemplate,
            } as React.CSSProperties
          }
        >
          <div className="hidden lg:block lg:pr-8">
            {logo}
            <p className="mt-4 text-sm text-muted-foreground">{tagline}</p>
          </div>
          {menuItems.map((item) => (
            <div key={item.title}>
              <h3 className="mb-4 text-sm font-semibold">{item.title}</h3>
              <ul className="space-y-3">
                {item.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">{copyright}</p>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <div className="size-4">{social.icon}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer01 };
