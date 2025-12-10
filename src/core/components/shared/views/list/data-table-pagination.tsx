"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/core/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
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
  const pageSizeOptions = useMemo(() => {
    const baseOptions = [10, 20, 30, 40, 50];
    const optionsSet = new Set(baseOptions);

    if (!optionsSet.has(pageSize)) {
      optionsSet.add(pageSize);
    }

    return Array.from(optionsSet).sort((a, b) => a - b);
  }, [pageSize]);

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
          "text-sm",
          "text-muted-foreground",
          "whitespace-nowrap",
        )}
      >
        {hasTotal ? `${start}-${end} / ${total}` : "0 / 0"}
      </div>

      {/* Page size selector */}
      <div className={cn("flex", "items-center", "gap-1")}>
        <Select
          value={`${pageSize}`}
          onValueChange={(v) => setPageSize(Number(v))}
        >
          <SelectTrigger className={cn("h-8", "w-[64px]")}>
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination arrows */}
      <div className={cn("flex", "items-center", "gap-1")}>
        <Button
          variant="outline"
          className={cn("hidden", "h-8", "w-8", "p-0", "lg:flex")}
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          <ChevronsLeft />
        </Button>
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
        <Button
          variant="outline"
          className={cn("hidden", "h-8", "w-8", "p-0", "lg:flex")}
          onClick={() => setCurrentPage(pageCount)}
          disabled={currentPage === pageCount}
          aria-label="Go to last page"
        >
          <ChevronsRight />
        </Button>
      </div>

      {/* View switch placeholders (list / other view) */}
      <div className={cn("flex", "items-center", "gap-1", "ml-2")}>
        <Button
          variant="outline"
          className={cn("h-8", "w-8", "p-0")}
          aria-label="List view"
        >
          <span className="h-[10px] w-[10px] border border-foreground" />
        </Button>
        <Button
          variant="outline"
          className={cn("h-8", "w-8", "p-0")}
          aria-label="Alternative view"
        >
          <span className="h-[10px] w-[10px] border border-foreground border-t-2" />
        </Button>
      </div>
    </div>
  );
}

DataTablePagination.displayName = "DataTablePagination";
