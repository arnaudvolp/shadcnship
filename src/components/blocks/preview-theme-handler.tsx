"use client";

import { useEffect, useState } from "react";

interface ThemePresetColors {
  [key: string]: string;
}

interface ThemePresetMessage {
  name: string;
  colors: {
    light: ThemePresetColors;
    dark: ThemePresetColors;
  };
}

export function PreviewThemeHandler() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [currentPreset, setCurrentPreset] = useState<ThemePresetMessage | null>(null);

  const applyThemePreset = (preset: ThemePresetMessage, theme: "light" | "dark") => {
    if (!preset?.colors) return;

    const colors = preset.colors[theme] || preset.colors.light;
    const root = document.documentElement;

    // Apply all CSS variables from the preset
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  const applyThemeMode = (theme: "light" | "dark") => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, theme, preset } = event.data;

      if (type === "theme-change" && theme) {
        setCurrentTheme(theme);
        applyThemeMode(theme);

        // Re-apply preset colors for new theme mode
        if (currentPreset) {
          applyThemePreset(currentPreset, theme);
        }
      }

      if (type === "theme-preset-change" && preset) {
        setCurrentPreset(preset);
        applyThemePreset(preset, currentTheme);
      }
    };

    window.addEventListener("message", handleMessage);

    // Notify parent that iframe is ready to receive theme data
    window.parent?.postMessage({ type: "preview-ready" }, "*");

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [currentTheme, currentPreset]);

  // Re-apply preset when theme changes
  useEffect(() => {
    if (currentPreset) {
      applyThemePreset(currentPreset, currentTheme);
    }
  }, [currentTheme, currentPreset]);

  return null;
}
