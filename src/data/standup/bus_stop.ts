import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const busStop: Script = {
  id: "standup-bus-stop",
  title: "The Bus Stop Joke",
  categorySlug: "standup",
  categoryName: CATEGORY_NAMES["standup"],
  cleanedEnglish:
    "Waiting at a bus stop, I saw a bus with a sign: 'Only for dogs.' Finally, public transport explaining all the barking.",
  sentences: [
    { id: "s1", en: "I was waiting at the bus stop.", ko: "나는 버스 정류장에서 기다리고 있었어요.", keywords: [ { word: "bus stop", meaningKo: "버스 정류장" }, { word: "waiting", meaningKo: "기다리는 중" } ] },
    { id: "s2", en: "A bus slowly pulled up and then kept going.", ko: "버스가 천천히 다가오더니 그냥 지나갔어요.", keywords: [ { word: "pulled up", meaningKo: "다가오다" }, { word: "kept going", meaningKo: "계속 가다" } ] },
    { id: "s3", en: "On the side, it said: 'Only for dogs'.", ko: "옆면에 ‘개들만 탑승’이라고 쓰여 있었어요.", keywords: [ { word: "side", meaningKo: "옆면" }, { word: "only", meaningKo: "오직" } ] },
    { id: "s4", en: "I thought, finally, they explained the barking.", ko: "마침내 왜 짖는지 설명해줬구나 하고 생각했죠.", keywords: [ { word: "finally", meaningKo: "마침내" }, { word: "barking", meaningKo: "짖는 소리" } ] },
    { id: "s5", en: "A woman next to me nodded like it made sense.", ko: "옆에 있던 여자는 그게 말이 되는 듯 고개를 끄덕였어요.", keywords: [ { word: "nodded", meaningKo: "고개를 끄덕였다" }, { word: "made sense", meaningKo: "말이 되다" } ] },
    { id: "s6", en: "I barked once just to be polite.", ko: "예의상 한 번 짖었어요.", keywords: [ { word: "polite", meaningKo: "예의 바른" } ] },
    { id: "s7", en: "She said, 'Your pronunciation is impressive.'", ko: "그녀가 말했어요. '발음이 인상적이네요.'", keywords: [ { word: "pronunciation", meaningKo: "발음" }, { word: "impressive", meaningKo: "인상적인" } ] },
    { id: "s8", en: "Now I wait for the cat line.", ko: "이제 저는 고양이 전용 노선을 기다려요.", keywords: [ { word: "line", meaningKo: "노선" }, { word: "wait", meaningKo: "기다리다" } ] },
  ],
};

