// Explicit asset preparation; never executed by dev/build or the factual import.
import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import sharp from "sharp";

const projectRoot = path.resolve(".");
const output = path.resolve("public/images/b2c");
assert.ok(output.startsWith(projectRoot + path.sep));
await fs.mkdir(output, { recursive: true });
const manifestPath = "data/b2c-photography.json";
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
for (const photo of manifest) {
  const original = await fs.readFile(photo.sourceFile);
  const sourceMetadata = await sharp(original).metadata();
  const main = await sharp(original)
    .rotate()
    .resize({ width: 1600 })
    .webp({ quality: 85 })
    .toBuffer();
  const small = await sharp(original)
    .rotate()
    .resize({ width: 640 })
    .webp({ quality: 82 })
    .toBuffer();
  await fs.writeFile(path.join(output, `${photo.id}.webp`), main);
  await fs.writeFile(path.join(output, `${photo.id}-sm.webp`), small);
  Object.assign(photo, {
    sourceDimensions: {
      width: sourceMetadata.width,
      height: sourceMetadata.height,
    },
    outputWidth: 1600,
    smallWidth: 640,
    originalSha256: crypto.createHash("sha256").update(original).digest("hex"),
    assetSha256: crypto.createHash("sha256").update(main).digest("hex"),
  });
}
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

// Keep the prior source photographs as non-public historical material.
const formerPublic = path.resolve("public/images/travel");
const archive = path.resolve("data/imports/source-photography");
for (const target of [formerPublic, archive]) {
  const relative = path.relative(projectRoot, target);
  assert.ok(
    relative && !relative.startsWith("..") && !path.isAbsolute(relative),
  );
}
if (await fs.stat(formerPublic).catch(() => null)) {
  assert.equal(
    await fs.stat(archive).catch(() => null),
    null,
    "Archive already exists; do not replace it.",
  );
  await fs.rename(formerPublic, archive);
  const sourceManifestPath = "data/imports/photo-provenance.json";
  const sourceManifest = JSON.parse(
    await fs.readFile(sourceManifestPath, "utf8"),
  );
  for (const photo of sourceManifest) {
    photo.archive = `data/imports/source-photography/${photo.id}.webp`;
    delete photo.asset;
  }
  await fs.writeFile(
    sourceManifestPath,
    JSON.stringify(sourceManifest, null, 2) + "\n",
  );
}
console.log(
  `Prepared ${manifest.length} independent B2C image pairs. Prior source images are archived outside the public site.`,
);
