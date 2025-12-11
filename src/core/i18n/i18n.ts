import i18n from "i18next";
import backend from "i18next-http-backend";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { resources } from "./resources";

const savedLang = localStorage.getItem("lang") ?? "en";

const RTL_LANGS = ["ar", "he", "fa", "ur"] as const;

function applyDocumentLanguage(lang: string) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang as any) ? "rtl" : "ltr";
}

void i18n
  .use(backend)
  .use(detector)
.use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: "en",
    supportedLngs: Object.keys(resources),
    interpolation: { escapeValue: false },
  })
  .then(() => {
    // Ensure initial language applies dir/lang on first load (including refresh)
    applyDocumentLanguage(i18n.language || savedLang);
  });

i18n.on("languageChanged", (lang) => {
localStorage.setItem("lang", lang);
  applyDocumentLanguage(lang);
});

export default i18n;
