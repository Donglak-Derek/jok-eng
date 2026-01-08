import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const explainingProblems: Script = {
  id: "everyday-explaining-problems",
  title: "Explaining Problems",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Learn how to report issues clearly in work or daily life. These sentences help you explain what’s wrong and what needs to be done.",
    imageUrl: "/images/scenarios/small_talk_generic.png",
  sentences: [
    {
      id: "s1",
      en: "This part is missing. We need to order it.",
      keywords: [
        { word: "missing", definition: "not present" },
        { word: "order", definition: "request supply" },
      ],
    },
    {
      id: "s2",
      en: "The table is broken. We can’t use it.",
      keywords: [
        { word: "broken", definition: "damaged" },
        { word: "use", definition: "utilize" },
      ],
    },
    {
      id: "s3",
      en: "The instructions are not clear.",
      keywords: [
        { word: "instructions", definition: "directions" },
        { word: "clear", definition: "easy to understand" },
      ],
    },
    {
      id: "s4",
      en: "This screw is too short.",
      keywords: [
        { word: "screw", definition: "metal fastener" },
        { word: "short", definition: "not long enough" },
      ],
    },
    {
      id: "s5",
      en: "The shelf is not stable. It shakes when I touch it.",
      keywords: [
        { word: "shelf", definition: "storage plank" },
        { word: "stable", definition: "steady" },
      ],
    },
    {
      id: "s6",
      en: "We are missing two pieces from the box.",
      keywords: [
        { word: "pieces", definition: "parts" },
        { word: "box", definition: "container" },
      ],
    },
    {
      id: "s7",
      en: "The paint is scratched on the surface.",
      keywords: [
        { word: "paint", definition: "colored coating" },
        { word: "surface", definition: "outer layer" },
      ],
    },
    {
      id: "s8",
      en: "The package arrived damaged.",
      keywords: [
        { word: "package", definition: "parcel" },
        { word: "damaged", definition: "broken / harmed" },
      ],
    },
    {
      id: "s9",
      en: "The drawer doesn’t open smoothly.",
      keywords: [
        { word: "drawer", definition: "storage box" },
        { word: "smoothly", definition: "easily" },
      ],
    },
    {
      id: "s10",
      en: "The light is flickering. It needs to be fixed.",
      keywords: [
        { word: "flickering", definition: "flashing on and off" },
        { word: "fixed", definition: "repaired" },
      ],
    },
    {
      id: "s11",
      en: "The part does not match the instructions.",
      keywords: [
        { word: "match", definition: "correspond to" },
        { word: "instructions", definition: "guide" },
      ],
    },
    {
      id: "s12",
      en: "There is a crack in the glass.",
      keywords: [
        { word: "crack", definition: "break line" },
        { word: "glass", definition: "transparent material" },
      ],
    },
    {
      id: "s13",
      en: "The box is heavy. I need help to move it.",
      keywords: [
        { word: "heavy", definition: "weighty" },
        { word: "move", definition: "change position" },
      ],
    },
    {
      id: "s14",
      en: "The handle is loose. It might fall off.",
      keywords: [
        { word: "handle", definition: "grip" },
        { word: "loose", definition: "not tight" },
      ],
    },
    {
      id: "s15",
      en: "Something is missing, but I don’t know what it is.",
      keywords: [
        { word: "missing", definition: "lost / gone" },
        { word: "something", definition: "an unspecified thing" },
      ],
    },
  ],
};
