// src/modules/zone/zone.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Target } from "lucide-react";

const ZoneListPage = React.lazy(() => import("./pages/list"));

const ZoneModule: AppModule = {
  name: "zone",
  label: "Zones",
  group: "Data Management",
  priority: 14,
  resource: {
    name: "zones",
    list: "/zones",
    icon: Target,
    meta: {
      labelKey: "zones.title",
      label: "Zones",
    },
  },
  routes: [
    {
      path: "zones",
      element: <ZoneListPage />,
    },
  ],
};

export default ZoneModule;
