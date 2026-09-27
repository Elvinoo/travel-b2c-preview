export const languages = [
  { code: "en", label: "English", html: "en" },
  { code: "es", label: "Español", html: "es" },
  { code: "de", label: "Deutsch", html: "de" },
  { code: "fr", label: "Français", html: "fr" },
  { code: "it", label: "Italiano", html: "it" },
  { code: "ro", label: "Română", html: "ro" },
  { code: "zh", label: "中文", html: "zh-Hans" },
  { code: "ja", label: "日本語", html: "ja" },
  { code: "ru", label: "Русский", html: "ru" },
  { code: "tr", label: "Türkçe", html: "tr" },
] as const;
export type Locale = (typeof languages)[number]["code"];
export function isLocale(value: string | null): value is Locale {
  return languages.some((language) => language.code === value);
}
export const dictionaries: Record<
  Exclude<Locale, "en">,
  () => Promise<{ default: Record<string, string> }>
> = {
  es: () => import("./locales/es.json"),
  de: () => import("./locales/de.json"),
  fr: () => import("./locales/fr.json"),
  it: () => import("./locales/it.json"),
  ro: () => import("./locales/ro.json"),
  zh: () => import("./locales/zh.json"),
  ja: () => import("./locales/ja.json"),
  ru: () => import("./locales/ru.json"),
  tr: () => import("./locales/tr.json"),
};
