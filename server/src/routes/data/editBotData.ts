import { Request, Response } from "express";
import { Bot, User } from "../../configs/db.config";

const editBotData = async (req: Request, res: Response) => {
    const { query, newData, botKey } = req.body;
    const updateObject: Record<string, any> = {};
    updateObject[query] = newData;
    if (query === "botName") {
        await User.findOneAndUpdate(
            { "bots.botKey": botKey },
            { "$set": { "bots.$.botName": newData } },
            { new: true }
        );
    }

    await Bot.findOneAndUpdate({ botKey: botKey }, updateObject, { new: true })
}

export default editBotData;