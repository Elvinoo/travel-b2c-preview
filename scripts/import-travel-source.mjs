// One-time, read-only source import. Never writes to the source project.
// Deliberately not part of dev/build: no live synchronisation.
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
const sourceRoot = process.argv[2];
if (!sourceRoot)
  throw new Error("Provide the existing content project directory.");
// Photography is excluded by default. Optional copies are historical archives,
// never consumer hero/card/gallery assignments.
const archiveSourcePhotos = process.argv.includes("--archive-source-photos");
const outputRoot = path.resolve("data/imports/source-photography");
if (archiveSourcePhotos) await fs.mkdir(outputRoot, { recursive: true });
await fs.mkdir("data/imports", { recursive: true });
const files = {
  caucasus: "home/Mountain1.jpg",
  "mountain-walk": "home/Trekking3.jpg",
  "baku-old-city": "home/Old City (2).jpg",
  "baku-bay": "home/Panoramic point flame towers2.jpg",
  "sheki-palace": "home/Sheki Khans Palace2.jpg",
  "sheki-caravanserai": "home/Sheki Karvansaray.jpg",
  gobustan: "home/Gobustan.jpg",
  "mud-volcanoes": "home/MudVolcanoes.jpg",
  "fire-temple": "home/Ateshgah- Fire Temple.jpg",
  "yanar-dag": "home/Yanardagh2.jpg",
  "heydar-centre": "home/Heydar-Aliyav-Center-exterior.jpg",
  "carpet-museum": "home/CarpetMuseum.jpg",
  "shah-plov": "home/Shah Plov.jpg",
  "goygol-church": "home/St. John's Church, Goygol.jpg",
  ganja: "home/Shah Abbas Mosque Ganja.jpg",
  "candy-mountains": "home/CandyCane.jpg",
  kish: "home/KishTemplke.jpg",
  "diri-baba": "home/diri baba.jpg",
};
const manifest = [];
for (const [id, file] of archiveSourcePhotos ? Object.entries(files) : []) {
  const source = path.join(sourceRoot, "client-next/public/images", file);
  const bytes = await fs.readFile(source);
  const info = await sharp(bytes).metadata();
  await sharp(bytes)
    .rotate()
    .resize({
      width: id === "caucasus" ? 2200 : 1600,
      withoutEnlargement: true,
    })
    .webp({ quality: 84 })
    .toFile(path.join(outputRoot, `${id}.webp`));
  await sharp(bytes)
    .rotate()
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(outputRoot, `${id}-sm.webp`));
  manifest.push({
    id,
    source: `client-next/public/images/${file}`,
    originalSha256: crypto.createHash("sha256").update(bytes).digest("hex"),
    width: info.width,
    height: info.height,
    archive: `data/imports/source-photography/${id}.webp`,
    rights:
      "User-provided existing project photography; source provenance retained. Verify publication rights before production launch.",
  });
}
const sourceBytes = await fs.readFile(
  path.join(sourceRoot, "server/data/tours.json"),
);
const sourceTours = JSON.parse(sourceBytes)
  .tours.filter((x) => [0, 4, 5].includes(x.id))
  .map((x) => ({
    id: x.id,
    name: x.name,
    description: x.desc,
    days: x.days,
    nights: x.nights,
    program: x.tourProgram,
  }));
await fs.writeFile(
  "data/imports/va-travel-tours.snapshot.json",
  JSON.stringify(
    {
      source: "server/data/tours.json",
      importedAt: new Date().toISOString(),
      sourceSha256: crypto
        .createHash("sha256")
        .update(sourceBytes)
        .digest("hex"),
      tours: sourceTours,
    },
    null,
    2,
  ),
);
if (archiveSourcePhotos)
  await fs.writeFile(
    "data/imports/photo-provenance.json",
    JSON.stringify(manifest, null, 2),
  );
console.log(
  `Imported ${sourceTours.length} independent factual tour snapshots. ${manifest.length} source photos archived; no B2C image assignments. Source files unchanged.`,
);
