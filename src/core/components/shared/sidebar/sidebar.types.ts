// src/core/components/shared/sidebar/sidebar.types.ts
import type React from "react";
import type { IResourceItem } from "@refinedev/core";

/**
 * Sidebar item kinds
 */
export type SidebarItemKind =
  | "link"
  | "group"
  | "section"
  | "divider"
  | "label"
  | "action";

/**
 * Base item interface
 */
export interface SidebarItemBase {
  id: string;
  title?: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: SidebarItemConfig[];
  current?: boolean;
  disabled?: boolean;
  badge?: string | number;
  collapsible?: boolean;
  defaultOpen?: boolean;
  meta?: Record<string, unknown>;
}

/**
 * Variants that influence matching strategy for active detection.
 * "prefix" = startsWith (legacy); "exact" = exact path match; "segment" = path segment boundary.
 */
export type MatchStrategy = "exact" | "segment" | "prefix";

export interface SidebarLinkItem extends SidebarItemBase {
  kind: "link" | "action";
  /** optional override for how to match active state */
  meta?: SidebarItemBase["meta"] & { matchStrategy?: MatchStrategy };
}

export interface SidebarGroupItem extends SidebarItemBase {
  kind: "group";
}

export interface SidebarSectionItem extends SidebarItemBase {
  kind: "section";
  label: string;
}

export interface SidebarDividerItem {
  kind: "divider";
  id: string;
}

export interface SidebarLabelItem extends SidebarItemBase {
  kind: "label";
}

export type SidebarItemConfig =
  | SidebarLinkItem
  | SidebarGroupItem
  | SidebarSectionItem
  | SidebarDividerItem
  | SidebarLabelItem;

export interface SidebarConfig {
  items: SidebarItemConfig[];
  secondaryItems?: SidebarItemConfig[];
  footerItems?: SidebarItemConfig[];
}

/**
 * DynamicSidebar styling hook - consumers can pass classes
 */
export type DynamicSidebarStyles = {
  root?: string;
  header?: string;
  content?: string;
  sectionLabel?: string;
  item?: string;
  itemActive?: string;
  icon?: string;
  iconOnlyWidth?: string;
  footer?: string;
  secondary?: string;
};

/**
 * Public props for DynamicSidebar
 */
export type DynamicSidebarProps = {
  config: SidebarConfig;
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  className?: string;
  styles?: DynamicSidebarStyles;
  currentPath?: string;
  onNavigate?: (href: string) => void;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  renderIcon?: (
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    ctx: { itemId: string },
  ) => React.ReactNode;
  renderItemContent?: (ctx: {
    id: string;
    title?: string;
    href?: string;
    isActive: boolean;
    defaultIcon: React.ReactNode | null;
  }) => React.ReactNode;
  LinkComponent?: React.ComponentType<any>;
};
