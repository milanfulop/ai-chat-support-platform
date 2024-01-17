/*
    Often referred to as: API, Bot, ChatBot, or Chat.
*/

import mongoose, { Schema } from 'mongoose';

interface BotData extends mongoose.Document {
    botKey: string
    userId: string
    botName: string
    allowedSites: [string]
    context: [{
        pageContent: string;
        metadata: {
            loc: object;
        };
    }];
}

const botSchema = new Schema<BotData>({
    botKey: String,
    userId: String,
    botName: {
        type: String,
        default: "Bot"
    },
    allowedSites: [String],
    context: [{
        pageContent: String,
        metadata: {
            loc: Object,
        },
    }],
});

export { botSchema, BotData };