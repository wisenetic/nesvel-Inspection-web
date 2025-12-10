// src/modules/corrective-action/corrective-action.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Wrench } from "lucide-react";

const CorrectiveActionListPage = React.lazy(() => import("./pages/list"));

const CorrectiveActionModule: AppModule = {
  name: "corrective-action",
  label: "Corrective Actions",
  group: "Inspection Records",
  priority: 33,
  resource: {
    name: "corrective_actions",
    list: "/corrective-actions",
    icon: Wrench,
    meta: {
      labelKey: "correctiveActions.title",
      label: "Corrective Actions",
    },
  },
  routes: [
    {
      path: "corrective-actions",
      element: <CorrectiveActionListPage />,
    },
  ],
};

export default CorrectiveActionModule;
