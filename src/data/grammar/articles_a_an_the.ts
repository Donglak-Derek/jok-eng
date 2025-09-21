import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const articlesAAnThe: Script = {
  id: "grammar-articles",
  title: "Articles: a, an, the",
  categorySlug: "grammar",
  categoryName: CATEGORY_NAMES["grammar"],
  cleanedEnglish:
    "Practice when to use 'a', 'an', and 'the' with everyday examples and short patterns.",
  sentences: [
    { id: "s1", en: "I saw a dog in the park.", ko: "나는 공원에서 개 한 마리를 봤어요.", keywords: [ { word: "a", meaningKo: "하나의(처음 언급)" }, { word: "park", meaningKo: "공원" } ] },
    { id: "s2", en: "The dog was friendly.", ko: "그 개는 친근했어요.", keywords: [ { word: "the", meaningKo: "그(이미 언급됨)" }, { word: "friendly", meaningKo: "친근한" } ] },
    { id: "s3", en: "I ate an apple for a snack.", ko: "간식으로 사과 하나를 먹었어요.", keywords: [ { word: "an", meaningKo: "하나의(모음 앞)" }, { word: "snack", meaningKo: "간식" } ] },
    { id: "s4", en: "She bought a umbrella — oops, an umbrella!", ko: "그녀는 우산을 샀어요 — 앗, an umbrella!", keywords: [ { word: "umbrella", meaningKo: "우산" } ] },
    { id: "s5", en: "The apple on the table is mine.", ko: "책상 위의 그 사과는 제 거예요.", keywords: [ { word: "on", meaningKo: "~위에" }, { word: "mine", meaningKo: "내 것" } ] },
    { id: "s6", en: "I need a bottle of water.", ko: "물 한 병이 필요해요.", keywords: [ { word: "bottle", meaningKo: "병" }, { word: "water", meaningKo: "물" } ] },
    { id: "s7", en: "The water is cold.", ko: "그 물은 차가워요.", keywords: [ { word: "the", meaningKo: "그(특정)" }, { word: "cold", meaningKo: "차가운" } ] },
    { id: "s8", en: "An honest person tells the truth.", ko: "정직한 사람은 진실을 말해요.", keywords: [ { word: "honest", meaningKo: "정직한(h는 묵음)" }, { word: "truth", meaningKo: "진실" } ] },
    { id: "s9", en: "A university is nearby.", ko: "근처에 대학교가 하나 있어요.", keywords: [ { word: "university", meaningKo: "대학교(u 발음)" } ] },
  ],
};

