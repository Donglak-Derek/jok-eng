import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const hobbiesFreeTime: Script = {
  id: "everyday-hobbies-free-time",
  title: "Hobbies and Free Time",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Practice talking about hobbies and free time. Share what you like to do after work or on weekends.",
  sentences: [
    {
      id: "s1",
      en: "I enjoy watching movies on weekends.",
      ko: "저는 주말에 영화 보는 걸 즐겨요.",
      keywords: [
        { word: "enjoy", meaningKo: "즐기다" },
        { word: "weekends", meaningKo: "주말" },
      ],
    },
    {
      id: "s2",
      en: "After work, I like to listen to music.",
      ko: "퇴근 후에 음악 듣는 걸 좋아해요.",
      keywords: [
        { word: "after work", meaningKo: "퇴근 후" },
        { word: "listen", meaningKo: "듣다" },
      ],
    },
    {
      id: "s3",
      en: "Sometimes I play video games to relax.",
      ko: "가끔은 쉬려고 비디오 게임을 해요.",
      keywords: [
        { word: "video games", meaningKo: "비디오 게임" },
        { word: "relax", meaningKo: "쉬다" },
      ],
    },
    {
      id: "s4",
      en: "I like cooking new recipes at home.",
      ko: "저는 집에서 새로운 요리를 해보는 걸 좋아해요.",
      keywords: [
        { word: "cooking", meaningKo: "요리하기" },
        { word: "recipes", meaningKo: "레시피" },
      ],
    },
    {
      id: "s5",
      en: "On weekends, I usually go hiking with friends.",
      ko: "주말에는 보통 친구들과 등산을 가요.",
      keywords: [
        { word: "hiking", meaningKo: "등산" },
        { word: "friends", meaningKo: "친구들" },
      ],
    },
    {
      id: "s6",
      en: "I sometimes read books before sleeping.",
      ko: "저는 가끔 자기 전에 책을 읽어요.",
      keywords: [
        { word: "read", meaningKo: "읽다" },
        { word: "before sleeping", meaningKo: "자기 전에" },
      ],
    },
    {
      id: "s7",
      en: "I like playing soccer on Sundays.",
      ko: "저는 일요일마다 축구하는 걸 좋아해요.",
      keywords: [
        { word: "soccer", meaningKo: "축구" },
        { word: "Sundays", meaningKo: "일요일" },
      ],
    },
    {
      id: "s8",
      en: "Sometimes I draw pictures when I feel creative.",
      ko: "가끔 창의적인 기분이 들 때 그림을 그려요.",
      keywords: [
        { word: "draw", meaningKo: "그리다" },
        { word: "creative", meaningKo: "창의적인" },
      ],
    },
    {
      id: "s9",
      en: "I love spending time with my family in the park.",
      ko: "저는 공원에서 가족과 함께 시간 보내는 걸 좋아해요.",
      keywords: [
        { word: "spending time", meaningKo: "시간 보내기" },
        { word: "park", meaningKo: "공원" },
      ],
    },
    {
      id: "s10",
      en: "In my free time, I practice speaking English.",
      ko: "자유 시간에는 영어 말하기를 연습해요.",
      keywords: [
        { word: "free time", meaningKo: "자유 시간" },
        { word: "practice", meaningKo: "연습하다" },
      ],
    },
    {
      id: "s11",
      en: "I sometimes watch YouTube videos to learn new things.",
      ko: "저는 가끔 유튜브 영상을 보면서 새로운 걸 배워요.",
      keywords: [
        { word: "YouTube", meaningKo: "유튜브" },
        { word: "learn", meaningKo: "배우다" },
      ],
    },
    {
      id: "s12",
      en: "I enjoy taking long walks in the evening.",
      ko: "저는 저녁에 오래 산책하는 걸 즐겨요.",
      keywords: [
        { word: "walks", meaningKo: "산책" },
        { word: "evening", meaningKo: "저녁" },
      ],
    },
  ],
};
