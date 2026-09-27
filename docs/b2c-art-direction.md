# B2C photography direction

Keep the cream, dark green, typography, page layouts and existing navigation. Photography supplies the new character: a personal view from inside a journey.

## The visual brief

Choose a moment before choosing a monument. Human-scale viewpoints, travellers moving through a place, a shared table, hands making something, a pause beside the sea, a road that invites discovery. Landscapes provide breathing room; texture and people give them meaning.

Use available light, warm neutral colour, natural skin, imperfect lived-in surfaces and restrained contrast. Avoid staged advertising poses, heavy orange/teal grading, hotel-brochure polish, empty landmark postcards and repeated operator catalogue imagery.

The visual library is deliberately independent of itinerary imports. A factual route does not determine its hero image. Assign hero, featured/card image, ordered gallery and daily visuals separately in `src/content/photography.ts`. No fallback should use a source VA TRAVEL photograph.

## Initial visual stories

| Journey                      | Hero                       | Card                   | Gallery rhythm                                     |
| ---------------------------- | -------------------------- | ---------------------- | -------------------------------------------------- |
| Between sea & shared stories | Shared courtyard lunch     | Hospitality detail     | Craft → garden pause → wandering → open road       |
| A slower world, on foot      | Hikers on a trail          | Road through foothills | Movement → hospitality → landscape texture → pause |
| Baku, at your own rhythm     | Wandering a sandstone lane | A walk by the sea      | Craft → deep time → tea → dusk                     |

Each photograph should stand for an atmosphere or experience, rather than pretend to document every individual stop. Exact landmarks and site-specific documentation belong with verified location photography when it is commissioned.

## Crops and replacement

Full-width heroes should leave natural space for titles. Keep travellers and important hand/face details out of the title area. Mobile uses an individually configurable focal position. Existing image roles retain stable ratios: journey 4:3, destination 3:4, experience 4:5, gallery 4:3, editorial 3:2. Deliver 1600 px and 640 px WebP variants for this prototype.

Every asset has a descriptive alt, focal position, type and id. Replace its library entry and generated files without touching factual route data or presentation code. Confirm crops on desktop and mobile.

## Image provenance

The nine initial assets were created with the built-in image generation tool. They are illustrative editorial campaign concepts, not photographs of actual tours, real hosts or exact landmark locations. The website discloses this in its footer and gallery note; alt text also identifies illustrative scenes. This is a reusable art direction for future commissioned/licensed photography.

`data/b2c-photography.json` contains the complete prompts, generator, original file path, hashes and output paths. Final website assets live in `public/images/b2c`. The former VA TRAVEL image copies are archived under `data/imports/source-photography`, outside the public website. The VA TRAVEL project itself is unchanged.

## Programme presentation

The visitor first sees an emotional day title, a concise introduction and experience themes. The place tag remains visible. “See itinerary details” reveals the unchanged factual route, visits, transport/activity notes and overnight place. Consumer stories are authored in `src/content/journey-stories.ts`; programme facts and source provenance remain in `src/content/catalog.ts` and the original snapshot. Changing a story or photograph must not silently change the actual programme.
