// src/core/layout/sidebar/SidebarWrapper.tsx
import React from "react";
import { Link as RouterLink } from "react-router";

import { bootstrap } from "@/core/bootstrap";
import { useSidebarFromModules } from "@/core/components/shared/sidebar/builder";
import { DynamicSidebar } from "@/core/components/shared/sidebar";
import { cn } from "@/core/lib/utils";

/**
 * SidebarWrapper renders the shadcn-based DynamicSidebar for the module system.
 *
 * It relies on the global <SidebarProvider> from src/core/components/ui/sidebar,
 * which should wrap this component at the layout level (see AppLayout).
 */
export const SidebarWrapper: React.FC = () => {
  const config = useSidebarFromModules(bootstrap.modules);

  return (
    <DynamicSidebar
      config={config}
      side="left"
      variant="sidebar"
      collapsible="icon"
      className={cn("border-r border-border bg-sidebar")}
      styles={{
        root: "h-svh",
        item: "h-9 text-sm font-medium",
        itemActive:
          "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground",
        icon: "!h-4 !w-4",
      }}
      LinkComponent={RouterLink}
    />
  );
};
