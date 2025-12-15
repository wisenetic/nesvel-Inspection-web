"use client";

import type { BaseRecord } from "@refinedev/core";

import { ResourceListView } from "@/core/components/shared/views/list";
import type { ListViewConfig } from "@/core/components/shared/views/list";

export type AreaRecord = BaseRecord & {
  id: string;
  name: string;
  city: string;
  postalCode?: string;
  createdAt?: string;
  updatedBy?: string;
};

const userListConfig: ListViewConfig<AreaRecord> = {
  // resource is inferred from route / refine resources; no need to repeat here
  titleKey: "areas.title",
  selectable: true,
  rowClick: "show",
  columns: [
    {
      key: "name",
      label: "Name",
      sortable: true,
      renderValue: (value) => (
        <span className="font-medium">{String(value ?? "")}</span>
      ),
    },
    {
      key: "city",
      label: "City",
      sortable: true,
    },
    {
      key: "postalCode",
      label: "Postal Code",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Created at",
      renderValue: (value) =>
        value ? (
          <span className="text-xs text-muted-foreground">
            {new Date(String(value)).toLocaleDateString()}
          </span>
        ) : null,
    },
    {
      key: "updatedBy",
      label: "Updated By",
    },
  ],
};

const AreaListPage: React.FC = () => {
  return <ResourceListView<AreaRecord> config={userListConfig} />;
};

export default AreaListPage;
