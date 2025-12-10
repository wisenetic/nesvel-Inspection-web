// src/modules/country/country.module.tsx
import React, { Suspense } from "react";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Globe } from "lucide-react";

const CountryListPage = React.lazy(() => import("./pages/list"));
const CountryCreatePage = React.lazy(() => import("./pages/create"));
const CountryEditPage = React.lazy(() => import("./pages/edit"));
const CountryShowPage = React.lazy(() => import("./pages/show"));

/**
 * This module defines:
 * - Resource metadata for Refine
 * - Sidebar grouping + priority
 * - Routes for Country CRUD
 * - Presentation settings (modal/drawer/page)
 */
const CountryModule: AppModule = {
  name: "country",
  label: "country.title",
  group: "Geography",
  priority: 10,

  resource: {
    name: "countries",
    label: "Countries111",
    list: "/countries",
    create: "/countries/create",
    edit: "/countries/edit/:id",
    show: "/countries/show/:id",

    meta: {
      labelKey: "countries.title", // used for i18n translate()
      icon: "Globe", // for dynamic lucide icon loader
    },
  },

  /**
   * Route definitions for refine + route controller.
   * The ModuleRouteLoader will mount these under the correct path.
   */
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
