import { siteConfig, absoluteUrl } from "@/config/site";
import type {
  BreadcrumbList,
  FAQPage,
  Graph,
  WebSite,
  Organization,
  SoftwareApplication,
  CollectionPage,
  SoftwareSourceCode,
} from "schema-dts";

interface JsonLdProps {
  data: Graph;
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Home page JSON-LD with WebSite, Organization, and SoftwareApplication
 */
export function HomePageJsonLd() {
  const website: WebSite = {
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blocks?search={search_term_string}`,
      },
      query: "required name=search_term_string",
    },
  };

  const organization: Organization = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/images/logo.png"),
    sameAs: [siteConfig.links.github, siteConfig.author.url],
  };

  const softwareApp: SoftwareApplication = {
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  };

  const jsonLd: Graph = {
    "@context": "https://schema.org",
    "@graph": [website, organization, softwareApp],
  };

  return <JsonLd data={jsonLd} />;
}

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ JSON-LD for pages with FAQ sections
 */
export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const faqPage: FAQPage = {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  const jsonLd: Graph = {
    "@context": "https://schema.org",
    "@graph": [faqPage],
  };

  return <JsonLd data={jsonLd} />;
}

interface BlockItem {
  name: string;
  title: string;
  description: string;
  image?: string;
}

/**
 * Blocks listing page JSON-LD with CollectionPage and BreadcrumbList
 */
export function BlocksPageJsonLd({ blocks }: { blocks: BlockItem[] }) {
  const breadcrumbList: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blocks",
        item: absoluteUrl("/blocks"),
      },
    ],
  };

  const collectionPage: CollectionPage = {
    "@type": "CollectionPage",
    name: "Shadcn UI Blocks & Components",
    description:
      "Browse production-ready Shadcn UI blocks and components. Copy the code and ship your project faster.",
    url: absoluteUrl("/blocks"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: blocks.length,
      itemListElement: blocks.slice(0, 30).map((block, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/blocks/${block.name}`),
        name: block.title,
        description: block.description,
      })),
    },
  };

  const jsonLd: Graph = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbList, collectionPage],
  };

  return <JsonLd data={jsonLd} />;
}

interface BlockDetailProps {
  name: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  image?: string;
}

/**
 * Individual block page JSON-LD with SoftwareSourceCode and BreadcrumbList
 */
export function BlockDetailJsonLd({ block }: { block: BlockDetailProps }) {
  const breadcrumbList: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blocks",
        item: absoluteUrl("/blocks"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: block.category,
        item: absoluteUrl(`/blocks?category=${block.categorySlug}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: block.title,
        item: absoluteUrl(`/blocks/${block.name}`),
      },
    ],
  };

  const softwareSourceCode: SoftwareSourceCode = {
    "@type": "SoftwareSourceCode",
    name: block.title,
    description: block.description,
    url: absoluteUrl(`/blocks/${block.name}`),
    image: block.image ? absoluteUrl(block.image) : absoluteUrl("/og-image.png"),
    codeRepository: siteConfig.links.github,
    programmingLanguage: {
      "@type": "ComputerLanguage",
      name: "TypeScript",
    },
    runtimePlatform: "React",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    license: "https://opensource.org/licenses/MIT",
  };

  const jsonLd: Graph = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbList, softwareSourceCode],
  };

  return <JsonLd data={jsonLd} />;
}

/**
 * Category page JSON-LD with BreadcrumbList
 */
export function CategoryPageJsonLd({
  category,
  categorySlug,
}: {
  category: string;
  categorySlug: string;
}) {
  const breadcrumbList: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blocks",
        item: absoluteUrl("/blocks"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category,
        item: absoluteUrl(`/blocks?category=${categorySlug}`),
      },
    ],
  };

  const jsonLd: Graph = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbList],
  };

  return <JsonLd data={jsonLd} />;
}
