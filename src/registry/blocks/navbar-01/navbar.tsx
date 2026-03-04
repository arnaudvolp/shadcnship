"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  LayoutTemplate,
  Layers,
  CreditCard,
  HelpCircle,
  MessageSquare,
  Zap,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface FeaturedItem {
  title: string;
  description: string;
  url: string;
}

interface MenuItemWithType {
  title: string;
  url: string;
  type?: "featured" | "grid" | "list" | "simple" | "icon";
  featured?: FeaturedItem;
  items?: MenuItem[];
}

interface Navbar01Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItemWithType[];
  auth?: {
    login?: { title: string; url: string };
    signup?: { title: string; url: string };
  };
  className?: string;
}

const defaultMenu: MenuItemWithType[] = [
  {
    title: "Menu",
    url: "#",
    type: "grid",
    items: [
      {
        title: "Hero",
        url: "#",
        description: "Landing page hero sections.",
        icon: <LayoutTemplate className="size-5 shrink-0" />,
      },
      {
        title: "Feature",
        url: "#",
        description: "Highlight your product features.",
        icon: <Layers className="size-5 shrink-0" />,
      },
      {
        title: "Pricing",
        url: "#",
        description: "Pricing tables and plan comparisons.",
        icon: <CreditCard className="size-5 shrink-0" />,
      },
      {
        title: "Testimonial",
        url: "#",
        description: "Social proof and customer reviews.",
        icon: <MessageSquare className="size-5 shrink-0" />,
      },
      {
        title: "FAQ",
        url: "#",
        description: "Frequently asked questions sections.",
        icon: <HelpCircle className="size-5 shrink-0" />,
      },
      {
        title: "CTA",
        url: "#",
        description: "Call-to-action sections.",
        icon: <Zap className="size-5 shrink-0" />,
      },
    ],
  },
  { title: "Features", url: "#" },
  { title: "Product", url: "#" },
  { title: "Blog", url: "#" },
  { title: "Pricing", url: "#" },
];

const defaultAuth = {
  login: { title: "Sign in", url: "#" },
  signup: { title: "Get Started", url: "#" },
};

const defaultLogo = {
  url: "#",
  src: "/logo.svg",
  alt: "Shadcnship",
  title: "Shadcnship",
};

// ListItem component for featured and grid menus
const ListItem = ({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children?: React.ReactNode;
}) => (
  <li>
    <NavigationMenuLink asChild>
      <Link href={href}>
        <div className="text-sm leading-none font-medium">{title}</div>
        {children && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        )}
      </Link>
    </NavigationMenuLink>
  </li>
);

// Render desktop menu items based on type
const renderMenuItem = (item: MenuItemWithType) => {
  // Simple link without dropdown
  if (!item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
          asChild
          className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground"
        >
          <Link href={item.url}>{item.title}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  // Featured type (like Home in shadcn docs)
  if (item.type === "featured" && item.featured) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-2 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <Link
                  href={item.featured.url}
                  className="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline transition-all duration-200 outline-none select-none hover:shadow-md focus:shadow-md md:p-6"
                >
                  <img src="/logo.svg" alt="" className="size-6 dark:invert" />
                  <div className="mt-4 mb-2 text-lg font-medium">
                    {item.featured.title}
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    {item.featured.description}
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            {item.items.map((subItem) => (
              <ListItem
                key={subItem.title}
                href={subItem.url}
                title={subItem.title}
              >
                {subItem.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // Grid type (2 columns)
  if (item.type === "grid") {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-2 p-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={subItem.url}
                    className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground"
                  >
                    {subItem.icon && (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-background text-foreground">
                        {subItem.icon}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // List type (single column with description)
  if (item.type === "list") {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[300px] gap-1 p-2">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link href={subItem.url}>
                    <div className="font-medium">{subItem.title}</div>
                    {subItem.description && (
                      <div className="text-sm text-muted-foreground">
                        {subItem.description}
                      </div>
                    )}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // Icon type (simple links with icons)
  if (item.type === "icon") {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[200px] gap-1 p-2">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={subItem.url}
                    className="flex flex-row items-center gap-2"
                  >
                    {subItem.icon}
                    {subItem.title}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // Default: simple dropdown
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-1 p-2">
          {item.items.map((subItem) => (
            <li key={subItem.title}>
              <NavigationMenuLink asChild>
                <Link href={subItem.url}>{subItem.title}</Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

// Render mobile menu items
const renderMobileMenuItem = (item: MenuItemWithType) => {
  if (!item.items) {
    return (
      <Link key={item.title} href={item.url} className="text-md font-semibold">
        {item.title}
      </Link>
    );
  }

  return (
    <AccordionItem key={item.title} value={item.title} className="border-b-0">
      <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
        {item.title}
      </AccordionTrigger>
      <AccordionContent className="mt-2">
        {item.items.map((subItem) => (
          <Link
            key={subItem.title}
            href={subItem.url}
            className="flex gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground"
          >
            {subItem.icon && (
              <div className="text-foreground">{subItem.icon}</div>
            )}
            <div>
              <div className="text-sm font-semibold">{subItem.title}</div>
              {subItem.description && (
                <p className="text-sm leading-snug text-muted-foreground">
                  {subItem.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

const Navbar01 = ({
  logo = defaultLogo,
  menu = defaultMenu,
  auth = defaultAuth,
  className,
}: Navbar01Props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full py-4 transition-all duration-300",
        scrolled && "w-full border-b border-border/40 bg-background",
        className,
      )}
    >
      <div className="px-6 md:px-12">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              {logo.src ? (
                <img
                  src={logo.src}
                  className="max-h-6 dark:invert"
                  alt={logo.alt}
                />
              ) : null}
              <span className="text-lg font-semibold tracking-tight">
                {logo.title}
              </span>
            </Link>
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-2">
            {auth && (
              <>
                {auth.login && (
                  <Button asChild variant="ghost" size="sm">
                    <Link href={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                )}
                {auth.signup && (
                  <Button asChild size="sm">
                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              {logo.src ? (
                <img src={logo.src} className="max-h-8" alt={logo.alt} />
              ) : null}
              <span className="text-lg font-semibold tracking-tight">
                {logo.title}
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      {logo.src ? (
                        <img
                          src={logo.src}
                          className="max-h-8"
                          alt={logo.alt}
                        />
                      ) : (
                        <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                          <Sparkles className="size-4" />
                        </div>
                      )}
                      <span className="text-lg font-semibold tracking-tight">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="flex flex-col gap-3">
                    {auth.login && (
                      <Button asChild variant="outline">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                    )}
                    {auth.signup && (
                      <Button asChild>
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar01 };
