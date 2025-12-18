"use client";

import { useEffect, useMemo, useState } from "react";

import type { BaseKey, BaseRecord } from "@refinedev/core";
import {
  useTranslate,
  useUserFriendlyName,
  useResourceParams,
  useDataProvider,
  useCan,
} from "@refinedev/core";
import { toast } from "sonner";
import { Eye, Loader2, Pencil, Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/core/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/core/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { Textarea } from "@/core/components/ui/textarea";

import { cn } from "@/core/lib/utils";
import { DataTablePagination } from "./data-table-pagination";

import type {
  ListViewConfig,
  ListColumnConfig,
  ListViewActionsConfig,
} from "./list-view.types";
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
  const getDataProvider = useDataProvider();
  const dataProvider = getDataProvider();

  const { resource, identifier } = useResourceParams({
    resource: config.resource,
  });
  const effectiveResource = config.resource ?? identifier ?? resource?.name ?? "";

  const actions: ListViewActionsConfig = config.actions ?? {};
  const createEnabled = actions.create !== false;
  const showEnabled = actions.show !== false;
  const editEnabled = actions.edit !== false;
  // destructive actions default to off unless explicitly enabled
  const deleteEnabled = actions.delete === true;
  const bulkDeleteEnabledByConfig = actions.bulkDelete !== false;

  const { data: canCreate } = useCan({
    action: "create",
    resource: effectiveResource,
  });
  const { data: canShow } = useCan({
    action: "show",
    resource: effectiveResource,
  });
  const { data: canEdit } = useCan({
    action: "edit",
    resource: effectiveResource,
  });
  const { data: canDelete } = useCan({
    action: "delete",
    resource: effectiveResource,
  });

  type RecordPanelMode = "create" | "show" | "edit";

  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<RecordPanelMode>("create");
  const [panelRecord, setPanelRecord] = useState<TRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const openCreate = () => {
    if (!effectiveResource) return;
    setPanelMode("create");
    setPanelRecord(null);
    setPanelOpen(true);
  };

  const openShow = (record: TRecord) => {
    setPanelMode("show");
    setPanelRecord(record);
    setPanelOpen(true);
  };

  const openEdit = (record: TRecord) => {
    setPanelMode("edit");
    setPanelRecord(record);
    setPanelOpen(true);
  };

  const runRowDelete = async (id: BaseKey) => {
    if (!effectiveResource) return;

    try {
      await dataProvider.deleteOne({
        resource: effectiveResource,
        id,
      });

      await tableQuery.refetch();
      toast.success("Deleted", {
        description: "Record deleted successfully.",
        richColors: true,
      });
    } catch (err) {
      toast.error("Delete failed", {
        description: String(err),
        richColors: true,
      });
    }
  };

  const RowActions: React.FC<{ record: TRecord }> = ({ record }) => {
    const id = (record as any)?.id as BaseKey | undefined;
    const [confirmOpen, setConfirmOpen] = useState(false);

    if (!id) return null;

    return (
      <div className={cn("flex", "items-center", "justify-start", "gap-1")}>
        {showEnabled && canShow?.can && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn("h-8", "w-8")}
            onClick={(e) => {
              e.stopPropagation();
              openShow(record);
            }}
            aria-label="View"
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}

        {editEnabled && canEdit?.can && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn("h-8", "w-8")}
            onClick={(e) => {
              e.stopPropagation();
              openEdit(record);
            }}
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}

        {deleteEnabled && canDelete?.can && (
          <Popover open={confirmOpen} onOpenChange={setConfirmOpen}>
            <PopoverTrigger asChild>
              <span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn("h-8", "w-8", "text-destructive")}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  aria-label="Delete"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end">
              <div className={cn("flex", "flex-col", "gap-3")}>
                <div className={cn("text-sm", "text-foreground")}>
                  Delete this record?
                </div>
                <div className={cn("flex", "justify-end", "gap-2")}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await runRowDelete(id);
                      setConfirmOpen(false);
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
  };

  const actionsColumn: ListColumnConfig<TRecord> = {
    key: "__actions",
    label: "Actions",
    align: "left",
    width: 160,
    alwaysVisible: true,
    cell: (record) => <RowActions record={record} />,
  };

  const effectiveConfig = useMemo<ListViewConfig<TRecord>>(() => {
    const cols = config.columns ?? [];
    const alreadyHasActions = cols.some((c) => c.key === "__actions");

    const rowClick =
      typeof config.rowClick === "function"
        ? config.rowClick
        : config.rowClick === "show"
          ? (record: TRecord) => openShow(record)
          : config.rowClick === "edit"
            ? (record: TRecord) => openEdit(record)
            : config.rowClick;

    return {
      ...config,
      rowClick,
      columns: alreadyHasActions ? cols : [...cols, actionsColumn],
    };
  }, [config, actionsColumn]);

  const handleCreate = openCreate;

  const { table, onRowClick } = useListController({
    ...effectiveConfig,
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

  const bulkDeleteEnabled = Boolean(config.selectable) && bulkDeleteEnabledByConfig;

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

  const createFields = useMemo(() => {
    const excludedKeys = new Set([
      "id",
      "createdAt",
      "updatedAt",
      "created_by",
      "updated_by",
      "createdBy",
      "updatedBy",
      "__actions",
    ]);

    return (config.columns ?? []).filter((c) => {
      if (excludedKeys.has(c.key)) return false;
      // avoid nested path / computed columns for create/edit until typed metadata exists
      if (c.key.includes(".")) return false;
      if (typeof c.accessor === "function") return false;
      return true;
    });
  }, [config.columns]);

  const createDefaultValues = useMemo<Record<string, any>>(() => {
    return Object.fromEntries(createFields.map((f) => [f.key, ""]));
  }, [createFields]);

  const form = useForm<Record<string, any>>({
    defaultValues: createDefaultValues,
  });

  useEffect(() => {
    if (!panelOpen) return;

    if (panelMode === "create") {
      form.reset(createDefaultValues);
      return;
    }

    if (panelMode === "edit" && panelRecord) {
      const editDefaults = Object.fromEntries(
        createFields.map((f) => [f.key, (panelRecord as any)?.[f.key] ?? ""]),
      );
      form.reset(editDefaults);
    }
  }, [panelOpen, panelMode, panelRecord, form, createDefaultValues, createFields]);

  const onSubmit = async (values: Record<string, any>) => {
    if (!effectiveResource) return;

    setIsSaving(true);
    try {
      if (panelMode === "edit") {
        const id = (panelRecord as any)?.id;
        if (!id) throw new Error("Missing record id");

        await dataProvider.update({
          resource: effectiveResource,
          id,
          variables: values,
        });

        toast.success("Updated", {
          description: "Record updated successfully.",
          richColors: true,
        });
      } else {
        await dataProvider.create({
          resource: effectiveResource,
          variables: values,
        });

        toast.success("Created", {
          description: "Record created successfully.",
          richColors: true,
        });
      }

      setPanelOpen(false);
      await tableQuery.refetch();
    } catch (err) {
      toast.error(panelMode === "edit" ? "Update failed" : "Create failed", {
        description: String(err),
        richColors: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toolbarLeft = (
    <div className={cn("flex", "items-center", "gap-2")}>
      {createEnabled && canCreate?.can && (
        <Button
          variant="default"
          size="sm"
          className={cn("px-4")}
          onClick={handleCreate}
        >
          New
        </Button>
      )}

      {bulkDeleteEnabled && canDelete?.can && (
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletePopoverOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={isBulkDeleting || selectedIds.length === 0}
                  onClick={async (e) => {
                    e.stopPropagation();
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

      <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
        <SheetContent
          side="right"
          className={cn("w-[520px]", "max-w-full", "overflow-y-auto")}
        >
          <SheetHeader>
            <SheetTitle>
              {panelMode === "create"
                ? `Create ${resolvedTitle}`
                : panelMode === "edit"
                ? `Edit ${resolvedTitle}`
                : `View ${resolvedTitle}`}
            </SheetTitle>
          </SheetHeader>

          {panelMode === "show" ? (
            <div className={cn("p-4", "grid", "gap-3")}>
              {panelRecord ? (
                (effectiveConfig.columns ?? [])
                  .filter((c) => c.key !== "__actions")
                  .map((col) => {
                    const label = col.labelKey
                      ? t(col.labelKey, col.label ?? col.key)
                      : col.label ?? col.key;

                    const value = ((): React.ReactNode => {
                      const record = panelRecord;

                      if (col.cell) return col.cell(record);

                      const raw =
                        typeof col.accessor === "function"
                          ? col.accessor(record)
                          : getValueByPath(record as any, col.key);

                      if (col.renderValue) return col.renderValue(raw, record);
                      if (raw === null || raw === undefined || raw === "")
                        return <span className="text-muted-foreground">-</span>;
                      return <span>{String(raw)}</span>;
                    })();

                    return (
                      <div
                        key={col.key}
                        className={cn(
                          "grid",
                          "gap-1",
                          "border-b",
                          "border-border",
                          "pb-3",
                        )}
                      >
                        <div className={cn("text-xs", "text-muted-foreground")}>
                          {label}
                        </div>
                        <div className={cn("text-sm", "text-foreground")}>{value}</div>
                      </div>
                    );
                  })
              ) : (
                <div className={cn("text-sm", "text-muted-foreground")}>
                  No record selected.
                </div>
              )}
            </div>
          ) : createFields.length === 0 ? (
            <div className={cn("p-4", "text-sm", "text-muted-foreground")}>
              No create/edit fields configured for this resource.
            </div>
          ) : (
            <div className={cn("p-4")}>
              <Form {...form}>
                <form
                  className={cn("grid", "gap-4")}
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {createFields.map((field) => {
                    const label = field.labelKey
                      ? t(field.labelKey, field.label ?? field.key)
                      : field.label ?? field.key;

                    const isDescription =
                      field.key.toLowerCase().includes("description") ||
                      field.key.toLowerCase().includes("notes");

                    return (
                      <FormField
                        key={field.key}
                        control={form.control}
                        name={field.key}
                        render={({ field: rhfField }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              {isDescription ? (
                                <Textarea
                                  {...rhfField}
                                  value={rhfField.value ?? ""}
                                  rows={4}
                                />
                              ) : (
                                <Input
                                  {...rhfField}
                                  value={rhfField.value ?? ""}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}

                  <SheetFooter>
                    <div className={cn("flex", "justify-end", "gap-2")}>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isSaving}
                        onClick={() => setPanelOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSaving}>
                        {isSaving && (
                          <Loader2
                            className={cn("mr-2", "h-4", "w-4", "animate-spin")}
                          />
                        )}
                        {panelMode === "edit" ? "Save" : "Create"}
                      </Button>
                    </div>
                  </SheetFooter>
                </form>
              </Form>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </ListView>
  );
}

function getValueByPath(obj: any, path: string) {
  if (!obj || !path) return undefined;
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}
