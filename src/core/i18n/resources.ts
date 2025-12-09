/**
 * 1) LOAD TRANSLATIONS FROM MODULES
 *    /src/modules/.../i18n/{lang}.ts
 */
const moduleFiles = import.meta.glob("@/modules/*/i18n/*.ts", { eager: true });

type TranslationMap = Record<string, unknown>;
type LangMap = Record<string, TranslationMap>;
type ResourcesMap = Record<string, { translation: TranslationMap }>;

const moduleTranslations: LangMap = {};

for (const [path, mod] of Object.entries(moduleFiles)) {
  const lang = path.split("/").pop()?.replace(".ts", "") || "";
  const content = (mod as { default: TranslationMap }).default;

  moduleTranslations[lang] = {
    ...(moduleTranslations[lang] ?? {}),
    ...content,
  };
}

/**
 * 2) APPLICATION-LEVEL OVERRIDES
 *    /src/i18n/{lang}.ts
 */
const appFiles = import.meta.glob("@/i18n/*.ts", { eager: true });

const appTranslations: LangMap = {};

for (const [path, mod] of Object.entries(appFiles)) {
  const lang = path.split("/").pop()?.replace(".ts", "") || "";
  const content = (mod as { default: TranslationMap }).default;

  appTranslations[lang] = {
    ...(appTranslations[lang] ?? {}),
    ...content,
  };
}

/**
 * 3) MERGE (app overrides core-module translations)
 */
const allLanguages = Array.from(
  new Set([
    ...Object.keys(moduleTranslations),
    ...Object.keys(appTranslations),
  ]),
);

export const resources: ResourcesMap = allLanguages.reduce((acc, lang) => {
  acc[lang] = {
    translation: {
      ...(moduleTranslations[lang] ?? {}),
      ...(appTranslations[lang] ?? {}), // APP OVERRIDES MODULE
    },
  };
  return acc;
}, {});
