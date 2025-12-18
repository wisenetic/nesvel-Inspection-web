"use client";

import {
  ChevronLeft,
  ChevronRight,
  // ChevronsLeft,
  // ChevronsRight,
  List,
  LayoutTemplate,
} from "lucide-react";

import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/lib/utils";

export type DataTablePaginationProps = {
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  total?: number;
};

export function DataTablePagination({
  currentPage,
  pageCount,
  setCurrentPage,
  pageSize,
  setPageSize,
  total,
}: DataTablePaginationProps) {
  const hasTotal = typeof total === "number" && total > 0;
  const start = hasTotal ? (currentPage - 1) * pageSize + 1 : 0;
  const end = hasTotal ? Math.min(total!, currentPage * pageSize) : 0;

  return (
    <div
      className={cn(
        "flex",
        "items-center",
        "justify-end",
        "flex-wrap",
        "gap-2",
      )}
    >
      {/* Range: 1-10 / 49 */}
      <div
        className={cn(
          "flex",
          "items-center",
          "text-sm",
          "text-muted-foreground",
          "whitespace-nowrap",
        )}
      >
        <span>{hasTotal ? `${start}-${end}` : "0-0"}</span>
        <span className="ml-1">{hasTotal ? `/${total}` : "/0"}</span>
      </div>

      {/* Pagination arrows */}
      <div className={cn("flex", "items-center", "gap-1")}>
        <Button
          variant="outline"
          className={cn("h-8", "w-8", "p-0")}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className={cn("h-8", "w-8", "p-0")}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageCount}
          aria-label="Go to next page"
        >
          <ChevronRight />
        </Button>
      </div>

      {/* View switch buttons (list / form) */}
      <div className={cn("flex", "items-center", "gap-1", "ml-2")}>
        <Button
          variant="outline"
          className={cn("h-8", "w-8", "p-0")}
          aria-label="List view"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className={cn("h-8", "w-8", "p-0")}
          aria-label="Form view"
        >
          <LayoutTemplate className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

DataTablePagination.displayName = "DataTablePagination";
