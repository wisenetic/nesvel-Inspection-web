// src/modules/city/city.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Building2 } from "lucide-react";

const CityListPage = React.lazy(() => import("./pages/list"));

const CityModule: AppModule = {
  name: "city",
  label: "Cities",
  group: "Data Management",
  priority: 12,
  resource: {
    name: "cities",
    list: "/cities",
    icon: Building2,
    meta: {
      labelKey: "cities.title",
      label: "Cities",
    },
  },
  routes: [
    {
      path: "cities",
      element: <CityListPage />,
    },
  ],
};

export default CityModule;
