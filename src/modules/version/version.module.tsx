// src/modules/version/version.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Info } from "lucide-react";

const VersionListPage = React.lazy(() => import("./pages/list"));

const VersionModule: AppModule = {
  name: "version",
  label: "Version",
  group: "Support",
  priority: 63,
  resource: {
    name: "version",
    list: "/version",
    icon: Info,
    meta: {
      labelKey: "version.title",
      label: "Version",
    },
  },
  routes: [
    {
      path: "version",
      element: <VersionListPage />,
    },
  ],
};

export default VersionModule;
