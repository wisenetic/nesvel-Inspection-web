"use client";

import type { ReactNode } from "react";
import { SidebarTrigger, useSidebar } from "@/core/components/ui/sidebar";
import { Input } from "@/core/components/ui/input";
import { cn } from "@/core/lib/utils";

export type HeaderProps = {
  /** Extra styles for desktop header wrapper */
  desktopClassName?: string;

  /** Extra styles for mobile header wrapper */
  mobileClassName?: string;

  /** Right side actions on desktop (App injects them) */
  desktopRightSlot?: ReactNode;

  /** Right side actions on mobile */
  mobileRightSlot?: ReactNode;

  /** Optional search bar override */
  searchSlot?: ReactNode;

  /** Hide the search bar entirely */
  hideSearch?: boolean;
};

export const Header = ({
  desktopClassName,
  mobileClassName,
  desktopRightSlot,
  mobileRightSlot,
  searchSlot,
  hideSearch = false,
}: HeaderProps) => {
  const { isMobile } = useSidebar();

  return isMobile ? (
    <MobileHeader className={mobileClassName} rightSlot={mobileRightSlot} />
  ) : (
    <DesktopHeader
      className={desktopClassName}
      rightSlot={desktopRightSlot}
      hideSearch={hideSearch}
      searchSlot={searchSlot}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                               DESKTOP HEADER                               */
/* -------------------------------------------------------------------------- */
type DesktopHeaderProps = {
  className?: string;
  hideSearch?: boolean;
  searchSlot?: ReactNode;
  rightSlot?: ReactNode;
};

const DesktopHeader = ({
  className,
  rightSlot,
  hideSearch,
  searchSlot,
}: DesktopHeaderProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 px-4",
        className,
      )}
    >
      {/* Left: sidebar trigger */}
      <div className="flex items-center">
        <SidebarTrigger className="text-muted-foreground" />
      </div>

      {/* Center: Search (optional, can be overridden) */}
      {!hideSearch && (
        <div className="flex flex-1 justify-center px-4">
          {searchSlot ? (
            searchSlot
          ) : (
            <div className="w-full max-w-xl">
              <Input
                type="search"
                placeholder="Search"
                className="h-9 bg-background"
              />
            </div>
          )}
        </div>
      )}

      {/* Right: app-provided actions */}
      <div className="flex items-center gap-3">{rightSlot}</div>
    </header>
  );
};

/* -------------------------------------------------------------------------- */
/*                                MOBILE HEADER                               */
/* -------------------------------------------------------------------------- */
type MobileHeaderProps = {
  className?: string;
  rightSlot?: ReactNode;
};

const MobileHeader = ({ className, rightSlot }: MobileHeaderProps) => {
  const { open, isMobile } = useSidebar();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-12 shrink-0 items-center gap-2 px-2",
        className,
      )}
    >
      {/* Mobile Sidebar Trigger */}
      <SidebarTrigger
        className={cn("text-muted-foreground rotate-180 ml-1", {
          "opacity-0": open,
          "opacity-100": !open || isMobile,
          "pointer-events-none": open && !isMobile,
        })}
      />

      {/* Right side actions */}
      <div className="ml-auto flex items-center gap-2">{rightSlot}</div>
    </header>
  );
};
