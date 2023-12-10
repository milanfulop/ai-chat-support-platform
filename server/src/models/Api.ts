import mongoose, { Schema } from 'mongoose';

interface IAPI extends mongoose.Document {
    apiKey: String
    userId: String
}

const apiSchema = new Schema<IAPI>({
    apiKey: String,
    userId: String
});

export { apiSchema, IAPI };