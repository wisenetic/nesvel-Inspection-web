"use client";

import { createContext, useContext } from "react";
import type { AppConfig } from "@/core/providers/app-config-provider/app-config.types";

const AppConfigContext = createContext<AppConfig | null>(null);

export const AppConfigProvider = ({
  config,
  children,
}: {
  config: AppConfig;
  children: React.ReactNode;
}) => {
  return (
    <AppConfigContext.Provider value={config}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const ctx = useContext(AppConfigContext);
  if (!ctx)
    throw new Error("useAppConfig must be used within AppConfigProvider");
  return ctx;
};
