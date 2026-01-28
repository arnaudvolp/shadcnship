import type { BlockCategory } from "@/types/blocks";

/**
 * Categories configuration
 * This is the single source of truth for category metadata (title, icon, description)
 * registry.json references categories by name (string), this file provides the rich data
 */
export const categories = {
  hero: {
    name: "hero",
    title: "Hero",
    icon: "🚀",
    description: "Eye-catching hero sections for landing pages",
  },
  pricing: {
    name: "pricing",
    title: "Pricing",
    icon: "💰",
    description: "Pricing tables and comparison cards",
  },
  feature: {
    name: "feature",
    title: "Feature",
    icon: "✨",
    description: "Showcase your product features",
  },
  faq: {
    name: "faq",
    title: "FAQ",
    icon: "❓",
    description: "Frequently asked questions",
  },
  testimonial: {
    name: "testimonial",
    title: "Testimonial",
    icon: "💬",
    description: "Social proof and customer reviews",
  },
  footer: {
    name: "footer",
    title: "Footer",
    icon: "📄",
    description: "Footer sections with links and info",
  },
  navbar: {
    name: "navbar",
    title: "Navigation",
    icon: "🧭",
    description: "Navigation bars and menus",
  },
  contact: {
    name: "contact",
    title: "Contact",
    icon: "📧",
    description: "Contact forms and sections",
  },
  login: {
    name: "login",
    title: "Login",
    icon: "🔐",
    description: "Login and authentication pages",
  },
  signup: {
    name: "signup",
    title: "Signup",
    icon: "📝",
    description: "Signup and registration pages",
  },
  team: {
    name: "team",
    title: "Team",
    icon: "👥",
    description: "Team member sections",
  },
  stat: {
    name: "stat",
    title: "Stat",
    icon: "📊",
    description: "Statistics and metrics displays",
  },
  blog: {
    name: "blog",
    title: "Blog",
    icon: "📰",
    description: "Blog posts and articles",
  },
  timeline: {
    name: "timeline",
    title: "Timeline",
    icon: "⏱️",
    description: "Timeline and milestone displays",
  },
  logoCloud: {
    name: "logoCloud",
    title: "Logo Cloud",
    icon: "☁️",
    description: "Brand and partner logos",
  },
  cta: {
    name: "cta",
    title: "Call to Action",
    icon: "🎯",
    description: "Call to action sections",
  },
  background: {
    name: "background",
    title: "Background",
    icon: "🖼️",
    description: "Background sections",
  },
  logo: {
    name: "logo",
    title: "Logo",
    icon: "☁️",
    description: "Logo sections",
  },
  changelog: {
    name: "changelog",
    title: "Changelog",
    icon: "☁️",
    description: "Changelog sections",
  },
  integration: {
    name: "integration",
    title: "Integration",
    icon: "🔗",
    description: "Integration and tools showcase sections",
  },
  banner: {
    name: "banner",
    title: "Banner",
    icon: "📢",
    description: "Announcement banners and notification bars",
  },
  waitlist: {
    name: "waitlist",
    title: "Waitlist",
    icon: "⏳",
    description: "Waitlist and coming soon sections",
  },
} as const satisfies Record<string, BlockCategory>;

export type CategoryName = keyof typeof categories;

/**
 * Get category by name
 */
export function getCategory(name: string): BlockCategory | undefined {
  return categories[name as CategoryName];
}

/**
 * Get all categories as array
 */
export function getAllCategories(): BlockCategory[] {
  return Object.values(categories);
}
