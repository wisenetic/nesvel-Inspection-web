// src/modules/country/country.module.tsx
import React from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Globe } from "lucide-react";

const CountryListPage = React.lazy(() => import("./pages/list"));
const CountryCreatePage = React.lazy(() => import("./pages/create"));
const CountryEditPage = React.lazy(() => import("./pages/edit"));
const CountryShowPage = React.lazy(() => import("./pages/show"));

/**
 * Country module
 *
 * Aligns with Refine conventions:
 * - module.name: internal id ("country")
 * - resource.name: Refine resource key ("countries")
 * - meta.labelKey: i18n key (e.g. "countries.title")
 * - resource.icon: actual Lucide icon component for sidebar
 */
const CountryModule: AppModule = {
  // Internal module id
  name: "country",

// Optional grouping+sorting in custom sidebar
  group: "Data Management",
  priority: 10,

  // Refine resource configuration
  resource: {
    name: "countries",

    // Route segments for Refine router
    list: "/countries",
    create: "/countries/create",
    edit: "/countries/edit/:id",
    show: "/countries/show/:id",

    // Attach icon + i18n metadata
    icon: Globe,
    meta: {
      labelKey: "countries.title",
      label: "Countries",
    },
  },

  // Additional routes used by ModuleRouteLoader / RouteController
  routes: [
    {
      path: "countries",
      element: <CountryListPage />,
    },
    {
      path: "countries/create",
      element: <CountryCreatePage />,
      presentation: "page",
    },
    {
      path: "countries/edit/:id",
      element: <CountryEditPage />,
      presentation: {
        view: "drawer",
        side: "right",
        className: "w-[500px]",
      },
    },
    {
      path: "countries/show/:id",
      element: <CountryShowPage />,
      presentation: {
        view: "modal",
        className: "max-w-xl",
      },
    },
  ],
};

export default CountryModule;
