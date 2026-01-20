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
    name: "default",
    label: "Default",
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
    name: "blue",
    label: "Blue",
    author: "shadcn",
    colors: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.141 0.005 285.823)",
        card: "oklch(1 0 0)",
        "card-foreground": "oklch(0.141 0.005 285.823)",
        popover: "oklch(1 0 0)",
        "popover-foreground": "oklch(0.141 0.005 285.823)",
        primary: "oklch(0.546 0.245 262.881)",
        "primary-foreground": "oklch(0.979 0.002 247.839)",
        secondary: "oklch(0.967 0.001 286.375)",
        "secondary-foreground": "oklch(0.21 0.006 285.885)",
        muted: "oklch(0.967 0.001 286.375)",
        "muted-foreground": "oklch(0.552 0.016 285.938)",
        accent: "oklch(0.967 0.001 286.375)",
        "accent-foreground": "oklch(0.21 0.006 285.885)",
        destructive: "oklch(0.577 0.245 27.325)",
        "destructive-foreground": "oklch(0.979 0.002 247.839)",
        border: "oklch(0.92 0.004 286.32)",
        input: "oklch(0.92 0.004 286.32)",
        ring: "oklch(0.546 0.245 262.881)",
        radius: "0.5rem",
      },
      dark: {
        background: "oklch(0.546 0.245 262.881)",
        foreground: "oklch(0.979 0.002 247.839)",
        card: "oklch(0.141 0.005 285.823)",
        "card-foreground": "oklch(0.979 0.002 247.839)",
        popover: "oklch(0.141 0.005 285.823)",
        "popover-foreground": "oklch(0.979 0.002 247.839)",
        primary: "oklch(0.546 0.245 262.881)",
        "primary-foreground": "oklch(0.546 0.245 262.881)",
        secondary: "oklch(0.268 0.019 286.033)",
        "secondary-foreground": "oklch(0.979 0.002 247.839)",
        muted: "oklch(0.268 0.019 286.033)",
        "muted-foreground": "oklch(0.715 0.014 285.989)",
        accent: "oklch(0.268 0.019 286.033)",
        "accent-foreground": "oklch(0.979 0.002 247.839)",
        destructive: "oklch(0.704 0.191 22.216)",
        "destructive-foreground": "oklch(0.979 0.002 247.839)",
        border: "oklch(0.268 0.019 286.033)",
        input: "oklch(0.268 0.019 286.033)",
        ring: "oklch(0.488 0.243 264.376)",
      },
    },
  },
  {
    name: "green",
    label: "Green",
    author: "shadcn",
    colors: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        "card-foreground": "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        "popover-foreground": "oklch(0.145 0 0)",
        primary: "oklch(0.596 0.145 163.225)",
        "primary-foreground": "oklch(0.985 0.002 163.225)",
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
        ring: "oklch(0.596 0.145 163.225)",
        radius: "0.5rem",
      },
      dark: {
        background: "oklch(0.153 0.007 34.298)",
        foreground: "oklch(0.95 0 0)",
        card: "oklch(0.188 0.008 32.532)",
        "card-foreground": "oklch(0.95 0 0)",
        popover: "oklch(0.175 0 0)",
        "popover-foreground": "oklch(0.95 0 0)",
        primary: "oklch(0.696 0.17 162.48)",
        "primary-foreground": "oklch(0.2 0.053 160.613)",
        secondary: "oklch(0.269 0 0)",
        "secondary-foreground": "oklch(0.985 0 0)",
        muted: "oklch(0.229 0 0)",
        "muted-foreground": "oklch(0.708 0 0)",
        accent: "oklch(0.226 0.008 33.59)",
        "accent-foreground": "oklch(0.985 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        "destructive-foreground": "oklch(0.969 0.015 12.422)",
        border: "oklch(0.269 0 0)",
        input: "oklch(0.269 0 0)",
        ring: "oklch(0.527 0.154 150.069)",
      },
    },
  },
  {
    name: "rose",
    label: "Rose",
    author: "shadcn",
    colors: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        "card-foreground": "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        "popover-foreground": "oklch(0.145 0 0)",
        primary: "oklch(0.645 0.246 16.439)",
        "primary-foreground": "oklch(0.985 0.002 16.439)",
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
        ring: "oklch(0.645 0.246 16.439)",
        radius: "0.5rem",
      },
      dark: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.205 0 0)",
        "card-foreground": "oklch(0.985 0 0)",
        popover: "oklch(0.205 0 0)",
        "popover-foreground": "oklch(0.985 0 0)",
        primary: "oklch(0.645 0.246 16.439)",
        "primary-foreground": "oklch(0.985 0.002 16.439)",
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
        ring: "oklch(0.645 0.246 16.439)",
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
        "font-sans": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        "font-serif": "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
        "font-mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
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
        "shadow-sm": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        shadow: "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        "shadow-md": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
        "shadow-lg": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
        "shadow-xl": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
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
        "font-sans": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        "font-serif": "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
        "font-mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
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
        "shadow-sm": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        shadow: "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        "shadow-md": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
        "shadow-lg": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
        "shadow-xl": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0 1px 3px 0px hsl(0 0% 0% / 0.25)",
      },
    },
  },
  // Add more themes here...
  // Export from https://tweakcn.com and paste the oklch values
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
