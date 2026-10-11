/**
 * Generate block previews (public/r/previews/<name>.webp).
 *
 * By default only blocks whose preview is missing, or older than the block's
 * code, are captured. Needs the dev server running (npm run dev).
 *
 * Usage:
 *   npm run screenshots                               # new or changed blocks
 *   npm run screenshots -- --only hero-08,footer-02   # these blocks
 *   npm run screenshots -- --all                      # every block
 *   BASE_URL=http://localhost:3001 npm run screenshots
 */
import { chromium, type BrowserContext } from "playwright";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  unlinkSync,
} from "fs";
import { join } from "path";
import sharp from "sharp";

interface Item {
  name: string;
  files?: { path: string }[];
}

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = join(process.cwd(), "public", "r", "previews");

// 16:9 aspect ratio dimensions
const VIEWPORT = {
  width: 1920,
  height: 1080,
};

// WebP compression quality (0-100)
const WEBP_QUALITY = 80;

// This site only shows light previews. Add "dark" to also write <name>-dark.webp
type Theme = "light" | "dark";
const THEMES: readonly Theme[] = ["light"];

function mtime(path: string): number {
  return existsSync(path) ? statSync(path).mtimeMs : 0;
}

function loadItems(): Item[] {
  const registry = JSON.parse(
    readFileSync(join(process.cwd(), "registry.json"), "utf-8"),
  );
  return registry.items as Item[];
}

// "ok" only when every preview exists and is newer than the block's code
function previewStatus(item: Item): "ok" | "stale" | "missing" {
  const previews = THEMES.map((t) =>
    join(OUTPUT_DIR, `${item.name}${t === "dark" ? "-dark" : ""}.webp`),
  );
  if (!previews.every(existsSync)) return "missing";
  const codeTime = Math.max(
    ...(item.files ?? []).map((f) => mtime(join(process.cwd(), f.path))),
  );
  return codeTime > Math.min(...previews.map(mtime)) ? "stale" : "ok";
}

function pickBlocks() {
  const items = loadItems();
  const onlyIndex = process.argv.indexOf("--only");
  if (onlyIndex !== -1) {
    const names = (process.argv[onlyIndex + 1] ?? "")
      .split(",")
      .filter(Boolean);
    const unknown = names.filter((n) => !items.some((i) => i.name === n));
    if (unknown.length)
      throw new Error(`Unknown blocks: ${unknown.join(", ")}`);
    return items.filter((i) => names.includes(i.name));
  }
  if (process.argv.includes("--all")) return items;
  return items.filter((i) => previewStatus(i) !== "ok");
}

async function newThemeContext(
  browser: Awaited<ReturnType<typeof chromium.launch>>,
  theme: Theme,
): Promise<BrowserContext> {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    // Emulate OS-level dark preference (handles media queries)
    colorScheme: "dark",
  });

  // Inject CSS to hide Next.js dev tools and debug elements
  await context.addInitScript(() => {
    const style = document.createElement("style");
    style.textContent = `
      [data-nextjs-toast],
      #__next-build-watcher,
      [data-nextjs-scroll],
      button[aria-label*="debug"],
      button[aria-label*="Debug"],
      #react-devtools-hook__agent {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `;
    document.addEventListener("DOMContentLoaded", () =>
      document.head.appendChild(style),
    );
  });

  return context;
}

async function capture(context: BrowserContext, name: string, theme: Theme) {
  const page = await context.newPage();
  const suffix = theme === "dark" ? "-dark" : "";
  const tempPath = join(OUTPUT_DIR, `${name}${suffix}.png`);
  const outputPath = join(OUTPUT_DIR, `${name}${suffix}.webp`);

  try {
    const query = theme === "dark" ? "?theme=dark" : "";
    const response = await page.goto(
      `${BASE_URL}/blocks/${name}/preview${query}`,
      {
        waitUntil: "networkidle",
        timeout: 30000,
      },
    );

    // A build or runtime error renders the Next.js overlay: never save it as a preview
    const overlayError = await page.evaluate(() => {
      const root = document.querySelector("nextjs-portal")?.shadowRoot;
      const text = root?.textContent ?? "";
      return /Build Error|Runtime Error|Unhandled|Module not found|Failed to compile/.test(
        text,
      )
        ? text.slice(0, 160)
        : null;
    });
    if (!response || response.status() >= 400 || overlayError) {
      throw new Error(
        overlayError ?? `HTTP ${response?.status() ?? "no response"}`,
      );
    }

    // next-themes uses class-based dark mode: force the `dark` class on <html>
    if (theme === "dark") {
      await page.evaluate(() => {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      });
    }

    // Wait for content to be fully rendered and animations to settle
    await page.waitForTimeout(1500);

    // Remove the dev overlay host now that we know it holds no error
    await page.evaluate(() =>
      document.querySelector("nextjs-portal")?.remove(),
    );

    await page.screenshot({
      path: tempPath,
      type: "png",
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    });
    await sharp(tempPath).webp({ quality: WEBP_QUALITY }).toFile(outputPath);
    console.log(`   ✅ ${name}${suffix}.webp`);
    return true;
  } catch (error) {
    console.error(
      `   ❌ ${name}${suffix}: ${(error as Error).message.split("\n")[0]}`,
    );
    return false;
  } finally {
    if (existsSync(tempPath)) unlinkSync(tempPath);
    await page.close();
  }
}

async function generateScreenshots() {
  const blocks = pickBlocks();
  if (blocks.length === 0) {
    console.log(
      "✨ All previews are up to date. Use --all to regenerate everything.",
    );
    return;
  }

  // Fail fast if the dev server is down instead of capturing error pages
  try {
    await fetch(BASE_URL);
  } catch {
    throw new Error(
      `Dev server not reachable at ${BASE_URL}. Run npm run dev first.`,
    );
  }

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(
    `🚀 Capturing ${blocks.length} blocks (${THEMES.join(" + ")}): ${blocks.map((b) => b.name).join(", ")}`,
  );
  console.log(`🌐 Base URL: ${BASE_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  let successCount = 0;
  let errorCount = 0;

  for (const theme of THEMES) {
    const context = await newThemeContext(browser, theme);
    for (const block of blocks) {
      if (await capture(context, block.name, theme)) successCount++;
      else errorCount++;
    }
    await context.close();
  }

  await browser.close();

  console.log(
    `\n📊 Summary: ✅ ${successCount} · ❌ ${errorCount} · 📁 ${OUTPUT_DIR}`,
  );
  if (errorCount > 0) process.exitCode = 1;
}

generateScreenshots().catch((error) => {
  console.error(`❌ ${error.message}`);
  process.exitCode = 1;
});
