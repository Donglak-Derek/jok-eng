import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const acronyms101: Script = {
  id: "acronyms-101",
  title: "Acronyms 101 & Softeners",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish:
    "Common acronyms and simple hacks to stop sounding like a robot (Mistake -> Fix format).",
  sentences: [
    {
      id: "a1",
      en: "Here's the report. TL;DR: We need more budget.",
      ko: "TL;DR: 너무 길어서 안 읽음 (요약)",
      keywords: [
        { word: "summary", meaningKo: "요약" },
      ],
      scenario: "You send a 5-paragraph email update.",
      badResponse: {
        text: "(Just the 5 paragraphs)",
        why: "People are busy. They might skip your email entirely if it looks too long.",
      },
      goodResponse: {
        text: "... [Email body] ... TL;DR: We need more budget.",
        why: "Adding 'TL;DR' (Too Long; Didn't Read) at the top or bottom respects their time.",
      },
    },
    {
      id: "a2",
      en: "TBH, I don't think that's a good idea.",
      ko: "TBH: 솔직히 말해서",
      keywords: [
        { word: "honest", meaningKo: "솔직한" },
      ],
      scenario: "You disagree with a friend's plan.",
      badResponse: {
        text: "That is a bad idea.",
        why: "Sounds harsh and judgmental.",
      },
      goodResponse: {
        text: "TBH, I don't think that's a good idea.",
        why: "'TBH' (To Be Honest) signals that you are sharing a personal opinion, not attacking them.",
      },
    },
    {
      id: "a3",
      en: "IMO, we should wait.",
      ko: "IMO: 제 의견으로는",
      keywords: [
        { word: "opinion", meaningKo: "이견" },
      ],
      scenario: "Suggesting a strategy change in a group chat.",
      badResponse: {
        text: "We must wait.",
        why: "Sounds bossy if you aren't the boss.",
      },
      goodResponse: {
        text: "IMO, we should wait.",
        why: "'IMO' (In My Opinion) softens the statement, making it a suggestion rather than a command.",
      },
    },
    {
      id: "a4",
      en: "AFAIK, the deadline is Friday.",
      ko: "AFAIK: 제가 알기로는",
      keywords: [
        { word: "knowledge", meaningKo: "지식" },
      ],
      scenario: "Someone asks when a project is due.",
      badResponse: {
        text: "It is Friday.",
        why: "If you're wrong, you look incompetent.",
      },
      goodResponse: {
        text: "AFAIK, the deadline is Friday.",
        why: "'AFAIK' (As Far As I Know) protects you. It implies 'I could be wrong, but this is what I think'.",
      },
    },
    {
      id: "a5",
      en: "IDK, maybe try restarting it?",
      ko: "IDK: 몰라",
      keywords: [
        { word: "uncertainty", meaningKo: "불확실성" },
      ],
      scenario: "Tech support question from a parent.",
      badResponse: {
        text: "I do not know.",
        why: "Sounds robotic and unhelpful.",
      },
      goodResponse: {
        text: "IDK, maybe try restarting it?",
        why: "'IDK' (I Don't Know) is casual and quick. It sounds more human.",
      },
    },
    {
      id: "a6",
      en: "I can't talk RN.",
      ko: "RN: 지금 당장",
      keywords: [
        { word: "busy", meaningKo: "바쁜" },
      ],
      scenario: "You get a call during a meeting.",
      badResponse: {
        text: "Do not call me.",
        why: "Aggressive.",
      },
      goodResponse: {
        text: "I can't talk RN.",
        why: "'RN' (Right Now) implies you might be free later. It's situational, not personal.",
      },
    },
    {
      id: "a7",
      en: "NGL, that presentation was long.",
      ko: "NGL: 거짓말 안 하고 (솔직히)",
      keywords: [
        { word: "truth", meaningKo: "진실" },
      ],
      scenario: "Debriefing after a boring meeting.",
      badResponse: {
        text: "The presentation was boring.",
        why: "Just mean.",
      },
      goodResponse: {
        text: "NGL, that presentation was long.",
        why: "'NGL' (Not Gonna Lie) bonds you with the listener over a shared truth.",
      },
    },
    {
      id: "a8",
      en: "That sucks lol",
      ko: "lol: (문장 완화제)",
      keywords: [
        { word: "softener", meaningKo: "완화제" },
      ],
      scenario: "A friend complains about a minor inconvenience (dropped toast).",
      badResponse: {
        text: "That is unfortunate.",
        why: "Sounds like a robot or a Victorian ghost.",
      },
      goodResponse: {
        text: "That sucks lol",
        why: "Here, 'lol' doesn't mean you are laughing. It signals 'I acknowledge your pain but we are keeping it light'.",
      },
    },
    {
      id: "a9",
      en: "Where are you?? haha",
      ko: "haha: (압박감 줄이기)",
      keywords: [
        { word: "awkwardness", meaningKo: "어색함" },
      ],
      scenario: "Your friend is 30 minutes late.",
      badResponse: {
        text: "Where are you?",
        why: "Can sound angry or demanding.",
      },
      goodResponse: {
        text: "Where are you?? haha",
        why: "Adding 'haha' removes the aggression. It says 'I'm waiting, but I'm not mad yet'.",
      },
    },
    {
      id: "a10",
      en: "ICYMI: We moved the meeting.",
      ko: "ICYMI: 혹시 놓쳤을까 봐",
      keywords: [
        { word: "missed", meaningKo: "놓친" },
      ],
      scenario: "Sending a reminder to the team.",
      badResponse: {
        text: "You missed the update.",
        why: "Accusatory.",
      },
      goodResponse: {
        text: "ICYMI: We moved the meeting.",
        why: "'ICYMI' (In Case You Missed It) assumes they are busy, not lazy. It's polite.",
      },
    },
  ],
};
