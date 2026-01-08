#!/bin/bash

# Specific Office Banter
sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/asking_favors.png",
' src/data/office_banter/asking_favors.ts

sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/delivering_bad_news.png",
' src/data/office_banter/delivering_bad_news.ts

sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/networking_coffee.png",
' src/data/office_banter/networking_coffee.ts

sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/salary_negotiation.png",
' src/data/office_banter/salary_negotiation.ts

# Small Talk
grep -L "imageUrl" src/data/small_talk/*.ts | xargs -I {} sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/small_talk_generic.png",
' {}

# Sarcasm Detector
grep -L "imageUrl" src/data/the_sarcasm_detector/*.ts | xargs -I {} sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/sarcasm_generic.png",
' {}

# Polite Fight
grep -L "imageUrl" src/data/the_polite_fight/*.ts | xargs -I {} sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/polite_generic.png",
' {}

# Dating
grep -L "imageUrl" src/data/dating_and_disasters/*.ts | xargs -I {} sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/dating_generic.png",
' {}

# Texting (ensure we target decoderItems or sentences depending on file, but mainly decoderItems now)
# Note: Texting files might use 'sentences' OR 'decoderItems' depending on refactor status.
# passive_aggressive uses decoderItems. propert_chat? Let's check.
# Most texting files use sentences unless refactored.
# I'll try inserting before 'sentences' OR 'decoderItems'.
grep -L "imageUrl" src/data/texting_decoder/*.ts | xargs -I {} sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/texting_generic.png",
' {}
grep -L "imageUrl" src/data/texting_decoder/*.ts | xargs -I {} sed -i '' '/decoderItems:/i\
  imageUrl: "/images/scenarios/texting_generic.png",
' {}

# Remaining Office Banter
grep -L "imageUrl" src/data/office_banter/*.ts | xargs -I {} sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/networking_coffee.png",
' {}

# Remaining Party Survival (if any missed)
grep -L "imageUrl" src/data/the_party_survival_kit/*.ts | xargs -I {} sed -i '' '/sentences:/i\
  imageUrl: "/images/scenarios/bus_stop.png",
' {}
