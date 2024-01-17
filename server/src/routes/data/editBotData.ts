import { Request, Response } from "express";
import { Bot } from "../../configs/db.config";

const editBotData = async (req: Request, res: Response) => {
    const { query, newData, botKey } = req.body;

    const updateObject: Record<string, any> = {};
    updateObject[query] = newData;

    await Bot.findOneAndUpdate({ botKey: botKey }, updateObject, { new: true })
}

export default editBotData;