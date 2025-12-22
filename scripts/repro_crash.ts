
import { TAROT_CARDS } from '../lib/card-sets/set-update129';
import { generateEntity } from '../lib/game/generators/entityGenerator';

console.log('Starting crash reproduction test...');

try {
    console.log(`Found ${TAROT_CARDS.length} cards.`);

    let checked = 0;
    for (const card of TAROT_CARDS) {
        // console.log(`Testing card: ${card.id} (${card.name})`);
        try {
            const entity = generateEntity(card.id, 'ENEMY', 1);
            // Access properties to ensure lazy getters don't crash later
            if (!entity) throw new Error('Entity is null');
            // console.log(`  > Success: Strength ${entity.maxResistance}`);
        } catch (innerErr) {
            console.error(`  > CRASH on card ${card.id}:`, innerErr);
            process.exit(1);
        }
        checked++;
    }

    console.log(`Successfully checked ${checked} cards. No crashes found in generateEntity.`);

} catch (err) {
    console.error('Fatal crash:', err);
    process.exit(1);
}
