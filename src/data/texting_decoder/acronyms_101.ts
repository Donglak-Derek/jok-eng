import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const acronyms101: Script = {
  id: "acronyms-101",
  title: "Acronyms 101 & Softeners",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish:
    "Common acronyms and how to soften your tone so you don't sound like a robot.",
  sentences: [
    {
      id: "a1",
      en: "TL;DR: Too Long; Didn't Read. A summary at the end of a long text.",
      ko: "TL;DR: 너무 길어서 안 읽음. 긴 글 끝에 요약.",
      keywords: [
        { word: "summary", meaningKo: "요약" },
      ],
    },
    {
      id: "a2",
      en: "TBH: To Be Honest. Used to share an opinion, sometimes a blunt one.",
      ko: "TBH: 솔직히 말해서. 의견을 나눌 때, 가끔은 직설적일 때 사용.",
      keywords: [
        { word: "blunt", meaningKo: "직설적인" },
      ],
    },
    {
      id: "a3",
      en: "IMO / IMHO: In My (Humble) Opinion. Softens a statement.",
      ko: "IMO / IMHO: 제 (겸손한) 의견으로는. 주장을 부드럽게 함.",
      keywords: [
        { word: "soften", meaningKo: "부드럽게 하다" },
      ],
    },
    {
      id: "a4",
      en: "AFAIK: As Far As I Know. Used when you're not 100% sure.",
      ko: "AFAIK: 제가 알기로는. 100% 확신하지 못할 때 사용.",
      keywords: [
        { word: "sure", meaningKo: "확신하는" },
      ],
    },
    {
      id: "a5",
      en: "IDK / IDEK: I Don't Know / I Don't Even Know. Confusion or lack of info.",
      ko: "IDK / IDEK: 몰라 / 나도 진짜 몰라. 혼란스럽거나 정보 부족.",
      keywords: [
        { word: "confusion", meaningKo: "혼란" },
      ],
    },
    {
      id: "a6",
      en: "RN: Right Now. 'I'm busy rn'.",
      ko: "RN: 지금 당장. '나 지금 바빠'.",
      keywords: [
        { word: "busy", meaningKo: "바쁜" },
      ],
    },
    {
      id: "a7",
      en: "NGL: Not Gonna Lie. Similar to TBH, precedes a confession or truth.",
      ko: "NGL: 거짓말 안 하고. TBH와 비슷, 고백이나 진실 앞에 사용.",
      keywords: [
        { word: "confession", meaningKo: "고백" },
      ],
    },
    {
      id: "a8",
      en: "Adding 'lol' / 'haha': The Softener. 'That's sad lol' (It's not funny, just softening the blow).",
      ko: "'lol' / 'haha' 붙이기: 완화제. '슬프네 lol' (웃긴 게 아니라 충격을 완화함).",
      keywords: [
        { word: "softening the blow", meaningKo: "충격을 완화하다" },
      ],
    },
    {
      id: "a9",
      en: "Review: 'You're fired.' vs 'You're fired lol'. (Only one is a joke... usually).",
      ko: "복습: '너 해고야.' vs '너 해고야 lol'. (하나만 농담임... 보통은).",
      keywords: [
        { word: "usually", meaningKo: "보통" },
      ],
    },
    {
      id: "a10",
      en: "ICYMI: In Case You Missed It. Catching someone up on news.",
      ko: "ICYMI: 혹시 놓쳤을까 봐. 누군가에게 소식을 전할 때.",
      keywords: [
        { word: "catch up", meaningKo: "따라잡다, 알려주다" },
      ],
    },
  ],
};
