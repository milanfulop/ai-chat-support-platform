import { Request, Response } from "express";
import { Bot } from "../../configs/db.config";

const editApiData = async (req: Request, res: Response) => {
    const { query, newData, apiKey } = req.body;

    const updateObject: Record<string, any> = {};
    updateObject[query] = newData;

    await Bot.findOneAndUpdate({ botKey: apiKey }, updateObject, { new: true })
}

export default editApiData;