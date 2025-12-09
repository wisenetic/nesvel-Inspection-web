// src/core/routing/RouteController.tsx
import React from "react";
import { useLocation, useNavigate, matchPath } from "react-router";
import type { AppModule } from "@/core/bootstrap/app-module.type";

import { Dialog, DialogContent } from "@/core/components/ui/dialog";
import { Sheet, SheetContent } from "@/core/components/ui/sheet";

export const RouteController: React.FC<{ modules: AppModule[] }> = ({
  modules,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Detect overlay pattern: /r/:resource/*
  const match = matchPath("/r/:resource/*", pathname);
  if (!match) return null;

  const resource = match.params.resource!;
  const mod = modules.find((m) => m.resource?.name === resource);
  if (!mod) return null;

  // Identify presentation context: show/edit/create
  const show = matchPath(`/r/${resource}/show/:id`, pathname);
  const edit = matchPath(`/r/${resource}/edit/:id`, pathname);
  const create = matchPath(`/r/${resource}/create`, pathname);

  const pres = show
    ? mod.presentation?.show
    : edit
    ? mod.presentation?.edit
    : create
    ? mod.presentation?.create
    : null;

  if (!pres) return null;

  const cfg = typeof pres === "string" ? { view: pres } : pres;

  const overlayContent =
    typeof mod.renderPresentation === "function"
      ? mod.renderPresentation({ mode: cfg.view })
      : (() => {
          const matchRoute = (mod.routes ?? []).find((route: any) => {
            if (!route.path) return false;
            if (show && route.path.includes("show")) return true;
            if (edit && route.path.includes("edit")) return true;
            if (create && route.path.includes("create")) return true;
            return false;
          });
          return matchRoute?.element ?? null;
        })();

  if (!overlayContent) return null;

  // Drawer
  if (cfg.view === "drawer") {
    return (
      <Sheet open onOpenChange={() => navigate(-1)}>
        <SheetContent
          side={cfg.side ?? "right"}
          className={`${cfg.className ?? ""} overflow-y-auto`}
        >
          {overlayContent}
        </SheetContent>
      </Sheet>
    );
  }

  // Modal
  if (cfg.view === "modal") {
    return (
      <Dialog open onOpenChange={() => navigate(-1)}>
        <DialogContent className={cfg.className}>
          {overlayContent}
        </DialogContent>
      </Dialog>
    );
  }

  return null;
};
