import type { ThemePreset } from "@/types/blocks";

/**
 * Theme presets for the block preview
 *
 * To add a new theme from tweakcn:
 * 1. Go to https://tweakcn.com
 * 2. Select or create a theme
 * 3. Export the CSS variables (use oklch or hsl format)
 * 4. Add a new ThemePreset object below
 *
 * IMPORTANT: Use full CSS color values like:
 * - oklch(0.205 0 0)
 * - hsl(221.2 83.2% 53.3%)
 * - #3b82f6
 *
 * Supported properties:
 * - Colors: background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring
 * - Chart colors: chart-1 to chart-5
 * - Sidebar colors: sidebar, sidebar-foreground, sidebar-primary, sidebar-accent, sidebar-border, sidebar-ring
 * - Fonts: font-sans, font-serif, font-mono
 * - Radius: radius (e.g., "0.5rem")
 * - Shadows: shadow-2xs, shadow-xs, shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl
 * - Shadow primitives: shadow-x, shadow-y, shadow-blur, shadow-spread, shadow-opacity, shadow-color
 * - Spacing: spacing, tracking-normal
 */
export const themePresets: ThemePreset[] = [
  {
    name: "vercel",
    label: "Vercel",
    author: "shadcn",
    colors: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        "card-foreground": "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        "popover-foreground": "oklch(0.145 0 0)",
        primary: "oklch(0.205 0 0)",
        "primary-foreground": "oklch(0.985 0 0)",
        secondary: "oklch(0.97 0 0)",
        "secondary-foreground": "oklch(0.205 0 0)",
        muted: "oklch(0.97 0 0)",
        "muted-foreground": "oklch(0.556 0 0)",
        accent: "oklch(0.97 0 0)",
        "accent-foreground": "oklch(0.205 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        "destructive-foreground": "oklch(0.985 0 0)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(0.708 0 0)",
        radius: "0.625rem",
      },
      dark: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.205 0 0)",
        "card-foreground": "oklch(0.985 0 0)",
        popover: "oklch(0.205 0 0)",
        "popover-foreground": "oklch(0.985 0 0)",
        primary: "oklch(0.922 0 0)",
        "primary-foreground": "oklch(0.205 0 0)",
        secondary: "oklch(0.269 0 0)",
        "secondary-foreground": "oklch(0.985 0 0)",
        muted: "oklch(0.269 0 0)",
        "muted-foreground": "oklch(0.708 0 0)",
        accent: "oklch(0.269 0 0)",
        "accent-foreground": "oklch(0.985 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        "destructive-foreground": "oklch(0.985 0 0)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.556 0 0)",
      },
    },
  },
  {
    name: "claude",
    label: "Claude",
    author: "tweakcn",
    colors: {
      light: {
        // Colors
        background: "oklch(0.9818 0.0054 95.0986)",
        foreground: "oklch(0.3438 0.0269 95.7226)",
        card: "oklch(0.9818 0.0054 95.0986)",
        "card-foreground": "oklch(0.1908 0.0020 106.5859)",
        popover: "oklch(1.0000 0 0)",
        "popover-foreground": "oklch(0.2671 0.0196 98.9390)",
        primary: "oklch(0.6171 0.1375 39.0427)",
        "primary-foreground": "oklch(1.0000 0 0)",
        secondary: "oklch(0.9245 0.0138 92.9892)",
        "secondary-foreground": "oklch(0.4334 0.0177 98.6048)",
        muted: "oklch(0.9341 0.0153 90.2390)",
        "muted-foreground": "oklch(0.6059 0.0075 97.4233)",
        accent: "oklch(0.9245 0.0138 92.9892)",
        "accent-foreground": "oklch(0.2671 0.0196 98.9390)",
        destructive: "oklch(0.1908 0.0020 106.5859)",
        "destructive-foreground": "oklch(1.0000 0 0)",
        border: "oklch(0.8847 0.0069 97.3627)",
        input: "oklch(0.7621 0.0156 98.3528)",
        ring: "oklch(0.6171 0.1375 39.0427)",
        // Chart colors
        "chart-1": "oklch(0.5583 0.1276 42.9956)",
        "chart-2": "oklch(0.6898 0.1581 290.4107)",
        "chart-3": "oklch(0.8816 0.0276 93.1280)",
        "chart-4": "oklch(0.8822 0.0403 298.1792)",
        "chart-5": "oklch(0.5608 0.1348 42.0584)",
        // Sidebar colors
        sidebar: "oklch(0.9663 0.0080 98.8792)",
        "sidebar-foreground": "oklch(0.3590 0.0051 106.6524)",
        "sidebar-primary": "oklch(0.6171 0.1375 39.0427)",
        "sidebar-primary-foreground": "oklch(0.9881 0 0)",
        "sidebar-accent": "oklch(0.9245 0.0138 92.9892)",
        "sidebar-accent-foreground": "oklch(0.3250 0 0)",
        "sidebar-border": "oklch(0.9401 0 0)",
        "sidebar-ring": "oklch(0.7731 0 0)",
        // Fonts
        "font-sans":
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        "font-serif":
          "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
        "font-mono":
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        // Radius
        radius: "2rem",
        // Shadow primitives
        "shadow-x": "0",
        "shadow-y": "1px",
        "shadow-blur": "3px",
        "shadow-spread": "0px",
        "shadow-opacity": "0.1",
        "shadow-color": "oklch(0 0 0)",
        // Shadow presets
        "shadow-2xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-sm":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        shadow:
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        "shadow-md":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
        "shadow-lg":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
        "shadow-xl":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0 1px 3px 0px hsl(0 0% 0% / 0.25)",
        // Spacing
        "tracking-normal": "0em",
        spacing: "0.25rem",
      },
      dark: {
        // Colors
        background: "oklch(0.2679 0.0036 106.6427)",
        foreground: "oklch(0.8074 0.0142 93.0137)",
        card: "oklch(0.2679 0.0036 106.6427)",
        "card-foreground": "oklch(0.9818 0.0054 95.0986)",
        popover: "oklch(0.3085 0.0035 106.6039)",
        "popover-foreground": "oklch(0.9211 0.0040 106.4781)",
        primary: "oklch(0.6724 0.1308 38.7559)",
        "primary-foreground": "oklch(1.0000 0 0)",
        secondary: "oklch(0.9818 0.0054 95.0986)",
        "secondary-foreground": "oklch(0.3085 0.0035 106.6039)",
        muted: "oklch(0.2213 0.0038 106.7070)",
        "muted-foreground": "oklch(0.7713 0.0169 99.0657)",
        accent: "oklch(0.2130 0.0078 95.4245)",
        "accent-foreground": "oklch(0.9663 0.0080 98.8792)",
        destructive: "oklch(0.6368 0.2078 25.3313)",
        "destructive-foreground": "oklch(1.0000 0 0)",
        border: "oklch(0.3618 0.0101 106.8928)",
        input: "oklch(0.4336 0.0113 100.2195)",
        ring: "oklch(0.6724 0.1308 38.7559)",
        // Chart colors
        "chart-1": "oklch(0.5583 0.1276 42.9956)",
        "chart-2": "oklch(0.6898 0.1581 290.4107)",
        "chart-3": "oklch(0.2130 0.0078 95.4245)",
        "chart-4": "oklch(0.3074 0.0516 289.3230)",
        "chart-5": "oklch(0.5608 0.1348 42.0584)",
        // Sidebar colors
        sidebar: "oklch(0.2357 0.0024 67.7077)",
        "sidebar-foreground": "oklch(0.8074 0.0142 93.0137)",
        "sidebar-primary": "oklch(0.3250 0 0)",
        "sidebar-primary-foreground": "oklch(0.9881 0 0)",
        "sidebar-accent": "oklch(0.1680 0.0020 106.6177)",
        "sidebar-accent-foreground": "oklch(0.8074 0.0142 93.0137)",
        "sidebar-border": "oklch(0.9401 0 0)",
        "sidebar-ring": "oklch(0.7731 0 0)",
        // Fonts
        "font-sans":
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        "font-serif":
          "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
        "font-mono":
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        // Radius
        radius: "2rem",
        // Shadow primitives
        "shadow-x": "0",
        "shadow-y": "1px",
        "shadow-blur": "3px",
        "shadow-spread": "0px",
        "shadow-opacity": "0.1",
        "shadow-color": "oklch(0 0 0)",
        // Shadow presets
        "shadow-2xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-sm":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        shadow:
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        "shadow-md":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
        "shadow-lg":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
        "shadow-xl":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0 1px 3px 0px hsl(0 0% 0% / 0.25)",
      },
    },
  },
  {
    name: "supabase",
    label: "Supabase",
    author: "tweakcn",
    colors: {
      light: {
        background: "oklch(0.9911 0 0)",
        foreground: "oklch(0.2046 0 0)",
        card: "oklch(0.9911 0 0)",
        "card-foreground": "oklch(0.2046 0 0)",
        popover: "oklch(0.9911 0 0)",
        "popover-foreground": "oklch(0.4386 0 0)",
        primary: "oklch(0.8348 0.1302 160.9080)",
        "primary-foreground": "oklch(0.2626 0.0147 166.4589)",
        secondary: "oklch(0.9940 0 0)",
        "secondary-foreground": "oklch(0.2046 0 0)",
        muted: "oklch(0.9461 0 0)",
        "muted-foreground": "oklch(0.2435 0 0)",
        accent: "oklch(0.9461 0 0)",
        "accent-foreground": "oklch(0.2435 0 0)",
        destructive: "oklch(0.5523 0.1927 32.7272)",
        "destructive-foreground": "oklch(0.9934 0.0032 17.2118)",
        border: "oklch(0.9037 0 0)",
        input: "oklch(0.9731 0 0)",
        ring: "oklch(0.8348 0.1302 160.9080)",
        // Chart colors
        "chart-1": "oklch(0.8348 0.1302 160.9080)",
        "chart-2": "oklch(0.6231 0.1880 259.8145)",
        "chart-3": "oklch(0.6056 0.2189 292.7172)",
        "chart-4": "oklch(0.7686 0.1647 70.0804)",
        "chart-5": "oklch(0.6959 0.1491 162.4796)",
        // Sidebar colors
        sidebar: "oklch(0.9911 0 0)",
        "sidebar-foreground": "oklch(0.5452 0 0)",
        "sidebar-primary": "oklch(0.8348 0.1302 160.9080)",
        "sidebar-primary-foreground": "oklch(0.2626 0.0147 166.4589)",
        "sidebar-accent": "oklch(0.9461 0 0)",
        "sidebar-accent-foreground": "oklch(0.2435 0 0)",
        "sidebar-border": "oklch(0.9037 0 0)",
        "sidebar-ring": "oklch(0.8348 0.1302 160.9080)",
        // Fonts
        "font-sans": "Outfit, sans-serif",
        "font-serif":
          "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
        "font-mono": "monospace",
        // Radius
        radius: "0.5rem",
        // Shadow primitives
        "shadow-x": "0px",
        "shadow-y": "1px",
        "shadow-blur": "3px",
        "shadow-spread": "0px",
        "shadow-opacity": "0.17",
        "shadow-color": "#000000",
        // Shadow presets
        "shadow-2xs": "0px 1px 3px 0px hsl(0 0% 0% / 0.09)",
        "shadow-xs": "0px 1px 3px 0px hsl(0 0% 0% / 0.09)",
        "shadow-sm":
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 1px 2px -1px hsl(0 0% 0% / 0.17)",
        shadow:
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 1px 2px -1px hsl(0 0% 0% / 0.17)",
        "shadow-md":
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 2px 4px -1px hsl(0 0% 0% / 0.17)",
        "shadow-lg":
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 4px 6px -1px hsl(0 0% 0% / 0.17)",
        "shadow-xl":
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 8px 10px -1px hsl(0 0% 0% / 0.17)",
        "shadow-2xl": "0px 1px 3px 0px hsl(0 0% 0% / 0.43)",
        // Spacing
        "tracking-normal": "0.025em",
        spacing: "0.25rem",
      },
      dark: {
        background: "oklch(0.1822 0 0)",
        foreground: "oklch(0.9288 0.0126 255.5078)",
        card: "oklch(0.2046 0 0)",
        "card-foreground": "oklch(0.9288 0.0126 255.5078)",
        popover: "oklch(0.2603 0 0)",
        "popover-foreground": "oklch(0.7348 0 0)",
        primary: "oklch(0.4365 0.1044 156.7556)",
        "primary-foreground": "oklch(0.9213 0.0135 167.1556)",
        secondary: "oklch(0.2603 0 0)",
        "secondary-foreground": "oklch(0.9851 0 0)",
        muted: "oklch(0.2393 0 0)",
        "muted-foreground": "oklch(0.7122 0 0)",
        accent: "oklch(0.3132 0 0)",
        "accent-foreground": "oklch(0.9851 0 0)",
        destructive: "oklch(0.3123 0.0852 29.7877)",
        "destructive-foreground": "oklch(0.9368 0.0045 34.3092)",
        border: "oklch(0.2809 0 0)",
        input: "oklch(0.2603 0 0)",
        ring: "oklch(0.8003 0.1821 151.7110)",
        // Chart colors
        "chart-1": "oklch(0.8003 0.1821 151.7110)",
        "chart-2": "oklch(0.7137 0.1434 254.6240)",
        "chart-3": "oklch(0.7090 0.1592 293.5412)",
        "chart-4": "oklch(0.8369 0.1644 84.4286)",
        "chart-5": "oklch(0.7845 0.1325 181.9120)",
        // Sidebar colors
        sidebar: "oklch(0.1822 0 0)",
        "sidebar-foreground": "oklch(0.6301 0 0)",
        "sidebar-primary": "oklch(0.4365 0.1044 156.7556)",
        "sidebar-primary-foreground": "oklch(0.9213 0.0135 167.1556)",
        "sidebar-accent": "oklch(0.3132 0 0)",
        "sidebar-accent-foreground": "oklch(0.9851 0 0)",
        "sidebar-border": "oklch(0.2809 0 0)",
        "sidebar-ring": "oklch(0.8003 0.1821 151.7110)",
        // Fonts
        "font-sans": "Outfit, sans-serif",
        "font-serif":
          "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
        "font-mono": "monospace",
        // Radius
        radius: "0.5rem",
        // Shadow primitives
        "shadow-x": "0px",
        "shadow-y": "1px",
        "shadow-blur": "3px",
        "shadow-spread": "0px",
        "shadow-opacity": "0.17",
        "shadow-color": "#000000",
        // Shadow presets
        "shadow-2xs": "0px 1px 3px 0px hsl(0 0% 0% / 0.09)",
        "shadow-xs": "0px 1px 3px 0px hsl(0 0% 0% / 0.09)",
        "shadow-sm":
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 1px 2px -1px hsl(0 0% 0% / 0.17)",
        shadow:
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 1px 2px -1px hsl(0 0% 0% / 0.17)",
        "shadow-md":
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 2px 4px -1px hsl(0 0% 0% / 0.17)",
        "shadow-lg":
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 4px 6px -1px hsl(0 0% 0% / 0.17)",
        "shadow-xl":
          "0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 8px 10px -1px hsl(0 0% 0% / 0.17)",
        "shadow-2xl": "0px 1px 3px 0px hsl(0 0% 0% / 0.43)",
      },
    },
  },
  {
    name: "modern-minimal",
    label: "Modern Minimal",
    author: "tweakcn",
    colors: {
      light: {
        background: "oklch(1.0000 0 0)",
        foreground: "oklch(0.3211 0 0)",
        card: "oklch(1.0000 0 0)",
        "card-foreground": "oklch(0.3211 0 0)",
        popover: "oklch(1.0000 0 0)",
        "popover-foreground": "oklch(0.3211 0 0)",
        primary: "oklch(0.6231 0.1880 259.8145)",
        "primary-foreground": "oklch(1.0000 0 0)",
        secondary: "oklch(0.9670 0.0029 264.5419)",
        "secondary-foreground": "oklch(0.4461 0.0263 256.8018)",
        muted: "oklch(0.9846 0.0017 247.8389)",
        "muted-foreground": "oklch(0.5510 0.0234 264.3637)",
        accent: "oklch(0.9514 0.0250 236.8242)",
        "accent-foreground": "oklch(0.3791 0.1378 265.5222)",
        destructive: "oklch(0.6368 0.2078 25.3313)",
        "destructive-foreground": "oklch(1.0000 0 0)",
        border: "oklch(0.9276 0.0058 264.5313)",
        input: "oklch(0.9276 0.0058 264.5313)",
        ring: "oklch(0.6231 0.1880 259.8145)",
        // Chart colors
        "chart-1": "oklch(0.6231 0.1880 259.8145)",
        "chart-2": "oklch(0.5461 0.2152 262.8809)",
        "chart-3": "oklch(0.4882 0.2172 264.3763)",
        "chart-4": "oklch(0.4244 0.1809 265.6377)",
        "chart-5": "oklch(0.3791 0.1378 265.5222)",
        // Sidebar colors
        sidebar: "oklch(0.9846 0.0017 247.8389)",
        "sidebar-foreground": "oklch(0.3211 0 0)",
        "sidebar-primary": "oklch(0.6231 0.1880 259.8145)",
        "sidebar-primary-foreground": "oklch(1.0000 0 0)",
        "sidebar-accent": "oklch(0.9514 0.0250 236.8242)",
        "sidebar-accent-foreground": "oklch(0.3791 0.1378 265.5222)",
        "sidebar-border": "oklch(0.9276 0.0058 264.5313)",
        "sidebar-ring": "oklch(0.6231 0.1880 259.8145)",
        // Fonts
        "font-sans": "Inter, sans-serif",
        "font-serif": "Source Serif 4, serif",
        "font-mono": "JetBrains Mono, monospace",
        // Radius
        radius: "0.375rem",
        // Shadow primitives
        "shadow-x": "0",
        "shadow-y": "1px",
        "shadow-blur": "3px",
        "shadow-spread": "0px",
        "shadow-opacity": "0.1",
        "shadow-color": "oklch(0 0 0)",
        // Shadow presets
        "shadow-2xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-sm":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        shadow:
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        "shadow-md":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
        "shadow-lg":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
        "shadow-xl":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0 1px 3px 0px hsl(0 0% 0% / 0.25)",
        // Spacing
        "tracking-normal": "0em",
        spacing: "0.25rem",
      },
      dark: {
        background: "oklch(0.2046 0 0)",
        foreground: "oklch(0.9219 0 0)",
        card: "oklch(0.2686 0 0)",
        "card-foreground": "oklch(0.9219 0 0)",
        popover: "oklch(0.2686 0 0)",
        "popover-foreground": "oklch(0.9219 0 0)",
        primary: "oklch(0.6231 0.1880 259.8145)",
        "primary-foreground": "oklch(1.0000 0 0)",
        secondary: "oklch(0.2686 0 0)",
        "secondary-foreground": "oklch(0.9219 0 0)",
        muted: "oklch(0.2393 0 0)",
        "muted-foreground": "oklch(0.7155 0 0)",
        accent: "oklch(0.3791 0.1378 265.5222)",
        "accent-foreground": "oklch(0.8823 0.0571 254.1284)",
        destructive: "oklch(0.6368 0.2078 25.3313)",
        "destructive-foreground": "oklch(1.0000 0 0)",
        border: "oklch(0.3715 0 0)",
        input: "oklch(0.3715 0 0)",
        ring: "oklch(0.6231 0.1880 259.8145)",
        // Chart colors
        "chart-1": "oklch(0.7137 0.1434 254.6240)",
        "chart-2": "oklch(0.6231 0.1880 259.8145)",
        "chart-3": "oklch(0.5461 0.2152 262.8809)",
        "chart-4": "oklch(0.4882 0.2172 264.3763)",
        "chart-5": "oklch(0.4244 0.1809 265.6377)",
        // Sidebar colors
        sidebar: "oklch(0.2046 0 0)",
        "sidebar-foreground": "oklch(0.9219 0 0)",
        "sidebar-primary": "oklch(0.6231 0.1880 259.8145)",
        "sidebar-primary-foreground": "oklch(1.0000 0 0)",
        "sidebar-accent": "oklch(0.3791 0.1378 265.5222)",
        "sidebar-accent-foreground": "oklch(0.8823 0.0571 254.1284)",
        "sidebar-border": "oklch(0.3715 0 0)",
        "sidebar-ring": "oklch(0.6231 0.1880 259.8145)",
        // Fonts
        "font-sans": "Inter, sans-serif",
        "font-serif": "Source Serif 4, serif",
        "font-mono": "JetBrains Mono, monospace",
        // Radius
        radius: "0.375rem",
        // Shadow primitives
        "shadow-x": "0",
        "shadow-y": "1px",
        "shadow-blur": "3px",
        "shadow-spread": "0px",
        "shadow-opacity": "0.1",
        "shadow-color": "oklch(0 0 0)",
        // Shadow presets
        "shadow-2xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-sm":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        shadow:
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        "shadow-md":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
        "shadow-lg":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
        "shadow-xl":
          "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0 1px 3px 0px hsl(0 0% 0% / 0.25)",
      },
    },
  },
  {
    name: "citrus",
    label: "Citrus",
    author: "tweakcn",
    colors: {
      light: {
        background: "oklch(0.9851 0 0)",
        foreground: "oklch(0.269 0 0)",
        card: "oklch(1 0 0)",
        "card-foreground": "oklch(0.269 0 0)",
        popover: "oklch(1 0 0)",
        "popover-foreground": "oklch(0.269 0 0)",
        primary: "oklch(0.8719 0.1829 125.59)",
        "primary-foreground": "oklch(0 0 0)",
        secondary: "oklch(0.5591 0.0631 185.87)",
        "secondary-foreground": "oklch(1 0 0)",
        muted: "oklch(0.97 0 0)",
        "muted-foreground": "oklch(0.439 0 0)",
        accent: "oklch(0.97 0 0)",
        "accent-foreground": "oklch(0.269 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        "destructive-foreground": "oklch(1 0 0)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.87 0 0)",
        ring: "oklch(0.8719 0.1829 125.59)",
        // Chart colors
        "chart-1": "oklch(0.8719 0.1829 125.59)",
        "chart-2": "oklch(0.5591 0.0631 185.87)",
        "chart-3": "oklch(0.8416 0.2214 127.63)",
        "chart-4": "oklch(0.8565 0.0734 182)",
        "chart-5": "oklch(0.8719 0.1829 125.59)",
        // Sidebar colors
        sidebar: "oklch(1 0 0)",
        "sidebar-foreground": "oklch(0.269 0 0)",
        "sidebar-primary": "oklch(0.8719 0.1829 125.59)",
        "sidebar-primary-foreground": "oklch(0 0 0)",
        "sidebar-accent": "oklch(0.9851 0 0)",
        "sidebar-accent-foreground": "oklch(0.269 0 0)",
        "sidebar-border": "oklch(0.922 0 0)",
        "sidebar-ring": "oklch(0.8719 0.1829 125.59)",
        // Radius
        radius: "0.5rem",
      },
      dark: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.922 0 0)",
        card: "oklch(0.205 0 0)",
        "card-foreground": "oklch(0.922 0 0)",
        popover: "oklch(0.205 0 0)",
        "popover-foreground": "oklch(0.922 0 0)",
        primary: "oklch(0.8719 0.1829 125.59)",
        "primary-foreground": "oklch(0 0 0)",
        secondary: "oklch(0.5591 0.0631 185.87)",
        "secondary-foreground": "oklch(1 0 0)",
        muted: "oklch(0.269 0 0)",
        "muted-foreground": "oklch(0.87 0 0)",
        accent: "oklch(0.269 0 0)",
        "accent-foreground": "oklch(0.922 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        "destructive-foreground": "oklch(1 0 0)",
        border: "oklch(0.269 0 0)",
        input: "oklch(0.371 0 0)",
        ring: "oklch(0.8719 0.1829 125.59)",
        // Chart colors
        "chart-1": "oklch(0.8719 0.1829 125.59)",
        "chart-2": "oklch(0.5591 0.0631 185.87)",
        "chart-3": "oklch(0.8416 0.2214 127.63)",
        "chart-4": "oklch(0.8565 0.0734 182)",
        "chart-5": "oklch(0.8719 0.1829 125.59)",
        // Sidebar colors
        sidebar: "oklch(0.205 0 0)",
        "sidebar-foreground": "oklch(0.922 0 0)",
        "sidebar-primary": "oklch(0.8719 0.1829 125.59)",
        "sidebar-primary-foreground": "oklch(0 0 0)",
        "sidebar-accent": "oklch(0.269 0 0)",
        "sidebar-accent-foreground": "oklch(0.922 0 0)",
        "sidebar-border": "oklch(0.269 0 0)",
        "sidebar-ring": "oklch(0.8719 0.1829 125.59)",
        // Radius
        radius: "0.5rem",
      },
    },
  },
];

/**
 * Get a theme preset by name
 */
export function getThemePreset(name: string): ThemePreset | undefined {
  return themePresets.find((preset) => preset.name === name);
}

/**
 * Get the default theme preset
 */
export function getDefaultThemePreset(): ThemePreset {
  return themePresets[0];
}
