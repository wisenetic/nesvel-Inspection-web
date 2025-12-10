// src/modules/incident-review/incident-review.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { AlertTriangle } from "lucide-react";

const IncidentReviewListPage = React.lazy(() => import("./pages/list"));

const IncidentReviewModule: AppModule = {
  name: "incident-review",
  label: "Incident Review Queue",
  group: "Inspection Operations",
  priority: 24,
  resource: {
    name: "incident_reviews",
    list: "/incident-reviews",
    icon: AlertTriangle,
    meta: {
      labelKey: "incidentReviews.title",
      label: "Incident Review Queue",
    },
  },
  routes: [
    {
      path: "incident-reviews",
      element: <IncidentReviewListPage />,
    },
  ],
};

export default IncidentReviewModule;
