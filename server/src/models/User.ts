import mongoose, { Schema } from 'mongoose';

interface IUser extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: String,
    password: String
});

export { userSchema, IUser };