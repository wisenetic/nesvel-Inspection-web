// src/modules/team/team.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Users } from "lucide-react";

const TeamListPage = React.lazy(() => import("./pages/list"));

const TeamModule: AppModule = {
  name: "team",
  label: "Teams",
  group: "People & Teams",
  priority: 41,
  resource: {
    name: "teams",
    list: "/teams",
    icon: Users,
    meta: {
      labelKey: "teams.title",
      label: "Teams",
    },
  },
  routes: [
    {
      path: "teams",
      element: <TeamListPage />,
    },
  ],
};

export default TeamModule;
