// src/modules/checklist/checklist.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { ListChecks } from "lucide-react";

const ChecklistListPage = React.lazy(() => import("./pages/list"));

const ChecklistModule: AppModule = {
  name: "checklist",
  label: "checklists.title",
  group: "Inspection Operations",
  priority: 21,
  resource: {
    name: "checklists",
    list: "/checklists",
    icon: ListChecks,
    meta: {
      labelKey: "checklists.title",
      label: "Checklists",
    },
  },
  routes: [
    {
      path: "checklists",
      element: <ChecklistListPage />,
    },
  ],
};

export default ChecklistModule;
