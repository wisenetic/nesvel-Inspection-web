"use client";

import { useMemo } from "react";

import type { BaseRecord, HttpError } from "@refinedev/core";
import { useNavigation, useTranslate } from "@refinedev/core";
import type { ColumnDef } from "@tanstack/react-table";
import { useTable, type UseTableReturnType } from "@refinedev/react-table";

import type {
  ListViewConfig,
  ListColumnConfig,
  ListRowClickMode,
} from "./list-view.types";
import { Checkbox } from "@/core/components/ui/checkbox";

export type UseListControllerResult<TRecord extends BaseRecord> = {
  table: UseTableReturnType<TRecord, HttpError>;
  onRowClick?: (record: TRecord) => void;
};

function buildColumns<TRecord extends BaseRecord = BaseRecord>(
  config: ListViewConfig<TRecord>,
  translate: ReturnType<typeof useTranslate>,
): ColumnDef<TRecord>[] {
  const columns: ColumnDef<TRecord>[] = [];

  if (config.selectable) {
    const selectionColumn: ColumnDef<TRecord> = {
      id: "__select",
      header: ({ table }) => (
        <div className="flex items-center justify-center px-1">
          <Checkbox
            aria-label="Select all rows on this page"
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
            }}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center px-1">
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
            }}
            onClick={(event) => {
              // avoid triggering row click navigation when toggling selection
              event.stopPropagation();
            }}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 42,
      meta: {
        align: "center",
      },
    };

    columns.push(selectionColumn);
  }

  const valueColumns = (config.columns ?? []).filter((c) => !c.hidden);

  const mapColumn = (col: ListColumnConfig<TRecord>): ColumnDef<TRecord> => {
    const headerLabel = col.labelKey
      ? translate(col.labelKey, col.label ?? col.labelKey)
      : col.label ?? col.key;

    const def: ColumnDef<TRecord> = {
      id: col.key,
      accessorKey: col.accessor ? undefined : col.key,
      accessorFn: col.accessor
        ? (row) => col.accessor?.(row as TRecord)
        : undefined,
      enableSorting: col.sortable,
      header: () => <span>{headerLabel}</span>,
      cell: (ctx) => {
        const record = ctx.row.original as TRecord;
        const rawValue = col.accessor
          ? col.accessor(record)
          : ctx.getValue();

        if (col.cell) return col.cell(record);
        if (col.renderValue) return col.renderValue(rawValue, record);

        if (rawValue === null || rawValue === undefined) return null;

        return <span>{String(rawValue)}</span>;
      },
      size: typeof col.width === "number" ? col.width : undefined,
      meta: {
        align: col.align,
      },
    };

    return def;
  };

  return [...columns, ...valueColumns.map(mapColumn)];
}

export function useListController<
  TRecord extends BaseRecord = BaseRecord,
>(config: ListViewConfig<TRecord>): UseListControllerResult<TRecord> {
  const t = useTranslate();
  const navigation = useNavigation();

  const columns = useMemo<ColumnDef<TRecord>[]>(
    () => buildColumns<TRecord>(config, t),
    [config, t],
  );

  const table = useTable<TRecord, HttpError>({
    columns,
    refineCoreProps: {
      resource: config.resource!,
      // initialSorter can be enabled when we wire richer sorting config
      // initialSorter: config.defaultSort
      //   ? [
      //       { field: config.defaultSort.field, order: config.defaultSort.order },
      //     ]
      //   : undefined,
    },
  });

  let onRowClick: ((record: TRecord) => void) | undefined;

  const mode = config.rowClick as ListRowClickMode | undefined;

  if (typeof config.rowClick === "function") {
    onRowClick = config.rowClick;
  } else if (mode === "show") {
    onRowClick = (record: TRecord) => {
      if (!record?.id) return;
      // Use overlay-style route so we can implement drawers/modals later.
      navigation.push(`/r/${config.resource}/show/${record.id}`);
    };
  } else if (mode === "edit") {
    onRowClick = (record: TRecord) => {
      if (!record?.id) return;
      navigation.push(`/r/${config.resource}/edit/${record.id}`);
    };
  }

  return { table, onRowClick };
}
