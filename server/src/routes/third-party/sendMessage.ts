import { Request, Response } from "express";
import { API } from "../../configs/db.config";
import { IAPI } from "../../models/Api";

import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";

import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";

const sendMessage = async (req: Request, res: Response) => {

    const prompt = req.body.chatHistory[req.body.chatHistory.length - 1];
    const botId = req.query.botId;

    const document: IAPI | null = await API.findOne({ apiKey: botId });

    type Document<T> = {
        pageContent: T;
        metadata: {
            loc: object;
        };
    };

    const contextArray: Document<string>[] = (document?.context || []).map(item => ({
        pageContent: item.pageContent,
        metadata: {
            loc: item.metadata.loc,
        },
    }));


    const embeddings = new OpenAIEmbeddings();
    const vectorStore = await FaissStore.fromDocuments(contextArray, embeddings);

    const model = new OpenAI({ temperature: 0 });
    const chain = new RetrievalQAChain({
        combineDocumentsChain: loadQAStuffChain(model),
        retriever: vectorStore.asRetriever(),
        returnSourceDocuments: true,
    });

    const response = await chain.call({
        query: prompt,
    });

    res.json({ message: response.text });
}

export default sendMessage;
