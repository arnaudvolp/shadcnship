"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Blocks,
  BookOpen,
  Code2,
  CreditCard,
  LayoutTemplate,
  Layers,
  Menu,
  MessageSquare,
  MousePointerClick,
  Navigation,
  PlayIcon,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { DropdownSubItem, MegaPanel, MobileMenuGroup } from "./components";
import type { NavButton, Navbar02Props } from "./types";

const Navbar02 = ({
  logo = (
    <a href="/" className="flex items-center gap-2">
      <img src="/logo.svg" alt="Shadcnship" className="size-5 dark:invert" />
      <span className="font-semibold">Shadcnship</span>
    </a>
  ),
  navItems = [
    { type: "link", text: "Product", url: "#" },
    { type: "link", text: "Pricing", url: "#" },
    {
      type: "dropdown",
      title: "Blocks",
      label: "Categories",
      items: [
        {
          text: "Hero Sections",
          url: "#",
          description: "Beautiful above-the-fold layouts to capture attention.",
          icon: <LayoutTemplate className="size-4" />,
        },
        {
          text: "Feature Blocks",
          url: "#",
          description: "Highlight your product's key capabilities.",
          icon: <Zap className="size-4" />,
        },
        {
          text: "Pricing Tables",
          url: "#",
          description: "Clear, conversion-optimized pricing layouts.",
          icon: <CreditCard className="size-4" />,
        },
        {
          text: "Navbars & Menus",
          url: "#",
          description: "Responsive navigation components for every project.",
          icon: <Navigation className="size-4" />,
        },
        {
          text: "CTA Sections",
          url: "#",
          description: "Drive conversions with compelling call-to-action blocks.",
          icon: <MousePointerClick className="size-4" />,
        },
      ],
    },
    {
      type: "mega",
      title: "Resources",
      groups: [
        {
          title: "Resources",
          items: [
            {
              text: "Blog",
              url: "#",
              description:
                "Deep dives, product updates, and design inspiration from our team.",
              icon: <BookOpen className="size-4" />,
            },
            {
              text: "Customer Stories",
              url: "#",
              description:
                "See how teams ship faster with our production-ready blocks.",
              icon: <MessageSquare className="size-4" />,
            },
            {
              text: "Video Tutorials",
              url: "#",
              description:
                "Step-by-step walkthroughs to get the most out of every component.",
              icon: <PlayIcon className="size-4" />,
            },
            {
              text: "Documentation",
              url: "#",
              description:
                "Everything you need to install, configure, and customize.",
              icon: <Code2 className="size-4" />,
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              text: "About us",
              url: "#",
              description:
                "Who we are, what we believe, and where we're taking this product.",
              icon: <Sparkles className="size-4" />,
            },
            {
              text: "Careers",
              url: "#",
              description:
                "Help us build the future of UI. Fully remote, high ownership.",
              icon: <Users className="size-4" />,
              badge: "We're hiring!",
            },
            {
              text: "Community",
              url: "#",
              description:
                "Connect with other builders on Slack, Discord, and GitHub.",
              icon: <Blocks className="size-4" />,
            },
            {
              text: "Legal",
              url: "#",
              description:
                "Terms, privacy policy, and licensing — plain English, no surprises.",
              icon: <Layers className="size-4" />,
            },
          ],
        },
      ],
      featured: {
        title: "Customer Stories",
        allText: "All Stories",
        allUrl: "#",
        testimonial: {
          logo: <img src="/logo.svg" alt="" className="size-4 dark:invert" />,
          name: "Shadcnship",
          text: "Using Shadcnship helped our team reduce development time by 60%. We shipped our landing page in just 2 days with production-ready blocks.",
        },
        image:
          "https://www.shadcnship.com/images/placeholders/hero-architecture-8.webp",
      },
    },
    { type: "link", text: "Blog", url: "#" },
    { type: "link", text: "Changelog", url: "#" },
  ],
  buttons = [
    { text: "Log in", url: "#", variant: "outline" },
    { text: "Get started", url: "#", variant: "default" },
  ],
  className,
}: Navbar02Props) => {
  const [openMenu, setOpenMenu] = useState<string | null>("Blocks");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b bg-background",
        className,
      )}
    >
      {/* Main bar */}
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          <div className="shrink-0">{logo}</div>

          <nav
            className="hidden items-center lg:flex"
            onMouseLeave={handleMouseLeave}
          >
            <NavigationMenu
              viewport={false}
              value={openMenu ?? ""}
              onValueChange={(v) => {
                if (v) handleMouseEnter(v);
              }}
            >
              <NavigationMenuList>
                {navItems.map((item) =>
                  item.type === "mega" ? (
                    <NavigationMenuItem key={item.title} value={item.title}>
                      <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground/80 hover:bg-accent/50">
                        {item.title}
                      </NavigationMenuTrigger>
                    </NavigationMenuItem>
                  ) : item.type === "dropdown" ? (
                    <NavigationMenuItem key={item.title} value={item.title}>
                      <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground/80 hover:bg-accent/50">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="flex w-72 flex-col gap-0.5 p-3">
                          {item.label && (
                            <p className="mb-1 px-3 text-xs font-semibold text-muted-foreground uppercase">
                              {item.label}
                            </p>
                          )}
                          {item.items.map((sub) => (
                            <DropdownSubItem key={sub.text} item={sub} />
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.text}>
                      <NavigationMenuLink asChild>
                        <a
                          href={item.url}
                          className="inline-flex h-9 items-center rounded-md px-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/50 hover:text-foreground"
                        >
                          {item.text}
                        </a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* Right: Buttons */}
        <div className="hidden items-center gap-2 lg:flex">
          {buttons.map((btn) => (
            <Button key={btn.text} variant={btn.variant ?? "default"} asChild>
              <a href={btn.url}>{btn.text}</a>
            </Button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <SheetHeader className="border-b px-6 py-4">
              <SheetTitle asChild>
                <div>{logo}</div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col px-6 py-4">
              {navItems.map((item) =>
                item.type === "mega" || item.type === "dropdown" ? (
                  <MobileMenuGroup key={item.title} item={item} />
                ) : (
                  <a
                    key={item.text}
                    href={item.url}
                    className="py-3 text-base font-semibold hover:text-muted-foreground"
                  >
                    {item.text}
                  </a>
                ),
              )}
            </div>
            <div className="mt-auto flex flex-col gap-3 border-t px-6 py-6">
              {buttons.map((btn: NavButton) => (
                <Button
                  key={btn.text}
                  variant={btn.variant === "ghost" ? "outline" : btn.variant}
                  className="w-full"
                  asChild
                >
                  <a href={btn.url}>{btn.text}</a>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Full-width mega panels */}
      {navItems.map((item) =>
        item.type === "mega" && openMenu === item.title ? (
          <div
            key={item.title}
            className="absolute left-0 w-full border-t border-b bg-background shadow-lg"
            onMouseEnter={() => handleMouseEnter(item.title)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto p-4">
              <MegaPanel item={item} />
            </div>
          </div>
        ) : null,
      )}
    </header>
  );
};

export default Navbar02;
export type {
  NavItem,
  NavItemMega,
  NavItemDropdown,
  NavMenuGroup,
  NavSubItem,
  NavButton,
  Navbar02Props,
} from "./types";
