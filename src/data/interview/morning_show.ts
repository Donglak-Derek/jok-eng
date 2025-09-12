import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const morningShow: Script = {
  id: "interview-morning-show",
  title: "Morning Show Interview",
  categorySlug: "interview",
  categoryName: CATEGORY_NAMES["interview"],
  cleanedEnglish:
    "A cheerful host asks very serious questions with a smile, like news delivered with pancakes.",
  sentences: [
    { id: "s1", en: "Good morning and welcome to the show.", ko: "좋은 아침입니다. 쇼에 오신 걸 환영해요.", keywords: [ { word: "welcome", meaningKo: "환영하다" } ] },
    { id: "s2", en: "The host smiles while asking tough questions.", ko: "진행자는 어려운 질문을 하면서 미소를 짓습니다.", keywords: [ { word: "host", meaningKo: "진행자" }, { word: "tough", meaningKo: "어려운" } ] },
    { id: "s3", en: "It feels like news with pancakes.", ko: "팬케이크와 함께하는 뉴스 같아요.", keywords: [ { word: "pancakes", meaningKo: "팬케이크" } ] },
    { id: "s4", en: "We discuss habits, goals, and coffee.", ko: "습관, 목표, 커피에 대해 이야기해요.", keywords: [ { word: "habit", meaningKo: "습관" }, { word: "goal", meaningKo: "목표" } ] },
    { id: "s5", en: "The camera nods dramatically.", ko: "카메라가 극적으로 끄덕여요.", keywords: [ { word: "dramatically", meaningKo: "극적으로" } ] },
    { id: "s6", en: "I answer like I'm awake.", ko: "저는 깨어 있는 척 대답해요.", keywords: [ { word: "awake", meaningKo: "깨어 있는" } ] },
    { id: "s7", en: "The crowd claps at every sentence.", ko: "관객은 모든 문장마다 박수쳐요.", keywords: [ { word: "crowd", meaningKo: "관객" }, { word: "clap", meaningKo: "박수치다" } ] },
    { id: "s8", en: "We end with a weather joke.", ko: "날씨 농담으로 마무리해요.", keywords: [ { word: "weather", meaningKo: "날씨" }, { word: "joke", meaningKo: "농담" } ] },
  ],
};

