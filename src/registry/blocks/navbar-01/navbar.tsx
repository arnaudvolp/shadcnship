"use client";

import { useState } from "react";
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
  ChevronDown,
  Layers,
  Menu,
  Sparkles,
  Sunset,
} from "lucide-react";

// ---- Types ----

interface NavSubItem {
  text: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavItemSimple {
  type: "link";
  text: string;
  url: string;
}

interface NavItemMenu {
  type: "menu";
  title: string;
  items: NavSubItem[];
}

type NavItem = NavItemSimple | NavItemMenu;

interface NavButton {
  text: string;
  url: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
}

interface Navbar01Props {
  logo?: React.ReactNode;
  navItems?: NavItem[];
  buttons?: NavButton[];
  className?: string;
}

// ---- Desktop menu item card ----

const SubItemCard = ({ item }: { item: NavSubItem }) => (
  <NavigationMenuLink asChild>
    <a
      href={item.url}
      className="flex items-start gap-2 rounded-md p-4 transition-colors hover:bg-muted"
    >
      {item.icon && (
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
          {item.icon}
        </div>
      )}
      <div>
        <p className="text-sm leading-snug font-semibold">{item.text}</p>
        {item.description && (
          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  </NavigationMenuLink>
);

// ---- Mobile accordion group ----

const MobileMenuGroup = ({ item }: { item: NavItemMenu }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-base font-semibold"
      >
        {item.title}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="flex flex-col gap-1 pb-2 pl-2">
          {item.items.map((sub) => (
            <a
              key={sub.text}
              href={sub.url}
              className="flex items-center gap-2 rounded-md py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {sub.icon && (
                <span className="flex size-7 items-center justify-center rounded border bg-muted text-muted-foreground">
                  {sub.icon}
                </span>
              )}
              {sub.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// ---- Main component ----

const Navbar01 = ({
  logo = (
    <a href="/" className="flex items-center gap-2">
      <img src="/logo.svg" alt="Shadcnship" className="size-5 dark:invert" />
      <span className="font-semibold">Shadcnship</span>
    </a>
  ),
  navItems = [
    {
      type: "menu",
      title: "Menu",
      items: [
        {
          text: "Components",
          url: "#",
          description: "Beautiful UI components built with Tailwind CSS.",
          icon: <Blocks className="size-4 shrink-0" />,
        },
        {
          text: "Templates",
          url: "#",
          description: "Ready-to-use templates for your next project.",
          icon: <Layers className="size-4 shrink-0" />,
        },
        {
          text: "Blocks",
          url: "#",
          description: "Pre-built sections to speed up development.",
          icon: <Sparkles className="size-4 shrink-0" />,
        },
        {
          text: "Themes",
          url: "#",
          description: "Beautiful themes to customize your app.",
          icon: <Sunset className="size-4 shrink-0" />,
        },
      ],
    },
    { type: "link", text: "Features", url: "#" },
    { type: "link", text: "Product", url: "#" },
    { type: "link", text: "Blog", url: "#" },
    { type: "link", text: "Pricing", url: "#" },
  ],
  buttons = [
    { text: "Sign in", url: "#", variant: "ghost" },
    { text: "Get Started", url: "#", variant: "default" },
  ],
  className,
}: Navbar01Props) => (
  <header className={cn("fixed top-0 w-full border-b", className)}>
    <div className="container mx-auto flex h-14 items-center justify-between px-6 md:px-12">
      {/* Logo */}
      <div className="shrink-0">{logo}</div>

      {/* Desktop nav */}
      <nav className="hidden items-center lg:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) =>
              item.type === "menu" ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[520px] grid-cols-2 gap-1 p-3">
                      {item.items.map((sub) => (
                        <li key={sub.text}>
                          <SubItemCard item={sub} />
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.text}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.url}
                      className="inline-flex h-9 items-center px-4 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
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

      {/* Desktop CTA buttons */}
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
              item.type === "menu" ? (
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
            {buttons.map((btn) => (
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
  </header>
);

export default Navbar01;
export type { NavItem, NavSubItem, NavButton, Navbar01Props };
