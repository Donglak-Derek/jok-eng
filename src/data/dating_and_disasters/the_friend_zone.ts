import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theFriendZone: Script = {
  id: "the_friend_zone",
  title: "The Friend Zone Decoder",
  type: "decoder",
  section: "The Dating Minefield",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Translating 'soft letdowns' and platonic compliments.",
  imageUrl: "/images/scenarios/friend_zone.png",
  decoderItems: [
    {
      id: "friend-1",
      phrase: "You're such a nice guy.",
      literalMeaning: "You are a pleasant male.",
      actualMeaning: "You are not dangerous, but I have zero romantic attraction to you.",
      dangerLevel: "High - Friend Zone Entry",
      survivalTip: "If you hear this, you are effectively their brother now.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Aww, you're such a nice guy for paying!",
         textB: "Thanks!",
         contextNote: "It sounds like a compliment, but 'nice' is often the opposite of 'sexy' in dating."
      }
    },
    {
      id: "friend-2",
      phrase: "I value our friendship too much.",
      literalMeaning: "Our friendship is precious.",
      actualMeaning: "I don't want to ruin this friendship by dating you (and then dumping you).",
      dangerLevel: "Critical - Permanent Zone",
      survivalTip: "Accept the friendship or leave. You cannot negotiate this.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "I just value our friendship too much to risk it.",
         textB: "I understand.",
         contextNote: "This is the polite way of saying 'No' without hurting your feelings."
      }
    },
    {
      id: "friend-3",
      phrase: "You'll make some girl really happy someday.",
      literalMeaning: "A future woman will be happy with you.",
      actualMeaning: "That woman is definitely not me.",
      dangerLevel: "Medium - End of the Road",
      survivalTip: "Ask them to introduce you to 'some girl'. Use their network!",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Seriously, you'll make someone really happy someday.",
         textB: "Do you know anyone?",
         contextNote: "Pivot the rejection into a setup. It's a power move."
      }
    },
    {
      id: "friend-4",
      phrase: "You're like a brother to me.",
      literalMeaning: "We have a familial bond.",
      actualMeaning: "The idea of kissing you feels like incest.",
      dangerLevel: "Critical - The Sibling Seal",
      survivalTip: "There is no coming back from this. Go be a good brother (from a distance).",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "I love you! You're like my big brother.",
         textB: "That's... sweet.",
         contextNote: "This is the final nail in the romantic coffin."
      }
    },
    {
      id: "friend-5",
      phrase: "I wish I could find a guy like you.",
      literalMeaning: "I want a partner with your qualities.",
      actualMeaning: "I want someone with your personality, but significantly hotter.",
      dangerLevel: "High - The Clone Request",
      survivalTip: "Say: 'I am a guy like me.' Watch them panic.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Why can't all guys be like you?",
         textB: "I am right here.",
         contextNote: "Watch them stumble. It's cruel but clarifying."
      }
    }
  ],
  quizItems: [
    {
      question: "What does 'You're such a nice guy' often imply in dating?",
      options: ["You are perfect marriage material", "You are safe but not attractive", "You are a superhero", "You are rich"],
      correctIndex: 1,
      explanation: "'Nice' is the consolation prize of dating adjectives. It usually means they see you as a platonic friend."
    },
    {
      question: "If they 'value the friendship too much', what is the outcome?",
      options: ["You will date later", "You will date now", "You will never date", "You will become business partners"],
      correctIndex: 2,
      explanation: "It's a polite way of closing the door on romance permanently to avoid awkwardness."
    },
    {
      question: "When they say 'You'll make someone happy someday', who is 'someone'?",
      options: ["Them", "Anyone but them", "Their sister", "Your ex"],
      correctIndex: 1,
      explanation: "They are theoretically complimenting you while practically rejecting you."
    }
  ],
  summaryPoints: [
      "'Nice' usually means 'safe', not 'attractive'.",
      "If they value the friendship 'too much', dating is off the table.",
      "Use the rejection to get introductions to their friends."
  ]
};
