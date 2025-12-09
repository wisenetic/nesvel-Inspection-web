// src/core/routing/ModuleRouteLoader.tsx
import React from "react";
import { Route } from "react-router";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import type { ModuleRouteConfig } from "./route.types";
import { ErrorComponent } from "@/core/layout/error-component";

/**
 * Helper that returns a fragment of <Route> elements for all module routes.
 *
 * NOTE: This is a plain function, not a React component, so you should use it as
 * `{renderModuleRoutes(modules)}` inside a <Routes> tree rather than
 * `<ModuleRouteLoader />`. This satisfies react-router v7's requirement that
 * all <Routes> children are <Route> or <React.Fragment>.
 */
export function renderModuleRoutes(modules: AppModule[]) {
  return (
    <>
      {modules.map((mod) => {
        const routes = (mod.routes ?? []) as ModuleRouteConfig[];
        return routes.map((r) => {
          const key = r.id ?? `${mod.name}:${r.path}`;
          return <Route key={key} path={r.path} element={r.element} />;
        });
      })}

      <Route path="*" element={<ErrorComponent />} />
    </>
  );
}
