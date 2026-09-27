import {
  b2cAsset,
  journeyPhotography,
  JourneyPhotography,
} from "./photography";
import { journeyStories } from "./journey-stories";

export type ItineraryDay = {
  day: number;
  title: string;
  intro: string;
  themes: string[];
  description: string;
  image: string;
  location: string;
  overnight: string;
  activity: string;
  highlights: string[];
};
export type Tour = {
  id: string;
  title: string;
  duration: number;
  nights: number;
  places: string;
  style: string;
  description: string;
  introduction: string;
  image: string;
  photography: JourneyPhotography;
  destinations: string[];
  interests: string[];
  countries: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  gallery: string[];
  stay: string;
  practical: string[];
  visible: boolean;
  source: {
    system: string;
    id: number;
    originalTitle: string;
    snapshot: string;
  };
};
export type Destination = {
  id: string;
  country: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  alt: string;
  itinerary: string;
  why: string;
  discover: { title: string; text: string; image: string }[];
  interests: string[];
  gallery: string[];
};
export const images = {
  hero: b2cAsset("open-road"),
  village: b2cAsset("courtyard-tea"),
  mountains: b2cAsset("mountain-footsteps"),
  coast: b2cAsset("caspian-evening"),
  forest: b2cAsset("garden-pause"),
  food: b2cAsset("shared-table"),
  oldCity: b2cAsset("baku-wandering"),
  palace: b2cAsset("woven-hands"),
  gobustan: b2cAsset("earth-and-time"),
  mud: b2cAsset("earth-and-time"),
  temple: b2cAsset("earth-and-time"),
  fire: b2cAsset("earth-and-time"),
  centre: b2cAsset("caspian-evening"),
  carpet: b2cAsset("woven-hands"),
  goygol: b2cAsset("garden-pause"),
  ganja: b2cAsset("garden-pause"),
  candy: b2cAsset("earth-and-time"),
  kish: b2cAsset("courtyard-tea"),
  diri: b2cAsset("open-road"),
};
export const countries = [
  { id: "azerbaijan", name: "Azerbaijan", active: true },
  { id: "georgia", name: "Georgia", active: false },
  { id: "armenia", name: "Armenia", active: false },
  { id: "uzbekistan", name: "Uzbekistan", active: false },
];
export const destinations: Destination[] = [
  {
    id: "baku",
    country: "azerbaijan",
    name: "Baku & the Caspian",
    tag: "OLD SOUL · NEW PERSPECTIVES",
    description:
      "A city of sandstone lanes, sea breezes and unexpected contrasts.",
    image: images.oldCity,
    alt: "Historic architecture in Baku’s Old City",
    itinerary: "Explore Baku’s Old City and Caspian waterfront",
    why: "Follow the narrow lanes of Icherisheher, then emerge onto a waterfront looking towards the future. Baku rewards a little wandering: a palace courtyard, a carpet woven with stories, a view across the bay.",
    discover: [
      {
        title: "Within the old city walls",
        text: "The Maiden Tower, Shirvanshahs Palace and old caravanserais reveal a city shaped by centuries of encounters.",
        image: images.oldCity,
      },
      {
        title: "A city in a new light",
        text: "The Heydar Aliyev Center, Carpet Museum and seafront bring a different perspective to the capital.",
        image: images.centre,
      },
    ],
    interests: ["Culture", "History", "City break", "Photography"],
    gallery: [images.coast, images.carpet, images.oldCity],
  },
  {
    id: "sheki",
    country: "azerbaijan",
    name: "Sheki & the foothills",
    tag: "SILK ROAD STORIES · LIVING CRAFT",
    description:
      "Stained glass, courtyard conversations and the quiet magic of the Silk Road.",
    image: images.village,
    alt: "Historic Sheki caravanserai courtyard",
    itinerary: "Discover Sheki’s palaces, crafts and caravanserai",
    why: "There is a gentler rhythm here. Light falls through intricate palace windows, craftspeople keep old skills alive and the caravanserai carries a sense of the journeys that passed through it.",
    discover: [
      {
        title: "The Palace of the Sheki Khans",
        text: "Look closer at the palace’s decorated rooms and intricate glasswork, then discover the House of Artisans.",
        image: images.palace,
      },
      {
        title: "Beyond the courtyard",
        text: "Browse the local bazaar, explore the caravanserai and continue to the historic church in nearby Kish.",
        image: images.kish,
      },
    ],
    interests: ["Culture", "History", "Gastronomy", "Local experiences"],
    gallery: [images.palace, images.food, images.village],
  },
  {
    id: "guba",
    country: "azerbaijan",
    name: "Guba & the high villages",
    tag: "MOUNTAIN TRAILS · LOCAL LIFE",
    description:
      "A different kind of connection, high in the Greater Caucasus.",
    image: images.mountains,
    alt: "Green slopes and rock faces in the Azerbaijani Caucasus",
    itinerary: "Explore the mountain villages around Guba and Khinalig",
    why: "The road climbs, the air changes and everyday life takes on a new perspective. Walk between remote villages, share a roof with local hosts and discover Khinalig’s distinct language, architecture and culture.",
    discover: [
      {
        title: "Village to village",
        text: "The walking route connects Yukhari Khanagah, Daligaya, Adur, Haput and Khinalig through canyons and mountain valleys.",
        image: images.forest,
      },
      {
        title: "A landscape of contrasts",
        text: "Return through Guba’s Red Town and the striped hills of Khizi, a contrast to the green highlands.",
        image: images.candy,
      },
    ],
    interests: [
      "Nature",
      "Mountains",
      "Adventure",
      "Local experiences",
      "Photography",
    ],
    gallery: [images.mountains, images.village, images.diri],
  },
  {
    id: "gobustan",
    country: "azerbaijan",
    name: "Gobustan & Absheron",
    tag: "ANCIENT ART · LAND OF FIRE",
    description:
      "Stories carved in stone. Landscapes that belong to another world.",
    image: images.gobustan,
    alt: "Rock formations at Gobustan",
    itinerary: "Discover Gobustan’s rock art and the Absheron peninsula",
    why: "Rock engravings and mud volcanoes open a window into a different Azerbaijan. On Absheron, the fire temple and Yanar Dag connect the landscape to the country’s long relationship with fire.",
    discover: [
      {
        title: "A story in the rocks",
        text: "Explore Gobustan’s rock art and museum, then discover the mud volcano landscape and Bibi-Heybat Mosque.",
        image: images.mud,
      },
      {
        title: "Follow the fire",
        text: "Ateshgah Fire Temple, Mardakan Fortress and Yanar Dag bring the Absheron peninsula’s stories to life.",
        image: images.diri,
      },
    ],
    interests: ["History", "Nature", "Photography", "Culture"],
    gallery: [images.gobustan, images.diri, images.oldCity],
  },
  {
    id: "ganja",
    country: "azerbaijan",
    name: "Ganja & Goygol",
    tag: "HERITAGE · UNEXPECTED CONNECTIONS",
    description:
      "Poetry, striking monuments and a different side of Azerbaijan’s heritage.",
    image: images.ganja,
    alt: "Shah Abbas Mosque in Ganja",
    itinerary: "Explore Ganja’s monuments and Goygol’s German heritage",
    why: "Follow the story from Goygol’s German quarter and Lutheran church to the mosques, mausoleums and distinctive Bottle House of Ganja. This western chapter adds another layer to Azerbaijan.",
    discover: [
      {
        title: "Goygol’s German quarter",
        text: "Discover the nineteenth-century houses and Lutheran church before visiting Goygol National Park and lake on the cultural route.",
        image: images.goygol,
      },
      {
        title: "The city of poets",
        text: "Visit the Nizami Mausoleum, Imamzadeh and the monuments of Ganja, including the Shah Abbas Mosque.",
        image: images.diri,
      },
    ],
    interests: ["Culture", "History", "Nature"],
    gallery: [images.goygol, images.diri, images.palace],
  },
];
export const interests = [
  "Culture",
  "History",
  "Nature",
  "Mountains",
  "Adventure",
  "Gastronomy",
  "Wine",
  "Family",
  "City break",
  "Luxury",
  "Photography",
  "Local experiences",
];
export const accommodation = [
  "Boutique stays",
  "Comfort · 4-star",
  "Luxury · 5-star",
  "Local guesthouses",
  "Help me choose",
];
export const transport = [
  "Private car & driver",
  "Private transfers",
  "Help me choose",
];
export const activities = [
  "Cooking with locals",
  "Guided walking tour",
  "Wine tasting",
  "Mountain walk",
];
const day = (
  day: number,
  title: string,
  description: string,
  image: string,
  location: string,
  overnight: string,
  activity: string,
  highlights: string[],
): ItineraryDay => ({
  day,
  title,
  intro: "",
  themes: [],
  description,
  image,
  location,
  overnight,
  activity,
  highlights,
});
const source = (id: number, originalTitle: string) => ({
  system: "VA TRAVEL",
  id,
  originalTitle,
  snapshot: "data/imports/va-travel-tours.snapshot.json",
});
const importedJourneySeeds: Omit<Tour, "photography">[] = [
  {
    id: "essential",
    title: "Azerbaijan, in every colour",
    duration: 8,
    nights: 7,
    places: "Baku · Sheki · Goygol · Ganja",
    style: "Culture",
    description:
      "From the Caspian coast to Silk Road courtyards, discover the country’s many layers.",
    introduction:
      "Eight days of contrasts: Baku’s old streets, Gobustan’s ancient art, Sheki’s glass and craftsmanship, and the heritage of western Azerbaijan. A complete starting itinerary, ready to be shaped around you.",
    image: images.palace,
    destinations: ["baku", "gobustan", "sheki", "ganja"],
    interests: ["Culture", "History", "Local experiences"],
    countries: ["azerbaijan"],
    highlights: [
      "Baku’s Old City and Caspian viewpoints",
      "Gobustan rock art and mud volcanoes",
      "Sheki’s Khan Palace, artisans and caravanserai",
      "Goygol’s German heritage and national park",
      "The fire landscapes of Absheron",
    ],
    gallery: [images.palace, images.village, images.oldCity, images.goygol],
    stay: "Hotel stays in Baku, Sheki and Ganja. Share your preferred category; our team will propose specific properties. This route has 7 nights.",
    practical: [
      "Arrival and departure: Baku airport. Airport transfers form part of the starting programme; final arrangements are confirmed in your proposal.",
      "A road journey with walking visits. Travel days include Baku–Sheki and the return from Ganja.",
      "Meals, admissions, guide language and hotel details are confirmed in the personal offer. No services are booked by submitting a request.",
    ],
    visible: true,
    source: source(0, "Azerbaijan With All Its Colours"),
    itinerary: [
      day(
        1,
        "Welcome to Baku",
        "Meet your guide at the airport and transfer to your hotel, approximately 25 km away. Settle in and enjoy your first evening.",
        images.coast,
        "Baku",
        "Baku",
        "Arrival",
        ["Airport welcome", "Hotel transfer"],
      ),
      day(
        2,
        "Old city streets & ancient landscapes",
        "Begin at the Alley of Martyrs viewpoint, then explore Shirvanshahs Palace, caravanserais, the Maiden Tower and mosques. Pause for a second breakfast in the old streets. Continue to Gobustan, its museum and mud volcanoes, returning via Bibi-Heybat Mosque. Dinner at a local restaurant.",
        images.gobustan,
        "Baku · Gobustan",
        "Baku",
        "Culture & landscapes",
        ["Old City", "Gobustan Museum", "Mud volcanoes", "Bibi-Heybat"],
      ),
      day(
        3,
        "The road to the Silk Road",
        "Travel to Sheki via the rock-built Diri Baba Mausoleum and Shamakhi. Discover the historic mosque and Yeddi Gumbaz Mausoleum before arriving in the evening.",
        images.diri,
        "Baku · Shamakhi · Sheki",
        "Sheki",
        "Road journey",
        ["Diri Baba", "Shamakhi", "Yeddi Gumbaz"],
      ),
      day(
        4,
        "Glass, craft & courtyard stories",
        "Explore Kish’s historic church, then the bazaar and Palace of the Sheki Khans. Discover the House of Artisans, caravanserai and Sheki Juma Mosque. Look closer at the region’s living traditions.",
        images.palace,
        "Sheki · Kish",
        "Sheki",
        "Heritage & craft",
        ["Kish church", "Khan Palace", "House of Artisans", "Caravanserai"],
      ),
      day(
        5,
        "Western Azerbaijan, another perspective",
        "Continue to Goygol’s German quarter and Lutheran church, then the national park and lake. In Ganja, discover Shah Abbas Mosque, Javad Khan Mausoleum, Alexander Nevski Church and the Bottle House. Dinner and overnight in Ganja.",
        images.goygol,
        "Sheki · Goygol · Ganja",
        "Ganja",
        "Culture & nature",
        ["German quarter", "Goygol Lake", "Ganja monuments"],
      ),
      day(
        6,
        "Poetry, heritage & back to the sea",
        "Visit the Nizami and Imamzadeh mausoleums before returning to Baku. Leave the afternoon open for a rest or a walk on the Seaside Boulevard.",
        images.ganja,
        "Ganja · Baku",
        "Baku",
        "Road journey",
        ["Nizami Mausoleum", "Imamzadeh", "Caspian free time"],
      ),
      day(
        7,
        "Following the fire",
        "Explore Ateshgah Fire Temple, Mardakan Fortress, Mirmovsum Aga Mausoleum and Yanar Dag. Back in Baku, discover the Heydar Aliyev Center and Carpet Museum. Finish with dinner and an evening excursion to the viewpoints.",
        images.temple,
        "Absheron · Baku",
        "Baku",
        "Fire & architecture",
        ["Ateshgah", "Yanar Dag", "Heydar Aliyev Center", "Carpet Museum"],
      ),
      day(
        8,
        "Until next time",
        "After breakfast, transfer to Baku airport for your onward journey.",
        images.coast,
        "Baku airport",
        "—",
        "Departure",
        ["Airport transfer"],
      ),
    ],
  },
  {
    id: "mountains",
    title: "On the paths of the high villages",
    duration: 8,
    nights: 7,
    places: "Baku · Guba · Haput · Khinalig",
    style: "Adventure",
    description:
      "Walk between mountain villages, share a local welcome and find a different rhythm.",
    introduction:
      "Begin with Baku and Gobustan, then leave the city for village trails, canyon views and nights in local homes. The original walking route is retained as a starting point for your personalised request.",
    image: images.forest,
    destinations: ["baku", "gobustan", "guba"],
    interests: ["Nature", "Mountains", "Adventure", "Local experiences"],
    countries: ["azerbaijan"],
    highlights: [
      "Village-to-village walking in the Greater Caucasus",
      "Local home stays in Daligaya, Adur, Haput and Khinalig",
      "Qarachay Canyon and Sohub Tower",
      "Khinalig’s architecture and History Museum",
      "Guba’s Red Town and Khizi’s candy-cane hills",
    ],
    gallery: [images.forest, images.mountains, images.candy, images.gobustan],
    stay: "Hotel nights in Baku and local home stays in Daligaya, Adur, Haput and Khinalig. Village accommodation is part of the route’s character; facilities and comfort will be discussed before confirmation.",
    practical: [
      "Arrival and departure: Baku. Multiple walking days and remote mountain villages.",
      "Tell us your walking experience and fitness level. The team will review terrain, weather and suitable arrangements.",
      "The route passes through high mountain terrain. Walking distances and ascent details will be reviewed with you before the journey is confirmed.",
      "Local home stays, transfers, meals and guiding are confirmed in the personalised offer.",
    ],
    visible: true,
    source: source(4, "Azerbaijan – A Trek Through Timeless Landscapes"),
    itinerary: [
      day(
        1,
        "Your first evening in Baku",
        "Meet your guide at the airport and transfer approximately 25 km to the hotel. Settle in ahead of the journey.",
        images.coast,
        "Baku",
        "Baku",
        "Arrival",
        ["Airport welcome", "Hotel transfer"],
      ),
      day(
        2,
        "Baku & Gobustan, a first discovery",
        "Take in the bay from the Alley of Martyrs, then explore the Old City’s palace, caravanserais, Maiden Tower and mosques. Discover Gobustan’s rock art, museum and mud volcanoes, returning via Bibi-Heybat Mosque.",
        images.gobustan,
        "Baku · Gobustan",
        "Baku",
        "Culture & landscapes",
        ["Old City", "Rock art", "Mud volcanoes"],
      ),
      day(
        3,
        "The trail begins",
        "Travel to Guba and Yukhari Khanagah at about 860 m. After tea, walk 3 km to Girdah at 1,200 m and pause by its waterfall. Continue to Daligaya at about 1,740 m for a night in a local home.",
        images.forest,
        "Guba · Girdah · Daligaya",
        "Daligaya",
        "Walking",
        ["Girdah waterfall", "Village trails", "Local home stay"],
      ),
      day(
        4,
        "Through the canyon",
        "Walk through Qarachay Canyon towards Sohub and its historic tower. After lunch and free time, take a mountain vehicle to Adur at about 1,900 m. Stay in a local home.",
        images.mountains,
        "Daligaya · Sohub · Adur",
        "Adur",
        "Walking & mountain transfer",
        ["Qarachay Canyon", "Sohub Tower", "Adur village"],
      ),
      day(
        5,
        "Valleys, rivers & a shepherd’s welcome",
        "Continue towards Haput through villages, valleys and rivers, along the Dovshangala route at 2,780 m. Pause for lunch prepared by a shepherd, then reach Haput at about 1,925 m and stay in a local home.",
        images.forest,
        "Adur · Haput",
        "Haput",
        "Walking",
        ["Mountain valleys", "Shepherd’s lunch", "Haput village"],
      ),
      day(
        6,
        "A path to Khinalig",
        "Walk towards Khinalig, pausing at the pass for views of Shahdagh and the Qizilqaya plateau. Arrive in the afternoon, explore the village’s culture and History Museum, and stay in a local home.",
        images.mountains,
        "Haput · Khinalig",
        "Khinalig",
        "Walking",
        ["Shahdagh views", "History Museum", "Village life"],
      ),
      day(
        7,
        "A different landscape on the way home",
        "Return by minivan through Guba, visiting Red Town and its nineteenth-century synagogue. Pause in Khizi for the candy-cane mountains, then return to Baku for an excursion to the viewpoints.",
        images.candy,
        "Khinalig · Guba · Khizi · Baku",
        "Baku",
        "Road journey",
        ["Red Town", "Synagogue", "Candy-cane mountains"],
      ),
      day(
        8,
        "Carry the mountains with you",
        "After breakfast, transfer to the airport for departure.",
        images.coast,
        "Baku airport",
        "—",
        "Departure",
        ["Airport transfer"],
      ),
    ],
  },
  {
    id: "baku",
    title: "Baku, between stone & sea",
    duration: 5,
    nights: 4,
    places: "Baku · Absheron · Gobustan",
    style: "City break",
    description:
      "Old city mornings, extraordinary landscapes and the Caspian after dark.",
    introduction:
      "Stay in Baku and discover a city with more than one story. Wander its old streets, follow Absheron’s fire landscapes and discover Gobustan’s rock art and mud volcanoes. Five days to make your own.",
    image: images.oldCity,
    destinations: ["baku", "gobustan"],
    interests: ["City break", "Culture", "History", "Photography"],
    countries: ["azerbaijan"],
    highlights: [
      "Baku’s Old City, palace and Maiden Tower",
      "Azerbaijan National Carpet Museum",
      "Ateshgah Fire Temple and Yanar Dag",
      "Gobustan rock art and mud volcanoes",
      "Baku viewpoints after dark",
    ],
    gallery: [images.oldCity, images.coast, images.centre, images.temple],
    stay: "Four nights in Baku. Choose a boutique stay, a comfortable hotel or a luxury property; specific hotels are proposed by the team.",
    practical: [
      "Arrival and departure: Baku airport. The starting route includes airport transfers.",
      "A city-based journey with road excursions to Absheron and Gobustan, approximately 60 km from Baku.",
      "Heydar Aliyev Center admission is not included; optional access can be discussed in your personal proposal.",
      "Meals, hotels, guiding and other admissions are confirmed manually in the offer.",
    ],
    visible: true,
    source: source(5, "Azerbaijan-Baku – The flames swaying in the wind"),
    itinerary: [
      day(
        1,
        "Hello, Baku",
        "Meet your guide at the airport and transfer approximately 25 km to the hotel. Enjoy time to settle in.",
        images.coast,
        "Baku",
        "Baku",
        "Arrival",
        ["Airport welcome", "Hotel transfer"],
      ),
      day(
        2,
        "Inside the old city walls",
        "Start at the Alley of Martyrs viewpoint, then explore Icherisheher. Discover Shirvanshahs Palace, Maiden Tower, the old hammam, St. Bartholomew’s Church ruins and historic mosques. Visit the Carpet Museum.",
        images.oldCity,
        "Baku",
        "Baku",
        "City discovery",
        ["Old City", "Shirvanshahs Palace", "Maiden Tower", "Carpet Museum"],
      ),
      day(
        3,
        "The peninsula of fire",
        "Visit Ateshgah, Mardakan Fortress, Mirmovsum Aga Mausoleum and Yanar Dag. Return via the Heydar Aliyev Center; admission is not included. See Baku from its illuminated viewpoints in the evening.",
        images.temple,
        "Absheron · Baku",
        "Baku",
        "Fire & architecture",
        ["Ateshgah", "Yanar Dag", "Heydar Aliyev Center", "Evening viewpoints"],
      ),
      day(
        4,
        "Stories written in stone",
        "Travel to Gobustan, approximately 60 km from Baku, for its rock art and museum. Explore the mud volcano landscape and Bibi-Heybat Mosque, then return to Baku.",
        images.mud,
        "Gobustan · Baku",
        "Baku",
        "History & landscapes",
        ["Rock art", "Gobustan Museum", "Mud volcanoes", "Bibi-Heybat"],
      ),
      day(
        5,
        "One last look at the Caspian",
        "After breakfast, transfer to the airport for departure.",
        images.coast,
        "Baku airport",
        "—",
        "Departure",
        ["Airport transfer"],
      ),
    ],
  },
];
export const tours: Tour[] = importedJourneySeeds.map((tour) => {
  const story = journeyStories[tour.id];
  const photography =
    journeyPhotography[tour.id as keyof typeof journeyPhotography];
  return {
    ...tour,
    title: story.title,
    description: story.subtitle,
    introduction: story.introduction,
    photography,
    image: b2cAsset(photography.featured),
    gallery: photography.gallery.map(b2cAsset),
    itinerary: tour.itinerary.map((day, i) => ({
      ...day,
      ...story.days[i],
      image: b2cAsset(photography.days[i]),
    })),
  };
});

export const experiences = interests.map((name, i) => ({
  id: name.toLowerCase().replaceAll(" ", "-"),
  name,
  image: [
    images.palace,
    images.gobustan,
    images.mountains,
    images.forest,
    images.candy,
    images.food,
    images.village,
    images.coast,
    images.oldCity,
    images.centre,
    images.coast,
    images.village,
  ][i],
  description: [
    "Palace windows, old courtyards, living traditions.",
    "Get closer to the stories behind the stones.",
    "Open landscapes and a welcome change of pace.",
    "Follow the trails to a different perspective.",
    "A little further from the everyday.",
    "Discover a place through its shared tables.",
    "Ask us to weave wine experiences into your trip.",
    "Make room for everyone’s kind of discovery.",
    "A few days, a whole new perspective.",
    "More time, more comfort, more personal attention.",
    "Find the light, and the moments between.",
    "Slow down and discover everyday connections.",
  ][i],
}));
