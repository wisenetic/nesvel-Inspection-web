// src/modules/documentation/documentation.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { BookOpenText } from "lucide-react";

const DocumentationListPage = React.lazy(() => import("./pages/list"));

const DocumentationModule: AppModule = {
  name: "documentation",
  label: "Documentation",
  group: "Support",
  priority: 61,
  resource: {
    name: "docs",
    list: "/docs",
    icon: BookOpenText,
    meta: {
      labelKey: "docs.title",
      label: "Documentation",
    },
  },
  routes: [
    {
      path: "docs",
      element: <DocumentationListPage />,
    },
  ],
};

export default DocumentationModule;
