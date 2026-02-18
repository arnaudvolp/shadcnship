"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "./components";
import { CommandGroup } from "./components/command-list";
import { useCommandPalette } from "./hooks/use-command-palette";
import type { CommandItem as CommandItemType, CommandPaletteProps, CommandGroup as CommandGroupType } from "./types/command";
import {
  Home,
  FileText,
  Settings,
  User,
  Bell,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Search,
  Plus,
  FolderOpen,
  Mail,
  Calendar,
  Command,
} from "lucide-react";

// =============================================================================
// Demo Items
// =============================================================================

const createDemoItems = (): CommandItemType[] => [
  // Recent
  {
    id: "recent-1",
    label: "Dashboard",
    icon: <Home className="size-4" />,
    group: "recent",
    shortcut: ["G", "D"],
    onSelect: () => console.log("Navigate to Dashboard"),
    keywords: ["home", "overview"],
  },
  {
    id: "recent-2",
    label: "Settings",
    icon: <Settings className="size-4" />,
    group: "recent",
    shortcut: ["G", "S"],
    onSelect: () => console.log("Navigate to Settings"),
    keywords: ["preferences", "config"],
  },

  // Pages
  {
    id: "page-1",
    label: "Home",
    description: "Go to homepage",
    icon: <Home className="size-4" />,
    group: "pages",
    onSelect: () => console.log("Navigate to Home"),
    keywords: ["main", "landing"],
  },
  {
    id: "page-2",
    label: "Documents",
    description: "View all documents",
    icon: <FileText className="size-4" />,
    group: "pages",
    onSelect: () => console.log("Navigate to Documents"),
    keywords: ["files", "docs"],
  },
  {
    id: "page-3",
    label: "Projects",
    description: "Manage your projects",
    icon: <FolderOpen className="size-4" />,
    group: "pages",
    onSelect: () => console.log("Navigate to Projects"),
    keywords: ["workspace", "tasks"],
  },
  {
    id: "page-4",
    label: "Calendar",
    description: "View calendar",
    icon: <Calendar className="size-4" />,
    group: "pages",
    onSelect: () => console.log("Navigate to Calendar"),
    keywords: ["schedule", "events"],
  },

  // Actions
  {
    id: "action-1",
    label: "New Document",
    description: "Create a new document",
    icon: <Plus className="size-4" />,
    group: "actions",
    shortcut: ["Ctrl", "N"],
    onSelect: () => console.log("Create new document"),
    keywords: ["create", "add"],
  },
  {
    id: "action-2",
    label: "Search Files",
    description: "Search through your files",
    icon: <Search className="size-4" />,
    group: "actions",
    shortcut: ["Ctrl", "F"],
    onSelect: () => console.log("Open file search"),
    keywords: ["find", "lookup"],
  },
  {
    id: "action-3",
    label: "Send Message",
    description: "Compose a new message",
    icon: <Mail className="size-4" />,
    group: "actions",
    onSelect: () => console.log("Open message composer"),
    keywords: ["email", "write"],
  },

  // Settings
  {
    id: "settings-1",
    label: "Profile",
    description: "Edit your profile",
    icon: <User className="size-4" />,
    group: "settings",
    onSelect: () => console.log("Navigate to Profile"),
    keywords: ["account", "user"],
  },
  {
    id: "settings-2",
    label: "Notifications",
    description: "Manage notifications",
    icon: <Bell className="size-4" />,
    group: "settings",
    onSelect: () => console.log("Navigate to Notifications"),
    keywords: ["alerts", "push"],
  },
  {
    id: "settings-3",
    label: "Toggle Dark Mode",
    description: "Switch theme",
    icon: <Moon className="size-4" />,
    group: "settings",
    onSelect: () => console.log("Toggle theme"),
    keywords: ["theme", "light", "appearance"],
  },
  {
    id: "settings-4",
    label: "Help & Support",
    description: "Get help",
    icon: <HelpCircle className="size-4" />,
    group: "settings",
    onSelect: () => console.log("Open help"),
    keywords: ["documentation", "faq"],
  },
  {
    id: "settings-5",
    label: "Sign Out",
    description: "Log out of your account",
    icon: <LogOut className="size-4" />,
    group: "settings",
    onSelect: () => console.log("Sign out"),
    keywords: ["logout", "exit"],
  },
];

// =============================================================================
// Group Labels
// =============================================================================

const groupLabels: Record<CommandGroupType, string> = {
  recent: "Recent",
  pages: "Pages",
  actions: "Actions",
  settings: "Settings",
  search: "Search Results",
};

// =============================================================================
// Main Component
// =============================================================================

export default function Command01({
  items = createDemoItems(),
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
  open: controlledOpen,
  onOpenChange,
  className,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
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
  } = useCommandPalette({
    items,
    open: controlledOpen,
    onOpenChange,
  });

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Get flat index for an item
  const getFlatIndex = (groupIndex: number, itemIndex: number): number => {
    let index = 0;
    for (let i = 0; i < groupIndex; i++) {
      index += groupedItems[i].items.length;
    }
    return index + itemIndex;
  };

  return (
    <div className={cn(className)}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 size-4" />
        <span className="hidden sm:inline-flex">Search commands...</span>
        <span className="inline-flex sm:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <Command className="size-3" />K
        </kbd>
      </Button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div onKeyDown={handleKeyDown}>
          <CommandInput
            ref={inputRef}
            value={search}
            onValueChange={setSearch}
            placeholder={placeholder}
          />

          <CommandList>
            {groupedItems.length === 0 ? (
              <CommandEmpty message={emptyMessage} />
            ) : (
              groupedItems.map((group, groupIndex) => (
                <CommandGroup key={group.id} heading={groupLabels[group.id]}>
                  {group.items.map((item, itemIndex) => {
                    const flatIndex = getFlatIndex(groupIndex, itemIndex);
                    return (
                      <CommandItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        description={item.description}
                        shortcut={item.shortcut}
                        selected={flatIndex === selectedIndex}
                        disabled={item.disabled}
                        onSelect={() => selectItem(item)}
                      />
                    );
                  })}
                </CommandGroup>
              ))
            )}
          </CommandList>

          {/* Footer */}
          <div className="border-t px-3 py-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                  ↑↓
                </kbd>
                <span>Navigate</span>
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                  ↵
                </kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                  esc
                </kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </div>
      </CommandDialog>
    </div>
  );
}

// =============================================================================
// Named Exports
// =============================================================================

export { Command01 };

// Re-export types and hook
export type { CommandItem, CommandGroup, CommandPaletteProps } from "./types/command";
export { useCommandPalette } from "./hooks/use-command-palette";
