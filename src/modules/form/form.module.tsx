// src/modules/form/form.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { FileText } from "lucide-react";

const FormListPage = React.lazy(() => import("./pages/list"));

const FormModule: AppModule = {
  name: "form",
  label: "Forms",
  group: "Inspection Operations",
  priority: 22,
  resource: {
    name: "forms",
    list: "/forms",
    icon: FileText,
    meta: {
      labelKey: "forms.title",
      label: "Forms & Templates",
    },
  },
  routes: [
    {
      path: "forms",
      element: <FormListPage />,
    },
  ],
};

export default FormModule;
