// src/modules/inspector/inspector.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { UserSearch } from "lucide-react";

const InspectorListPage = React.lazy(() => import("./pages/list"));

const InspectorModule: AppModule = {
  name: "inspector",
  label: "Inspectors",
  group: "Inspection Operations",
  priority: 20,
  resource: {
    name: "inspectors",
    list: "/inspectors",
    icon: UserSearch,
    meta: {
      labelKey: "inspectors.title",
      label: "Inspectors",
    },
  },
  routes: [
    {
      path: "inspectors",
      element: <InspectorListPage />,
    },
  ],
};

export default InspectorModule;
