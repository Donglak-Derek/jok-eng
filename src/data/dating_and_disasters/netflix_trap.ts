import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const netflixTrap: Script = {
  id: "date_03",
  title: "The 'Netflix' Trap",
  type: "decoder",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Dating in English is about subtext. This helps you read between the lines.", /* Context summary */
  cleanedKorean: "영어 데이트는 '행간 읽기'가 핵심입니다. 숨은 뜻을 파악하는 법을 배워보세요.",
  sentences: [], // Empty because we use decoderItems
  decoderItems: [
    {
      id: "item_1",
      phrase: "Do you want to come over and watch a movie?",
      phraseKo: "우리 집에서 영화 볼래?",
      literalMeaning: "Watching a film on a television screen.",
      literalMeaningKo: "TV 화면으로 영화를 관람함.",
      actualMeaning: "Netflix and Chill (Hooking up).",
      actualMeaningKo: "넷플릭스 앤 칠 (성적인 의도가 다분함).",
      dangerLevel: "🔥 High",
      survivalTip: "If you go, assume intimacy is expected. If you just want to watch a movie, suggest a cinema instead.",
      survivalTipKo: "간다면 스킨십이 있을 거라고 가정하세요. 정말 영화만 보고 싶다면 영화관을 제안하세요."
    },
    {
       id: "item_2",
       phrase: "I'm not looking for anything serious right now.",
       phraseKo: "지금은 진지한 만남을 찾고 있지 않아요.",
       literalMeaning: "I am busy and cannot commit to a relationship.",
       literalMeaningKo: "바빠서 연애에 몰두할 수 없음.",
       actualMeaning: "I want to date you casually, but I will never be your boyfriend/girlfriend.",
       actualMeaningKo: "가볍게 만나고는 싶지만, 당신의 연인이 될 생각은 절대 없음.",
       dangerLevel: "⚠️ Medium",
       survivalTip: "Believe them. Do not think you can change their mind. Run if you want marriage.",
       survivalTipKo: "그 말을 믿으세요. 마음을 돌릴 수 있다고 착각하지 마세요. 결혼을 원한다면 도망치세요."
    },
    {
        id: "item_3",
        phrase: "We should do this again sometime.",
        phraseKo: "우리 언제 또 봐요.",
        literalMeaning: "I enjoyed this and want to repeat it.",
        literalMeaningKo: "즐거웠으니 다시 만나고 싶음.",
        actualMeaning: "I am being polite. I might never call you again.",
        actualMeaningKo: "예의상 하는 말임. 다시는 연락 안 할수도 있음.",
        dangerLevel: "🤔 Low (Confusing)",
        survivalTip: "Sometime = Never. If they say 'Next Tuesday', it's real. If it's 'Sometime', don't hold your breath.",
        survivalTipKo: "'언젠가' = '절대 안 함'. '다음 주 화요일'처럼 구체적이면 진짜지만, '언젠가'라면 기대하지 마세요."
    },
    {
        id: "item_4",
        phrase: "You're too good for me.",
        phraseKo: "너는 나한테 과분한 사람이야.",
        literalMeaning: "My self-esteem is low and you are superior.",
        literalMeaningKo: "내 자존감이 낮고 당신이 더 훌륭함.",
        actualMeaning: "I want to break up (or not commit) without looking like the bad guy.",
        actualMeaningKo: "나쁜 사람이 되기는 싫지만 헤어지고(혹은 진지해지고 싶지) 않음.",
        dangerLevel: "🚩 Red Flag",
        survivalTip: "Agree with them. Say 'You're right, I am.' and walk away. They are telling you they will disappoint you.",
        survivalTipKo: "동의하세요. '맞아, 난 과분해'라고 말하고 떠나세요. 실망시킬 거라고 예고하는 겁니다."
    },
    {
        id: "item_5",
        phrase: "I'm just focusing on my career right now.",
        phraseKo: "지금은 일에 집중하고 싶어.",
        literalMeaning: "I am very ambitious and busy with work.",
        literalMeaningKo: "야망이 넘치고 일 때문에 바쁨.",
        actualMeaning: "I have time for dating, just not with you.",
        actualMeaningKo: "데이트할 시간은 있지만, 너랑은 안 함.",
        dangerLevel: "📉 Rejection",
        survivalTip: "Do not wait for them to be 'less busy'. Respect the rejection and move on.",
        survivalTipKo: "'덜 바빠질' 때를 기다리지 마세요. 거절을 받아들이고 다른 사람 찾으세요."
    },
    {
        id: "item_6",
        phrase: "Let's play it by ear.",
        phraseKo: "그때 봐서 결정하자.",
        literalMeaning: "We will decide plans based on how we feel later.",
        literalMeaningKo: "나중에 상황 봐서 결정하자.",
        actualMeaning: "You are my backup plan. If nothing better comes up, I'll see you.",
        actualMeaningKo: "너는 보험용임. 더 좋은 약속 없으면 만날게.",
        dangerLevel: "⏳ Flake Risk",
        survivalTip: "Don't leave your schedule open. Make other plans. If they confirm last minute, tell them you're busy.",
        survivalTipKo: "스케줄 비워두지 마세요. 다른 약속 잡으세요. 막판에 보자고 하면 바쁘다고 하세요."
    }
  ]
};
