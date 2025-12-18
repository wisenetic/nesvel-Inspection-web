"use client";

import React from "react";
import { Outlet } from "react-router";
import { cn } from "@/core/lib/utils";

import { SidebarWrapper } from "./sidebar/SidebarWrapper";
import { Header } from "./header/header";

import { SidebarProvider, SidebarInset } from "@/core/components/ui/sidebar";

type AppLayoutProps = {
  /** custom CSS classes */
  className?: string;

  /** custom page content */
  children?: React.ReactNode;

  /** right-side header actions (desktop) */
  desktopHeaderSlot?: React.ReactNode;

  /** right-side header actions (mobile) */
  mobileHeaderSlot?: React.ReactNode;

  /** custom header search component */
  searchSlot?: React.ReactNode;

  /** hide search bar */
  hideSearch?: boolean;
};

/**
 * AppLayout — pure framework shell.
 * No app logic, no customer dependency.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  className,
  children,
  desktopHeaderSlot,
  mobileHeaderSlot,
  searchSlot,
  hideSearch = false,
}) => {
  return (
    <SidebarProvider iconWidth="5rem">
      {/* Sidebar (left inset) */}
      <SidebarWrapper />

      {/* Main content column */}
      <SidebarInset>
        {/* HEADER: Application injects custom actions */}
        <Header
          desktopClassName="border-b border-border bg-sidebar"
          mobileClassName="border-b border-border bg-sidebar pr-3 justify-between"
          desktopRightSlot={desktopHeaderSlot}
          mobileRightSlot={mobileHeaderSlot}
          searchSlot={searchSlot}
          hideSearch={hideSearch}
        />

        {/* MAIN */}
        <main className="flex min-w-0 flex-1 p-6 md:p-8">
          {/* Only this wrapper should scroll horizontally (tables/grids/etc). */}
          <div className="min-w-0 flex-1 overflow-x-auto">
            {children ?? <Outlet />}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
