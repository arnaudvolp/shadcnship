"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Theme, ScreenSize, ThemePreset } from "@/types/blocks";
import { getDefaultThemePreset } from "@/config/theme-presets";

export function useBlockTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");
  const [themePreset, setThemePresetState] = useState<ThemePreset>(getDefaultThemePreset());
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendMessageToIframe = useCallback((message: object) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, window.location.origin);
    }
  }, []);

  // Sync current state to iframe when it signals it's ready
  const syncStateToIframe = useCallback(() => {
    // Send current theme mode
    sendMessageToIframe({ type: "theme-change", theme });

    // Send current preset
    sendMessageToIframe({
      type: "theme-preset-change",
      preset: {
        name: themePreset.name,
        colors: themePreset.colors,
      },
    });
  }, [theme, themePreset, sendMessageToIframe]);

  // Listen for iframe ready message
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "preview-ready") {
        syncStateToIframe();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [syncStateToIframe]);

  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    sendMessageToIframe({ type: "theme-change", theme: newTheme });
  }, [sendMessageToIframe]);

  const updateThemePreset = useCallback((preset: ThemePreset) => {
    setThemePresetState(preset);
    sendMessageToIframe({
      type: "theme-preset-change",
      preset: {
        name: preset.name,
        colors: preset.colors,
      },
    });
  }, [sendMessageToIframe]);

  return {
    theme,
    setTheme: updateTheme,
    screenSize,
    setScreenSize,
    themePreset,
    setThemePreset: updateThemePreset,
    iframeRef,
  };
}
