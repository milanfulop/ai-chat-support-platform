import { Request, Response } from "express";
import { Bot } from "../../configs/db.config";

import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";

const editContextData = async (req: Request, res: Response) => {
    const { newData, apiKey } = req.body;

    const docs = new Document({ pageContent: newData });

    const splitter = new CharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 50,
    });

    const documents = await splitter.splitDocuments([docs]);
    await Bot.findOneAndUpdate({ apiKey: apiKey }, { context: documents })
}

export default editContextData;