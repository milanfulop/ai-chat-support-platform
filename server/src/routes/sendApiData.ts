import { Request, Response } from 'express';
import { API } from '../configs/db.config';

const sendApiData = async (req: Request, res: Response) => {
    const { apiKey } = req.body;
    try {
        const apiRecord = await API.findOne({ apiKey });

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