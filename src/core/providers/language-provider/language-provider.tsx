"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type LanguageItem = {
  key: string; // "en"
  label: string; // "English"
  flag?: string; // "/flags/en.png" or "🇺🇸"
};

export type LanguageProviderProps = {
  languages: LanguageItem[];
  children: ReactNode;
};

const LanguageContext = createContext<LanguageItem[] | null>(null);

export const LanguageProvider = ({
  languages,
  children,
}: LanguageProviderProps) => {
  return (
    <LanguageContext.Provider value={languages}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguages = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguages must be used inside LanguageProvider");
  return ctx;
};
