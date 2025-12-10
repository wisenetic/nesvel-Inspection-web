// src/modules/user/user.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { User } from "lucide-react";

const UserListPage = React.lazy(() => import("./pages/list"));

const UserModule: AppModule = {
  name: "user",
  label: "Users",
  group: "People & Teams",
  priority: 40,
  resource: {
    name: "users",
    list: "/users",
    icon: User,
    meta: {
      labelKey: "users.title",
      label: "Users",
    },
  },
  routes: [
    {
      path: "users",
      element: <UserListPage />,
    },
  ],
};

export default UserModule;
