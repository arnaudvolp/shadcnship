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
  { name: "Components", href: "/components" },
  { name: "Templates", href: "/templates" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 border-x">
        {/* Left side: Logo + Navigation */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Shadcn UI Blocks"
              width={32}
              height={32}
              className="h-8 w-8 dark:invert"
            />
            <span className="font-semibold">Shadcn UI Blocks</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList className="space-x-0">
                <NavigationMenuItem>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href="/blocks">Blocks</Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href="/templates">Templates</Link>
                  </Button>
                </NavigationMenuItem>
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
