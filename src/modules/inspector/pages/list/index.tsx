"use client";

import type { BaseRecord } from "@refinedev/core";

import { ResourceListView } from "@/core/components/shared/views/list";
import type { ListViewConfig } from "@/core/components/shared/views/list";

export type InspectorRecord = BaseRecord & {
  id: string;
  name: string;
  supervisor: string;
  city: string;
  area: string;
  createdAt?: string;
  updatedBy?: string;
};

const userListConfig: ListViewConfig<InspectorRecord> = {
  // resource is inferred from route / refine resources; no need to repeat here
  titleKey: "inspectors.title",
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
      key: "supervisor",
      label: "Supervisor",
      sortable: true,
    },
    {
      key: "city",
      label: "City",
      sortable: true,
    },
    {
      key: "area",
      label: "Area",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Created At",
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
      renderValue: (value) =>
        value ? (
          <span className="font-medium">{String(value ?? "")}</span>
        ) : null,
    },
  ],
};

const InspectorListPage: React.FC = () => {
  return <ResourceListView<InspectorRecord> config={userListConfig} />;
};

export default InspectorListPage;
