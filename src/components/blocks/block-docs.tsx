"use client";

import { useBlockContext } from "@/providers/block-provider";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface BlockDocsProps {
  mdxSource: MDXRemoteSerializeResult | null;
}

// Custom components for MDX
const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-semibold mt-8 mb-4 first:mt-0" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-medium mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !props.className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left p-3 bg-muted font-medium border-b"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="p-3 border-b text-muted-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground mb-4"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
};

export function BlockDocs({ mdxSource }: BlockDocsProps) {
  const { docs } = useBlockContext();

  if (!mdxSource) {
    return (
      <div className="border-t p-8 text-center text-muted-foreground">
        <p>No documentation available for this component.</p>
      </div>
    );
  }

  return (
    <div className="border-t">
      <div className="p-6 md:p-8 max-w-3xl">
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </div>
  );
}
