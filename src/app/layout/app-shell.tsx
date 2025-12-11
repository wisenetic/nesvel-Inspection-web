"use client";

import type { PropsWithChildren } from "react";

import { LanguageSwitcher } from "@/core/components/shared/language-switcher";
import { ThemeToggle } from "@/core/components/refine-ui/theme/theme-toggle";
import { UserMenu } from "@/components/user/user-menu";
import { AppLayout } from "@/core/layout";

/**
 * AppShell
 *
 * Application-level shell that composes the core AppLayout and
 * injects app-specific header slots (language, theme, user info).
 *
 * This keeps `core` framework-like and reusable, while allowing each
 * application to customize its header actions and search area.
 */
export function AppShell({ children }: PropsWithChildren) {
  return (
    <AppLayout
      desktopHeaderSlot={
        <>
          <LanguageSwitcher />
          <ThemeToggle />
          <UserMenu />
        </>
      }
      mobileHeaderSlot={<ThemeToggle className="h-8 w-8" />}
      // You can plug in a breadcrumb/search component here later
      // searchSlot={<YourSearchComponent />}
      hideSearch={false}
    >
      {children}
    </AppLayout>
  );
}
