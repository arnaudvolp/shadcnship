"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { CommandItem, CommandGroup } from "../types/command";

interface UseCommandPaletteOptions {
  items: CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useCommandPalette({
  items,
  open: controlledOpen,
  onOpenChange,
}: UseCommandPaletteOptions) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use controlled or internal state
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback(
    (value: boolean) => {
      if (onOpenChange) {
        onOpenChange(value);
      } else {
        setInternalOpen(value);
      }
    },
    [onOpenChange]
  );

  // Fuzzy search function
  const fuzzyMatch = (text: string, query: string): boolean => {
    const pattern = query
      .toLowerCase()
      .split("")
      .map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join(".*");
    const regex = new RegExp(pattern, "i");
    return regex.test(text.toLowerCase());
  };

  // Filter and group items based on search
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;

    return items.filter((item) => {
      const searchLower = search.toLowerCase();
      const labelMatch = fuzzyMatch(item.label, search);
      const descriptionMatch = item.description
        ? fuzzyMatch(item.description, search)
        : false;
      const keywordMatch = item.keywords?.some(
        (keyword) => fuzzyMatch(keyword, search) || keyword.toLowerCase().includes(searchLower)
      );

      return labelMatch || descriptionMatch || keywordMatch;
    });
  }, [items, search]);

  // Group filtered items
  const groupedItems = useMemo(() => {
    const groups: Record<CommandGroup, CommandItem[]> = {
      recent: [],
      pages: [],
      actions: [],
      settings: [],
      search: [],
    };

    filteredItems.forEach((item) => {
      groups[item.group].push(item);
    });

    // Return only non-empty groups in order
    const groupOrder: CommandGroup[] = ["recent", "pages", "actions", "settings", "search"];
    return groupOrder
      .filter((group) => groups[group].length > 0)
      .map((group) => ({
        id: group,
        items: groups[group],
      }));
  }, [filteredItems]);

  // Flatten items for keyboard navigation
  const flattenedItems = useMemo(() => {
    return groupedItems.flatMap((group) => group.items);
  }, [groupedItems]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [open]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  // Keyboard navigation within dialog
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < flattenedItems.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : flattenedItems.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (flattenedItems[selectedIndex] && !flattenedItems[selectedIndex].disabled) {
            flattenedItems[selectedIndex].onSelect();
            setOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    [flattenedItems, selectedIndex, setOpen]
  );

  const selectItem = useCallback(
    (item: CommandItem) => {
      if (!item.disabled) {
        item.onSelect();
        setOpen(false);
      }
    },
    [setOpen]
  );

  return {
    open,
    setOpen,
    search,
    setSearch,
    selectedIndex,
    setSelectedIndex,
    groupedItems,
    flattenedItems,
    handleKeyDown,
    selectItem,
  };
}
