import { chromium } from "playwright";
import { readFileSync, mkdirSync, existsSync, unlinkSync } from "fs";
import { join } from "path";
import sharp from "sharp";

interface RegistryItem {
  name: string;
  title: string;
  categories: string[];
}

interface Registry {
  items: RegistryItem[];
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

async function generateScreenshots() {
  // Read registry to get all block names
  const registryPath = join(process.cwd(), "registry.json");
  const registry: Registry = JSON.parse(readFileSync(registryPath, "utf-8"));
  const blocks = registry.items;

  // Create output directory if it doesn't exist
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(
    `🚀 Starting screenshot generation for ${blocks.length} blocks...`,
  );
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`📐 Viewport: ${VIEWPORT.width}x${VIEWPORT.height} (16:9)`);
  console.log(`🗜️  WebP quality: ${WEBP_QUALITY}\n`);

  // Launch browser
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  // Inject CSS to hide Next.js dev tools and debug elements
  await page.addInitScript(() => {
    // Create style element to hide dev tools
    const style = document.createElement("style");
    style.textContent = `
      /* Hide Next.js dev tools */
      [data-nextjs-dialog-overlay],
      [data-nextjs-toast],
      nextjs-portal,
      #__next-build-watcher,
      [data-nextjs-scroll],
      /* Hide any debug buttons */
      button[aria-label*="debug"],
      button[aria-label*="Debug"],
      [class*="nextjs"],
      /* Hide React DevTools */
      #react-devtools-hook__agent {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `;
    document.head.appendChild(style);
  });

  let successCount = 0;
  let errorCount = 0;

  for (const block of blocks) {
    const previewUrl = `${BASE_URL}/blocks/${block.name}/preview`;
    const tempPath = join(OUTPUT_DIR, `${block.name}.png`);
    const outputPath = join(OUTPUT_DIR, `${block.name}.webp`);

    try {
      console.log(`📸 Capturing: ${block.name}...`);

      // Navigate to preview page
      await page.goto(previewUrl, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      // Wait for content to be fully rendered and animations to settle
      await page.waitForTimeout(1500);

      // Hide any dynamically added dev tools
      await page.evaluate(() => {
        // Remove Next.js dev overlay
        const devOverlay = document.querySelector("nextjs-portal");
        if (devOverlay) devOverlay.remove();

        // Remove any fixed position debug buttons in corners
        document
          .querySelectorAll('[style*="position: fixed"]')
          .forEach((el) => {
            const rect = el.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            // If it's a small element in the bottom-right corner, likely a debug button
            if (
              rect.width < 150 &&
              rect.height < 150 &&
              rect.bottom > viewportHeight - 100 &&
              rect.right > viewportWidth - 100
            ) {
              (el as HTMLElement).style.display = "none";
            }
          });

        // Also hide by common dev tool patterns
        document
          .querySelectorAll(
            '[id*="__next"], [class*="__next"], [id*="devtools"], [class*="devtools"]',
          )
          .forEach((el) => {
            if (el.tagName !== "SCRIPT") {
              (el as HTMLElement).style.display = "none";
            }
          });
      });

      // Take screenshot as PNG first
      await page.screenshot({
        path: tempPath,
        type: "png",
        clip: {
          x: 0,
          y: 0,
          width: VIEWPORT.width,
          height: VIEWPORT.height,
        },
      });

      // Convert to WebP with compression
      await sharp(tempPath).webp({ quality: WEBP_QUALITY }).toFile(outputPath);

      // Remove temporary PNG file
      unlinkSync(tempPath);

      console.log(`   ✅ Saved: ${block.name}.webp`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error capturing ${block.name}:`, error);
      errorCount++;

      // Clean up temp file if it exists
      if (existsSync(tempPath)) {
        unlinkSync(tempPath);
      }
    }
  }

  await browser.close();

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📁 Screenshots saved to: ${OUTPUT_DIR}`);
}

// Run the script
generateScreenshots().catch(console.error);
