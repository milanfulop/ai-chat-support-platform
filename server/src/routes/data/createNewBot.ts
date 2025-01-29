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

        new Bot(newBot).save()
            .then((savedBot) => {
                return User.findOneAndUpdate(
                    { _id: userId },
                    { 
                        $push: { 
                            bots: { 
                                botName: "Bot",
                                botKey: botKey, 
                                _id: savedBot._id
                            } 
                        } 
                    },
                    { new: true }
                );
            })
            .then((updatedUser) => {
                res.json({ 
                    botKey: botKey,
                    user: updatedUser 
                });
            })
            .catch((error) => {
                console.error("Error in bot creation process:", error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    } else {
        res.status(400).json({ error: "User ID not available in the request" });
    }
};

export default createNewBot;