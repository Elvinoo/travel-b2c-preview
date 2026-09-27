# Travel public website — design prototype

Independent B2C travel prototype using Next.js App Router, React and TypeScript. Its cream / dark green visual identity and layouts are preserved. Selected VA TRAVEL programmes supply factual seed data; a separate consumer storytelling and photography direction supplies the presentation. No VA TRAVEL UI, styling, branding or default photography is reused.

## Run

`npm install` then `npm run dev`. Open http://127.0.0.1:3001 (3000 is already used by another local project).

`npm run build` verifies the production build. `npm run typecheck` checks TypeScript.

## GitHub Pages preview

`.github/workflows/pages.yml` builds the static site on pushes to `main`. Its manual run also publishes to Pages when the account supports Pages for this private repository. A public preview does not receive or store travel requests.

The workflow sets `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/<repository-name>`. Next.js exports `out/` with directory URLs, and `publicAsset` prefixes image/icon paths. Local development keeps its original URLs. The exported files contain only the public website; imported source snapshots and historical photo archives are not part of the Pages artifact.

To verify the same subpath locally in PowerShell:

```powershell
$env:GITHUB_PAGES = 'true'
$env:NEXT_PUBLIC_BASE_PATH = '/travel-b2c-preview'
npm run build
node scripts/serve-export.mjs
```

Open `http://127.0.0.1:3002/travel-b2c-preview/`. Remove those environment variables before starting normal local development in the same terminal.

## Replace the temporary identity

Edit `src/config/brand.ts` for name, logo URL, favicon, primary/secondary/accent colours, contact details, social URLs, domain and legal/footer copy. Layout reads colours into CSS variables and metadata reads the brand name. No permanent logo is provided; the compass is a generic decorative icon.

## Content and future integrations

`src/content/en.ts` contains the primary English copy and locale registry. Additional locale dictionaries and locale routing can be introduced without altering page layouts; locale switching is not implemented in this first preview. Some prototype helper copy remains inline and must be extracted for a second language.

`src/content/catalog.ts` holds typed countries, destinations, tour facts, daily itineraries, interests, accommodation, activities and transport, separate from UI components. `src/content/journey-stories.ts` independently authors consumer titles, subtitles, daily introductions and experience themes. `src/content/photography.ts` is the independent B2C image library and assigns hero, featured/card, gallery sequence and daily imagery separately for each journey. `Tour.visible` controls public publishing; source ids are provenance only. Replace these records with a typed repository/API adapter when the independent B2C database and admin are chosen.

The five-stage trip wizard captures dates, adults/children, interests, destinations, accommodation, activities, transport, the chosen starting itinerary and contact details. A shared in-memory TripProvider preserves choices during client-side page navigation. Adding a destination or interest merges it into the current draft; starting a tour replaces its route while retaining dates, contact details and interests. Revisiting completed steps retains choices. Mobile uses a compact progress bar, fixed Back/Continue controls and an accessible modal summary sheet.

Source-based tours show all original days. Each day leads with a consumer title, concise introduction and experience themes; the place tag stays visible, and “See itinerary details” reveals the retained factual programme and overnight information. Requested destination changes and differing trip lengths are flagged for manual route adaptation. Free-form journeys show explicitly illustrative stops. Forms validate contact details, phone digit count, date order, future dates and partial date selections. Completion shows a demo request summary and explains the review/proposal/conversation flow.

## Imported content and photographs

The three independently adapted programmes come from the source project's `server/data/tours.json`: id 0 (8 days / 7 nights), id 4 (8 days / 7 nights), id 5 (5 days / 4 nights). Do not mix these day sequences with the differently arranged catalogue export in `scripts/catalogue/programmes-eng.json`.

`data/imports/va-travel-tours.snapshot.json` preserves original multilingual programmes. The former eighteen source photograph copies are archived under `data/imports/source-photography`, outside the public website, with source paths and hashes retained in `photo-provenance.json`.

Nine new B2C editorial assets and their small variants live in `public/images/b2c`. They were generated using the built-in image generation tool and are explicitly identified as illustrative concepts in the website footer, gallery note and descriptive alt text. They do not document actual tours, hosts or exact landmark locations. `data/b2c-photography.json` records complete prompts, generator and hashes. `docs/b2c-art-direction.md` describes the visual brief and future replacement rules. `scripts/prepare-b2c-images.mjs` prepares the local variants explicitly; it is never a build/startup dependency.

`scripts/import-travel-source.mjs` is an explicit one-time factual import utility, never a startup/build task. Images are excluded by default; `--archive-source-photos` optionally preserves source photos in the non-public historical archive without assigning any consumer imagery. It reads the source and writes only into this B2C project. **There is no live sync, shared database, source mutation or dependency on VA TRAVEL at runtime.** B2C stories and image assignments remain independent.

Run `node scripts/verify-content.mjs` to check source durations, complete experience-led days with factual details, relationships, independent photo variants, absence of source image defaults and absence of public monetary amounts. Passing the original source root as an optional argument also checks that its data and image fingerprints remain unchanged.

`TravelImage` defines practical image roles and responsive sizes for heroes, journey cards, destinations, experiences, galleries, editorial sections and daily itinerary thumbnails. Stable aspect/height rules and object-fit crops let admins replace images without changing layouts. Local image replacements should provide full and small variants; arbitrary external URLs fall back to a single source.

## Prototype boundaries

Forms do not transmit or persist personal information. Completion explicitly says it is a preview. No payments, public prices or automatic booking confirmation. An authenticated admin, request storage, email delivery, full translations, operational availability and final privacy policy are intentionally deferred. No fictional reviews or ratings.

The B2C photography library is served locally and follows its own editorial direction. Google Fonts still requires internet access. The public site remains English-only with a central copy/locale structure; live language switching and production backend integrations remain outside this visual refinement.
