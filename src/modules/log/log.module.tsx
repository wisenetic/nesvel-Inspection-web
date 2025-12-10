// src/modules/log/log.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Archive } from "lucide-react";

const LogListPage = React.lazy(() => import("./pages/list"));

const LogModule: AppModule = {
  name: "log",
  label: "Logs",
  group: "Inspection Records",
  priority: 30,
  resource: {
    name: "logs",
    list: "/logs",
    icon: Archive,
    meta: {
      labelKey: "logs.title",
      label: "Logs",
    },
  },
  routes: [
    {
      path: "logs",
      element: <LogListPage />,
    },
  ],
};

export default LogModule;
