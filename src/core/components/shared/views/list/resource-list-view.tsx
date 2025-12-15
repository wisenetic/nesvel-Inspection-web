"use client";

import { useMemo, useState } from "react";

import type { BaseKey, BaseRecord } from "@refinedev/core";
import {
  useTranslate,
  useUserFriendlyName,
  useResourceParams,
  useGo,
  useDataProvider,
} from "@refinedev/core";
import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";
import { cn } from "@/core/lib/utils";
import { DataTablePagination } from "./data-table-pagination";

import type { ListViewConfig } from "./list-view.types";
import { useListController } from "./use-list-controller";
import { ListView, ListViewHeader } from "./list-view";
import { DataTable } from "./data-table";

export type ResourceListViewProps<TRecord extends BaseRecord> = {
  config: ListViewConfig<TRecord>;
};

export function ResourceListView<TRecord extends BaseRecord>({
  config,
}: ResourceListViewProps<TRecord>) {
  const t = useTranslate();
  const getUserFriendlyName = useUserFriendlyName();
  const go = useGo();
  const dataProvider = useDataProvider();

  const { resource, identifier } = useResourceParams({
    resource: config.resource,
  });
  const effectiveResource = config.resource ?? identifier ?? resource?.name ?? "";

  const { table, onRowClick } = useListController({
    ...config,
    resource: effectiveResource,
  });

  const {
    refineCore: {
      currentPage,
      pageCount,
      setCurrentPage,
      pageSize,
      setPageSize,
      tableQuery,
    },
  } = table;

  const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const selectedIds = useMemo<BaseKey[]>(() => {
    const selectedRows = table.reactTable.getSelectedRowModel().rows;
    const ids = selectedRows
      .map((row) => (row.original as TRecord)?.id)
      .filter((id): id is BaseKey => id !== undefined && id !== null);

    // de-dupe in case of any edge cases
    return Array.from(new Set(ids));
  }, [table, table.reactTable.getState().rowSelection]);

  const bulkDeleteEnabled = Boolean(config.selectable);

  const runBulkDelete = async () => {
    if (!effectiveResource || selectedIds.length === 0) return;

    setIsBulkDeleting(true);
    try {
      if (typeof (dataProvider as any).deleteMany === "function") {
        await (dataProvider as any).deleteMany({
          resource: effectiveResource,
          ids: selectedIds,
        });
      } else {
        // Fallback for providers that don't implement deleteMany.
        await Promise.all(
          selectedIds.map((id) =>
            dataProvider.deleteOne({
              resource: effectiveResource,
              id,
            }),
          ),
        );
      }

      const deletedCount = selectedIds.length;

      table.reactTable.resetRowSelection();
      await tableQuery.refetch();
      toast.success("Deleted", {
        description: `${deletedCount} record(s) deleted.`,
        richColors: true,
      });
    } catch (err) {
      toast.error("Delete failed", {
        description: String(err),
        richColors: true,
      });
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const resolvedTitle =
    config.titleKey
      ? t(config.titleKey, config.title ?? config.titleKey)
      : config.title ?? getUserFriendlyName(effectiveResource, "plural");

  const handleCreate = () => {
    if (!effectiveResource) return;
    // Simple route-based create; can later be replaced with overlay logic.
    go({ to: `/${effectiveResource}/create` });
  };

  const toolbarLeft = (
    <div className={cn("flex", "items-center", "gap-2")}>
      <Button
        variant="default"
        size="sm"
        className={cn("px-4")}
        onClick={handleCreate}
      >
        New
      </Button>

      {bulkDeleteEnabled && (
        <Popover open={deletePopoverOpen} onOpenChange={setDeletePopoverOpen}>
          <PopoverTrigger asChild>
            <span>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={isBulkDeleting || selectedIds.length === 0}
              >
                {isBulkDeleting && (
                  <Loader2 className={cn("mr-2", "h-4", "w-4", "animate-spin")} />
                )}
                <Trash className={cn("mr-2", "h-4", "w-4")} />
                Delete ({selectedIds.length})
              </Button>
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className={cn("flex", "flex-col", "gap-3")}>
              <div className={cn("text-sm", "text-foreground")}>
                Delete {selectedIds.length} selected record(s)?
              </div>

              <div className={cn("flex", "justify-end", "gap-2")}>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isBulkDeleting}
                  onClick={() => setDeletePopoverOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={isBulkDeleting || selectedIds.length === 0}
                  onClick={async () => {
                    await runBulkDelete();
                    setDeletePopoverOpen(false);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );

  const toolbarRight = (
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
    <ListView>
      <ListViewHeader
        resource={effectiveResource}
        title={resolvedTitle}
        canCreate={false}
      />
      <DataTable
        table={table}
        onRowClick={onRowClick}
        toolbarLeft={toolbarLeft}
        toolbarRight={toolbarRight}
      />
    </ListView>
  );
}
