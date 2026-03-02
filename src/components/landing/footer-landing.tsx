import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ============================================================================
// Data
// ============================================================================

const blockCategories = [
  { title: "Hero", category: "hero" },
  { title: "Feature", category: "feature" },
  { title: "Pricing", category: "pricing" },
  { title: "Testimonial", category: "testimonial" },
  { title: "FAQ", category: "faq" },
  { title: "CTA", category: "cta" },
];

const productLinks = [
  { title: "All Blocks", href: "/blocks" },
  { title: "Backgrounds", href: "/background" },
  { title: "Roadmap", href: "/roadmap" },
];

const companyLinks = [
  { title: "Contact", href: "mailto:codewithnaud@gmail.com" },
  { title: "X / Twitter", href: "https://x.com/arnaudbuilds", external: true },
  {
    title: "Threads",
    href: "https://www.threads.com/@arnaudbuilds",
    external: true,
  },
  {
    title: "GitHub",
    href: "https://github.com/arnaudvolp/shadcn-ui-blocks",
    external: true,
  },
];

// ============================================================================
// Component
// ============================================================================

interface FooterLandingProps {
  className?: string;
}

const FooterLanding = ({ className }: FooterLandingProps) => (
  <footer className={cn("border-t", className)}>
    <div className="container mx-auto border-x">
      {/* Main grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b">
        {/* Col 1 — Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4 p-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-md font-medium"
          >
            <Image
              src="/logo.svg"
              alt="ShadcnShip"
              width={24}
              height={24}
              className="dark:invert"
            />
            Shadcnship
          </Link>
          <p className="text-xs leading-relaxed text-muted-foreground max-w-[200px]">
            Production-ready Shadcn blocks, connected to Supabase, Stripe, and
            Resend.
          </p>
        </div>

        {/* Col 2 — Blocks */}
        <div className="flex flex-col gap-4 p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Blocks
          </p>
          <ul className="flex flex-col gap-2.5">
            {blockCategories.map((item) => (
              <li key={item.category}>
                <Link
                  href={`/blocks?category=${item.category}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Product */}
        <div className="flex flex-col gap-4 p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Product
          </p>
          <ul className="flex flex-col gap-2.5">
            {productLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Company */}
        <div className="flex flex-col gap-4 p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Company
          </p>
          <ul className="flex flex-col gap-2.5">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ShadcnShip. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with{" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            className="hover:text-foreground transition-colors underline underline-offset-2"
          >
            shadcn/ui
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export { FooterLanding };
