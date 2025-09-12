import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const autocorrect: Script = {
  id: "standup-autocorrect",
  title: "Autocorrect Support Group",
  categorySlug: "standup",
  categoryName: CATEGORY_NAMES["standup"],
  cleanedEnglish:
    "My phone's autocorrect is so confident it should lead a support group, apologizing for turning 'I'm fine' into 'I'm fired.'",
  sentences: [
    { id: "s1", en: "My phone autocorrect is too confident.", ko: "내 휴대폰 자동 수정은 너무 자신감이 넘쳐요.", keywords: [ { word: "autocorrect", meaningKo: "자동 수정" }, { word: "confident", meaningKo: "자신감 있는" } ] },
    { id: "s2", en: "It changes 'I'm fine' to 'I'm fired'.", ko: "'나 괜찮아'를 '나 해고됐어'로 바꿔 버려요.", keywords: [ { word: "change", meaningKo: "바꾸다" }, { word: "fired", meaningKo: "해고된" } ] },
    { id: "s3", en: "Autocorrect thinks it's my life coach.", ko: "자동 수정이 제 인생 코치인 줄 알아요.", keywords: [ { word: "life coach", meaningKo: "인생 코치" } ] },
    { id: "s4", en: "It says, 'You're bold now.'", ko: "'너 이제 대담하네'라고 하죠.", keywords: [ { word: "bold", meaningKo: "대담한" } ] },
    { id: "s5", en: "I started an autocorrect support group.", ko: "저는 자동 수정 지원 모임을 시작했어요.", keywords: [ { word: "support group", meaningKo: "지원 모임" } ] },
    { id: "s6", en: "We read our worst messages out loud.", ko: "우리는 최악의 메시지를 큰 소리로 읽어요.", keywords: [ { word: "out loud", meaningKo: "큰 소리로" } ] },
    { id: "s7", en: "Everyone says, 'Me too'.", ko: "모두가 '나도 그래'라고 말해요.", keywords: [ { word: "me too", meaningKo: "나도 그래" } ] },
    { id: "s8", en: "Then autocorrect changes 'support' to 'sport'.", ko: "그러고는 자동 수정이 '지원'을 '스포츠'로 바꿔요.", keywords: [ { word: "support", meaningKo: "지원" }, { word: "sport", meaningKo: "스포츠" } ] },
    { id: "s9", en: "So we stretch before we text.", ko: "그래서 문자 보내기 전에 스트레칭해요.", keywords: [ { word: "stretch", meaningKo: "스트레칭하다" }, { word: "text", meaningKo: "문자 보내다" } ] },
  ],
};

