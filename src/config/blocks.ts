import React from "react";
import type { BlockCategory, RegistryBlock } from "@/types/blocks";

export const categories = {
  hero: {
    name: "hero",
    title: "Hero Sections",
    icon: "🚀",
    description: "Eye-catching hero sections for landing pages",
  },
  pricing: {
    name: "pricing",
    title: "Pricing",
    icon: "💰",
    description: "Pricing tables and comparison cards",
  },
  features: {
    name: "features",
    title: "Features",
    icon: "✨",
    description: "Showcase your product features",
  },
  faq: {
    name: "faq",
    title: "FAQ",
    icon: "❓",
    description: "Frequently asked questions",
  },
  testimonials: {
    name: "testimonials",
    title: "Testimonials",
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
  stats: {
    name: "stats",
    title: "Stats",
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
} as const satisfies Record<string, BlockCategory>;

export const blocks: RegistryBlock[] = [
  // Hero Blocks
  {
    name: "hero-01",
    title: "Hero 01",
    description: "A simple hero block with gradient background and CTA buttons",
    component: React.lazy(
      () => import("@/registry/blocks/hero-01/hero").then(mod => ({ default: mod.Hero01 }))
    ),
    categories: [categories.hero],
    files: [
      { path: "hero.tsx" },
    ],
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    image: "/images/blocks/hero-01.png",
  },
];
