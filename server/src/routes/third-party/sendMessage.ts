import { Request, Response } from "express";
import { API } from "../../configs/db.config";
import { IAPI } from "../../models/Api";

import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";

const sendMessage = async (req: Request, res: Response) => {
    const botId = req.query.botId;

    const document: IAPI = (await API.find({ apiKey: botId }))[0];

    const embeddings = new OpenAIEmbeddings();
    //const vectorstore = await FaissStore.fromDocuments(document, embeddings);
    //console.log(vectorstore)

    res.json({ message: "xd" });
}
export default sendMessage;