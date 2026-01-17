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
