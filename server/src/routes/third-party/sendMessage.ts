import { Request, Response } from "express";
const sendMessage = (req: Request, res: Response) => {
    console.log(req.body.chatHistory)
}
export default sendMessage;