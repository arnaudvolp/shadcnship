"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { QuickAction } from "../types/dashboard";

interface QuickActionsProps {
  actions: QuickAction[];
  isLoading?: boolean;
}

export function QuickActions({ actions, isLoading = false }: QuickActionsProps) {
  if (isLoading) {
    return (
      <Card className="p-4 shadow-none">
        <Skeleton className="h-5 w-28 mb-4" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-none">
      <h3 className="font-semibold text-sm mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const ActionWrapper = action.href ? "a" : "button";
          const actionProps = action.href
            ? { href: action.href }
            : { onClick: action.onClick, type: "button" as const };

          return (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto flex-col gap-1.5 py-3 px-3"
              asChild={!!action.href}
              onClick={!action.href ? action.onClick : undefined}
            >
              {action.href ? (
                <a href={action.href}>
                  <span className="text-muted-foreground">{action.icon}</span>
                  <span className="text-xs font-medium">{action.label}</span>
                  {action.description && (
                    <span className="text-xs text-muted-foreground text-center">
                      {action.description}
                    </span>
                  )}
                </a>
              ) : (
                <>
                  <span className="text-muted-foreground">{action.icon}</span>
                  <span className="text-xs font-medium">{action.label}</span>
                  {action.description && (
                    <span className="text-xs text-muted-foreground text-center">
                      {action.description}
                    </span>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
