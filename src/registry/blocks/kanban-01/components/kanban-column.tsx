"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { KanbanCard } from "./kanban-card";
import { Plus, MoreHorizontal } from "lucide-react";
import type { KanbanColumn as KanbanColumnType, KanbanTask, TaskStatus } from "../types/kanban";

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: KanbanTask[];
  onTaskCreate?: (status: TaskStatus) => void;
  onTaskEdit?: (task: KanbanTask) => void;
  onTaskDelete?: (taskId: string) => void;
}

export function KanbanColumn({
  column,
  tasks,
  onTaskCreate,
  onTaskEdit,
  onTaskDelete,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col w-[280px] min-w-[280px] bg-muted/30 rounded-xl transition-colors",
        isOver && "bg-muted/50"
      )}
    >
      {/* Column Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-1 h-5 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <span className="font-medium text-sm">{column.title}</span>
          <span className="text-sm text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {onTaskCreate && (
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={() => onTaskCreate(column.id)}
            >
              <Plus className="size-4" />
              <span className="sr-only">Add task</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="size-7">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 px-2 pb-2 space-y-2 min-h-[200px] overflow-y-auto max-h-[calc(100vh-280px)]">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No tasks
          </div>
        )}
      </div>

      {/* Add new button at bottom */}
      {onTaskCreate && (
        <Button
          variant="ghost"
          className="mx-2 mb-2 justify-start text-muted-foreground hover:text-foreground"
          onClick={() => onTaskCreate(column.id)}
        >
          <Plus className="size-4 mr-2" />
          Add new
        </Button>
      )}
    </div>
  );
}
