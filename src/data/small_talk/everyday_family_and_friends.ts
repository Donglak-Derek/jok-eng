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
      ko: "저는 아내와 아이 둘이랑 같이 살아요.",
      keywords: [
        { word: "live with", meaningKo: "함께 살다" },
        { word: "kids", meaningKo: "아이들" },
      ],
    },
    {
      id: "s2",
      en: "My kids love playing soccer.",
      ko: "제 아이들은 축구하는 걸 정말 좋아해요.",
      keywords: [
        { word: "love", meaningKo: "매우 좋아하다" },
        { word: "soccer", meaningKo: "축구" },
      ],
    },
    {
      id: "s3",
      en: "My son is eight, and my daughter is twelve.",
      ko: "아들은 여덟 살이고, 딸은 열두 살이에요.",
      keywords: [
        { word: "son", meaningKo: "아들" },
        { word: "daughter", meaningKo: "딸" },
      ],
    },
    {
      id: "s4",
      en: "My parents live nearby, so we visit often.",
      ko: "부모님이 근처에 사셔서 자주 찾아가요.",
      keywords: [
        { word: "nearby", meaningKo: "근처에" },
        { word: "visit", meaningKo: "방문하다" },
      ],
    },
    {
      id: "s5",
      en: "We have a small family dinner every Sunday.",
      ko: "저희는 일요일마다 작은 가족 저녁을 해요.",
      keywords: [
        { word: "family dinner", meaningKo: "가족 저녁" },
        { word: "every Sunday", meaningKo: "일요일마다" },
      ],
    },
    {
      id: "s6",
      en: "How is your family doing these days?",
      ko: "요즘 가족분들은 잘 지내세요?",
      keywords: [
        { word: "these days", meaningKo: "요즘" },
        { word: "doing", meaningKo: "지내다" },
      ],
    },
    {
      id: "s7",
      en: "Do you have any siblings?",
      ko: "형제자매 있으세요?",
      keywords: [
        { word: "siblings", meaningKo: "형제자매" },
        { word: "any", meaningKo: "어떤, 있는지" },
      ],
    },
    {
      id: "s8",
      en: "My best friend works at the same place.",
      ko: "제 가장 친한 친구가 같은 곳에서 일해요.",
      keywords: [
        { word: "best friend", meaningKo: "가장 친한 친구" },
        { word: "works", meaningKo: "일하다" },
      ],
    },
    {
      id: "s9",
      en: "We met in college and stayed close.",
      ko: "대학 때 만나서 계속 친하게 지냈어요.",
      keywords: [
        { word: "met", meaningKo: "만났다" },
        { word: "stay close", meaningKo: "가깝게 지내다" },
      ],
    },
    {
      id: "s10",
      en: "My wife enjoys baking with the kids on weekends.",
      ko: "아내는 주말에 아이들과 베이킹하는 걸 즐겨요.",
      keywords: [
        { word: "enjoy", meaningKo: "즐기다" },
        { word: "baking", meaningKo: "베이킹" },
      ],
    },
    {
      id: "s11",
      en: "We’re planning a picnic if the weather is good.",
      ko: "날씨가 좋으면 소풍을 갈 계획이에요.",
      keywords: [
        { word: "planning", meaningKo: "계획하다" },
        { word: "picnic", meaningKo: "소풍" },
      ],
    },
    {
      id: "s12",
      en: "Would you like to join us this Saturday?",
      ko: "이번 토요일에 같이 하실래요?",
      keywords: [
        { word: "join", meaningKo: "함께하다" },
        { word: "Saturday", meaningKo: "토요일" },
      ],
    },
    {
      id: "s13",
      en: "Thanks for inviting me. Let me check with my family.",
      ko: "초대해 주셔서 감사해요. 가족이랑 상의해 볼게요.",
      keywords: [
        { word: "invite", meaningKo: "초대하다" },
        { word: "check with", meaningKo: "상의하다" },
      ],
    },
    {
      id: "s14",
      en: "My friend’s kids are the same age as mine.",
      ko: "친구네 아이들이 우리 아이들이랑 동갑이에요.",
      keywords: [
        { word: "same age", meaningKo: "동갑" },
        { word: "friend’s", meaningKo: "친구의" },
      ],
    },
    {
      id: "s15",
      en: "We often carpool to practice after school.",
      ko: "방과 후 연습 갈 때 같이 카풀을 자주 해요.",
      keywords: [
        { word: "carpool", meaningKo: "카풀하다" },
        { word: "practice", meaningKo: "연습" },
      ],
    },
    {
      id: "s16",
      en: "I’m trying to balance work and family time.",
      ko: "일이랑 가족 시간을 균형 있게 가져보려고 해요.",
      keywords: [
        { word: "balance", meaningKo: "균형 잡다" },
        { word: "family time", meaningKo: "가족 시간" },
      ],
    },
    {
      id: "s17",
      en: "If you need help, my family can watch the kids.",
      ko: "필요하시면 저희 가족이 아이들 봐드릴 수 있어요.",
      keywords: [
        { word: "watch the kids", meaningKo: "아이들 봐주다" },
        { word: "need help", meaningKo: "도움이 필요하다" },
      ],
    },
    {
      id: "s18",
      en: "Do you and your partner like hiking or movies?",
      ko: "배우자분이랑 하이킹이나 영화 보시는 거 좋아하세요?",
      keywords: [
        { word: "partner", meaningKo: "배우자" },
        { word: "hiking", meaningKo: "하이킹" },
      ],
    },
    {
      id: "s19",
      en: "We’re celebrating my mom’s birthday next week.",
      ko: "다음 주에 엄마 생일을 축하할 거예요.",
      keywords: [
        { word: "celebrate", meaningKo: "축하하다" },
        { word: "birthday", meaningKo: "생일" },
      ],
    },
    {
      id: "s20",
      en: "Let’s keep in touch and plan a family barbecue.",
      ko: "계속 연락하면서 가족 바비큐 한번 계획해요.",
      keywords: [
        { word: "keep in touch", meaningKo: "계속 연락하다" },
        { word: "barbecue", meaningKo: "바비큐" },
      ],
    },
  ],
};
