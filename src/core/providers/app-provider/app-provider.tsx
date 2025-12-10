"use client";

import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";

import { BrowserRouter } from "react-router";
import { useTranslation } from "react-i18next";
import "@/core/i18n/i18n";

import { Toaster } from "@/core/components/refine-ui/notification/toaster";
import { useNotificationProvider } from "@/core/components/refine-ui/notification/use-notification-provider";

import { ThemeProvider } from "@/core/providers/theme-provider";
import { LanguageProvider, type LanguageItem } from "@/core/providers/language-provider";
import { getDataProvider } from "@/core/providers/data-provider";

import { authProvider } from "@/core/providers/auth-provider";
import { appResources } from "@/core/bootstrap";
import { AppRoutes } from "@/core/routing/app-routes";

type AppProviderProps = {
  children?: React.ReactNode; // not required but helpful later
  languages: LanguageItem[];
};

export const AppProvider = ({ children, languages }: AppProviderProps) => {
  const dataProvider = getDataProvider();
  const { i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params?: Record<string, string | number>) =>
      i18n.t(key, params),
    changeLocale: async (lang: string) => {
      await i18n.changeLanguage(lang);
      return lang;
    },
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <LanguageProvider languages={languages}>
        <RefineKbarProvider>
          <ThemeProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider()}
                routerProvider={routerProvider}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                resources={appResources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "j35ggW-mPJX5C-cuBY6x",
                }}
              >
                <AppRoutes />
                {children}

                {/* Global utilities */}
                <Toaster />
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>

              <DevtoolsPanel />
            </DevtoolsProvider>
          </ThemeProvider>
        </RefineKbarProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};
