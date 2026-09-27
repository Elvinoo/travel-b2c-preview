const fs = require("fs");
const path = require("path");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => {
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  module._compile(compiled.outputText, filename);
};
const content = (name) => require(path.resolve("src/content", name + ".ts"));
const strings = new Set();
function collect(value, excludeTechnical = false) {
  if (typeof value === "string") {
    if (/[a-zA-Z]/.test(value) && !/^(\/|https?:|data:)/.test(value))
      strings.add(value);
  } else if (Array.isArray(value))
    value.forEach((item) => collect(item, excludeTechnical));
  else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (
        !excludeTechnical ||
        ![
          "id",
          "country",
          "countries",
          "destinations",
          "source",
          "photography",
          "image",
          "gallery",
          "position",
          "small",
          "src",
          "system",
          "snapshot",
          "originalTitle",
        ].includes(key)
      )
        collect(item, excludeTechnical);
    }
  }
}
collect(content("en").en);
collect(content("refinement").refinement);
collect(content("interface").interfaceCopy);
collect(content("flights").flightCopy);
const catalog = content("catalog");
for (const name of [
  "destinations",
  "tours",
  "experiences",
  "countries",
  "interests",
  "accommodation",
  "activities",
  "transport",
])
  collect(catalog[name], true);
const photos = content("photography");
collect(photos.photographyNote);
for (const photo of Object.values(photos.b2cPhotos)) collect(photo.alt);
collect(require(path.resolve("src/config/brand.ts")).brand.legal);
fs.mkdirSync("src/content/locales", { recursive: true });
fs.writeFileSync(
  "src/content/locales/en.json",
  JSON.stringify(
    Object.fromEntries([...strings].sort().map((x) => [x, x])),
    null,
    2,
  ) + "\n",
);
console.log(
  `${strings.size} unique phrases, ${[...strings].join("").length} characters`,
);
