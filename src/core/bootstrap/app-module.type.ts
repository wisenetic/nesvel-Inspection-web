// src/core/bootstrap/app-module.type.ts
import type { IResourceItem } from "@refinedev/core";
import type { ReactNode } from "react";
import type {
  ModuleRouteConfig,
  RoutePresentation,
} from "@/core/routing/route.types";

/**
 * AppModule
 * Defines how each module registers itself into the system.
 */
export interface AppModule {
  /**
   * Unique module identifier
   */
  name: string;

  /**
   * Human readable label (optional)
   */
  label?: string;

  /**
   * Sidebar group (Example: "Geography", "Administration")
   */
  group?: string;

  /**
   * Sorting priority (lower loads earlier in menus)
   */
  priority?: number;

  /**
   * Hide module from sidebar/navigation (useful for internal modules)
   */
  hidden?: boolean;

  /**
   * Refine resource definition
   * This maps the module into <Refine resources=[...] />
   */
  requiredPermissions?: string[] | ((userPermissions: string[]) => boolean);

  resource?: IResourceItem & {
    meta?: {
      requiredPermissions?: string[];
      [key: string]: unknown;
    };
    options?: {
      hidden?: boolean;
    };
  };

  /**
   * Optional icon for sidebar menu
   */
  icon?: ReactNode;

  /**
   * Additional custom routes this module wants to register
   */
  routes?: ModuleRouteConfig[];

  /**
   * Presentation defaults for overlay routes (used by RouteController)
   */
  presentation?: {
    list?: RoutePresentation;
    show?: RoutePresentation;
    edit?: RoutePresentation;
    create?: RoutePresentation;
  };

  /**
   * Optional custom renderer for overlay content (modal/drawer)
   */
  renderPresentation?: (ctx: { mode: "page" | "drawer" | "modal" }) =>
    | ReactNode
    | null;
}
