"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guilds = exports.GuildSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.GuildSchema = new mongoose_1.default.Schema({
    id: String,
    language: String,
    name: String,
    ownerId: String,
    prefix: String,
});
exports.Guilds = mongoose_1.default.model('guilds', exports.GuildSchema);
