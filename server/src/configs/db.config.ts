import mongoose, { model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

import { userSchema, IUser } from '../models/User';
import { botSchema, BotData } from '../models/Bot';

mongoose.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/ai-chat-support');

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = model<IUser>("User", userSchema);
const Bot = model<BotData>("API", botSchema)

export { User, Bot }