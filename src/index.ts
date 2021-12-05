/* eslint-disable @typescript-eslint/no-explicit-any */
// import { BaseSystem } from '../../types/types';

import * as discord from 'discord.js';
import { checkConfigDocument } from './setup';
import { Client } from 'botasm';
import mongoose from 'mongoose';
import { Guilds } from './models/guilds';

export class System {
    client: Client;

    constructor(client: Client) {
        if (client.debugLogs) console.log('system install created!');
        this.client = client;
    }

    init() {
        if (this.client.debugLogs) console.log('system was initialized!');

        if (!process.env.URI)
            throw Error('Database URI not define in enviroment variables');

        mongoose.connect(process.env.URI, () => {
            if (this.client.debugLogs) {
                console.log('Database connected!');
            }
        });
    }

    onReady() {
        console.log('Bot Is online!');
        checkConfigDocument(this.client);
    }

    loginToken(): string | undefined {
        return process.env.TOKEN;
    }

    async getPrefix(Guild: discord.Guild | null): Promise<string> {
        if (!Guild) return process.env.PREFIX || 'p!';
        let prefix;

        const guild = await Guilds.findOne({
            id: Guild.id,
        });

        if (guild?.prefix) {
            prefix = guild?.prefix;
        } else {
            prefix = process.env.PREFIX || 'p!';
        }

        return prefix;
    }

    async getLanguage(Guild: discord.Guild | null): Promise<string> {
        if (!Guild) return process.env.LANGUAGE || 'EN';
        let language;

        const guild = await Guilds.findOne({
            id: Guild.id,
        });

        if (guild?.language) {
            language = guild?.language;
        } else {
            language = process.env.LANGUAGE || 'EN';
        }

        return language;
    }

    async onMessage(message: discord.Message) {
        const prefix = await this.getPrefix(message.guild);

        if (!message.content.startsWith(prefix)) return;

        const command = message.content.split(' ')[0].slice(prefix.length);
        const margs = message.content.split(' ').splice(1);

        this.client.runCommand(command, message, margs);
    }

    async commandArguments(message: discord.Message) {
        return {
            language: await this.getLanguage(message.guild),
            prefix: await this.getPrefix(message.guild),
        };
    }
}
