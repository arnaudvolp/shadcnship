import { Fragment } from "react";
import { Dribbble, Github, Hexagon, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FooterLink {
  text: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface Footer02Props {
  logo?: React.ReactNode;
  labels?: string[];
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  legalLinks?: FooterLink[];
  copyright?: string;
  className?: string;
}

const Footer02 = ({
  logo = (
    <div className="flex items-center gap-2">
      <Hexagon className="size-6" aria-hidden="true" />
      <span className="text-xl font-semibold tracking-tight">Acme</span>
    </div>
  ),
  labels = ["Product design", "Web development", "Brand identity"],
  links = [
    { text: "Work", href: "#" },
    { text: "Services", href: "#" },
    { text: "About", href: "#" },
    { text: "Pricing", href: "#" },
    { text: "Contact", href: "#" },
  ],
  socialLinks = [
    { label: "GitHub", href: "#", icon: <Github /> },
    { label: "LinkedIn", href: "#", icon: <Linkedin /> },
    { label: "Instagram", href: "#", icon: <Instagram /> },
    { label: "Dribbble", href: "#", icon: <Dribbble /> },
  ],
  legalLinks = [
    { text: "Terms & Conditions", href: "#" },
    { text: "Privacy Policy", href: "#" },
    { text: "Cookie Policy", href: "#" },
  ],
  copyright = `© ${new Date().getFullYear()} Acme. All rights reserved.`,
  className,
}: Footer02Props) => {
  return (
    <footer className={cn("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto flex flex-col items-center gap-6 px-6 text-center">
        {logo}

        {labels.length > 0 && (
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs tracking-wide text-muted-foreground uppercase">
            {labels.map((label) => (
              <li key={label} className="flex items-center gap-2">
                <span
                  className="size-1 rounded-full bg-muted-foreground"
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Separator className="my-8 md:my-10" />

      <div className="container mx-auto flex flex-col items-center gap-8 px-6 text-center">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {links.map((link) => (
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
        </nav>

        {socialLinks.length > 0 && (
          <ul className="flex items-center justify-center gap-3">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col items-center gap-3">
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
              {legalLinks.map((link, i) => (
                <Fragment key={link.text}>
                  {i > 0 && (
                    <li aria-hidden="true" className="hidden h-3 sm:block">
                      <Separator orientation="vertical" />
                    </li>
                  )}
                  <li>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  </li>
                </Fragment>
              ))}
            </ul>
          )}
          <p className="text-xs text-muted-foreground">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer02;
