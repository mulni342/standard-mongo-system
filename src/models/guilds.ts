import mongoose from 'mongoose';

// This stores basic level of information for the GUILD
export interface GuildINT {
    id: string;
    name: string;
    ownerId: string;
    language: string;
    prefix: string;
}

export const GuildSchema = new mongoose.Schema<GuildINT>({
    id: String,
    language: String,
    name: String,
    ownerId: String,
    prefix: String,
});

export const Guilds = mongoose.model('guilds', GuildSchema);
