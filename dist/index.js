"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { BaseSystem } from '../../types/types';
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
var System = /** @class */ (function () {
    function System(client) {
        if (client.debugLogs)
            console.log('system install created!');
        this.client = client;
    }
    System.prototype.init = function () {
        if (this.client.debugLogs)
            console.log('system was initialized!');
    };
    System.prototype.onReady = function () {
        console.log('Bot Is online!');
    };
    System.prototype.loginToken = function () {
        return 'OTA1OTI5NTM3MzI0NDQ5Nzky.YYROoQ.oG4Nj-BXxdJKexL2J-tP3hXzJFU';
    };
    System.prototype.onMessage = function (message) {
        var prefix = process.env.PREFIX || 'ab!';
        if (!message.content.startsWith(prefix))
            return;
        var command = message.content.split(' ')[0].slice(prefix.length);
        var margs = message.content.split(' ').splice(1);
        this.client.runCommand(command, message, margs);
    };
    System.prototype.commandArguments = function () {
        return [];
    };
    return System;
}());
exports.System = System;
