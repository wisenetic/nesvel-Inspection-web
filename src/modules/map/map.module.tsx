// src/modules/map/map.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Map } from "lucide-react";

const MapListPage = React.lazy(() => import("./pages/list"));

const MapModule: AppModule = {
  name: "map",
  label: "Map",
  group: "Dashboard",
  priority: 2,
  resource: {
    name: "map",
    list: "/map",
    icon: Map,
    meta: {
      labelKey: "map.title",
      label: "Map",
    },
  },
  routes: [
    {
      path: "map",
      element: <MapListPage />,
    },
  ],
};

export default MapModule;
