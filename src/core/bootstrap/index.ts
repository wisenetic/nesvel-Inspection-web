// src/core/bootstrap.ts
import type { AppModule } from "@/core/types/app-module.type";
import type { IResourceItem } from "@refinedev/core";

/**
 * Auto-import all modules (*.module.tsx)
 */
const moduleFiles = import.meta.glob<AppModule>("@/modules/*/*.module.tsx", {
  eager: true,
});

/**
 * Convert module exports to array
 */
const loadedModules: AppModule[] = Object.values(moduleFiles).map((mod: any) =>
  mod.default ? mod.default : Object.values(mod)[0],
);

/**
 * Filter + Sort Modules by priority
 */
export const appModules: AppModule[] = loadedModules
  .filter((mod) => !mod.hidden)
  .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));

/**
 * Build Refine Resources
 */
export const appResources: IResourceItem[] = appModules
  .filter((m) => m.resource)
  .map((m) => m.resource);

/**
 * Optional: group modules for sidebar rendering
 */
export const groupedModules = appModules.reduce((acc, module) => {
  const group = module.group ?? "General";
  if (!acc[group]) acc[group] = [];
  acc[group].push(module);
  return acc;
}, {} as Record<string, AppModule[]>);

/**
 * Main export — your app's runtime configuration
 */
export const bootstrap = {
  modules: appModules,
  resources: appResources,
  groupedModules,
};
