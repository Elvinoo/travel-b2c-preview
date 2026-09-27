// Consumer storytelling is authored independently of the factual itinerary.
// No new visits or activities are added here; the operational programme stays below.
type DayStory = { title: string; intro: string; themes: string[] };
type JourneyStory = {
  title: string;
  subtitle: string;
  introduction: string;
  days: DayStory[];
};
const story = (title: string, intro: string, themes: string[]): DayStory => ({
  title,
  intro,
  themes,
});

export const journeyStories: Record<string, JourneyStory> = {
  essential: {
    title: "Between sea & shared stories",
    subtitle:
      "Eight days of old lanes, living craft and landscapes that change with every turn.",
    introduction:
      "Let Azerbaijan unfold a little at a time. Begin beside the Caspian, follow the road to Sheki’s courtyards and craftsmanship, then discover the green landscapes and heritage of the west. There is room for curiosity between the places you came to see.",
    days: [
      story(
        "A new rhythm, beside the sea",
        "Arrive, settle in and let Baku become the first page of your journey.",
        ["A first welcome", "Time to settle"],
      ),
      story(
        "Where the city meets deep time",
        "Old lanes give way to open rock landscapes: two very different sides of Azerbaijan in one day.",
        ["Old city wandering", "Ancient landscapes"],
      ),
      story(
        "Follow the road, find a story",
        "Watch the country change on the way to Sheki, with stops that connect its landscapes to its past.",
        ["The journey between", "Silk Road heritage"],
      ),
      story(
        "Look closer. The craft is in the detail.",
        "Glass, artisan traditions and shaded courtyards make Sheki a place to notice the small things.",
        ["Living craft", "Courtyard stories"],
      ),
      story(
        "A greener side of the story",
        "Goygol’s nature and Ganja’s layered heritage bring a fresh perspective to the journey west.",
        ["Nature & heritage", "A change of scenery"],
      ),
      story(
        "Poetry, then the sea again",
        "A morning with Ganja’s heritage, followed by the road back to Baku and an unhurried afternoon.",
        ["Literary heritage", "A little free time"],
      ),
      story(
        "Fire, threads & an evening glow",
        "Trace Absheron’s fire heritage, then return to Baku for design, carpets and the city after dark.",
        ["Fire heritage", "Craft & design"],
      ),
      story(
        "Take a little of it with you",
        "One last breakfast before your airport transfer and the journey onwards.",
        ["Farewell", "Onwards"],
      ),
    ],
  },
  mountains: {
    title: "A slower world, on foot",
    subtitle:
      "Village trails, mountain air and local home stays. Eight days to find another rhythm.",
    introduction:
      "Start with the city, then take the path towards a different pace. Walk between high villages, pause at waterfalls and mountain passes, and spend the night in local homes. This is a journey whose character comes from both the landscape and the welcome along the way.",
    days: [
      story(
        "The city before the mountains",
        "Settle into Baku before the road takes you towards quieter places.",
        ["Arrival", "A first pause"],
      ),
      story(
        "A different kind of horizon",
        "Discover Baku’s old streets before the city opens out into Gobustan’s ancient landscapes.",
        ["City contrasts", "Deep time"],
      ),
      story(
        "The first steps into a slower world",
        "Tea, village paths and a waterfall mark the transition from road travel to the walking journey.",
        ["Village trails", "A local welcome"],
      ),
      story(
        "Let the canyon set the pace",
        "Follow Qarachay’s landscape towards Sohub, then continue by mountain vehicle to Adur.",
        ["Canyon walking", "Mountain villages"],
      ),
      story(
        "A welcome along the way",
        "Valleys and rivers lead towards Haput, with a shepherd’s lunch woven into the day.",
        ["Walking country", "A shared lunch"],
      ),
      story(
        "The path, the pass, the village",
        "Pause for the mountain views before arriving in Khinalig and discovering its distinct village culture.",
        ["Mountain perspectives", "Village life"],
      ),
      story(
        "One last landscape to remember",
        "Guba’s Red Town and Khizi’s coloured hills give the return to Baku its own discoveries.",
        ["Cultural encounters", "The road back"],
      ),
      story(
        "Carry the quiet home",
        "After breakfast, your airport transfer brings the walking journey to a close.",
        ["Farewell", "Onwards"],
      ),
    ],
  },
  baku: {
    title: "Baku, at your own rhythm",
    subtitle:
      "Five days of sandstone lanes, woven stories and the Caspian after dark.",
    introduction:
      "Make Baku your base and discover the contrasts around it. Old city textures and carpet traditions sit alongside fire heritage, extraordinary dry landscapes and evening viewpoints. A compact journey with more than one way to see the city.",
    days: [
      story(
        "Let the city come to you",
        "Arrive in Baku and take a little time to settle into your surroundings.",
        ["Arrival", "A new pace"],
      ),
      story(
        "Lose yourself in the layers",
        "Explore the old city’s lanes and heritage, then see its stories expressed in carpet traditions.",
        ["Old city textures", "Woven stories"],
      ),
      story(
        "Follow the fire into the evening",
        "Discover Absheron’s fire heritage before returning to Baku’s architecture and evening views.",
        ["Fire heritage", "The city after dark"],
      ),
      story(
        "Step into a much older story",
        "Leave the city for Gobustan’s rock art and mud volcano landscape, with a mosque visit on the return.",
        ["Ancient stories", "Open landscapes"],
      ),
      story(
        "Until the next chapter",
        "A final breakfast and airport transfer close your time in Baku.",
        ["Farewell", "Onwards"],
      ),
    ],
  },
};
