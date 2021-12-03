/* eslint-disable @typescript-eslint/no-explicit-any */
// import { BaseSystem } from '../../types/types';

import * as discord from 'discord.js';
import { checkConfigDocument } from './setup';
import { Client } from 'botasm';
import mongoose from 'mongoose';

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

    onMessage(message: discord.Message) {
        const prefix = process.env.PREFIX || 'ab!';

        if (!message.content.startsWith(prefix)) return;

        const command = message.content.split(' ')[0].slice(prefix.length);
        const margs = message.content.split(' ').splice(1);

        this.client.runCommand(command, message, margs);
    }

    commandArguments() {
        return [];
    }
}
