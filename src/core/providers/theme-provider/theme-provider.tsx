"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Theme } from "./theme-context";
import { ThemeContext } from "./theme-context";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const isBrowser = typeof window !== "undefined";

function getSystemTheme(): "light" | "dark" {
  if (!isBrowser) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "ims-theme",
}: ThemeProviderProps) => {
  // Load local storage value safely
  const initialTheme =
    (isBrowser ? (localStorage.getItem(storageKey) as Theme | null) : null) ||
    defaultTheme;

  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    theme === "system" ? getSystemTheme() : theme,
  );

  /** -----------------------------------------------------
   * Update <html> class
   * ----------------------------------------------------- */
  const applyTheme = useCallback((currentTheme: Theme) => {
    if (!isBrowser) return;

    const root = document.documentElement;

    const nextTheme =
      currentTheme === "system" ? getSystemTheme() : currentTheme;

    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);

    setResolvedTheme(nextTheme);
  }, []);

  /** -----------------------------------------------------
   * Update theme + storage
   * ----------------------------------------------------- */
  const setTheme = useCallback(
    (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
      applyTheme(newTheme);
    },
    [applyTheme, storageKey],
  );

  /** -----------------------------------------------------
   * Apply theme on mount
   * ----------------------------------------------------- */
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  /** -----------------------------------------------------
   * Listen to system theme changes
   * ----------------------------------------------------- */
  useEffect(() => {
    if (!isBrowser) return;

    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      applyTheme("system");
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme, applyTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
