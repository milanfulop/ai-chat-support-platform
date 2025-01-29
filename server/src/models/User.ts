import mongoose, { Schema } from 'mongoose';

interface IBot {
    botName: string;
    botKey: string;
}

interface IUser extends mongoose.Document {
    email: string;
    password: string;
    bots: IBot[];
}

const userSchema = new Schema<IUser>({
    email: String,
    password: String,
    bots: {
        type: [{ botName: String, botKey: String }],
        default: [],
    },
});

export { userSchema, IUser };
