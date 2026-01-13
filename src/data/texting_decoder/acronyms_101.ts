import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const acronyms101: Script = {
  id: "acronyms-101",
  title: "Acronyms & Softeners",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Stop sounding like a robot. Simple hacks to soften your texts.",
  type: "script",
  section: "slang_vocab",
  mode: "cloze",
  difficulty: "Mild 🌶️",
  imageUrl: "/images/scenarios/acronyms.png",
  sentences: [
    {
      id: "a1",
      en: "TL;DR: We need more budget.",
      keywords: [
        { word: "summary", definition: "a brief statement of main points" },
      ],
      scenario: "You send a long 5-paragraph email update.",
      badResponse: {
        text: "(Just the 5 paragraphs)",
        why: "People are busy. They might skip the whole thing.",
      },
      goodResponse: {
        text: "... Email body ... [TL;DR]: We need more budget.",
        why: "'TL;DR' (Too Long; Didn't Read) respects their time by giving the headline first.",
      },
    },
    {
      id: "a2",
      en: "TBH, I don't think that's a good idea.",
      keywords: [
        { word: "honest", definition: "telling the truth" },
      ],
      scenario: "You disagree with a friend's plan.",
      badResponse: {
        text: "That is a bad idea.",
        why: "Sounds harsh and judgmental.",
      },
      goodResponse: {
        text: "[TBH], I don't think that's a good idea.",
        why: "'TBH' (To Be Honest) signals that this is just your opinion, not an attack.",
      },
    },
    {
      id: "a3",
      en: "IMO, we should wait.",
      keywords: [
        { word: "opinion", definition: "a personal view" },
      ],
      scenario: "Suggesting a strategy change.",
      badResponse: {
        text: "We must wait.",
        why: "Sounds bossy if you aren't the boss.",
      },
      goodResponse: {
        text: "[IMO], we should wait.",
        why: "'IMO' (In My Opinion) softens the statement, making it a suggestion.",
      },
    },
    {
      id: "a4",
      en: "AFAIK, the deadline is Friday.",
      keywords: [
        { word: "knowledge", definition: "facts or information acquired" },
      ],
      scenario: "Someone asks when a project is due.",
      badResponse: {
        text: "It is Friday.",
        why: "If you're wrong, you look incompetent.",
      },
      goodResponse: {
        text: "[AFAIK], the deadline is Friday.",
        why: "'AFAIK' (As Far As I Know) protects you. It implies 'I could be wrong'.",
      },
    },
    {
      id: "a5",
      en: "IDK, maybe try restarting it?",
      keywords: [
        { word: "uncertainty", definition: "state of being unsure" },
      ],
      scenario: "Answering a tech support question.",
      badResponse: {
        text: "I do not know.",
        why: "Sounds robotic and unhelpful.",
      },
      goodResponse: {
        text: "[IDK], maybe try restarting it?",
        why: "'IDK' (I Don't Know) is casual and quick. It sounds more human.",
      },
    },
    {
      id: "a6",
      en: "I can't talk RN.",
      keywords: [
        { word: "busy", definition: "having a lot to do" },
      ],
      scenario: "You get a call during a meeting.",
      badResponse: {
        text: "Do not call me.",
        why: "Aggressive.",
      },
      goodResponse: {
        text: "I can't talk [RN].",
        why: "'RN' (Right Now) implies you might be free later. It's situational, not personal.",
      },
    },
    {
      id: "a7",
      en: "NGL, that meeting was long.",
      keywords: [
        { word: "truth", definition: "fact or validity" },
      ],
      scenario: "Debriefing after a boring meeting.",
      badResponse: {
        text: "The meeting was boring.",
        why: "Just mean.",
      },
      goodResponse: {
        text: "[NGL], that meeting was long.",
        why: "'NGL' (Not Gonna Lie) bonds you with the listener over a shared secret truth.",
      },
    },
    {
      id: "a8",
      en: "That sucks lol",
      keywords: [
        { word: "softener", definition: "word used to make something less harsh" },
      ],
      scenario: "A friend complains about a minor inconvenience.",
      badResponse: {
        text: "That is unfortunate.",
        why: "Sounds like a Victorian ghost.",
      },
      goodResponse: {
        text: "That sucks [lol]",
        why: "Here, 'lol' doesn't mean laughing. It signals 'I acknowledge your pain but we are keeping it light'.",
      },
    },
    {
      id: "a9",
      en: "Where are you?? haha",
      keywords: [
        { word: "awkwardness", definition: "feeling of embarrassment" },
      ],
      scenario: "Your friend is 30 minutes late.",
      badResponse: {
        text: "Where are you?",
        why: "Can sound angry or demanding.",
      },
      goodResponse: {
        text: "Where are you?? [haha]",
        why: "Adding 'haha' removes the aggression. It says 'I'm waiting, but I'm not mad yet'.",
      },
    },
    {
      id: "a10",
      en: "ICYMI: We moved the meeting.",
      keywords: [
        { word: "missed", definition: "failed to see or hear" },
      ],
      scenario: "Sending a reminder to the team.",
      badResponse: {
        text: "You missed the update.",
        why: "Accusatory.",
      },
      goodResponse: {
        text: "[ICYMI]: We moved the meeting.",
        why: "'ICYMI' (In Case You Missed It) assumes they are busy, not lazy. It's polite.",
      },
    },
  ],
};
