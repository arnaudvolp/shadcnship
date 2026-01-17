import type { MetadataRoute } from "next";
import { getBlocks } from "@/lib/registry";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();
  const blocks = getBlocks();

  // Dynamic block pages
  const blockPages: MetadataRoute.Sitemap = blocks.map((block) => ({
    url: `${baseUrl}/blocks/${block.name}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blocks`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    ...blockPages,
  ];
}
