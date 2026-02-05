"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

export interface TableItem {
  id: string;
  name: string;
  email?: string;
  status: "active" | "pending" | "inactive" | "completed" | "cancelled";
  amount?: number;
  date: string;
}

interface DataTableWidgetProps {
  title: string;
  items: TableItem[];
  isLoading?: boolean;
  maxItems?: number;
  onViewAll?: () => void;
  viewAllHref?: string;
}

const statusVariants: Record<TableItem["status"], "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  pending: "secondary",
  inactive: "outline",
  completed: "default",
  cancelled: "destructive",
};

const statusLabels: Record<TableItem["status"], string> = {
  active: "Active",
  pending: "Pending",
  inactive: "Inactive",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function DataTableWidget({
  title,
  items,
  isLoading = false,
  maxItems = 5,
  onViewAll,
  viewAllHref,
}: DataTableWidgetProps) {
  if (isLoading) {
    return (
      <Card className="p-4 shadow-none">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const displayedItems = items.slice(0, maxItems);

  return (
    <Card className="p-4 shadow-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">{title}</h3>
        {(onViewAll || viewAllHref) && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={onViewAll}
            asChild={!!viewAllHref}
          >
            {viewAllHref ? (
              <a href={viewAllHref}>
                View all <ChevronRight className="size-3 ml-1" />
              </a>
            ) : (
              <>
                View all <ChevronRight className="size-3 ml-1" />
              </>
            )}
          </Button>
        )}
      </div>

      {displayedItems.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No items to display</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              {displayedItems[0]?.amount !== undefined && <TableHead className="text-right">Amount</TableHead>}
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    {item.email && (
                      <p className="text-xs text-muted-foreground">{item.email}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariants[item.status]} className="text-xs">
                    {statusLabels[item.status]}
                  </Badge>
                </TableCell>
                {item.amount !== undefined && (
                  <TableCell className="text-right font-medium">
                    ${item.amount.toLocaleString()}
                  </TableCell>
                )}
                <TableCell className="text-right text-sm text-muted-foreground">
                  {formatDate(item.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
