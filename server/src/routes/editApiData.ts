import { Request, Response } from "express";
import { API } from "../configs/db.config";

const editApiData = async (req: Request, res: Response) => {
    const { query, newData, apiKey } = req.body;

    const updateObject: Record<string, any> = {};
    updateObject[query] = newData;

    await API.findOneAndUpdate({ apiKey: apiKey }, updateObject, { new: true })
}

export default editApiData;