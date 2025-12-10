// src/modules/schedule/schedule.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { CalendarClock } from "lucide-react";

const ScheduleListPage = React.lazy(() => import("./pages/list"));

const ScheduleModule: AppModule = {
  name: "schedule",
  label: "Schedule & Assignments",
  group: "Inspection Operations",
  priority: 23,
  resource: {
    name: "schedules",
    list: "/schedules",
    icon: CalendarClock,
    meta: {
      labelKey: "schedules.title",
      label: "Schedule & Assignments",
    },
  },
  routes: [
    {
      path: "schedules",
      element: <ScheduleListPage />,
    },
  ],
};

export default ScheduleModule;
