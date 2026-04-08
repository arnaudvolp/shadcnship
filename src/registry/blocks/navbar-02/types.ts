import type React from "react";

export interface NavSubItem {
  text: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface NavMenuGroup {
  title: string;
  items: NavSubItem[];
}

export interface NavFeatured {
  title: string;
  allText?: string;
  allUrl?: string;
  testimonial?: {
    logo?: React.ReactNode;
    name: string;
    text: string;
  };
  image?: string;
}

export interface NavItemSimple {
  type: "link";
  text: string;
  url: string;
}

export interface NavItemMega {
  type: "mega";
  title: string;
  groups: NavMenuGroup[];
  featured?: NavFeatured;
}

export interface NavItemDropdown {
  type: "dropdown";
  title: string;
  label?: string;
  items: NavSubItem[];
}

export type NavItem = NavItemSimple | NavItemMega | NavItemDropdown;

export interface NavButton {
  text: string;
  url: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
}

export interface Navbar02Props {
  logo?: React.ReactNode;
  navItems?: NavItem[];
  buttons?: NavButton[];
  className?: string;
}
