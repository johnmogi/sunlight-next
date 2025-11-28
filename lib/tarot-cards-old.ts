// Tarot Card Data - from original SunLight project
export const TAROT_CARDS = [
  // MAJOR ARCANA
  {
    id: "0",
    name: "The Sun",
    image: "eather/0_-_The_Sun_Four_Angels_orbiting_the_Feminine_Sun_Radiant_liv_c77b17b0-ad3f-4853-8838-d343172df373_1.jpg",
    meaning: "Pure, undifferentiated consciousness - the 'I Am' awareness before it fractures into multiplicity. The Zero Point and eternal source of all consciousness. The destination and the source, not the start of a linear journey.",
    visualDesc: "Four cherubic angels orbit a radiant feminine sun, each holding the seed of their element - revealing the four suits as distinct flavors of the same original light.",
    type: "major" as const,
    number: 0
  },
  {
    id: "1",
    name: "The Night Awakener (Lili)",
    image: "eather/One_The_Night_Awakener_Tarot_card_poster_composition_with_gol_803aa192-d0ee-4dba-b5a0-4077ee696de0_0.jpg",
    meaning: "Lucidity - the first spark of 'I am dreaming.' Lili's moment of awakening, with one eye open and one eye closed. Internal awakening where the self judges its own state of consciousness.",
    visualDesc: "Young woman half-awake in dream landscape, one eye closed in sleep, one eye open with full awareness, diary in hand to record her lucid dreams.",
    type: "major" as const,
    number: 1
  },
  {
    id: "2",
    name: "The Night Dreamer",
    image: "eather/2._Sepia_notebook_paper_aquarelle_moon_reflection_in_birdbath_0b054896-2cd3-48bf-b0ca-3f3a585a8f29_0.jpg",
    meaning: "Unconscious creation - the sleeping figure making worlds without awareness. Dreams and realities pour forth from the mind in deep sleep, unaware of its creative power.",
    visualDesc: "Sleeping figure whose hands gesture in unconscious creation, dreams flowing from their head like smoke, creating entire worlds in slumber.",
    type: "major" as const,
    number: 2
  },
  {
    id: "3",
    name: "The Day Dreamer",
    image: "eather/Three_The_Day_Dreamer_Tarot_card_poster_composition_with_gold_4ad4dff0-ef65-4231-9ace-acbf9f9c564a_0.jpg",
    meaning: "Waking sleep - the mind lost in its narrative, walking obliviously toward danger. The ego's walk toward self-destruction while lost in thought. The Fool recontextualized as oblivion.",
    visualDesc: "Young figure wandering through beautiful garden with glazed expression, completely lost in mental narrative, unaware of their surroundings.",
    type: "major" as const,
    number: 3
  },
  {
    id: "4",
    name: "The Rising Star – The Rebel Release",
    image: "eather/major_arcana_5_Material_Release_white_charcoal_man_kneels_cha_f513483f-75da-47e7-8683-d605949b1cb0_2.jpg",
    meaning: "The exact moment of cutting the self-imposed rope. Total individualism, butterfly metamorphosis, self-awareness in the here-and-now. Freedom is chosen, not granted.",
    visualDesc: "A lone young rebel hangs upside-down by one ankle in underwater-outerspace, but the knot is deliberately loose. With a calm smile they point to the untied rope. Colibri wings of pure coral-gold light burst from the shoulder blades.",
    type: "major" as const,
    number: 4
  },
  {
    id: "5",
    name: "The Lovers' Judgment – The Garden Reunion",
    image: "eather/fused_tarot_VI_The_Lovers-Judgment_armored_man__pristine_woma_6574116e-56f1-42e9-9dfe-4b23ff81b966_2.jpg",
    meaning: "Perfect mirror-symmetry in the living Garden of Eden. The reunion of duality into non-dual love, the acceptance that separation never happened. Eden is here when the heart chooses itself as the other.",
    visualDesc: "Two identical lovers float toward each other above blooming continents. They join hands at the exact golden-ratio center, forming a glowing heart of liquid sunrise that fuses the two halves of the world. Colibri wings overlap into a single halo.",
    type: "major" as const,
    number: 5
  },
  {
    id: "7",
    name: "The Tree of Life",
    image: "eather/httpss.mj.runduVdS_zEVrY_Five_The_Tree_of_Life_Tarot_card_pos_ef06c6a3-5f30-4552-8bdc-64af35eecdf4_3.jpg",
    meaning: "Eternal structure - death revealed as transformation through the living Kabbalistic Tree. The figure walks through the Tree of Life in ecstatic joy, realizing death is transition, not termination.",
    visualDesc: "The Kabbalistic Tree of Life with nine glowing sephiroth-fruit portals connected by pathways, wrapped by the black water-dragon kundalini. A living spherical bonsai paradise.",
    type: "major" as const,
    number: 7
  },
  {
    id: "8",
    name: "The Merkaba",
    image: "eather/Eight_The_Merkaba_-_Improving_the_Chariot_Visuals_Youre_right_231850f7-85dd-4ae5-a476-1a1e74c81379_3.jpg",
    meaning: "Vehicle of descent - the soul chariot and the choice between fear and surrender during incarnation. The sacred geometry that transports consciousness into physical form.",
    visualDesc: "Sacred Merkaba geometry with figure in meditation at center, suspended in the vehicle of light that carries the soul through the veil of incarnation.",
    type: "major" as const,
    number: 8
  },
  {
    id: "9",
    name: "Feminine Creation",
    image: "eather/Tarot_card_poster_composition_with_golden_ratio_and_cosmic_sc_b9cf62ad-578a-4a0d-a555-451b6918cf8a_0.jpg",
    meaning: "Pregnant void - the source of all creation before form. The great Mother-Tiamat/Shekhinah in the abyss-womb birthing the entire parallel dimension from the black ॐ pearl.",
    visualDesc: "The feminine creative force (Tiamat/Shekhinah) in cosmic waters, birthing reality from the primordial void before form emerged.",
    type: "major" as const,
    number: 9
  },
  // MINOR ARCANA - ROSES (Air/Mind)
  {
    id: "50",
    name: "Ace of Roses",
    image: "eather/air-brushed_on_night_sky_luminous_nine_wind_faces_transformin_21661ae7-aab0-4417-a61b-3b4acf6563ed_3.jpg",
    meaning: "The sword transformed into rose - mind learns discernment instead of cutting. Air/Mind element seeking unity through thought, discovering that the mind cannot think its way to oneness.",
    visualDesc: "Living roses replacing swords, floating in the cold desert air. The mental element transformed from weapon to wisdom.",
    suit: "roses" as const,
    type: "minor" as const,
    number: 1
  },
  {
    id: "51",
    name: "Two of Roses",
    image: "eather/2_of_Roses_-_Split_Personality_Circus_tilt-shifted_golden-rat_664646dd-627b-4e1a-8660-93575a166dd4_1.jpg",
    meaning: "Balance between opposing thoughts, meditation on duality, split personality",
    suit: "roses" as const,
    type: "minor" as const,
    number: 2
  },
  {
    id: "52",
    name: "Three of Roses",
    image: "eather/3_of_Roses_-_Healed_Heartbreak_tilt-shifted_golden-ratio_colo_aca6d51a-ebdb-491b-8da7-db6338787c35_3.jpg",
    meaning: "Healed heartbreak, mental clarity through emotional processing",
    suit: "roses" as const,
    type: "minor" as const,
    number: 3
  },
  {
    id: "53",
    name: "Four of Roses",
    image: "eather/4_of_Roses_-_Frozen_Garden_tilt-shifted_golden-ratio_coloring_6556a4de-eec1-4311-b573-725fdfa0eaa2_2.jpg",
    meaning: "Frozen garden, contemplative stillness, mental retreat",
    suit: "roses" as const,
    type: "minor" as const,
    number: 4
  },
  {
    id: "54",
    name: "Five of Roses",
    image: "eather/5_of_Roses_-_The_Wall_of_Ice_tilt-shifted_golden-ratio_colori_2d6129c4-bc33-4b24-ae57-7073b4c4c80f_0.jpg",
    meaning: "Wall of ice, mental barriers, isolation through overthinking",
    suit: "roses" as const,
    type: "minor" as const,
    number: 5
  },
  {
    id: "55",
    name: "Six of Roses",
    image: "eather/6_of_Roses_-_Father_of_Roses_old_King_tilt-shifted_golden-rat_6a70df34-f512-4a69-87c4-3ae7431ab1dd_1.jpg",
    meaning: "Father of roses, wise elder, intellectual mastery",
    suit: "roses" as const,
    type: "minor" as const,
    number: 6
  },
  {
    id: "56",
    name: "Seven of Roses",
    image: "eather/7_of_Roses_-_The_Mirage_Choice_tilt-shifted_golden-ratio_colo_54792aa2-af72-4af6-a342-71cce0e667b7_1.jpg",
    meaning: "Mirage choice, mental illusions, decisions clouded by confusion",
    suit: "roses" as const,
    type: "minor" as const,
    number: 7
  },
  // MINOR ARCANA - CARDS (Fire/Will)
  {
    id: "60",
    name: "Ace of Cards",
    image: "eather/2D_pixel_art_tarot_card_Ace_of_Ennagrams_wool_coin_rises_from_6a98eead-1efe-493c-96b2-808f8cfb5552_3.jpg",
    meaning: "The wand as obsidian mirror-tablet - Fire/Will element of self-reflection and gentle growth. Creative fire that requires focus and completion, not destruction.",
    visualDesc: "Obsidian mirror-tablet emerging from humid jungle, reflecting the inner fire. Willpower transformed into introspection.",
    suit: "cards" as const,
    type: "minor" as const,
    number: 1
  },
  {
    id: "61",
    name: "Two of Cards",
    image: "eather/2_of_Cards_-_Sacred_Alliance_Two_mirrored_figures_Amazonian_g_b8921a7d-a84a-460d-8f5a-9eafa22f0906_1.jpg",
    meaning: "Sacred alliance, balancing creative forces, mirrored reflections",
    suit: "cards" as const,
    type: "minor" as const,
    number: 2
  },
  {
    id: "62",
    name: "Three of Cards",
    image: "eather/3_of_Cards_-_Child_of_Cards_tilt-shifted_golden-ratio_colorin_91606b8e-bc10-4977-a115-c219ae1f7f47_1.jpg",
    meaning: "Child of cards, creative innocence, playful fire energy",
    suit: "cards" as const,
    type: "minor" as const,
    number: 3
  },
  {
    id: "63",
    name: "Four of Cards",
    image: "eather/4_of_Cards_-_Fortress_of_Mirrors_tilt-shifted_golden-ratio_co_b74c66e9-da80-41c0-a723-a6960bff49d6_0.jpg",
    meaning: "Fortress of mirrors, reflected willpower, defensive creativity",
    suit: "cards" as const,
    type: "minor" as const,
    number: 4
  },
  {
    id: "64",
    name: "Five of Cards",
    image: "eather/5_of_Cards_-_Shattered_Vision_tilt-shifted_golden-ratio_color_8cf37b0e-13f8-4fd1-b407-489aed21c773_0.jpg",
    meaning: "Shattered vision, broken ambitions, scattered creative energy",
    suit: "cards" as const,
    type: "minor" as const,
    number: 5
  },
  {
    id: "65",
    name: "Six of Cards",
    image: "eather/6_of_Cards_-_Father_of_Cards_old_King_tilt-shifted_golden-rat_0f007859-b870-45a6-ac09-b7b0ae2804e4_2.jpg",
    meaning: "Father of cards, masterful creator, sovereign willpower",
    suit: "cards" as const,
    type: "minor" as const,
    number: 6
  },
  {
    id: "66",
    name: "Seven of Cards",
    image: "eather/7_of_Cards_-_Illusions_of_Truth_tilt-shifted_golden-ratio_col_962ebfb2-48d7-4a45-abec-f3055af6effd_1.jpg",
    meaning: "Illusions of truth, false victories, deceptive achievements",
    suit: "cards" as const,
    type: "minor" as const,
    number: 7
  },
  // MINOR ARCANA - HEARTS (Water/Emotion)
  {
    id: "70",
    name: "Ace of Hearts",
    image: "eather/masterpiece_watercolor_and_light_oil_pastel_painting_on_300gs_3718e192-5b1f-4226-8f05-c4dcc2a51f11_1.jpg",
    meaning: "Pure emotional essence - Water/Emotion element as anatomical heart-crystal. Visceral, embodied emotion learning that true love is boundless overflow, not scarcity or need.",
    visualDesc: "Anatomical heart-crystal rising from northern seas, glowing with coral-pink light. Emotion transformed into crystallized wisdom.",
    suit: "hearts" as const,
    type: "minor" as const,
    number: 1
  },
  {
    id: "71",
    name: "Two of Hearts",
    image: "eather/2_of_Hearts_-_Eternal_Bond_Young_Roman-Viking_couple_standing_409007fe-39ef-4c1e-9bff-8af681d81c1c_3.jpg",
    meaning: "Eternal bond, partnership, union of hearts, emotional harmony",
    suit: "hearts" as const,
    type: "minor" as const,
    number: 2
  },
  {
    id: "72",
    name: "Three of Hearts",
    image: "eather/3_of_Hearts_-_Child_of_Hearts_tilt-shifted_golden-ratio_color_756b9f1d-3442-4bee-b222-1d491c89847e_0.jpg",
    meaning: "Child of hearts, emotional innocence, pure feelings",
    suit: "hearts" as const,
    type: "minor" as const,
    number: 3
  },
  {
    id: "73",
    name: "Four of Hearts",
    image: "eather/4_of_Hearts_-_Mourning_Feast_tilt-shifted_golden-ratio_colori_7d6a1be4-402a-44a7-9422-98dccb16f674_2.jpg",
    meaning: "Mourning feast, bittersweet emotions, honoring loss",
    suit: "hearts" as const,
    type: "minor" as const,
    number: 4
  },
  {
    id: "74",
    name: "Five of Hearts",
    image: "eather/5_of_Hearts_-_Grief_Released_tilt-shifted_golden-ratio_colori_7cececc8-59d0-441e-bbbf-2600a05ed020_0.jpg",
    meaning: "Grief released, emotional healing, letting go of sorrow",
    suit: "hearts" as const,
    type: "minor" as const,
    number: 5
  },
  {
    id: "75",
    name: "Six of Hearts",
    image: "eather/6_of_Hearts_-_Father_of_Hearts_Kind_bearded_Viking-Roman_elde_70a58712-db59-4d90-a10f-88060307fd01_3.jpg",
    meaning: "Father of hearts, compassionate elder, emotional wisdom",
    suit: "hearts" as const,
    type: "minor" as const,
    number: 6
  },
  // MINOR ARCANA - COINS (Earth/Material)
  {
    id: "80",
    name: "Ace of Coins",
    image: "eather/tarot_card_blueprint_graphite_pencil_drawing_of_cosmic_womb_s_2a123d86-018e-4aff-8cfa-c13aa3741897_3.jpg",
    meaning: "Material abundance blessed by spirit - Earth/Matter element as khobz-coin (bread-coin hybrid). Matter is sacred and generous, understanding the secret that matter itself is a reflection of the source. Wealth as shared abundance.",
    visualDesc: "Khobz-coin rising from fertile crescent soil, blessed by saffron-yellow light. Matter transformed into sacred sustenance.",
    suit: "coins" as const,
    type: "minor" as const,
    number: 1
  },
  {
    id: "81",
    name: "Two of Coins",
    image: "eather/2_of_Coins_-_Dance_of_Plenty_tilt-shifted_golden-ratio_colori_a167dfa0-deaf-4a9c-aed3-161b624b164a_0.jpg",
    meaning: "Dance of plenty, balance in material matters, juggling resources",
    suit: "coins" as const,
    type: "minor" as const,
    number: 2
  },
  {
    id: "82",
    name: "Three of Coins",
    image: "eather/3_of_Coins_-_Child_of_Coins_tilt-shifted_golden-ratio_colorin_113a042c-aeeb-440e-bdc3-7d37923a98aa_3.jpg",
    meaning: "Child of coins, material learning, building foundations",
    suit: "coins" as const,
    type: "minor" as const,
    number: 3
  },
  {
    id: "83",
    name: "Four of Coins",
    image: "eather/4_of_Coins_-_Fortress_of_Bread_tilt-shifted_golden-ratio_colo_576191b3-1918-4799-a37a-1676b11594e1_0.jpg",
    meaning: "Fortress of bread, material security, hoarding abundance",
    suit: "coins" as const,
    type: "minor" as const,
    number: 4
  },
  {
    id: "84",
    name: "Five of Coins",
    image: "eather/5_of_Coins_-_Hunger__Hope_tilt-shifted_golden-ratio_coloring-_20a8fcab-777b-4e6f-bab4-912f71867d22_1.jpg",
    meaning: "Hunger and hope, material struggle, poverty with possibility",
    suit: "coins" as const,
    type: "minor" as const,
    number: 5
  },
  {
    id: "85",
    name: "Six of Coins",
    image: "eather/6_of_Coins_-_Father_of_Coins_old_King_tilt-shifted_golden-rat_4fdf3703-c682-45fd-9d83-b1a6fabb9c33_1.jpg",
    meaning: "Father of coins, material mastery, earthly sovereignty",
    suit: "coins" as const,
    type: "minor" as const,
    number: 6
  },
]

export type TarotCard = typeof TAROT_CARDS[number]
