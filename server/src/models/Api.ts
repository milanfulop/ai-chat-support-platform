import mongoose, { Schema } from 'mongoose';

interface IAPI extends mongoose.Document {
    apiKey: String
    userId: String
    allowedSites: [String]
    context: {
        pageContent: string;
        metadata: {
            loc: object;
        };
    };
}

const apiSchema = new Schema<IAPI>({
    apiKey: String,
    userId: String,
    allowedSites: [String],
    context: {
        pageContent: String,
        metadata: {
            loc: Object,
        },
    },
});

export { apiSchema, IAPI };