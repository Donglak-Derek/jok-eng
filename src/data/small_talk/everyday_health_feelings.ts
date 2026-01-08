import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const healthAndFeelings: Script = {
  id: "everyday-health-feelings",
  title: "Health and Feelings",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Practice talking about how you feel—tired, sick, happy, or stressed. These phrases help you share your condition and emotions in daily life.",
    imageUrl: "/images/scenarios/small_talk_generic.png",
  sentences: [
    {
      id: "s1",
      en: "I’m tired today because I worked late.",
      keywords: [
        { word: "tired", definition: "exhausted" },
        { word: "worked late", definition: "stayed at work past hours" },
      ],
    },
    {
      id: "s2",
      en: "I didn’t sleep well last night.",
      keywords: [
        { word: "sleep", definition: "rest" },
        { word: "last night", definition: "previous night" },
      ],
    },
    {
      id: "s3",
      en: "I feel sick and need to rest.",
      keywords: [
        { word: "sick", definition: "ill" },
        { word: "rest", definition: "take a break" },
      ],
    },
    {
      id: "s4",
      en: "My back hurts from lifting furniture.",
      keywords: [
        { word: "back", definition: "rear part of body" },
        { word: "hurts", definition: "is painful" },
      ],
    },
    {
      id: "s5",
      en: "I have a headache right now.",
      keywords: [
        { word: "headache", definition: "pain in head" },
        { word: "right now", definition: "at this moment" },
      ],
    },
    {
      id: "s6",
      en: "I’m stressed because of too much work.",
      keywords: [
        { word: "stressed", definition: "under pressure" },
        { word: "too much", definition: "excessive" },
      ],
    },
    {
      id: "s7",
      en: "I feel nervous before an interview.",
      keywords: [
        { word: "nervous", definition: "anxious" },
        { word: "interview", definition: "formal meeting" },
      ],
    },
    {
      id: "s8",
      en: "I’m happy because I finished my project.",
      keywords: [
        { word: "happy", definition: "cheerful" },
        { word: "project", definition: "assignment" },
      ],
    },
    {
      id: "s9",
      en: "I feel relaxed after drinking coffee.",
      keywords: [
        { word: "relaxed", definition: "calm" },
        { word: "after", definition: "following" },
      ],
    },
    {
      id: "s10",
      en: "I was excited to see my friends yesterday.",
      keywords: [
        { word: "excited", definition: "enthusiastic" },
        { word: "friends", definition: "companions" },
      ],
    },
    {
      id: "s11",
      en: "I’m worried about making mistakes at work.",
      keywords: [
        { word: "worried", definition: "concerned" },
        { word: "mistakes", definition: "errors" },
      ],
    },
    {
      id: "s12",
      en: "I feel strong after exercising.",
      keywords: [
        { word: "strong", definition: "powerful" },
        { word: "exercising", definition: "working out" },
      ],
    },
    {
      id: "s13",
      en: "I feel weak when I don’t eat breakfast.",
      keywords: [
        { word: "weak", definition: "lacking energy" },
        { word: "breakfast", definition: "first meal" },
      ],
    },
    {
      id: "s14",
      en: "I’m grateful for my coworkers’ help.",
      keywords: [
        { word: "grateful", definition: "thankful" },
        { word: "help", definition: "assistance" },
      ],
    },
    {
      id: "s15",
      en: "Sometimes I feel lonely in a new place.",
      keywords: [
        { word: "lonely", definition: "sad from being alone" },
        { word: "new place", definition: "unfamiliar location" },
      ],
    },
  ],
};
