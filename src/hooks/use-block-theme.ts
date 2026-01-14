"use client";

import { useRef, useState } from "react";
import type { Theme } from "@/types/blocks";

export function useBlockTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    // Send theme change message to iframe
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "theme-change", theme: newTheme },
        window.location.origin
      );
    }
  };

  return { theme, setTheme: updateTheme, iframeRef };
}
