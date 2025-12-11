"use client";

import type { BaseRecord } from "@refinedev/core";

import { ResourceListView } from "@/core/components/shared/views/list";
import type { ListViewConfig } from "@/core/components/shared/views/list";

export type UserRecord = BaseRecord & {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  status?: string;
  createdAt?: string;
};

const userListConfig: ListViewConfig<UserRecord> = {
  // resource is inferred from route / refine resources; no need to repeat here
  titleKey: "users.title",
  selectable: true,
  rowClick: "show",
  // Keep the first four columns visible by default; the rest start
  // hidden but are available in the column toggle menu.
  maxInitialVisibleColumns: 4,
  columns: [
    {
      key: "name",
      label: "Name",
      sortable: true,
      // Primary identifier should never be hideable.
      alwaysVisible: true,
      renderValue: (value) => (
        <span className="font-medium">{String(value ?? "")}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      renderValue: (value) => (
        <span className="capitalize">{String(value ?? "")}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      renderValue: (value) => (
        <span className="capitalize text-sm text-muted-foreground">
          {String(value ?? "")}
        </span>
      ),
    },
    // Additional fields that are hidden by default but can be enabled
    // via the column toggle.
    {
      key: "phone",
      label: "Phone",
      hidden: true,
    },
    {
      key: "createdAt",
      label: "Created at",
      hidden: true,
      renderValue: (value) => (
        <span className="text-xs text-muted-foreground">
          {String(value ?? "")}
        </span>
      ),
    },
  ],
};

const UserListPage: React.FC = () => {
  return <ResourceListView<UserRecord> config={userListConfig} />;
};

export default UserListPage;
