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
  ],
};

const UserListPage: React.FC = () => {
  return <ResourceListView<UserRecord> config={userListConfig} />;
};

export default UserListPage;
