import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const doubleDip: Script = {
  id: "party-double-dip",
  title: "The Double Dip",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish: "One chip, one dip. That is the law.",
  imageUrl: "/images/scenarios/double_dip.png",
  difficulty: "Mild 🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "I was eating chips and salsa at the [snack table].",
      keywords: [
        { word: "snack table", definition: "Hidden: food area" },
      ],
    },
    {
      id: "s2",
      en: "I took a bite of a chip and [dipped it again].",
      keywords: [
        { word: "dipped it again", definition: "Hidden: the crime" },
      ],
    },
    {
      id: "s3",
      en: "Suddenly, the room went [silent].",
      keywords: [
        { word: "silent", definition: "Hidden: quiet from shock" },
      ],
    },
    {
      id: "s4",
      en: "My friend yelled, '[You double-dipped the chip!]' in horror.",
      keywords: [
        { word: "You double-dipped the chip!", definition: "Hidden: the accusation" },
      ],
    },
    {
      id: "s5",
      en: "I apologized and slowly walked away from the [salsa].",
      keywords: [
        { word: "salsa", definition: "Hidden: the contaminated dip" },
      ],
    },
  ],

  culturalNote: {
    title: "The Double Dip Rule",
    content: "Double-dipping is when you bite a chip and then put it back into the shared dip bowl. It was famously made a social crime by the TV show 'Seinfeld'. It spreads germs and is considered extremely gross and rude in Western party culture."
  },

  quizItems: [
    {
      question: "What is double-dipping?",
      options: ["Eating two chips", "Dipping twice with a bitten chip", "Skipping the dip", "Breaking the bowl"],
      correctIndex: 1,
      explanation: "It's re-dipping a chip you have already bitten."
    },
    {
      question: "Why is it bad?",
      options: ["It wastes sauce", "It spreads germs", "It looks ugly", "It's expensive"],
      correctIndex: 1,
      explanation: "It puts your saliva/germs into the communal bowl."
    },
    {
      question: "What show made this famous?",
      options: ["Friends", "The Office", "Seinfeld", "Game of Thrones"],
      correctIndex: 2,
      explanation: "Seinfeld popularized the term and the social stigma."
    }
  ]
};
