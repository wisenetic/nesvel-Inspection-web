"use client";

import type { BaseRecord } from "@refinedev/core";

import { ResourceListView } from "@/core/components/shared/views/list";
import type { ListViewConfig } from "@/core/components/shared/views/list";


export type CountryRecord = BaseRecord & {
  id: string;
  name: string;
  capital?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
  createdAt?: string;
  updatedBy?: string;
};

const userListConfig: ListViewConfig<CountryRecord> = {
  // resource is inferred from route / refine resources; no need to repeat here
  titleKey: "countries.title",
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
      key: "capital",
      label: "Capital",
      sortable: true,
    }, 
    {
      key: "region",
      label: "Region",
      sortable: true,
    },
    {
      key: "latitude",
      label: "Latitude",
      sortable: true,
    },
    {
      key: "longitude",
      label: "Longitude",
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
const CountryListPage: React.FC = () => {
  return <ResourceListView<CountryRecord> config={userListConfig} />;
};

export default CountryListPage;