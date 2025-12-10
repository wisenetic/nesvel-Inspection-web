// src/modules/area/area.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { MapPinned } from "lucide-react";

const AreaListPage = React.lazy(() => import("./pages/list"));

const AreaModule: AppModule = {
  name: "area",
  label: "Areas",
  group: "Data Management",
  priority: 13,
  resource: {
    name: "areas",
    list: "/areas",
    icon: MapPinned,
    meta: {
      labelKey: "areas.title",
      label: "Areas",
    },
  },
  routes: [
    {
      path: "areas",
      element: <AreaListPage />,
    },
  ],
};

export default AreaModule;
