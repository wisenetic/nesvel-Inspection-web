// src/core/layout/sidebar/useSidebarState.ts
import * as React from "react";

/**
 * Simple shared hook to manage sidebar open/collapse state.
 * This keeps layout and header in sync without prop drilling.
 */
const SidebarStateContext = React.createContext<{
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapse: () => void;
  toggleMobile: () => void;
  setMobileOpen: (v: boolean) => void;
} | null>(null);

export const SidebarStateProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(() => {
    // read persisted collapsed state
    try {
      const s = localStorage.getItem("sidebarCollapsed");
      return s === "true";
    } catch {
      return false;
    }
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleCollapse = React.useCallback(() => {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem("sidebarCollapsed", next ? "true" : "false");
      } catch {}
      return next;
    });
  }, []);

  const toggleMobile = React.useCallback(() => setMobileOpen((v) => !v), []);
  const setMobileOpenFn = React.useCallback(
    (v: boolean) => setMobileOpen(v),
    [],
  );

  const value = React.useMemo(
    () => ({
      collapsed,
      mobileOpen,
      toggleCollapse,
      toggleMobile,
      setMobileOpen: setMobileOpenFn,
    }),
    [collapsed, mobileOpen, toggleCollapse, toggleMobile, setMobileOpenFn],
  );

  return (
    <SidebarStateContext.Provider value={value}>
      {children}
    </SidebarStateContext.Provider>
  );
};

export function useSidebarState() {
  const ctx = React.useContext(SidebarStateContext);
  if (!ctx) {
    throw new Error("useSidebarState must be used within SidebarStateProvider");
  }
  return ctx;
}
