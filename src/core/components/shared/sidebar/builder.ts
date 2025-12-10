// src/core/components/shared/sidebar/builder.ts
// NOTE: Permission-based filtering is currently disabled because usePermissions
// throws when Refine context/options are not initialized in some render paths.
// When auth/permissions are wired, re-enable this import and logic.
// import { usePermissions } from "@refinedev/core";
import { useTranslation } from "@refinedev/core";
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
  // TODO: integrate real permissions when authProvider + access control are ready.
  // For now, render all modules/resources and ignore permission filters.
  const userPerms: string[] = [];
  const { translate } = useTranslation();

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

    // Prefer meta.labelKey for i18n, fallback to explicit labels
    const rawLabelKey = (res.meta as any)?.labelKey as string | undefined;
    const fallbackLabel =
      (res.label as string | undefined) ??
      mod.label ??
      res.name ??
      "Untitled";

    const title = rawLabelKey ? translate(rawLabelKey) : fallbackLabel;
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
