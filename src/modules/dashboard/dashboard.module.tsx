// src/modules/dashboard/dashboard.module.tsx
import type { AppModule } from "@/core/bootstrap/app-module.type";

import DashboardPage from "./pages/list";

const DashboardModule: AppModule = {
  name: "dashboard",
  label: "Dashboard",
  // Top-level item (no group) so it appears above grouped modules
  priority: 1,
  resource: {
    name: "dashboard",
    label: "Dashboard",
    list: "/dashboard",
    meta: {
      labelKey: "dashboard.title",
    },
  },
  routes: [
    {
      path: "dashboard",
      element: <DashboardPage />,
      presentation: "page",
    },
  ],
};

export default DashboardModule;
