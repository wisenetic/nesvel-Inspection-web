"use client";

import type { BaseRecord, HttpError } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import type { Column } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DataTablePagination } from "./data-table-pagination";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { cn } from "@/core/lib/utils";

export type DataTableProps<TData extends BaseRecord> = {
  table: UseTableReturnType<TData, HttpError>;
  /** Optional row click handler for navigation. */
  onRowClick?: (record: TData) => void;
  /** Optional toolbar content to render on the left side above the table. */
  toolbarLeft?: React.ReactNode;
  /** Optional toolbar content to render on the right side above the table. */
  toolbarRight?: React.ReactNode;
};

export function DataTable<TData extends BaseRecord>({
  table,
  onRowClick,
  toolbarLeft,
  toolbarRight,
}: DataTableProps<TData>) {
  const {
    reactTable: { getHeaderGroups, getRowModel, getAllColumns },
    refineCore: {
      tableQuery,
      currentPage,
      setCurrentPage,
      pageCount,
      pageSize,
      setPageSize,
    },
  } = table;

  const columns = getAllColumns();
  const leafColumns = table.reactTable.getAllLeafColumns();
  const isLoading = tableQuery.isLoading;

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isOverflowing, setIsOverflowing] = useState({
    horizontal: false,
    vertical: false,
  });

  useEffect(() => {
    const checkOverflow = () => {
      if (tableRef.current && tableContainerRef.current) {
        const tableEl = tableRef.current;
        const container = tableContainerRef.current;

        const horizontalOverflow = tableEl.offsetWidth > container.clientWidth;
        const verticalOverflow = tableEl.offsetHeight > container.clientHeight;

        setIsOverflowing({
          horizontal: horizontalOverflow,
          vertical: verticalOverflow,
        });
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    const timeoutId = setTimeout(checkOverflow, 100);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      clearTimeout(timeoutId);
    };
  }, [tableQuery.data?.data, pageSize]);

  const defaultToolbarRight = (
    <DataTablePagination
      currentPage={currentPage}
      pageCount={pageCount}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      total={tableQuery.data?.total}
    />
  );

  return (
    <div className={cn("flex", "flex-col", "flex-1", "gap-4")}>
      {(toolbarLeft || toolbarRight || defaultToolbarRight) && (
        <div className={cn("flex", "items-center", "justify-between", "gap-2")}>
          <div>{toolbarLeft}</div>
          <div className={cn("flex", "items-center", "gap-2")}>
            {toolbarRight ?? defaultToolbarRight}
          </div>
        </div>
      )}

      <div ref={tableContainerRef} className={cn("rounded-md", "border")}>
        <Table ref={tableRef} style={{ tableLayout: "fixed", width: "100%" }}>
          <TableHeader>
            {getHeaderGroups().map((headerGroup, groupIndex) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, headerIndex) => {
                  const isPlaceholder = header.isPlaceholder;
                  const isLastHeader =
                    groupIndex === 0 &&
                    headerIndex === headerGroup.headers.length - 1;

                  const meta = header.column.columnDef
                    .meta as { align?: string } | undefined;

                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        ...getCommonStyles({
                          column: header.column,
                          isOverflowing: isOverflowing,
                        }),
                      }}
                      className={cn(
                        "relative", // needed for absolutely positioned icon
                        meta?.align === "center" && "text-center",
                        meta?.align === "right" && "text-right",
                      )}
                    >
                      {isPlaceholder ? null : (
                        <div className={cn("flex", "items-center", "gap-1")}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {isLastHeader && (
                            <div
                              className="absolute top-1/2 -translate-y-1/2"
                              style={{ insetInlineEnd: "0.5rem" }}
                            >
                              <DataTableColumnVisibility<TData>
                                columns={leafColumns}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="relative">
            {isLoading ? (
              <>
                {Array.from({ length: pageSize < 1 ? 1 : pageSize }).map(
                  (_, rowIndex) => (
                    <TableRow
                      key={`skeleton-row-${rowIndex}`}
                      aria-hidden="true"
                    >
                      {leafColumns.map((column) => (
                        <TableCell
                          key={`skeleton-cell-${rowIndex}-${column.id}`}
                          style={{
                            ...getCommonStyles({
                              column,
                              isOverflowing: isOverflowing,
                            }),
                          }}
                          className={cn("truncate")}
                        >
                          <div className="h-8" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ),
                )}
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className={cn("absolute", "inset-0", "pointer-events-none")}
                  >
                    <Loader2
                      className={cn(
                        "absolute",
                        "top-1/2",
                        "left-1/2",
                        "animate-spin",
                        "text-primary",
                        "h-8",
                        "w-8",
                        "-translate-x-1/2",
                        "-translate-y-1/2",
                      )}
                    />
                  </TableCell>
                </TableRow>
              </>
            ) : getRowModel().rows?.length ? (
              getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.original?.id ?? row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(onRowClick && "cursor-pointer")}
                    onClick={
                      onRowClick
                        ? () => onRowClick(row.original as TData)
                        : undefined
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef
                        .meta as { align?: string } | undefined;

                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            ...getCommonStyles({
                              column: cell.column,
                              isOverflowing: isOverflowing,
                            }),
                          }}
                          className={cn(
                            meta?.align === "center" && "text-center",
                            meta?.align === "right" && "text-right",
                          )}
                        >
                          <div className="truncate">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <DataTableNoData
                isOverflowing={isOverflowing}
                columnsLength={columns.length}
              />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTableNoData({
  isOverflowing,
  columnsLength,
}: {
  isOverflowing: { horizontal: boolean; vertical: boolean };
  columnsLength: number;
}) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell
        colSpan={columnsLength}
        className={cn("relative", "text-center")}
        style={{ height: "490px" }}
      >
        <div
          className={cn(
            "absolute",
            "inset-0",
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            "gap-2",
            "bg-background",
          )}
          style={{
            position: isOverflowing.horizontal ? "sticky" : "absolute",
            left: isOverflowing.horizontal ? "50%" : "50%",
            transform: "translateX(-50%)",
            zIndex: isOverflowing.horizontal ? 2 : 1,
            width: isOverflowing.horizontal ? "fit-content" : "100%",
            minWidth: "300px",
          }}
        >
          <div className={cn("text-lg", "font-semibold", "text-foreground")}>
            No data to display
          </div>
          <div className={cn("text-sm", "text-muted-foreground")}>
            This table is empty for the time being.
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function getCommonStyles<TData>({
  column,
  isOverflowing,
}: {
  column: Column<TData>;
  isOverflowing: {
    horizontal: boolean;
    vertical: boolean;
  };
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow:
      isOverflowing.horizontal && isLastLeftPinnedColumn
        ? "-4px 0 4px -4px var(--border) inset"
        : isOverflowing.horizontal && isFirstRightPinnedColumn
        ? "4px 0 4px -4px var(--border) inset"
        : undefined,
    left:
      isOverflowing.horizontal && isPinned === "left"
        ? `${column.getStart("left")}px`
        : undefined,
    right:
      isOverflowing.horizontal && isPinned === "right"
        ? `${column.getAfter("right")}px`
        : undefined,
    opacity: 1,
    position: isOverflowing.horizontal && isPinned ? "sticky" : "relative",
    background: isOverflowing.horizontal && isPinned ? "var(--background)" : "",
    borderTopRightRadius:
      isOverflowing.horizontal && isPinned === "right"
        ? "var(--radius)"
        : undefined,
    borderBottomRightRadius:
      isOverflowing.horizontal && isPinned === "right"
        ? "var(--radius)"
        : undefined,
    borderTopLeftRadius:
      isOverflowing.horizontal && isPinned === "left"
        ? "var(--radius)"
        : undefined,
    borderBottomLeftRadius:
      isOverflowing.horizontal && isPinned === "left"
        ? "var(--radius)"
        : undefined,
    width: column.getSize(),
    zIndex: isOverflowing.horizontal && isPinned ? 1 : 0,
  };
}

DataTable.displayName = "DataTable";

// -----------------------------------------------------------------------------
// Column visibility (hide/show) controls
// -----------------------------------------------------------------------------

type DataTableColumnVisibilityProps<TData> = {
  columns: Column<TData>[];
};

function DataTableColumnVisibility<TData>({
  columns,
}: DataTableColumnVisibilityProps<TData>) {
  // Only leaf, hideable columns
  const hideableColumns = columns.filter((column) => column.getCanHide());

  if (hideableColumns.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn("h-7", "w-7", "rounded-md", "border-border", "bg-background/50")}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle columns</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs font-medium">
          Toggle columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {hideableColumns.map((column) => {
          const id = column.id ?? "";
          const meta = column.columnDef.meta as
            | { label?: string }
            | undefined;
          const label =
            meta?.label ||
            (typeof column.columnDef.header === "string"
              ? column.columnDef.header
              : id);

          return (
            <DropdownMenuCheckboxItem
              key={id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
