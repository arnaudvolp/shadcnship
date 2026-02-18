// =============================================================================
// Sidebar Types
// =============================================================================

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  isActive?: boolean;
  onClick?: () => void;
}

export interface NavGroup {
  id: string;
  label?: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export interface SidebarUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface SidebarProps {
  /** Navigation groups */
  navigation?: NavGroup[];
  /** Current user */
  user?: SidebarUser;
  /** Logo element */
  logo?: React.ReactNode;
  /** Logo text */
  logoText?: string;
  /** Whether the sidebar is collapsed */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Callback when user clicks logout */
  onLogout?: () => void;
  /** Callback when user clicks settings */
  onSettings?: () => void;
  /** Callback when user clicks profile */
  onProfile?: () => void;
  /** Active item ID */
  activeItemId?: string;
  /** Callback when navigation item is clicked */
  onNavigate?: (item: NavItem) => void;
  /** Additional class names */
  className?: string;
}

export interface SidebarHeaderProps {
  logo?: React.ReactNode;
  logoText?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export interface SidebarNavProps {
  groups: NavGroup[];
  collapsed?: boolean;
  activeItemId?: string;
  onNavigate?: (item: NavItem) => void;
}

export interface SidebarUserMenuProps {
  user: SidebarUser;
  collapsed?: boolean;
  onLogout?: () => void;
  onSettings?: () => void;
  onProfile?: () => void;
}

export interface MobileSidebarProps extends SidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
