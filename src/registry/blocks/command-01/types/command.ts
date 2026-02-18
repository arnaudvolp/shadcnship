// =============================================================================
// Command Palette Types
// =============================================================================

export type CommandGroup = "pages" | "actions" | "settings" | "recent" | "search";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  group: CommandGroup;
  onSelect: () => void;
  keywords?: string[];
  disabled?: boolean;
}

export interface CommandGroupConfig {
  id: CommandGroup;
  label: string;
  priority: number;
}

export interface CommandPaletteState {
  open: boolean;
  search: string;
  selectedIndex: number;
}

export interface CommandPaletteProps {
  items?: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
