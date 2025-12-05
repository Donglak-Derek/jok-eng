import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const techInterview: Script = {
  id: "interview-tech",
  title: "Sprint Planning Humor",
  categorySlug: "interview",
  categoryName: CATEGORY_NAMES["interview"],
  cleanedEnglish:
    "Use light jokes about standups, bugs, and meetings to survive office banter without sounding negative.",
  sentences: [
    { id: "s1", en: "In standup I joke, 'Yesterday I fought with a semicolon and lost.'", ko: "데일리 스탠드업에서 이렇게 농담해요, '어제 세미콜론이랑 싸웠는데 졌어요.'", keywords: [ { word: "standup", meaningKo: "데일리 스탠드업" }, { word: "semicolon", meaningKo: "세미콜론" } ] },
    { id: "s2", en: "People relax because I'm honest but not whining.", ko: "정직하지만 징징대지 않아서 사람들이 편안해해요.", keywords: [ { word: "honest", meaningKo: "솔직한" }, { word: "whining", meaningKo: "징징거림" } ] },
    { id: "s3", en: "When planning, I say, 'Let's give the bug a cool codename so we don't fear it.'", ko: "스프린트 계획 때는 이렇게 말해요, '버그에 멋진 코드명을 붙여서 덜 무서워하게 하죠.'", keywords: [ { word: "codename", meaningKo: "코드명" }, { word: "fear", meaningKo: "무서워하다" } ] },
    { id: "s4", en: "It sounds playful, but we still estimate honestly.", ko: "장난처럼 들리지만 여전히 솔직하게 견적을 내요.", keywords: [ { word: "estimate", meaningKo: "견적을 내다" }, { word: "playful", meaningKo: "장난스러운" } ] },
    { id: "s5", en: "If a PM asks for more scope, I reply, 'Sure, do we unlock a new team when we beat this level?'", ko: "PM이 범위를 늘리자고 하면 이렇게 답해요, '좋아요, 이 레벨 깨면 새 팀이 열리나요?'", keywords: [ { word: "scope", meaningKo: "범위" }, { word: "level", meaningKo: "레벨" } ] },
    { id: "s6", en: "They laugh and clarify priorities.", ko: "그들은 웃으며 우선순위를 다시 정리해요.", keywords: [ { word: "clarify", meaningKo: "명확히 하다" }, { word: "priority", meaningKo: "우선순위" } ] },
    { id: "s7", en: "During retro, I say, 'Let's roast bugs, not teammates.'", ko: "회고 때는 이렇게 말해요, '동료 말고 버그를 놀리자.'", keywords: [ { word: "retro", meaningKo: "회고" }, { word: "teammate", meaningKo: "팀원" } ] },
    { id: "s8", en: "That keeps feedback sharp but friendly.", ko: "그러면 피드백이 날카롭지만 친근하게 유지돼요.", keywords: [ { word: "feedback", meaningKo: "피드백" }, { word: "friendly", meaningKo: "친근한" } ] },
    { id: "s9", en: "Small jokes make meetings feel like humans talking, not tickets shouting.", ko: "작은 농담이 회의를 티켓이 소리치는 시간 말고 사람 대화 시간으로 바꿔요.", keywords: [ { word: "ticket", meaningKo: "티켓" }, { word: "shout", meaningKo: "소리치다" } ] },
  ],
};
