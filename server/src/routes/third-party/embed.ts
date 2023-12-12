import { Request, Response } from 'express';
import { API } from '../../configs/db.config';

const embed = async (req: Request, res: Response) => {
    const botId = req.query.botId;

    try {
        const apiRecord = await API.findOne({ apiKey: botId });

        if (apiRecord) {
            const userId = apiRecord.userId;

            const chatboxCode = `
                const chatboxElement = document.createElement('div');
                chatboxElement.innerHTML = '<p>This is the chatbox content.</p>';
                chatboxElement.style.color = 'red';
                document.body.appendChild(chatboxElement);
            `;

            res.setHeader('Content-Type', 'text/javascript');

            res.send(chatboxCode);

        } else {
            console.log('API key not found');
        }
    } catch (error) {
        console.error('Error finding user by API key:', error);
    }
};

export default embed;