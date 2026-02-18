"use client";

import { forwardRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Files, MessageSquare, Clock, Pencil } from "lucide-react";
import type { KanbanTask } from "../types/kanban";

interface KanbanCardProps {
  task: KanbanTask;
  onEdit?: (task: KanbanTask) => void;
  onDelete?: (taskId: string) => void;
}

export const KanbanCard = forwardRef<HTMLDivElement, KanbanCardProps>(
  function KanbanCard({ task, onEdit, onDelete }, ref) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: task.id,
      data: {
        type: "task",
        task,
      },
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const formatDueDate = (dateString: string) => {
      try {
        const date = new Date(dateString);
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (days < 0) return "Overdue";
        if (days === 0) return "Today";
        if (days === 1) return "1d";
        return `${days}d`;
      } catch {
        return dateString;
      }
    };

    return (
      <div
        ref={(node) => {
          setNodeRef(node);
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={style}
        className={cn(
          "group bg-background rounded-xl border p-4 cursor-grab active:cursor-grabbing transition-all hover:shadow-md relative",
          isDragging && "opacity-50 shadow-lg rotate-2"
        )}
        {...attributes}
        {...listeners}
      >
        {/* Edit button - appears on hover */}
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            aria-label={`Edit task: ${task.title}`}
          >
            <Pencil className="size-3" />
          </Button>
        )}

        {/* Client name */}
        {task.client && (
          <p className="text-xs text-muted-foreground mb-2">
            Client: {task.client}
          </p>
        )}

        {/* Task title */}
        <h4 className="font-medium text-sm mb-3 line-clamp-2">{task.title}</h4>

        {/* Assignee and labels row */}
        <div className="flex items-center gap-2 mb-3">
          {task.assignees && task.assignees.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {task.assignees.slice(0, 2).map((assignee) => (
                  <Avatar
                    key={assignee.id}
                    className="size-5 border-2 border-background"
                  >
                    <AvatarImage src={assignee.avatar} />
                    <AvatarFallback className="text-[8px]">
                      {assignee.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {task.assignees[0].name.split(" ")[0]}
              </span>
            </div>
          )}

          {/* Labels/Tags */}
          {task.labels && task.labels.length > 0 && (
            <div className="flex items-center gap-1 ml-auto">
              {task.labels.slice(0, 2).map((label) => (
                <span
                  key={label.id}
                  className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                  style={{
                    backgroundColor: label.color + "15",
                    color: label.color,
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom stats row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {task.attachments !== undefined && (
            <div className="flex items-center gap-1">
              <Files className="size-3.5" />
              <span>{task.attachments}</span>
            </div>
          )}

          {task.progress !== undefined && (
            <div className="flex items-center gap-1">
              <svg className="size-3.5" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${(task.progress / 100) * 37.7} 37.7`}
                  strokeLinecap="round"
                  transform="rotate(-90 8 8)"
                />
              </svg>
              <span>{task.progress}%</span>
            </div>
          )}

          {task.comments !== undefined && (
            <div className="flex items-center gap-1">
              <MessageSquare className="size-3.5" />
              <span>{task.comments}</span>
            </div>
          )}

          {task.dueDate && (
            <div className="flex items-center gap-1 ml-auto">
              <Clock className="size-3.5" />
              <span>{formatDueDate(task.dueDate)}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
