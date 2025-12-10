// src/modules/report/report.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { FileBarChart } from "lucide-react";

const ReportListPage = React.lazy(() => import("./pages/list"));

const ReportModule: AppModule = {
  name: "report",
  label: "Reports",
  group: "Inspection Records",
  priority: 31,
  resource: {
    name: "reports",
    list: "/reports",
    icon: FileBarChart,
    meta: {
      labelKey: "reports.title",
      label: "Reports",
    },
  },
  routes: [
    {
      path: "reports",
      element: <ReportListPage />,
    },
  ],
};

export default ReportModule;
