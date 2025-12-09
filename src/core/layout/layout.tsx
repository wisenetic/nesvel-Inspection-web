// src/core/layout/layout.tsx
import React from "react";
import { Outlet } from "react-router";
import { cn } from "@/core/lib/utils";
//import { ErrorBoundary } from "react-error-boundary";

import { SidebarWrapper } from "./sidebar/SidebarWrapper";
import { Header } from "./header/header";
import { ErrorComponent } from "./error-component";
import { SidebarInset, SidebarProvider } from "@/core/components/ui/sidebar";

type AppLayoutProps = {
  className?: string;
  children?: React.ReactNode; // optional for custom content; default to <Outlet />
};

/**
 * AppLayout - App shell that composes Header + Sidebar + Content area.
 * - Responsive: mobile drawer for sidebar, collapsible desktop sidebar.
 * - Accessibility friendly.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  className,
  children,
}) => {
  return (
    <SidebarProvider>
      <div className={cn("min-h-screen flex bg-slate-50", className)}>
        {/* Sidebar (left) */}
        <SidebarWrapper />

        {/* Main content column */}
        <SidebarInset>
          <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 p-6 md:p-8">
              {/* <ErrorBoundary FallbackComponent={ErrorComponent}> */}
              {children ?? <Outlet />}
              {/* </ErrorBoundary> */}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
