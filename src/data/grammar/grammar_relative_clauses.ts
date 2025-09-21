import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const relativeClauses: Script = {
  id: "grammar-relative-clauses",
  title: "Relative Clauses (who, which, that)",
  categorySlug: "grammar",
  categoryName: CATEGORY_NAMES["grammar"],
  cleanedEnglish:
    "Relative clauses use words like who, which, and that to connect ideas smoothly and add more detail about a person or thing.",
  sentences: [
    {
      id: "s1",
      en: "The coworker who helped me was kind.",
      ko: "저를 도와준 동료는 친절했어요.",
      keywords: [
        { word: "coworker", meaningKo: "동료" },
        { word: "who", meaningKo: "…하는 사람" },
      ],
    },
    {
      id: "s2",
      en: "I met a teacher who loves music.",
      ko: "음악을 좋아하는 선생님을 만났어요.",
      keywords: [
        { word: "teacher", meaningKo: "선생님" },
        { word: "loves", meaningKo: "좋아하다" },
      ],
    },
    {
      id: "s3",
      en: "She has a friend who can speak Korean.",
      ko: "그녀는 한국어 할 줄 아는 친구가 있어요.",
      keywords: [
        { word: "friend", meaningKo: "친구" },
        { word: "speak", meaningKo: "말하다" },
      ],
    },
    {
      id: "s4",
      en: "The book which I bought yesterday is very interesting.",
      ko: "제가 어제 산 책은 정말 재미있어요.",
      keywords: [
        { word: "book", meaningKo: "책" },
        { word: "interesting", meaningKo: "재미있는" },
      ],
    },
    {
      id: "s5",
      en: "This is the song which makes me happy.",
      ko: "이건 저를 행복하게 만드는 노래예요.",
      keywords: [
        { word: "song", meaningKo: "노래" },
        { word: "happy", meaningKo: "행복한" },
      ],
    },
    {
      id: "s6",
      en: "I like the chair that is in the living room.",
      ko: "저는 거실에 있는 의자가 좋아요.",
      keywords: [
        { word: "chair", meaningKo: "의자" },
        { word: "living room", meaningKo: "거실" },
      ],
    },
    {
      id: "s7",
      en: "She wore the dress that her mom gave her.",
      ko: "그녀는 엄마가 준 드레스를 입었어요.",
      keywords: [
        { word: "dress", meaningKo: "드레스" },
        { word: "gave", meaningKo: "주었다" },
      ],
    },
    {
      id: "s8",
      en: "The computer that I use every day is old.",
      ko: "제가 매일 쓰는 컴퓨터는 오래됐어요.",
      keywords: [
        { word: "computer", meaningKo: "컴퓨터" },
        { word: "old", meaningKo: "오래된" },
      ],
    },
    {
      id: "s9",
      en: "Do you know the man who is standing over there?",
      ko: "저기 서 있는 남자를 아세요?",
      keywords: [
        { word: "man", meaningKo: "남자" },
        { word: "standing", meaningKo: "서 있는" },
      ],
    },
    {
      id: "s10",
      en: "The store which sells furniture is closed today.",
      ko: "가구를 파는 가게는 오늘 닫았어요.",
      keywords: [
        { word: "store", meaningKo: "가게" },
        { word: "furniture", meaningKo: "가구" },
      ],
    },
    {
      id: "s11",
      en: "That’s the dog that barks all night.",
      ko: "저게 밤새 짖는 개예요.",
      keywords: [
        { word: "dog", meaningKo: "개" },
        { word: "barks", meaningKo: "짖다" },
      ],
    },
    {
      id: "s12",
      en: "She is the person who always smiles.",
      ko: "그녀는 항상 웃는 사람이에요.",
      keywords: [
        { word: "person", meaningKo: "사람" },
        { word: "smiles", meaningKo: "웃다" },
      ],
    },
  ],
};
