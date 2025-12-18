"use client";

import { Header } from "@/core/components/refine-ui/layout/header";
import { ThemeProvider } from "@/core/components/refine-ui/theme/theme-provider";
import { SidebarInset, SidebarProvider } from "@/core/components/ui/sidebar";
import { cn } from "@/core/lib/utils";
import type { PropsWithChildren } from "react";
import { Sidebar } from "./sidebar";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header />
          <main
            className={cn(
              "@container/main",
              "container",
              "mx-auto",
              "relative",
              "w-full",
              "min-w-0",
              "flex",
              "flex-col",
              "flex-1",
              "px-2",
              "pt-4",
              "md:p-4",
              "lg:px-6",
              "lg:pt-6",
            )}
          >
            {/* Only this wrapper should scroll horizontally (tables/grids/etc). */}
            <div className="min-w-0 flex-1 overflow-x-auto">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

Layout.displayName = "Layout";
