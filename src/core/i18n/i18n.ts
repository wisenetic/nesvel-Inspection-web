import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { resources } from "./resources";

const savedLang = localStorage.getItem("lang") ?? "en";

void i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: "en",
    supportedLngs: Object.keys(resources),
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lang) => {
  localStorage.setItem("lang", lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = ["ar", "he", "fa", "ur"].includes(lang)
    ? "rtl"
    : "ltr";
});

export default i18n;
