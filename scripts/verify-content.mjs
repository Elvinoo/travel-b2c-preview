import fs from "node:fs/promises";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import path from "node:path";
import ts from "typescript";
async function contentModule(name) {
  let code = ts.transpileModule(
    await fs.readFile(`src/content/${name}.ts`, "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2021,
      },
    },
  ).outputText;
  for (const match of [...code.matchAll(/from\s+["']\.\/([\w-]+)["']/g)]) {
    code = code.replace(
      match[0],
      `from ${JSON.stringify(await contentModule(match[1]))}`,
    );
  }
  return "data:text/javascript;base64," + Buffer.from(code).toString("base64");
}
const catalog = await import(await contentModule("catalog"));
const photography = await import(await contentModule("photography"));
const snapshot = JSON.parse(
  await fs.readFile("data/imports/va-travel-tours.snapshot.json", "utf8"),
);
const provenance = JSON.parse(
  await fs.readFile("data/imports/photo-provenance.json", "utf8"),
);
const ids = new Set(catalog.destinations.map((x) => x.id));
for (const tour of catalog.tours) {
  const original = snapshot.tours.find((x) => x.id === tour.source.id);
  assert.ok(original, `Missing provenance for ${tour.id}`);
  assert.equal(
    tour.duration,
    original.days,
    `Duration differs from source: ${tour.id}`,
  );
  assert.equal(
    tour.nights,
    original.nights,
    `Nights differ from source: ${tour.id}`,
  );
  assert.equal(
    tour.itinerary.length,
    original.program.headers.english.length,
    `Incomplete itinerary: ${tour.id}`,
  );
  assert.deepEqual(
    tour.itinerary.map((x) => x.day),
    Array.from({ length: tour.duration }, (_, i) => i + 1),
  );
  assert.ok(
    tour.destinations.every((id) => ids.has(id)),
    `Unknown destination in ${tour.id}`,
  );
  assert.ok(
    !/[$€£]\s?\d/.test(JSON.stringify(tour)),
    `Public price found: ${tour.id}`,
  );
  assert.ok(
    tour.title !== tour.source.originalTitle,
    `Missing consumer title: ${tour.id}`,
  );
  assert.notEqual(
    tour.photography.hero,
    tour.photography.featured,
    `Hero and featured image share an assignment: ${tour.id}`,
  );
  assert.equal(tour.photography.days.length, tour.duration);
  for (const day of tour.itinerary) {
    assert.ok(
      day.intro && day.themes.length && day.description,
      `Missing experience or factual details: ${tour.id}/${day.day}`,
    );
  }
}
assert.ok(
  !JSON.stringify(catalog).includes("/images/travel/"),
  "Source photography leaked into consumer content",
);
for (const photo of Object.values(photography.b2cPhotos)) {
  await fs.access("public" + photo.src);
  await fs.access("public" + photo.src.replace(".webp", "-sm.webp"));
  assert.equal(photo.kind, "generated-editorial-concept");
}
if (process.argv[2]) {
  const sourceRoot = process.argv[2];
  const sourceBytes = await fs.readFile(path.join(sourceRoot, snapshot.source));
  assert.equal(
    crypto.createHash("sha256").update(sourceBytes).digest("hex"),
    snapshot.sourceSha256,
    "Source tour data changed since the import",
  );
  for (const photo of provenance) {
    const bytes = await fs.readFile(path.join(sourceRoot, photo.source));
    assert.equal(
      crypto.createHash("sha256").update(bytes).digest("hex"),
      photo.originalSha256,
      `Source photo changed: ${photo.id}`,
    );
  }
}
console.log(
  `Verified ${catalog.tours.length} source-based tours, complete experience-led days with factual details, destination relationships, no public prices, ${Object.keys(photography.b2cPhotos).length} independent B2C photo pairs, no source image defaults${process.argv[2] ? " and unchanged original source files" : ""}.`,
);
