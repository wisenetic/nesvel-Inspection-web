// src/core/routing/route.types.ts
import type { ReactNode } from "react";

export type RoutePresentation =
  | "page"
  | "drawer"
  | "modal"
  | {
      view: "page" | "drawer" | "modal";
      side?: "left" | "right";
      className?: string;
    };

export interface ModuleRouteConfig {
  path: string;
  element: ReactNode;
  presentation?: RoutePresentation;
  id?: string;
}
