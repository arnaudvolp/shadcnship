"use client";

import Link from "next/link";
import { Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { useState } from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigation = [
  { name: "Blocks", href: "/blocks" },
  { name: "Backgrounds", href: "/background" },
  { name: "Templates", href: "/templates" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto flex h-14 items-center justify-between border-x px-4">
        {/* Left side: Logo + Navigation */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Image
              src="/logo.svg"
              alt="ShadcnShip"
              width={18}
              height={18}
              className="dark:invert"
            />
            ShadcnShip
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <NavigationMenu>
              <NavigationMenuList className="space-x-0">
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      key={item.name}
                      href={item.href}
                      className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side: GitHub + Theme Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/arnaudvolp/shadcn-ui-blocks"
            target="_blank"
          >
            <Button variant="outline" size="icon">
              <Github className="size-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>

          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        navigation={navigation}
      />
    </header>
  );
}
