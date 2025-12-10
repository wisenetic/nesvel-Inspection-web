// src/modules/support/support.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Headphones } from "lucide-react";

const SupportListPage = React.lazy(() => import("./pages/list"));

const SupportModule: AppModule = {
  name: "support",
  label: "Support",
  group: "Support",
  priority: 62,
  resource: {
    name: "support",
    list: "/support",
    icon: Headphones,
    meta: {
      labelKey: "support.title",
      label: "Support",
    },
  },
  routes: [
    {
      path: "support",
      element: <SupportListPage />,
    },
  ],
};

export default SupportModule;
