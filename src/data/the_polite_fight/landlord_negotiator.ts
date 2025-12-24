import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const landlordNegotiator: Script = {
  id: "landlord-negotiator",
  title: "The Landlord Negotiator",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish:
    "How to ask for repairs firmly. Alternates between aggressive demands (Rude) and cooperative requests (Polite).",
  sentences: [
    {
      id: "s1_rude",
      en: "Rude: 'The heater is broken. Fix it now or I'm withholding rent.'",
      keywords: [
        { word: "withholding", definition: "refusing to give" },
      ],
    },
    {
      id: "s1_polite",
      en: "Polite: 'I'd love to get the heater fixed before it becomes a bigger issue for the units.'",
      keywords: [
        { word: "issue", definition: "problem" },
        { word: "units", definition: "individual apartments" },
      ],
    },
    {
      id: "s2_rude",
      en: "Rude: 'There are bugs everywhere. This place is a dump.'",
      keywords: [
        { word: "dump", definition: "dirty or unpleasant place" },
      ],
    },
    {
      id: "s2_polite",
      en: "Polite: 'We've noticed some pests and want to address it early to protect the property.'",
      keywords: [
        { word: "pests", definition: "harmful insects or animals" },
        { word: "address", definition: "deal with (a problem)" },
      ],
    },
    {
      id: "s3_rude",
      en: "Rude: 'The faucet has been leaking for weeks. You're useless.'",
      keywords: [
        { word: "leaking", definition: "dripping water" },
        { word: "useless", definition: "not helping at all" },
      ],
    },
    {
      id: "s3_polite",
      en: "Polite: 'Just concerned about potential water damage from this persistent leak.'",
      keywords: [
        { word: "potential", definition: "possible future" },
        { word: "persistent", definition: "continuing for a long time" },
      ],
    },
    {
      id: "s4_rude",
      en: "Rude: 'Tell the neighbors to shut up. I can't sleep.'",
      keywords: [
        { word: "shut up", definition: "stop talking / be quiet" },
      ],
    },
    {
      id: "s4_polite",
      en: "Polite: 'Could we send a general reminder to the building regarding quiet hours?'",
      keywords: [
        { word: "reminder", definition: "notice to help remember" },
        { word: "quiet hours", definition: "times when noise is restricted" },
      ],
    },
    {
      id: "s5_rude",
      en: "Rude: 'You're raising the rent? Are you crazy?'",
      keywords: [
        { word: "crazy", definition: "insane/unreasonable" },
      ],
    },
    {
      id: "s5_polite",
      en: "Polite: 'I was hoping to discuss the renewal rate given my history of on-time payments.'",
      keywords: [
        { word: "renewal rate", definition: "new price for contract" },
        { word: "on-time", definition: "not late" },
      ],
    },
  ],
};
