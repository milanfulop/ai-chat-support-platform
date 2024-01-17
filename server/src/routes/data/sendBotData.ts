import { Request, Response } from 'express';
import { Bot } from '../../configs/db.config';

const sendBotData = async (req: Request, res: Response) => {
    const { botKey } = req.body;
    try {
        const botRecord = await Bot.findOne({ botKey: botKey });

        if (botRecord) {
            res.json(botRecord);
        } else {
            console.log('Bot key not found');
        }
    } catch (error) {
        console.error('Error finding user by Bot key:', error);
    }
}

export default sendBotData