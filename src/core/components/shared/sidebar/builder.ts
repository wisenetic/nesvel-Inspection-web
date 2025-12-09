// src/core/components/shared/sidebar/builder.ts
import { usePermissions } from "@refinedev/core";
import type { AppModule } from "@/core/bootstrap/app-module.type";
import type { SidebarConfig, SidebarItemConfig } from "./sidebar.types";

/**
 * Evaluate permission requirement.
 */
function hasPermission(
  required: string[] | undefined | ((userPermissions: string[]) => boolean),
  userPerms: string[],
): boolean {
  if (!required) return true; // no requirement → allowed

  if (typeof required === "function") {
    return required(userPerms);
  }

  // required is string[]
  return required.every((p) => userPerms.includes(p));
}

/**
 * Builder hook that produces a SidebarConfig from modules
 * while applying permissions and module/resource meta filtering.
 */
export function useSidebarFromModules(modules: AppModule[]): SidebarConfig {
  const { data: permData } = usePermissions<{ roles: string[] }>();
  const userPerms = permData?.roles ?? [];

  const items: SidebarItemConfig[] = [];

  const pushIntoGroup = (group: string, item: SidebarItemConfig) => {
    const existing = items.find(
      (i) => i.kind === "group" && i.title === group,
    ) as SidebarItemConfig | undefined;

    if (existing) {
      existing.children = existing.children ?? [];
      existing.children.push(item);
      return;
    }

    items.push({
      id: `group-${group}`,
      title: group,
      kind: "group",
      children: [item],
    });
  };

  for (const mod of modules) {
    // Skip hidden modules
    if (mod.hidden) continue;

    // Check module-level permissions
    if (!hasPermission(mod.requiredPermissions, userPerms)) continue;

    const res = mod.resource;
    if (!res) continue;

    // Skip resource hidden via options
    if (res.options?.hidden === true) continue;

    // Check resource-level permission
    if (!hasPermission(res.meta?.requiredPermissions, userPerms)) continue;

    // Compute final menu item
    const href = `/${res.name}`;
    const title = mod.label ?? (res.label as string) ?? res.name ?? "Untitled";
    const id = `mod-${res.name}`;

    const item: SidebarItemConfig = {
      id,
      kind: "link",
      title,
      href,
      icon: (res as any).icon ?? undefined,
      meta: {
        moduleName: mod.name,
        group: mod.group,
        ...res.meta,
      },
    };

    // Grouped modules
    if (mod.group) {
      pushIntoGroup(mod.group, item);
    } else {
      items.push(item);
    }
  }

  return { items };
}
