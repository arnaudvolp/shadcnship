import type { Metadata } from "next";

/**
 * Site configuration
 * Central place for all site-wide settings and metadata
 */
export const siteConfig = {
  name: "Shadcn UI Blocks",
  description:
    "A curated collection of beautiful, customizable Shadcn UI blocks and components. Preview, copy, and integrate ready-to-use code snippets into your Next.js projects.",
  url:
    process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` || ""
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
    "Shadcn UI",
    "Shadcn UI blocks",
    "Shadcn UI components",
    "React components",
    "Next.js components",
    "Tailwind CSS",
    "UI components",
    "UI blocks",
    "Copy paste components",
    "Ready-to-use components",
    "Hero sections",
    "Pricing components",
    "Landing page blocks",
    "Web development",
    "Frontend development",
  ],
};

/**
 * Get absolute URL for a path
 */
export function absoluteUrl(path: string = ""): string {
  return `${siteConfig.url}${path}`;
}

/**
 * Construct metadata with site defaults
 * Use this helper to create consistent metadata across pages
 */
export function constructMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  noIndex = false,
  ...rest
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} & Partial<Metadata> = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;
  const metaDescription = description || siteConfig.description;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: siteConfig.keywords,
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
  title: "Beautiful Shadcn UI Blocks & Components",
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url || "http://localhost:3000"),
});
