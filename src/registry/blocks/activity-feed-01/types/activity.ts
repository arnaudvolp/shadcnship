// =============================================================================
// Activity Feed Types
// =============================================================================

export type ActivityType =
  | "created"
  | "updated"
  | "deleted"
  | "commented"
  | "mentioned"
  | "assigned"
  | "completed"
  | "joined"
  | "left"
  | "uploaded"
  | "shared"
  | "liked";

export interface ActivityUser {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

export interface ActivityTarget {
  id: string;
  type: string;
  name: string;
  href?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  user: ActivityUser;
  target?: ActivityTarget;
  metadata?: Record<string, unknown>;
  message?: string;
  createdAt: string;
}

export interface ActivityGroup {
  date: string;
  activities: Activity[];
}

export interface ActivityFeedProps {
  activities?: Activity[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onFilter?: (types: ActivityType[]) => void;
  filterTypes?: ActivityType[];
  showFilters?: boolean;
  className?: string;
}

export interface ActivityItemProps {
  activity: Activity;
  className?: string;
}
