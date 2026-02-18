"use client";

import { useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  KanbanColumn,
  KanbanCard,
  CreateTaskDialog,
} from "./components";
import { FileText, ChevronRight, Upload, Plus } from "lucide-react";
import type {
  KanbanTask,
  KanbanColumn as KanbanColumnType,
  KanbanBoardProps,
  TaskStatus,
} from "./types/kanban";

// =============================================================================
// Demo Data
// =============================================================================

const defaultColumns: KanbanColumnType[] = [
  { id: "todo", title: "To Do", tasks: [], color: "#f97316" },
  { id: "in_progress", title: "In Progress", tasks: [], color: "#eab308" },
  { id: "review", title: "In Review", tasks: [], color: "#8b5cf6" },
  { id: "done", title: "Completed", tasks: [], color: "#22c55e" },
];

const demoTasks: KanbanTask[] = [
  {
    id: "task_1",
    title: "Change top CTA button text",
    client: "Stellar",
    status: "todo",
    priority: "high",
    assignees: [
      { id: "1", name: "Phoenix Baker", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=phoenix" },
    ],
    labels: [
      { id: "l1", name: "Web", color: "#3b82f6" },
      { id: "l2", name: "Saas", color: "#ef4444" },
    ],
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    order: 0,
    attachments: 4,
    progress: 25,
    comments: 2,
  },
  {
    id: "task_2",
    title: "Redesign analytics dashboard",
    client: "Stellar",
    status: "todo",
    priority: "medium",
    assignees: [
      { id: "2", name: "Lana Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lana" },
    ],
    labels: [
      { id: "l2", name: "Saas", color: "#ef4444" },
      { id: "l3", name: "Mobile", color: "#8b5cf6" },
    ],
    createdAt: new Date().toISOString(),
    order: 1,
    attachments: 2,
    progress: 0,
    comments: 5,
  },
  {
    id: "task_3",
    title: "Create landing page",
    client: "Taskez",
    status: "todo",
    priority: "high",
    assignees: [
      { id: "3", name: "Drew Carter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=drew" },
    ],
    labels: [
      { id: "l1", name: "Web", color: "#3b82f6" },
    ],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    order: 2,
    attachments: 1,
    progress: 10,
    comments: 0,
  },
  {
    id: "task_4",
    title: "Redesign news page",
    client: "Stellar",
    status: "in_progress",
    priority: "medium",
    assignees: [
      { id: "1", name: "Phoenix Baker", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=phoenix" },
      { id: "2", name: "Lana Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lana" },
    ],
    labels: [{ id: "l1", name: "Web", color: "#3b82f6" }],
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    order: 0,
    attachments: 6,
    progress: 65,
    comments: 8,
  },
  {
    id: "task_5",
    title: "Copywriting for product page",
    client: "Taskez",
    status: "in_progress",
    priority: "low",
    assignees: [
      { id: "4", name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
    ],
    labels: [{ id: "l4", name: "Content", color: "#10b981" }],
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    order: 1,
    attachments: 0,
    progress: 80,
    comments: 3,
  },
  {
    id: "task_6",
    title: "UI Animation for the onboarding flow",
    client: "Stellar",
    status: "review",
    priority: "high",
    assignees: [
      { id: "3", name: "Drew Carter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=drew" },
    ],
    labels: [
      { id: "l1", name: "Web", color: "#3b82f6" },
      { id: "l2", name: "Saas", color: "#ef4444" },
    ],
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    order: 0,
    attachments: 3,
    progress: 95,
    comments: 12,
  },
  {
    id: "task_7",
    title: "UI Dark mode improvements",
    client: "Stellar",
    status: "review",
    priority: "medium",
    assignees: [
      { id: "2", name: "Lana Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lana" },
    ],
    labels: [
      { id: "l2", name: "Saas", color: "#ef4444" },
      { id: "l3", name: "Mobile", color: "#8b5cf6" },
    ],
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    order: 1,
    attachments: 2,
    progress: 90,
    comments: 4,
  },
  {
    id: "task_8",
    title: "Mobile Redesign",
    client: "Taskez",
    status: "review",
    priority: "high",
    assignees: [
      { id: "1", name: "Phoenix Baker", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=phoenix" },
    ],
    labels: [{ id: "l3", name: "Mobile", color: "#8b5cf6" }],
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    order: 2,
    attachments: 8,
    progress: 100,
    comments: 6,
  },
  {
    id: "task_9",
    title: "Navigation improvements",
    client: "Taskez",
    status: "done",
    priority: "medium",
    assignees: [
      { id: "4", name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
    ],
    labels: [{ id: "l1", name: "Web", color: "#3b82f6" }],
    createdAt: new Date().toISOString(),
    order: 0,
    attachments: 2,
    progress: 100,
    comments: 7,
  },
  {
    id: "task_10",
    title: "Text Animation",
    client: "Taskez",
    status: "done",
    priority: "low",
    assignees: [
      { id: "3", name: "Drew Carter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=drew" },
    ],
    labels: [{ id: "l5", name: "Design", color: "#f59e0b" }],
    createdAt: new Date().toISOString(),
    order: 1,
    attachments: 1,
    progress: 100,
    comments: 2,
  },
];

// =============================================================================
// Kanban Board Component
// =============================================================================

export default function KanbanBoard({
  columns: externalColumns,
  projectName = "Project UI/UX",
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  isLoading,
  className,
}: KanbanBoardProps) {
  const [internalTasks, setInternalTasks] = useState<KanbanTask[]>(demoTasks);
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createDialogStatus, setCreateDialogStatus] = useState<TaskStatus>("todo");
  const [activeView, setActiveView] = useState<"board" | "list" | "timeline" | "due">("board");

  // Use external columns if provided
  const columns = externalColumns ?? defaultColumns;
  const tasks = externalColumns
    ? externalColumns.flatMap((c) => c.tasks)
    : internalTasks;

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, KanbanTask[]> = {
      todo: [],
      in_progress: [],
      review: [],
      done: [],
    };

    tasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });

    // Sort by order within each status
    Object.keys(grouped).forEach((status) => {
      grouped[status as TaskStatus].sort((a, b) => a.order - b.order);
    });

    return grouped;
  }, [tasks]);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // DnD Handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if over a column
    const overColumn = columns.find((c) => c.id === overId);
    if (overColumn && activeTask.status !== overColumn.id) {
      // Move to new column
      if (externalColumns) {
        onTaskMove?.(activeId, overColumn.id, 0);
      } else {
        setInternalTasks((prev) =>
          prev.map((t) =>
            t.id === activeId ? { ...t, status: overColumn.id, order: 0 } : t
          )
        );
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    // If dropped on another task, reorder within the same column
    if (overTask && activeTask.status === overTask.status) {
      const columnTasks = tasksByStatus[activeTask.status];
      const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
      const newIndex = columnTasks.findIndex((t) => t.id === overId);

      if (oldIndex !== newIndex) {
        const reordered = arrayMove(columnTasks, oldIndex, newIndex);

        if (externalColumns) {
          onTaskMove?.(activeId, activeTask.status, newIndex);
        } else {
          setInternalTasks((prev) => {
            const otherTasks = prev.filter((t) => t.status !== activeTask.status);
            const updatedColumnTasks = reordered.map((t, idx) => ({
              ...t,
              order: idx,
            }));
            return [...otherTasks, ...updatedColumnTasks];
          });
        }
      }
    }
  };

  // Task handlers
  const handleOpenCreateDialog = (status: TaskStatus) => {
    setCreateDialogStatus(status);
    setCreateDialogOpen(true);
  };

  const handleCreateTask = (taskData: Partial<KanbanTask>) => {
    if (onTaskCreate) {
      onTaskCreate(taskData);
    } else {
      const newTask: KanbanTask = {
        id: `task_${Date.now()}`,
        title: taskData.title || "Untitled",
        description: taskData.description,
        client: taskData.client,
        status: taskData.status || "todo",
        priority: taskData.priority || "medium",
        dueDate: taskData.dueDate,
        createdAt: new Date().toISOString(),
        order: tasksByStatus[taskData.status || "todo"].length,
      };
      setInternalTasks((prev) => [...prev, newTask]);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (onTaskDelete) {
      onTaskDelete(taskId);
    } else {
      setInternalTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const handleEditTask = (task: KanbanTask) => {
    if (onTaskUpdate) {
      const { id, ...updates } = task;
      onTaskUpdate(id, updates);
    } else {
      // Demo: log the edit action
      console.log("Edit task:", task);
    }
  };

  const viewTabs = [
    { id: "board", label: "Board" },
    { id: "list", label: "List" },
    { id: "timeline", label: "Timeline" },
    { id: "due", label: "Due Tasks" },
  ] as const;

  return (
    <div className={cn("w-full bg-background", className)}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-6 py-3 text-sm text-muted-foreground">
        <FileText className="size-4" />
        <ChevronRight className="size-4" />
        <span>Board</span>
        <ChevronRight className="size-4" />
        <span className="text-foreground font-medium">Overview</span>
      </div>

      {/* Project Title */}
      <div className="px-6 pb-4">
        <h1 className="text-2xl font-bold">{projectName}</h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 pb-6">
        <div className="flex items-center gap-1">
          {/* View Tabs */}
          <div className="flex items-center bg-muted rounded-lg p-1" role="tablist" aria-label="Board views">
            {viewTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeView === tab.id}
                onClick={() => setActiveView(tab.id)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  activeView === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-8 mx-2" />

          {/* Action Buttons */}
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="size-4" />
            Import
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="size-4" />
            New Board
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 px-6 min-w-max">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={tasksByStatus[column.id]}
                onTaskCreate={handleOpenCreateDialog}
                onTaskEdit={handleEditTask}
                onTaskDelete={handleDeleteTask}
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="w-[264px]">
              <KanbanCard task={activeTask} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreate={handleCreateTask}
        defaultStatus={createDialogStatus}
      />
    </div>
  );
}
