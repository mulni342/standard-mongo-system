/* eslint-disable @typescript-eslint/no-explicit-any */
// import { BaseSystem } from '../../types/types';

import * as discord from 'discord.js';

export class System {
    client: any;

    constructor(client: any) {
        if (client.debugLogs) console.log('system install created!');
        this.client = client;
    }

    init() {
        if (this.client.debugLogs) console.log('system was initialized!');
    }

    onReady() {
        console.log('Bot Is online!');
    }

    loginToken(): string {
        return '';
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
