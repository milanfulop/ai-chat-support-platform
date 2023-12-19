import mongoose, { Schema } from 'mongoose';

interface IAPI extends mongoose.Document {
    apiKey: string
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

const apiSchema = new Schema<IAPI>({
    apiKey: String,
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

export { apiSchema, IAPI };