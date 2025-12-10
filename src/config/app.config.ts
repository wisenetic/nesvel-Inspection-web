import type { AppConfig } from "@/core/types/app-config.types";

export const appConfig: AppConfig = {
  brand: {
    name: "Nesvel IMS",
    logoLight: "/assets/logo-light.svg",
    logoDark: "/assets/logo-dark.svg",
    slogan: "Inspection Manager System",
  },
  features: {
    i18n: true,
    darkMode: true,
    multiTenancy: false,
    aiAssistant: false,
    auditLogs: true,
  },
  env: {
    apiBaseUrl: import.meta.env.VITE_API_URL,
    wsBaseUrl: import.meta.env.VITE_WS_URL,
    environment:
      (import.meta.env.MODE as "mock" | "dev" | "staging" | "production") ??
      "dev",
  },
  defaultLanguage: "en",
  supportedLanguages: [
    { key: "en", label: "English", flag: "/flags/gb.svg", direction: "ltr" },
    { key: "ar", label: "العربية", flag: "/flags/sa.svg", direction: "rtl" },
  ],
};
