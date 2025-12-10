// src/modules/license/license.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { BadgeCheck } from "lucide-react";

const LicenseListPage = React.lazy(() => import("./pages/list"));

const LicenseModule: AppModule = {
  name: "license",
  label: "Licenses & Alerts",
  group: "System Configuration",
  priority: 51,
  resource: {
    name: "licenses",
    list: "/licenses",
    icon: BadgeCheck,
    meta: {
      labelKey: "licenses.title",
      label: "Licenses & Alerts",
    },
  },
  routes: [
    {
      path: "licenses",
      element: <LicenseListPage />,
    },
  ],
};

export default LicenseModule;
