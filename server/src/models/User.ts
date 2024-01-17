import mongoose, { Schema } from 'mongoose';

interface IUser extends mongoose.Document {
    email: string;
    password: string;
    bots: {
        type: [String],
        default: [],
    },
}

const userSchema = new Schema<IUser>({
    email: String,
    password: String,
    bots: {
        type: [String],
        default: [],
    },
});

export { userSchema, IUser };