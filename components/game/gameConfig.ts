export const GAME_CONFIG = {
    dice: {
        fate: 10,       // D10 for Map Events
        action: 6       // D6 for Combat/Debate
    },

    // The Logic Table
    eventThresholds: {
        combat: [1, 4],   // "Moonlight Form" (Raw Element)
        trap: [5, 7],     // "Mental Fog" (Confusion)
        treasure: [8, 10] // "The Garden" (Integration)
    },

    text: {
        events: {
            combat: "MOONLIGHT FORM",
            trap: "MENTAL FOG",
            treasure: "THE GARDEN"
        }
    }
};
