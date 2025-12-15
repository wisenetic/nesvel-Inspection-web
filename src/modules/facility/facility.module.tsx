// src/modules/facility/facility.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Building } from "lucide-react";

const FacilityListPage = React.lazy(() => import("./pages/list"));

const FacilityModule: AppModule = {
  name: "facility",
  label: "facility.title",
  group: "Data Management",
  priority: 15,
  resource: {
    name: "facilities",
    list: "/facilities",
    icon: Building,
    meta: {
      labelKey: "facilities.title",
      label: "Facilities",
    },
  },
  routes: [
    {
      path: "facilities",
      element: <FacilityListPage />,
    },
  ],
};

export default FacilityModule;
