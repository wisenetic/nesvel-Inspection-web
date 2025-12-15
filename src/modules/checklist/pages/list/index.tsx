"use client";

import type { BaseRecord } from "@refinedev/core";

import { ResourceListView } from "@/core/components/shared/views/list";
import type { ListViewConfig } from "@/core/components/shared/views/list";

export type ChecklistRecord = BaseRecord & {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedBy?: string;
};

const userListConfig: ListViewConfig<ChecklistRecord> = {
  // resource is inferred from route / refine resources; no need to repeat here
  titleKey: "checklists.title",
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
      key: "description",
      label: "Description",
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

const ChecklistListPage: React.FC = () => {
  return <ResourceListView<ChecklistRecord> config={userListConfig} />;
};

export default ChecklistListPage;
