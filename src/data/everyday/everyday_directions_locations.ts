import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const directionsAndLocations: Script = {
  id: "everyday-directions-locations",
  title: "Directions and Locations",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Learn how to ask and give directions at work or outside. These sentences help you talk about places and locations clearly.",
  sentences: [
    {
      id: "s1",
      en: "Where is the restroom?",
      ko: "화장실이 어디에 있어요?",
      keywords: [
        { word: "restroom", meaningKo: "화장실" },
        { word: "where", meaningKo: "어디" },
      ],
    },
    {
      id: "s2",
      en: "The restroom is next to the cafeteria.",
      ko: "화장실은 식당 옆에 있어요.",
      keywords: [
        { word: "next to", meaningKo: "옆에" },
        { word: "cafeteria", meaningKo: "식당" },
      ],
    },
    {
      id: "s3",
      en: "How do I get to the showroom?",
      ko: "쇼룸에 어떻게 가요?",
      keywords: [
        { word: "get to", meaningKo: "도착하다" },
        { word: "showroom", meaningKo: "쇼룸" },
      ],
    },
    {
      id: "s4",
      en: "The showroom is straight ahead.",
      ko: "쇼룸은 쭉 앞으로 가면 있어요.",
      keywords: [
        { word: "straight ahead", meaningKo: "쭉 앞으로" },
        { word: "ahead", meaningKo: "앞에" },
      ],
    },
    {
      id: "s5",
      en: "Turn left at the corner.",
      ko: "모퉁이에서 왼쪽으로 도세요.",
      keywords: [
        { word: "turn left", meaningKo: "왼쪽으로 돌다" },
        { word: "corner", meaningKo: "모퉁이" },
      ],
    },
    {
      id: "s6",
      en: "Turn right after the stairs.",
      ko: "계단 지나서 오른쪽으로 도세요.",
      keywords: [
        { word: "turn right", meaningKo: "오른쪽으로 돌다" },
        { word: "stairs", meaningKo: "계단" },
      ],
    },
    {
      id: "s7",
      en: "The elevator is near the entrance.",
      ko: "엘리베이터는 입구 근처에 있어요.",
      keywords: [
        { word: "elevator", meaningKo: "엘리베이터" },
        { word: "entrance", meaningKo: "입구" },
      ],
    },
    {
      id: "s8",
      en: "Go past the kitchen section.",
      ko: "주방 코너를 지나가세요.",
      keywords: [
        { word: "go past", meaningKo: "지나가다" },
        { word: "section", meaningKo: "구역" },
      ],
    },
    {
      id: "s9",
      en: "The office is on the second floor.",
      ko: "사무실은 2층에 있어요.",
      keywords: [
        { word: "office", meaningKo: "사무실" },
        { word: "second floor", meaningKo: "2층" },
      ],
    },
    {
      id: "s10",
      en: "Walk down this hallway.",
      ko: "이 복도를 따라 걸어가세요.",
      keywords: [
        { word: "hallway", meaningKo: "복도" },
        { word: "walk down", meaningKo: "따라 걷다" },
      ],
    },
    {
      id: "s11",
      en: "The cafeteria is next to the showroom.",
      ko: "식당은 쇼룸 옆에 있어요.",
      keywords: [
        { word: "cafeteria", meaningKo: "식당" },
        { word: "next to", meaningKo: "옆에" },
      ],
    },
    {
      id: "s12",
      en: "Go through that door and turn left.",
      ko: "저 문을 지나서 왼쪽으로 도세요.",
      keywords: [
        { word: "go through", meaningKo: "통과하다" },
        { word: "door", meaningKo: "문" },
      ],
    },
    {
      id: "s13",
      en: "The parking lot is behind the building.",
      ko: "주차장은 건물 뒤에 있어요.",
      keywords: [
        { word: "parking lot", meaningKo: "주차장" },
        { word: "behind", meaningKo: "뒤에" },
      ],
    },
    {
      id: "s14",
      en: "Is it far from here?",
      ko: "여기서 멀어요?",
      keywords: [
        { word: "far", meaningKo: "멀다" },
        { word: "from here", meaningKo: "여기서" },
      ],
    },
    {
      id: "s15",
      en: "No, it’s very close.",
      ko: "아니요, 아주 가까워요.",
      keywords: [
        { word: "close", meaningKo: "가깝다" },
        { word: "very", meaningKo: "아주" },
      ],
    },
  ],
};
