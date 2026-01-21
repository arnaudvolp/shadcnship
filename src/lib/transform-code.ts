import { readFile } from "fs/promises";
import { highlightCode, detectLanguage } from "./highlight";

export interface BlockCodeResult {
  raw: string;
  highlighted: string;
}

/**
 * Transform registry imports to user-friendly imports
 * @/registry/blocks/hero-01/components -> @/components
 */
export function transformCode(code: string): string {
  return code
    // @/registry/blocks/.../components -> @/components
    .replace(/@\/registry\/blocks\/[^/]+\/components/g, "@/components")
    // @/registry/blocks/.../ui -> @/components/ui
    .replace(/@\/registry\/blocks\/[^/]+\/ui/g, "@/components/ui")
    // @/registry/blocks/.../lib -> @/lib
    .replace(/@\/registry\/blocks\/[^/]+\/lib/g, "@/lib")
    // @/registry/blocks/.../hooks -> @/hooks
    .replace(/@\/registry\/blocks\/[^/]+\/hooks/g, "@/hooks");
}

/**
 * Read and transform a block file (raw code only)
 */
export async function getBlockCode(filePath: string): Promise<string> {
  try {
    const code = await readFile(filePath, "utf-8");
    return transformCode(code);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return "";
  }
}

/**
 * Read, transform, and highlight a block file
 * Returns both raw code (for copying) and highlighted HTML
 */
export async function getBlockCodeWithHighlight(
  filePath: string
): Promise<BlockCodeResult> {
  try {
    const rawCode = await readFile(filePath, "utf-8");
    const transformedCode = transformCode(rawCode);
    const lang = detectLanguage(filePath);
    const highlighted = await highlightCode(transformedCode, lang);

    return {
      raw: transformedCode,
      highlighted,
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return { raw: "", highlighted: "" };
  }
}
