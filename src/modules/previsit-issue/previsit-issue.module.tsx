// src/modules/previsit-issue/previsit-issue.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Inbox } from "lucide-react";

const PrevisitIssueListPage = React.lazy(() => import("./pages/list"));

const PrevisitIssueModule: AppModule = {
  name: "previsit-issue",
  label: "Pre-Visit Issues",
  group: "Inspection Operations",
  priority: 25,
  resource: {
    name: "previsit_issues",
    list: "/previsit-issues",
    icon: Inbox,
    meta: {
      labelKey: "previsitIssues.title",
      label: "Pre-Visit Issues",
    },
  },
  routes: [
    {
      path: "previsit-issues",
      element: <PrevisitIssueListPage />,
    },
  ],
};

export default PrevisitIssueModule;
