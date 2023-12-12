import mongoose, { Schema } from 'mongoose';

interface IAPI extends mongoose.Document {
    apiKey: String
    userId: String
    allowedSites: [String]
}

const apiSchema = new Schema<IAPI>({
    apiKey: String,
    userId: String,
    allowedSites: [String]
});

export { apiSchema, IAPI };