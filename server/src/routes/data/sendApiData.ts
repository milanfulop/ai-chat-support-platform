import { Request, Response } from 'express';
import { Bot } from '../../configs/db.config';

const sendApiData = async (req: Request, res: Response) => {
    const { apiKey } = req.body;
    try {
        const apiRecord = await Bot.findOne({ apiKey });

        if (apiRecord) {
            res.json(apiRecord);
        } else {
            console.log('API key not found');
        }
    } catch (error) {
        console.error('Error finding user by API key:', error);
    }
}

export default sendApiData