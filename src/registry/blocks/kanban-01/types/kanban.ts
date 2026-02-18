// =============================================================================
// Kanban Board Types
// =============================================================================

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export interface TaskAssignee {
  id: string;
  name: string;
  avatar?: string;
}

export interface TaskLabel {
  id: string;
  name: string;
  color: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  client?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignees?: TaskAssignee[];
  labels?: TaskLabel[];
  dueDate?: string;
  createdAt: string;
  order: number;
  attachments?: number;
  comments?: number;
  progress?: number;
}

export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  tasks: KanbanTask[];
  color: string;
}

export interface KanbanBoardProps {
  columns?: KanbanColumn[];
  projectName?: string;
  onTaskMove?: (taskId: string, newStatus: TaskStatus, newOrder: number) => void;
  onTaskCreate?: (task: Partial<KanbanTask>) => void;
  onTaskUpdate?: (taskId: string, updates: Partial<KanbanTask>) => void;
  onTaskDelete?: (taskId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export interface KanbanColumnProps {
  column: KanbanColumn;
  tasks: KanbanTask[];
  onTaskCreate?: (status: TaskStatus) => void;
  isOver?: boolean;
}

export interface KanbanCardProps {
  task: KanbanTask;
  isDragging?: boolean;
  onEdit?: (task: KanbanTask) => void;
  onDelete?: (taskId: string) => void;
}

export interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (task: Partial<KanbanTask>) => void;
  defaultStatus?: TaskStatus;
}
