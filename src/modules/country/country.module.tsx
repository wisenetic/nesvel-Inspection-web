// src/modules/country/country.module.tsx
import type { AppModule } from "@/core/bootstrap/app-module.type";
import { Globe } from "lucide-react";

import CountryListPage from "./pages/list";
import CountryCreatePage from "./pages/create";
import CountryEditPage from "./pages/edit";
import CountryShowPage from "./pages/show";

/**
 * This module defines:
 * - Resource metadata for Refine
 * - Sidebar grouping + priority
 * - Routes for Country CRUD
 * - Presentation settings (modal/drawer/page)
 */
const CountryModule: AppModule = {
  name: "country",
  label: "Countries",
  group: "Geography",
  priority: 10,

  resource: {
    name: "countries",
    label: "Countries",
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

  /**
   * (Optional) Presentation defaults for /r/:resource/edit/:id overlay routes
   */
  presentation: {
    edit: { view: "drawer", side: "right", className: "w-[500px]" },
    show: { view: "modal", className: "max-w-xl" },
    create: "page",
  },

  /**
   * Optional: For overlay rendering (RouteController)
   */
  renderPresentation: ({ mode }) => {
    switch (mode) {
      case "modal":
        return <CountryShowPage />;
      case "drawer":
        return <CountryEditPage />;
      default:
        return null;
    }
  },
};

export default CountryModule;
