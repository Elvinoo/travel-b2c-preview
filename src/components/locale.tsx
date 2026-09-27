"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Globe2 } from "lucide-react";
import { en } from "@/content/en";
import { refinement } from "@/content/refinement";
import { dictionaries, isLocale, languages, Locale } from "@/content/languages";
import { localeOverrides } from "@/content/locale-overrides";
import { quantityWord, TravelUnit } from "@/content/quantity";
type Translator = <T>(value: T) => T;
type LocaleState = {
  locale: Locale;
  pending: boolean;
  setLocale: (locale: Locale) => void;
  tr: Translator;
  t: typeof en;
  r: typeof refinement;
  unit: (kind: TravelUnit, count: number) => string;
};
const identity: Translator = (value) => value;
const LocaleContext = createContext<LocaleState>({
  locale: "en",
  pending: false,
  setLocale: () => {},
  tr: identity,
  t: en,
  r: refinement,
  unit: (kind, count) => quantityWord("en", kind, count),
});
function translateTree<T>(value: T, tr: Translator): T {
  if (typeof value === "string") return tr(value);
  if (Array.isArray(value))
    return value.map((item) => translateTree(item, tr)) as T;
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        translateTree(item, tr),
      ]),
    ) as T;
  return value;
}
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setCurrent] = useState<Locale>("en");
  const [dictionary, setDictionary] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const latestRequest = useRef(0);
  const change = useCallback(async (next: Locale, updateUrl: boolean) => {
    const request = ++latestRequest.current;
    setPending(true);
    try {
      const messages =
        next === "en" ? {} : (await dictionaries[next]()).default;
      if (request !== latestRequest.current) return;
      setDictionary({ ...messages, ...localeOverrides(next) });
      setCurrent(next);
      document.documentElement.lang = languages.find(
        (x) => x.code === next,
      )!.html;
      try {
        localStorage.setItem("travel-language", next);
      } catch {
        /* A blocked storage setting does not prevent translation. */
      }
      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", next);
        window.history.replaceState(null, "", url);
      }
    } finally {
      if (request === latestRequest.current) setPending(false);
    }
  }, []);
  useEffect(() => {
    const read = () => {
      const requested = new URLSearchParams(window.location.search).get("lang");
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("travel-language");
      } catch {
        /* Optional preference only. */
      }
      void change(
        isLocale(requested) ? requested : isLocale(saved) ? saved : "en",
        false,
      );
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [change]);
  const tr = useCallback<Translator>(
    (value) => {
      if (typeof value !== "string" || !value) return value;
      if (dictionary[value]) return dictionary[value] as typeof value;
      // Composed route and preference labels retain their canonical stored values.
      const translated = value
        .split(/( · |, | → | \/ )/)
        .map((part) => dictionary[part] || part)
        .join("");
      return translated as typeof value;
    },
    [dictionary],
  );
  const state = useMemo(
    () => ({
      locale,
      pending,
      setLocale: (next: Locale) => {
        void change(next, true);
      },
      tr,
      t: translateTree(en, tr),
      r: translateTree(refinement, tr),
      unit: (kind: TravelUnit, count: number) =>
        quantityWord(locale, kind, count),
    }),
    [locale, pending, change, tr],
  );
  return (
    <LocaleContext.Provider value={state}>{children}</LocaleContext.Provider>
  );
}
export const useLocale = () => useContext(LocaleContext);
export function LanguagePicker() {
  const { locale, setLocale, pending, tr } = useLocale();
  return (
    <label className="language language-picker">
      <Globe2 size={16} aria-hidden="true" />
      <select
        aria-label={tr("Choose language")}
        value={locale}
        disabled={pending}
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
