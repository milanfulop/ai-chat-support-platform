import { Request, Response } from "express";
import { API } from "../configs/db.config";

import { Document } from "langchain/document";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";

const editContextData = async (req: Request, res: Response) => {
    const { newData, apiKey } = req.body;

    const docs = new Document({ pageContent: newData });

    const splitter = new CharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 50,
    });

    const documents = await splitter.splitDocuments([docs]);
    const embeddings = new OpenAIEmbeddings();

    const vectorstore = await FaissStore.fromDocuments(documents, embeddings);
    console.log(vectorstore)
    const data = await API.findOneAndUpdate({ apiKey: apiKey }, { context: documents }, { new: true })
    console.log(data);
}

export default editContextData;