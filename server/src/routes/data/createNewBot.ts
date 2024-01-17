import { Request, Response } from 'express';
import crypto from "crypto";
import { Bot, User } from "../../configs/db.config";
import { BotData } from '../../models/Bot';

const createNewBot = (req: Request, res: Response) => {
    if (req.user && 'id' in req.user) {
        const botKey = crypto.randomBytes(32).toString("hex");
        const userId = req.user.id as string;

        const newBot: Partial<BotData> = {
            botKey: botKey,
            userId: userId,
        };

        new Bot(newBot).save().then(() => {
            User.findOneAndUpdate(
                { _id: userId },
                { $push: { bots: botKey } },
                { new: true }
            ).then((updatedUser) => {
                //console.log("BOT key created and linked to user ID:", userId);
                res.json({ bothKey: botKey, user: updatedUser });
            }).catch((error) => {
                //console.error("Error updating user with BOT key:", error);
                res.status(500).json({ error: "Internal Server Error" });
            });
        }).catch((error) => {
            //console.error("Error creating BOT key:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
        res.status(400).json({ error: "User ID not available in the request" });
    }
};

export default createNewBot;
