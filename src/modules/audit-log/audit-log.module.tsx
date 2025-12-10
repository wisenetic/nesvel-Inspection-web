// src/modules/audit-log/audit-log.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { ScrollText } from "lucide-react";

const AuditLogListPage = React.lazy(() => import("./pages/list"));

const AuditLogModule: AppModule = {
  name: "audit-log",
  label: "Audit Logs",
  group: "System Configuration",
  priority: 53,
  resource: {
    name: "audit_logs",
    list: "/audit-logs",
    icon: ScrollText,
    meta: {
      labelKey: "auditLogs.title",
      label: "Audit Logs",
    },
  },
  routes: [
    {
      path: "audit-logs",
      element: <AuditLogListPage />,
    },
  ],
};

export default AuditLogModule;
