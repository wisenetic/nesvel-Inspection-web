"use client";

import type { BaseRecord } from "@refinedev/core";

import { ResourceListView } from "@/core/components/shared/views/list";
import type { ListViewConfig } from "@/core/components/shared/views/list";

export type CityRecord = BaseRecord & {
  id: string;
  name: string;
  countryCode: string;
  state_provinc?: string;
  createdAt?: string;
  updatedBy?: string;
};

const userListConfig: ListViewConfig<CityRecord> = {
  // resource is inferred from route / refine resources; no need to repeat here
  titleKey: "cities.title",
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
      key: "countryCode",
      label: "Country Code",
      sortable: true,
    },
    {
      key: "state_provinc",
      label: "State/Provinc",
      sortable: true,
      renderValue: (value) => (
        <span className="capitalize">{String(value ?? "")}</span>
      ),
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

const CityListPage: React.FC = () => {
  return <ResourceListView<CityRecord> config={userListConfig} />;
};

export default CityListPage;
