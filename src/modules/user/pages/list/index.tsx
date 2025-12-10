"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useTable } from "@refinedev/react-table";
import type { HttpError, BaseRecord } from "@refinedev/core";

import { ListView, ListViewHeader } from "@/core/components/refine-ui/views/list-view";
import { DataTable } from "@/core/components/refine-ui/data-table/data-table";
import {
  DataTableFilterDropdownText,
} from "@/core/components/refine-ui/data-table/data-table-filter";

export type UserRecord = BaseRecord & {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  status?: string;
  createdAt?: string;
};

const columns: ColumnDef<UserRecord>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column, table }) => (
      <div className="flex items-center justify-between gap-2">
        <span>Name</span>
        <DataTableFilterDropdownText<UserRecord>
          column={column}
          table={table}
          placeholder="Filter by name..."
        />
      </div>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column, table }) => (
      <div className="flex items-center justify-between gap-2">
        <span>Email</span>
        <DataTableFilterDropdownText<UserRecord>
          column={column}
          table={table}
          placeholder="Filter by email..."
        />
      </div>
    ),
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    id: "role",
    accessorKey: "role",
    header: () => <span>Role</span>,
    cell: ({ row }) => <span className="capitalize">{row.original.role}</span>,
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => <span>Status</span>,
    cell: ({ row }) => (
      <span className="capitalize text-sm text-muted-foreground">
        {row.original.status}
      </span>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => <span>Created at</span>,
    cell: ({ row }) =>
      row.original.createdAt ? (
        <span className="text-xs text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      ) : null,
  },
];

const UserListPage: React.FC = () => {
  const table = useTable<UserRecord, HttpError>({
    columns,
    refineCoreProps: {
      resource: "users",
    },
  });

  return (
    <ListView>
      <ListViewHeader resource="users" />
      <DataTable table={table} />
    </ListView>
  );
};

export default UserListPage;
