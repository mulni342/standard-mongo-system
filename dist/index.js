"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { BaseSystem } from '../../types/types';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
var setup_1 = require("./setup");
var mongoose_1 = __importDefault(require("mongoose"));
var System = /** @class */ (function () {
    function System(client) {
        if (client.debugLogs)
            console.log('system install created!');
        this.client = client;
    }
    System.prototype.init = function () {
        var _this = this;
        if (this.client.debugLogs)
            console.log('system was initialized!');
        if (!process.env.URI)
            throw Error('Database URI not define in enviroment variables');
        mongoose_1.default.connect(process.env.URI, function () {
            if (_this.client.debugLogs) {
                console.log('Database connected!');
            }
        });
    };
    System.prototype.onReady = function () {
        console.log('Bot Is online!');
        (0, setup_1.checkConfigDocument)(this.client);
    };
    System.prototype.loginToken = function () {
        return process.env.TOKEN;
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
