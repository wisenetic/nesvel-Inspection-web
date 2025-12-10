"use client";

import type { BaseRecord } from "@refinedev/core";
import { useTranslate, useUserFriendlyName, useResourceParams, useNavigation } from "@refinedev/core";
import { Button } from "@/core/components/ui/button";
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
  const navigation = useNavigation();

  const { resource, identifier } = useResourceParams({
    resource: config.resource,
  });
  const effectiveResource =
    config.resource ?? identifier ?? resource?.name ?? "";

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

  const resolvedTitle =
    config.titleKey
      ? t(config.titleKey, config.title ?? config.titleKey)
      : config.title ?? getUserFriendlyName(effectiveResource, "plural");

  const handleCreate = () => {
    if (!effectiveResource) return;
    // Simple route-based create; can later be replaced with overlay logic.
    navigation.push?.(`/${effectiveResource}/create`);
  };

  const toolbarLeft = (
    <Button
      variant="default"
      size="sm"
      className={cn("px-4")}
      onClick={handleCreate}
    >
      New
    </Button>
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
