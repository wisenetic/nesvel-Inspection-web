// src/modules/setting/setting.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Settings } from "lucide-react";

const SettingListPage = React.lazy(() => import("./pages/list"));

const SettingModule: AppModule = {
  name: "setting",
  label: "Settings",
  group: "System Configuration",
  priority: 50,
  resource: {
    name: "settings",
    list: "/settings",
    icon: Settings,
    meta: {
      labelKey: "settings.title",
      label: "Settings",
    },
  },
  routes: [
    {
      path: "settings",
      element: <SettingListPage />,
    },
  ],
};

export default SettingModule;
