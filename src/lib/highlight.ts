import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

/**
 * Get or create a cached Shiki highlighter instance
 */
async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["typescript", "tsx", "javascript", "jsx", "css", "json", "bash"],
    });
  }
  return highlighter;
}

/**
 * Highlight code with Shiki using GitHub themes
 * Returns HTML that supports both light and dark modes via CSS classes
 */
export async function highlightCode(
  code: string,
  lang: string = "tsx"
): Promise<string> {
  const hl = await getHighlighter();

  // Use shiki's dual theme feature for light/dark mode support
  const html = hl.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });

  return html;
}

/**
 * Detect language from file extension
 */
export function detectLanguage(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase();
  const langMap: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    css: "css",
    json: "json",
    sh: "bash",
    bash: "bash",
  };
  return langMap[ext || ""] || "tsx";
}
