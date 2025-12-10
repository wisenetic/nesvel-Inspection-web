// src/modules/finding/finding.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { CircleAlert } from "lucide-react";

const FindingListPage = React.lazy(() => import("./pages/list"));

const FindingModule: AppModule = {
  name: "finding",
  label: "Findings & Issues",
  group: "Inspection Records",
  priority: 32,
  resource: {
    name: "findings",
    list: "/findings",
    icon: CircleAlert,
    meta: {
      labelKey: "findings.title",
      label: "Findings & Issues",
    },
  },
  routes: [
    {
      path: "findings",
      element: <FindingListPage />,
    },
  ],
};

export default FindingModule;
