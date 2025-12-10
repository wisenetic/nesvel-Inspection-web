// src/modules/help-center/help-center.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { CircleHelp } from "lucide-react";

const HelpCenterListPage = React.lazy(() => import("./pages/list"));

const HelpCenterModule: AppModule = {
  name: "help-center",
  label: "Help Center",
  group: "Support",
  priority: 60,
  resource: {
    name: "help_center",
    list: "/help-center",
    icon: CircleHelp,
    meta: {
      labelKey: "helpCenter.title",
      label: "Help Center",
    },
  },
  routes: [
    {
      path: "help-center",
      element: <HelpCenterListPage />,
    },
  ],
};

export default HelpCenterModule;
