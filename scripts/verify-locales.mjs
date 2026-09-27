import fs from "node:fs";
import assert from "node:assert/strict";
const source = JSON.parse(
  fs.readFileSync("src/content/locales/en.json", "utf8"),
);
const essential = [
  "Build your trip",
  "Destinations",
  "Continue",
  "Choose language",
  "Your journey, day by day",
  "Privacy & your request.",
];
const digits = (text) =>
  (text.normalize("NFKC").match(/\d(?:[\d., ]*\d)?/g) || []).map((number) =>
    number.replace(/[., ]/g, ""),
  );
for (const locale of ["es", "de", "fr", "it", "ro", "zh", "ja", "ru", "tr"]) {
  const dictionary = JSON.parse(
    fs.readFileSync(`src/content/locales/${locale}.json`, "utf8"),
  );
  for (const phrase of Object.keys(source)) {
    assert.equal(
      typeof dictionary[phrase],
      "string",
      `${locale}: missing ${phrase}`,
    );
    assert.ok(dictionary[phrase].trim(), `${locale}: blank ${phrase}`);
    assert.ok(
      !/\[\[\d+\]\]/.test(dictionary[phrase]),
      `${locale}: translation marker remains`,
    );
    assert.ok(
      !dictionary[phrase].includes("\\n"),
      `${locale}: escaped newline remains`,
    );
    assert.ok(
      dictionary[phrase].length <= Math.max(60, phrase.length * 3.5),
      `${locale}: unexpectedly expanded translation for ${phrase}`,
    );
    if (/\d/.test(phrase) && phrase.length > 35)
      assert.deepEqual(
        digits(dictionary[phrase]).sort(),
        digits(phrase).sort(),
        `${locale}: factual numbers changed in ${phrase}`,
      );
  }
  for (const phrase of essential)
    if (!(locale === "fr" && phrase === "Destinations"))
      assert.notEqual(
        dictionary[phrase],
        phrase,
        `${locale}: untranslated essential label ${phrase}`,
      );
  console.log(
    `${locale}: ${Object.keys(source).length} phrases complete; factual numbers retained`,
  );
}
console.log("Ten-language content checks passed.");
