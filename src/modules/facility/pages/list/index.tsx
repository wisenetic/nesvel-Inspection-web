"use client";

import type { BaseRecord } from "@refinedev/core";

import { ResourceListView } from "@/core/components/shared/views/list";
import type { ListViewConfig } from "@/core/components/shared/views/list";

export type FacilityRecord = BaseRecord & {
  id: string;
  service_area_id: string;
  name: string;
  facility_type: string;
  address: string;
  geolocation: string;
  owner_name: string;
  owner_contact: string;
  description?: string;
  createdAt?: string;
  updatedBy?: string;
};

const userListConfig: ListViewConfig<FacilityRecord> = {
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
      key: "facility_type",
      label: "Facility Type",
      sortable: true,
    },
    {
      key: "address",
      label: "Address",
      sortable: true,
    }, 
    {
      key: "geolocation",
      label: "Geolocation",
      sortable: true,
    },
    {
      key: "owner_name",
      label: "Owner Name",
      sortable: true,
    },
    {
      key: "owner_contact",
      label: "Owner Contact",
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
const FacilityListPage: React.FC = () => {
  return <ResourceListView<FacilityRecord> config={userListConfig} />;
};

export default FacilityListPage;
