import { Client } from 'botasm';
import { Guilds } from '../models/guilds';

export function checkConfigDocument(client: Client) {
    client.guilds.cache.forEach(async (Guild) => {
        const guild = await Guilds.findOne({
            id: Guild.id,
        });

        if (!guild) {
            new Guilds({
                id: Guild.id,
                language: 'EN',
                name: Guild.name,
                ownerId: Guild.ownerId,
                prefix: 'p!',
            }).save();

            if (client.debugLogs) {
                console.log(`!NEW! Guild saved in database!`);
            }
        }
    });
}
