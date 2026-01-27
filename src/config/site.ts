import type { Metadata } from "next";

/**
 * Site configuration
 * Central place for all site-wide settings and metadata
 */
export const siteConfig = {
  name: "ShadcnShip",
  description:
    "Production Ready Shadcn UI & Tailwind Blocks. Browse, copy, and start building with 30+ ready-to-use blocks.",
  url:
    process.env.NODE_ENV === "production"
      ? `https://${process.env.NEXT_PUBLIC_SITE_URL}` || ""
      : "http://localhost:3000",
  ogImage: "/og-image.png",
  author: {
    name: "Arnaud Volpi",
    url: "https://twitter.com/arnaudbuilds",
    twitter: "@arnaudbuilds",
  },
  links: {
    github: "https://github.com/arnaudvolpi/shadcn-ui-blocks",
  },
  keywords: [
    "ShadcnShip",
    "Shadcn",
    "Shadcn blocks",
    "Shadcn ui",
    "Shadcn UI blocks",
    "Shadcn UI components",
    "Shadcn landing pages",
    "production-ready components",
    "copy paste components",
    "React components",
    "Next.js components",
    "Tailwind CSS blocks",
    "browse components",
    "building projects",
    "UI blocks",
    "Hero sections",
    "Pricing components",
    "Landing page blocks",
  ],
};

/**
 * Get absolute URL for a path
 */
export function absoluteUrl(path: string = ""): string {
  return `${siteConfig.url}${path}`;
}

/**
 * Generate keywords for a block page based on category and block name
 */
export function generateBlockKeywords(
  blockTitle: string,
  categoryTitle: string,
): string[] {
  const blockLower = blockTitle.toLowerCase();
  const categoryLower = categoryTitle.toLowerCase();

  return [
    // Block-specific
    blockTitle,
    `${blockLower} component`,
    `${blockLower} section`,
    `shadcn ${blockLower}`,
    // Category-specific
    `${categoryLower} block`,
    `${categoryLower} component`,
    `shadcn ${categoryLower}`,
    `react ${categoryLower}`,
    // Generic tech stack
    "shadcn ui",
    "tailwind css",
    "react component",
    "nextjs component",
  ];
}

/**
 * Construct metadata with site defaults
 * Use this helper to create consistent metadata across pages
 */
export function constructMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  keywords,
  noIndex = false,
  ...rest
}: {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
} & Partial<Metadata> = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords || siteConfig.keywords,
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.author.url,
      },
    ],
    creator: siteConfig.author.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [absoluteUrl(image)],
      creator: siteConfig.author.twitter,
    },
    icons: {
      icon: "/images//favicon.ico",
      shortcut: "/images//favicon-16x16.png",
      apple: "/images/apple-touch-icon.png",
    },
    manifest: "/images/site.webmanifest",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    ...rest,
  };
}

/**
 * Base metadata for the root layout
 */
export const baseMetadata: Metadata = constructMetadata({
  title: "Copy Production-Ready Blocks & Components to Ship Faster",
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url || "http://localhost:3000"),
});
