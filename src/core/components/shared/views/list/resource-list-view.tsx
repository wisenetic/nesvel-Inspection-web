"use client";

import type { BaseRecord } from "@refinedev/core";
import { useTranslate, useUserFriendlyName, useResourceParams } from "@refinedev/core";

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

  const { resource, identifier } = useResourceParams({
    resource: config.resource,
  });
  const effectiveResource =
    config.resource ?? identifier ?? resource?.name ?? "";

  const { table, onRowClick } = useListController({
    ...config,
    resource: effectiveResource,
  });

  const resolvedTitle =
    config.titleKey
      ? t(config.titleKey, config.title ?? config.titleKey)
      : config.title ?? getUserFriendlyName(effectiveResource, "plural");

  return (
    <ListView>
      <ListViewHeader resource={effectiveResource} title={resolvedTitle} />
      <DataTable
        table={table}
        onRowClick={onRowClick}
      />
    </ListView>
  );
}
