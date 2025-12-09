"use client";

import React from "react";

import {
  DynamicSidebar,
  type SidebarConfig,
  type SidebarItemConfig,
} from "@/core/components/shared/sidebar";
import { cn } from "@/core/lib/utils";
import {
  useLink,
  useMenu,
  useRefineOptions,
  type TreeMenuItem,
} from "@refinedev/core";

function mapTreeItemToSidebarItem(
  item: TreeMenuItem,
  selectedKey?: string,
): SidebarItemConfig {
  const hasChildren = item.children && item.children.length > 0;

  return {
    id: String(item.key ?? item.name ?? item.route ?? Math.random()),
    kind: "link",
    title: String(item.label ?? item.name ?? ""),
    href: item.route ?? "",
    icon: (item.meta?.icon ?? item.icon) as any,
    current: item.key === selectedKey,
    children: hasChildren
      ? item.children!.map((child) =>
          mapTreeItemToSidebarItem(child, selectedKey),
        )
      : undefined,
  };
}

function buildSidebarConfig(
  menuItems: TreeMenuItem[],
  selectedKey?: string,
): SidebarConfig {
  const items: SidebarItemConfig[] = [];
  const groups: Record<string, SidebarItemConfig> = {};

  for (const item of menuItems) {
    const groupName = (item.meta?.group as string | undefined) ?? "";
    const mapped = mapTreeItemToSidebarItem(item, selectedKey);

    if (groupName) {
      if (!groups[groupName]) {
        groups[groupName] = {
          id: `group-${groupName}`,
          kind: "group",
          title: groupName,
          children: [],
        };
        items.push(groups[groupName]);
      }

      (groups[groupName].children as SidebarItemConfig[]).push(mapped);
    } else {
      items.push(mapped);
    }
  }

  return { items };
}

export function Sidebar() {
  const { menuItems, selectedKey } = useMenu();
  const Link = useLink();
  const { title } = useRefineOptions();

  const config = React.useMemo(
    () => buildSidebarConfig(menuItems, selectedKey),
    [menuItems, selectedKey],
  );

  const headerSlot = (
    <div className="flex h-16 items-center px-2">
      <div className="flex w-full items-center gap-2 rounded-md px-2 py-1">
        {title.icon && (
          <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {title.icon}
          </div>
        )}
        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
          <span className="truncate font-semibold">{title.text}</span>
        </div>
      </div>
    </div>
  );

  return (
    <DynamicSidebar
      config={config}
      side="left"
      variant="sidebar"
      collapsible="icon"
      className={cn("border-none")}
      styles={{
        header: "!p-0 border-b border-border",
        item: "h-9 text-sm font-medium",
        itemActive:
          "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground",
        icon: "!h-4 !w-4",
      }}
      headerSlot={headerSlot}
      renderItemContent={({ title, defaultIcon }) => (
        <>
          {defaultIcon}
          {title && <span className="truncate">{title}</span>}
        </>
      )}
      LinkComponent={Link as any}
    />
  );
}

Sidebar.displayName = "Sidebar";
