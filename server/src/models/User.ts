import mongoose, { Schema } from 'mongoose';

interface IUser extends mongoose.Document {
    email: string;
    password: string;
    apis: {
        type: [String],
        default: [],
    },
}

const userSchema = new Schema<IUser>({
    email: String,
    password: String,
    apis: {
        type: [String],
        default: [],
    },
});

export { userSchema, IUser };