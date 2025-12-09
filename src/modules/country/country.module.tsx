// src/modules/country/country.module.tsx

import type { AppModule } from "@/core/bootstrap/app-module.type";
import { GlobeIcon } from "lucide-react";

import { CountryListPage } from "./pages/list";
import { CountryCreatePage } from "./pages/create";
import { CountryEditPage } from "./pages/edit";
import { CountryShowPage } from "./pages/show";

/**
 * Country Module
 *
 * Exposes:
 * - Refine Resource "countries"
 * - CRUD pages
 * - Sidebar placement under GROUP "Geography"
 * - Permissions for read + manage access
 *
 * This module will appear automatically in DynamicSidebar
 * via useSidebarFromModules(builder) with correct permissions.
 */

const CountryModule: AppModule = {
  /** Unique name */
  name: "country",

  /** Human readable label */
  label: "Countries",

  /** Sidebar + layout group */
  group: "Geography",

  /** Sort order */
  priority: 1,

  /** Hide from system navigation if needed */
  hidden: false,

  /** Module-level permissions (high-level) */
  requiredPermissions: ["geo:read"],

  /** Refine Resource Configuration */
  resource: {
    name: "countries",

    /** Refine pages */
    list: CountryListPage,
    create: CountryCreatePage,
    edit: CountryEditPage,
    show: CountryShowPage,

    /** Icon for sidebar */
    icon: GlobeIcon,

    /** Route options used by Refine and sidebar builder */
    meta: {
      /**
       * Define permission requirements for CRUD actions.
       * - geo:read   → view/list/show
       * - geo:manage → create/edit/delete
       */
      requiredPermissions: ["geo:read"],
    },

    /** Enable/disable resource in UI */
    options: {
      hidden: false,
    },
  },

  /** Optional routing extensions */
  routes: [
    {
      path: "/countries/manage",
      element: <CountryListPage />,
    },
  ],
};

export default CountryModule;
