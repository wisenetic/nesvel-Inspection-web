// src/modules/api-key/api-key.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { KeyRound } from "lucide-react";

const ApiKeyListPage = React.lazy(() => import("./pages/list"));

const ApiKeyModule: AppModule = {
  name: "api-key",
  label: "API Keys",
  group: "System Configuration",
  priority: 52,
  resource: {
    name: "api_keys",
    list: "/api-keys",
    icon: KeyRound,
    meta: {
      labelKey: "apiKeys.title",
      label: "API Keys",
    },
  },
  routes: [
    {
      path: "api-keys",
      element: <ApiKeyListPage />,
    },
  ],
};

export default ApiKeyModule;
