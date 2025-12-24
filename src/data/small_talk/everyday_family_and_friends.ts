import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const familyAndFriends: Script = {
  id: "everyday-family-and-friends",
  title: "Family and Friends",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Talk about your family and friends in daily life, and ask others politely about theirs. Short, natural lines for real conversations.",
  sentences: [
    {
      id: "s1",
      en: "I live with my wife and two kids.",
      keywords: [
        { word: "live with", definition: "reside together" },
        { word: "kids", definition: "children" },
      ],
    },
    {
      id: "s2",
      en: "My kids love playing soccer.",
      keywords: [
        { word: "love", definition: "really like" },
        { word: "soccer", definition: "football (sport)" },
      ],
    },
    {
      id: "s3",
      en: "My son is eight, and my daughter is twelve.",
      keywords: [
        { word: "son", definition: "male child" },
        { word: "daughter", definition: "female child" },
      ],
    },
    {
      id: "s4",
      en: "My parents live nearby, so we visit often.",
      keywords: [
        { word: "nearby", definition: "close to here" },
        { word: "visit", definition: "go to see" },
      ],
    },
    {
      id: "s5",
      en: "We have a small family dinner every Sunday.",
      keywords: [
        { word: "family dinner", definition: "meal with relatives" },
        { word: "every Sunday", definition: "weekly on Sunday" },
      ],
    },
    {
      id: "s6",
      en: "How is your family doing these days?",
      keywords: [
        { word: "these days", definition: "lately" },
        { word: "doing", definition: "faring/living" },
      ],
    },
    {
      id: "s7",
      en: "Do you have any siblings?",
      keywords: [
        { word: "siblings", definition: "brothers or sisters" },
        { word: "any", definition: "one or more" },
      ],
    },
    {
      id: "s8",
      en: "My best friend works at the same place.",
      keywords: [
        { word: "best friend", definition: "closest friend" },
        { word: "works", definition: "is employed" },
      ],
    },
    {
      id: "s9",
      en: "We met in college and stayed close.",
      keywords: [
        { word: "met", definition: "encountered first time" },
        { word: "stayed close", definition: "remained friends" },
      ],
    },
    {
      id: "s10",
      en: "My wife enjoys baking with the kids on weekends.",
      keywords: [
        { word: "enjoy", definition: "likes" },
        { word: "baking", definition: "cooking in oven" },
      ],
    },
    {
      id: "s11",
      en: "We’re planning a picnic if the weather is good.",
      keywords: [
        { word: "planning", definition: "organizing" },
        { word: "picnic", definition: "outdoor meal" },
      ],
    },
    {
      id: "s12",
      en: "Would you like to join us this Saturday?",
      keywords: [
        { word: "join", definition: "come with" },
        { word: "Saturday", definition: "weekend day" },
      ],
    },
    {
      id: "s13",
      en: "Thanks for inviting me. Let me check with my family.",
      keywords: [
        { word: "invite", definition: "ask to come" },
        { word: "check with", definition: "ask/consult" },
      ],
    },
    {
      id: "s14",
      en: "My friend’s kids are the same age as mine.",
      keywords: [
        { word: "same age", definition: "born in same year" },
        { word: "friend’s", definition: "belonging to friend" },
      ],
    },
    {
      id: "s15",
      en: "We often carpool to practice after school.",
      keywords: [
        { word: "carpool", definition: "share rides" },
        { word: "practice", definition: "training session" },
      ],
    },
    {
      id: "s16",
      en: "I’m trying to balance work and family time.",
      keywords: [
        { word: "balance", definition: "keep equal" },
        { word: "family time", definition: "time with kin" },
      ],
    },
    {
      id: "s17",
      en: "If you need help, my family can watch the kids.",
      keywords: [
        { word: "watch the kids", definition: "babysit" },
        { word: "need help", definition: "require assistance" },
      ],
    },
    {
      id: "s18",
      en: "Do you and your partner like hiking or movies?",
      keywords: [
        { word: "partner", definition: "spouse / significant other" },
        { word: "hiking", definition: "walking in nature" },
      ],
    },
    {
      id: "s19",
      en: "We’re celebrating my mom’s birthday next week.",
      keywords: [
        { word: "celebrate", definition: "party for" },
        { word: "birthday", definition: "day born" },
      ],
    },
    {
      id: "s20",
      en: "Let’s keep in touch and plan a family barbecue.",
      keywords: [
        { word: "keep in touch", definition: "stay contacted" },
        { word: "barbecue", definition: "outdoor grill meal" },
      ],
    },
  ],
};
