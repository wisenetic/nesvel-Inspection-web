export type LanguageOption = {
  key: string;
  label: string;
  flag?: string;
  direction?: "ltr" | "rtl";
};

export type BrandConfig = {
  name: string;
  logoLight?: string;
  logoDark?: string;
  slogan?: string;
};

export type FeatureFlags = {
  i18n?: boolean;
  darkMode?: boolean;
  multiTenancy?: boolean;
  aiAssistant?: boolean;
  auditLogs?: boolean;
};

export type EnvConfig = {
  apiBaseUrl: string;
  wsBaseUrl?: string;
  environment: "mock" | "dev" | "staging" | "production";
};

export type AppConfig = {
  brand: BrandConfig;
  features: FeatureFlags;
  env: EnvConfig;
  defaultLanguage: string;
  supportedLanguages: LanguageOption[];
};
