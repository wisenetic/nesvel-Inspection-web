// src/core/routing/ModuleRouteLoader.tsx
import React from "react";
import { Route } from "react-router";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import type { ModuleRouteConfig } from "./route.types";
import { ErrorComponent } from "@/core/layout/error-component";

export const ModuleRouteLoader: React.FC<{ modules: AppModule[] }> = ({
  modules,
}) => {
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
};
