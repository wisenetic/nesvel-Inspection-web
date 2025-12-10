import { useTheme as useThemeFromProvider } from "@/core/providers/theme-provider";
import type { ThemeContextValue } from "@/core/providers/theme-provider";

// Thin alias so shared components can import from a neutral hook path
// without depending directly on the provider module structure.
export function useTheme(): ThemeContextValue {
  return useThemeFromProvider();
}
