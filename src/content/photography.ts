// Independent B2C art direction. Never populated from an operational tour import.
// These generated editorial concepts are replaceable by commissioned photography.
export type B2CPhotoId =
  | "open-road"
  | "shared-table"
  | "baku-wandering"
  | "mountain-footsteps"
  | "courtyard-tea"
  | "woven-hands"
  | "caspian-evening"
  | "earth-and-time"
  | "garden-pause";

export type B2CPhoto = {
  id: B2CPhotoId;
  src: string;
  alt: string;
  position: string;
  kind: "generated-editorial-concept";
  width: number;
};

const photo = (id: B2CPhotoId, alt: string, position = "center"): B2CPhoto => ({
  id,
  src: `/images/b2c/${id}.webp`,
  alt: `Illustrative editorial scene: ${alt}`,
  position,
  kind: "generated-editorial-concept",
  width: 1600,
});

export const b2cPhotos = {
  "open-road": photo(
    "open-road",
    "travellers following a road through green foothills",
    "60% center",
  ),
  "shared-table": photo(
    "shared-table",
    "a shared courtyard lunch with plov and tea",
    "65% center",
  ),
  "baku-wandering": photo(
    "baku-wandering",
    "travellers wandering a sandstone lane",
    "65% center",
  ),
  "mountain-footsteps": photo(
    "mountain-footsteps",
    "hikers finding their way along a grassy mountain trail",
    "65% center",
  ),
  "courtyard-tea": photo(
    "courtyard-tea",
    "hands serving tea in an armudu glass",
  ),
  "woven-hands": photo(
    "woven-hands",
    "an artisan's hands working at a carpet loom",
  ),
  "caspian-evening": photo(
    "caspian-evening",
    "a quiet walk beside the sea at dusk",
    "65% center",
  ),
  "earth-and-time": photo(
    "earth-and-time",
    "a traveller discovering textured dry landscapes",
    "65% center",
  ),
  "garden-pause": photo(
    "garden-pause",
    "a pause beneath fruit trees in a leafy garden",
  ),
} satisfies Record<B2CPhotoId, B2CPhoto>;

export const b2cAsset = (id: B2CPhotoId) => b2cPhotos[id].src;

export type JourneyPhotography = {
  hero: B2CPhotoId;
  heroPosition?: string;
  featured: B2CPhotoId;
  gallery: B2CPhotoId[];
  days: B2CPhotoId[];
};

export const journeyPhotography = {
  essential: {
    hero: "shared-table",
    heroPosition: "65% 30%",
    featured: "courtyard-tea",
    gallery: ["woven-hands", "garden-pause", "baku-wandering", "open-road"],
    days: [
      "caspian-evening",
      "earth-and-time",
      "open-road",
      "woven-hands",
      "garden-pause",
      "caspian-evening",
      "woven-hands",
      "open-road",
    ],
  },
  mountains: {
    hero: "mountain-footsteps",
    heroPosition: "65% 55%",
    featured: "open-road",
    gallery: ["open-road", "courtyard-tea", "earth-and-time", "garden-pause"],
    days: [
      "caspian-evening",
      "earth-and-time",
      "mountain-footsteps",
      "open-road",
      "courtyard-tea",
      "mountain-footsteps",
      "earth-and-time",
      "caspian-evening",
    ],
  },
  baku: {
    hero: "baku-wandering",
    heroPosition: "65% 50%",
    featured: "caspian-evening",
    gallery: [
      "woven-hands",
      "earth-and-time",
      "courtyard-tea",
      "caspian-evening",
    ],
    days: [
      "caspian-evening",
      "woven-hands",
      "earth-and-time",
      "earth-and-time",
      "caspian-evening",
    ],
  },
} satisfies Record<string, JourneyPhotography>;

export const photographyNote =
  "AI-created editorial imagery for this design preview. Scenes are illustrative, not photographs of an actual tour.";

export const getB2CPhoto = (src: string) =>
  Object.values(b2cPhotos).find((photo) => photo.src === src);
