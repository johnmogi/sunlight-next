export type ActLevel = 1 | 2 | 3;

interface StoryBeat {
    act: ActLevel;
    type: 'INTRO' | 'COMBAT' | 'FOG' | 'GARDEN' | 'VICTORY' | 'DEFEAT';
    text: string[];
}

const STORY_DATABASE: StoryBeat[] = [
    // ACT 1: THE AWAKENING
    {
        act: 1, type: 'INTRO',
        text: [
            "The lantern flickers. You are standing at the edge of a vast, overgrown garden.",
            "The air smells of rain and old memories.",
            "Lily whispers: 'Don't be afraid. The dark is just soil waiting for a seed.'"
        ]
    },
    {
        act: 1, type: 'COMBAT',
        text: [
            "A shadow detaches itself from the wall. It looks like... regret?",
            "The Moonlight condenses into a form. It blocks your path.",
            "A question hangs in the air, heavy and unspoken."
        ]
    },
    {
        act: 1, type: 'FOG',
        text: [
            "A sudden mist rises from the ground. You lose sight of your hands.",
            "The path twists unexpectedly. You stumble.",
            "Your thoughts drift to mistakes you haven't made yet."
        ]
    },
    {
        act: 1, type: 'GARDEN',
        text: [
            "A patch of sunlight breaks through the canopy.",
            "You find a quiet bench. A moment of silence.",
            "The thorns here are soft, like velvet."
        ]
    },
    // ACT 2: THE DEEPENING (Expansion placeholder)
    {
        act: 2, type: 'COMBAT',
        text: ["The shadows are denser here. They have faces you recognize."]
    }
];

export function generateStoryBeat(act: ActLevel, type: string, archetype: string): string {
    // Filter beats by Act and Type
    const candidates = STORY_DATABASE.filter(b => b.act === act && b.type === type);

    if (candidates.length === 0) return `[System] You encounter a ${type} event.`;

    // Pick random text variant
    const beat = candidates[0];
    const text = beat.text[Math.floor(Math.random() * beat.text.length)];

    // Inject Archetype Flavor
    if (archetype === 'The Weaver' && type === 'COMBAT') {
        return `(Fire) ${text}`;
    }

    return text;
}
