import type { Locale } from "./languages";
export type TravelUnit = "day" | "night" | "adult" | "child";
type Forms = string | Record<string, string>;
const words: Record<Locale, Record<TravelUnit, Forms>> = {
  en: {
    day: { one: "day", other: "days" },
    night: { one: "night", other: "nights" },
    adult: { one: "adult", other: "adults" },
    child: { one: "child", other: "children" },
  },
  es: {
    day: { one: "día", other: "días" },
    night: { one: "noche", other: "noches" },
    adult: { one: "adulto", other: "adultos" },
    child: { one: "niño", other: "niños" },
  },
  de: {
    day: { one: "Tag", other: "Tage" },
    night: { one: "Nacht", other: "Nächte" },
    adult: { one: "Erwachsener", other: "Erwachsene" },
    child: { one: "Kind", other: "Kinder" },
  },
  fr: {
    day: { one: "jour", other: "jours" },
    night: { one: "nuit", other: "nuits" },
    adult: { one: "adulte", other: "adultes" },
    child: { one: "enfant", other: "enfants" },
  },
  it: {
    day: { one: "giorno", other: "giorni" },
    night: { one: "notte", other: "notti" },
    adult: { one: "adulto", other: "adulti" },
    child: { one: "bambino", other: "bambini" },
  },
  ro: {
    day: { one: "zi", few: "zile", other: "de zile" },
    night: { one: "noapte", few: "nopți", other: "de nopți" },
    adult: { one: "adult", few: "adulți", other: "de adulți" },
    child: { one: "copil", few: "copii", other: "de copii" },
  },
  zh: { day: "天", night: "晚", adult: "位成人", child: "名儿童" },
  ja: { day: "日", night: "泊", adult: "名の大人", child: "名の子供" },
  ru: {
    day: { one: "день", few: "дня", many: "дней", other: "дня" },
    night: { one: "ночь", few: "ночи", many: "ночей", other: "ночи" },
    adult: {
      one: "взрослый",
      few: "взрослых",
      many: "взрослых",
      other: "взрослых",
    },
    child: { one: "ребёнок", few: "ребёнка", many: "детей", other: "ребёнка" },
  },
  tr: { day: "gün", night: "gece", adult: "yetişkin", child: "çocuk" },
};
const rules = Object.fromEntries(
  Object.keys(words).map((locale) => [locale, new Intl.PluralRules(locale)]),
);
export function quantityWord(locale: Locale, unit: TravelUnit, count: number) {
  const forms = words[locale][unit];
  return typeof forms === "string"
    ? forms
    : forms[rules[locale].select(count)] || forms.other;
}
