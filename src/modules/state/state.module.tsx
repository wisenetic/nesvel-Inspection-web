// src/modules/state/state.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { MapPin } from "lucide-react";

const StateListPage = React.lazy(() => import("./pages/list"));

const StateModule: AppModule = {
  name: "state",
  label: "States",
  group: "Data Management",
  priority: 11,
  resource: {
    name: "states",
    list: "/states",
    icon: MapPin,
    meta: {
      labelKey: "states.title",
      label: "States",
    },
  },
  routes: [
    {
      path: "states",
      element: <StateListPage />,
    },
  ],
};

export default StateModule;
