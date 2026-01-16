import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getBlock } from "@/lib/registry";
import type { Theme } from "@/types/blocks";

interface PreviewPageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ theme?: Theme }>;
}

export async function generateStaticParams() {
  const { blocks } = await import("@/config/blocks");
  return blocks.map((block) => ({ name: block.name }));
}

export default async function PreviewPage(props: PreviewPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { name } = params;
  const theme = searchParams.theme || "light";

  const blockDetails = getBlock(name);

  if (!blockDetails || !blockDetails.component) {
    notFound();
  }

  const Component = blockDetails.component;

  return (
    <>
      <div className={theme}>
        <div className="bg-background text-foreground min-h-screen">
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            }
          >
            {blockDetails.layout ? (
              <blockDetails.layout>
                <Component />
              </blockDetails.layout>
            ) : (
              <Component />
            )}
          </Suspense>
        </div>
      </div>

      {/* Inline script to handle theme changes from parent */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('message', (event) => {
              if (event.data.type === 'theme-change') {
                const html = document.documentElement;
                if (event.data.theme === 'dark') {
                  html.classList.add('dark');
                } else {
                  html.classList.remove('dark');
                }
              }
            });
          `,
        }}
      />
    </>
  );
}
