// src/core/components/shared/sidebar/dynamic-sidebar.tsx
import { useCallback, useMemo } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router";

import {
  Sidebar as ShadcnSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
} from "@/core/components/ui/sidebar";

import { cn } from "@/core/lib/utils";

import { SidebarItemsRenderer } from "./sidebar-items-renderer";
import type { DynamicSidebarProps } from "./sidebar.types";
import { markCurrentItem } from "./sidebar-utils";

export const DynamicSidebar: React.FC<DynamicSidebarProps> = ({
  config,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  styles,
  currentPath,
  onNavigate,
  headerSlot,
  footerSlot,
  renderIcon,
  renderItemContent,
  LinkComponent,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Use provided currentPath or router path
  const effectivePath = currentPath ?? location.pathname;

  const computedConfig = useMemo(
    () => markCurrentItem(config, effectivePath),
    [config, effectivePath],
  );

  const handleNavigate = useCallback(
    (href: string) => {
      if (!href) return;
      if (onNavigate) {
        onNavigate(href);
        return;
      }
      // prefer LinkComponent if provided (client side)
      if (LinkComponent) {
        // let Link handle it - parent LinkComponent will be used by renderer
        navigate(href);
        return;
      }
      // fallback programmatic navigation
      navigate(href);
    },
    [LinkComponent, navigate, onNavigate],
  );

  const hasFooterItems =
    computedConfig.footerItems && computedConfig.footerItems.length > 0;

  return (
    <ShadcnSidebar
      side={side}
      variant={variant}
      collapsible={collapsible}
      className={cn(styles?.root, className)}
      data-testid="dynamic-sidebar"
      aria-label="Primary navigation"
    >
      {headerSlot && (
        <SidebarHeader className={styles?.header}>{headerSlot}</SidebarHeader>
      )}

      <SidebarContent className={styles?.content}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarItemsRenderer
              items={computedConfig.items}
              zone="primary"
              styles={styles}
              onNavigate={handleNavigate}
              renderIcon={renderIcon}
              renderItemContent={renderItemContent}
              LinkComponent={LinkComponent ?? RouterLink}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        {computedConfig.secondaryItems &&
          computedConfig.secondaryItems.length > 0 && (
            <div className={styles?.secondary}>
              <SidebarItemsRenderer
                items={computedConfig.secondaryItems}
                zone="secondary"
                styles={styles}
                onNavigate={handleNavigate}
                renderIcon={renderIcon}
                renderItemContent={renderItemContent}
                LinkComponent={LinkComponent ?? RouterLink}
              />
            </div>
          )}
      </SidebarContent>

      {(footerSlot || hasFooterItems) && (
        <SidebarFooter className={styles?.footer}>
          {footerSlot}
          {hasFooterItems && (
            <SidebarItemsRenderer
              items={computedConfig.footerItems!}
              zone="footer"
              styles={styles}
              onNavigate={handleNavigate}
              renderIcon={renderIcon}
              renderItemContent={renderItemContent}
              LinkComponent={LinkComponent ?? RouterLink}
            />
          )}
        </SidebarFooter>
      )}
    </ShadcnSidebar>
  );
};
