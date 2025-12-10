// src/modules/role/role.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { ShieldCheck } from "lucide-react";

const RoleListPage = React.lazy(() => import("./pages/list"));

const RoleModule: AppModule = {
  name: "role",
  label: "Roles & Permissions",
  group: "People & Teams",
  priority: 42,
  resource: {
    name: "roles",
    list: "/roles",
    icon: ShieldCheck,
    meta: {
      labelKey: "roles.title",
      label: "Roles & Permissions",
    },
  },
  routes: [
    {
      path: "roles",
      element: <RoleListPage />,
    },
  ],
};

export default RoleModule;
