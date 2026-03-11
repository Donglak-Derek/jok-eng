export const mockMissionData = [
    {
        "day": 1,
        "phase": 1,
        "module": "The Arrival",
        "title": "The Grumpy Customs Officer",
        "strategic_brief": "In US Customs, speed and clarity win. Officers aren't looking for politeness; they are looking for inconsistencies. Keep answers to short nouns.",
        "character": "Officer Miller",
        "imageUrl": "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1000",
        "scenario_text": "You've just landed. The officer stares at your passport and asks: 'What is the purpose of your visit?'",
        "cloze_setup": "Before you respond, remember your objective. Let's form your strategy:",
        "cloze_dialogue": "I am here for [______]. I will be staying for [______].",
        "keywords": ["Business", "Two weeks", "Vacation", "Ten days"],
        "options": [
            {
                "id": "A",
                "text": "I am here because my company sent me to learn things for two weeks.",
                "vibe_score": 45,
                "impact_label": "Too Chatty",
                "feedback": "Too wordy. Sounds nervous. Shorten it."
            },
            {
                "id": "B",
                "text": "Business. Two weeks.",
                "vibe_score": 95,
                "impact_label": "Professional",
                "feedback": "Perfect. Professional, direct, and saves the officer time."
            },
            {
                "id": "C",
                "text": "I want to see the Statue of Liberty and also do some work.",
                "vibe_score": 20,
                "impact_label": "Suspicious",
                "feedback": "Confusing. Are you a tourist or a worker? This triggers more questions."
            }
        ],
        "x_ray": "When an officer asks a question, they aren't starting a conversation. They are checking a box. Give them the box."
    },
    {
        "day": 2,
        "phase": 1,
        "module": "The Arrival",
        "title": "The Uber Greeting",
        "strategic_brief": "American rideshare culture is a 'Low-Stakes Social Contract.' A friendly greeting is required, but deep conversation is optional.",
        "character": "Driver Dave",
        "imageUrl": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000",
        "scenario_text": "You open the car door. Dave says: 'Hey there, how's your morning going?'",
        "cloze_setup": "Acknowledge the driver politely, but keep the boundary intact. Fill in the blanks:",
        "cloze_dialogue": "Doing [______], thanks! [______] is it to the hotel?",
        "keywords": ["well", "How far", "good", "How long"],
        "options": [
            {
                "id": "A",
                "text": "I am very tired from my flight. Is the hotel far?",
                "vibe_score": 40,
                "impact_label": "Complaining",
                "feedback": "A bit heavy for a first sentence. Keep the 'vibe' light."
            },
            {
                "id": "B",
                "text": "Good, thanks! How's your shift going?",
                "vibe_score": 90,
                "impact_label": "Chilled Local",
                "feedback": "Great. You acknowledged him as a person. Now you can be silent."
            },
            {
                "id": "C",
                "text": "(Silence) Just go to the address in the app.",
                "vibe_score": 10,
                "impact_label": "Rude",
                "feedback": "Very rude in US culture. This gets you a 1-star passenger rating."
            }
        ],
        "x_ray": "The 'How are you' in a car is a 'Vibe Check.' If you answer briefly and politely, you have permission to sit in silence for the rest of the ride."
    }
];
