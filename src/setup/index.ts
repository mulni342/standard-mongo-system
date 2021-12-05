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
                language: process.env.LANGUAGE || 'EN',
                name: Guild.name,
                ownerId: Guild.ownerId,
                prefix: process.env.PREFIX || 'p!',
            }).save();

            if (client.debugLogs) {
                console.log(`!NEW! Guild saved in database!`);
            }
        }
    });
}
