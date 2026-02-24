"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { generateColumns, type TableRow as TRow } from "./columns";

interface DataTableProps {
  data: TRow[];
  fields: string[];
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
}

export function DataTable({
  data,
  fields,
  pageCount = 1,
  pageIndex = 0,
  pageSize = 5,
}: DataTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Generate columns on the client side
  const columns = useMemo(() => generateColumns(fields), [fields]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination: { pageIndex, pageSize } },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // Update URL search params and trigger server refetch
  const updatePagination = (newPage: number, newSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("pageSize", newSize.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    updatePagination(newPage, pageSize);
  };

  const handlePageSizeChange = (newSize: number) => {
    updatePagination(0, newSize); // Reset to first page when changing page size
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={(value) => handlePageSizeChange(Number(value))}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Page {pageIndex + 1} of {pageCount}
          </p>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" className="size-8" onClick={() => handlePageChange(0)} disabled={pageIndex === 0}>
              <ChevronsLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon" className="size-8" onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 0}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon" className="size-8" onClick={() => handlePageChange(pageIndex + 1)} disabled={pageIndex >= pageCount - 1}>
              <ChevronRight className="size-4" />
            </Button>
            <Button variant="outline" size="icon" className="size-8" onClick={() => handlePageChange(pageCount - 1)} disabled={pageIndex >= pageCount - 1}>
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
