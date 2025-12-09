// src/core/components/shared/sidebar/sidebar-utils.ts
import type {
  SidebarConfig,
  SidebarItemConfig,
  MatchStrategy,
} from "./sidebar.types";

/**
 * Flatten items (non-divider) - utility
 */
export function flattenSidebarItems(
  config: SidebarConfig,
): SidebarItemConfig[] {
  const result: SidebarItemConfig[] = [];

  const walk = (items?: SidebarItemConfig[]) => {
    if (!items) return;
    for (const item of items) {
      if (item.kind !== "divider") {
        result.push(item);
      }
      if (item.children && item.children.length > 0) {
        walk(item.children);
      }
    }
  };

  walk(config.items);
  walk(config.secondaryItems);
  walk(config.footerItems);
  return result;
}

/**
 * Find item by href
 */
export function findSidebarItemByHref(
  config: SidebarConfig,
  href: string,
): SidebarItemConfig | undefined {
  const all = flattenSidebarItems(config);
  return all.find((item) => item.href === href);
}

/**
 * Normalize paths: trim trailing slash except root
 */
function normalizePath(p?: string) {
  if (!p) return "";
  if (p === "/") return "/";
  return p.replace(/\/+$/, "");
}

/**
 * Returns boolean for match using strategy
 */
function matchPath(
  currentPath: string,
  itemHref: string,
  strategy?: MatchStrategy,
) {
  const c = normalizePath(currentPath);
  const h = normalizePath(itemHref);

  if (!h) return false;

  switch (strategy ?? "segment") {
    case "exact":
      return c === h;
    case "prefix":
      // legacy behavior: startsWith
      return c.startsWith(h);
    case "segment":
    default:
      // ensure boundary at segment: /users matches /users and /users/123 but not /usersettings
      if (c === h) return true;
      return c.startsWith(h + "/");
  }
}

/**
 * Mark current items recursively.
 * This function is pure and doesn't mutate the input.
 */
export function markCurrentItem(
  config: SidebarConfig,
  currentPath: string,
): SidebarConfig {
  const mark = (
    items: SidebarItemConfig[] | undefined,
  ): SidebarItemConfig[] | undefined => {
    if (!items) return items;

    return items.map((item) => {
      const children = mark(item.children);
      let isLeafMatch = false;

      if (item.href) {
        const metaStrategy = (item as any).meta?.matchStrategy as
          | MatchStrategy
          | undefined;
        isLeafMatch = matchPath(currentPath, item.href, metaStrategy);
      }

      const hasActiveChild = children?.some((c) => c.current) ?? false;

      return {
        ...item,
        current: isLeafMatch || hasActiveChild,
        children,
      };
    });
  };

  return {
    ...config,
    items: mark(config.items) ?? [],
    secondaryItems: mark(config.secondaryItems),
    footerItems: mark(config.footerItems),
  };
}
