import { Request, Response } from 'express';
import { API } from '../../configs/db.config';
import code from './chatboxCode';

const embed = async (req: Request, res: Response) => {
    const botId = req.query.botId;

    try {
        const apiRecord = await API.findOne({ apiKey: botId });

        if (apiRecord) {
            const allowedSites = apiRecord.allowedSites;

            const referringUrl = req.get('Referer');

            const getDomain = (url: string) => {
                const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
                if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
                    return match[2];
                } else {
                    return null;
                }
            };

            const referringDomain = referringUrl ? getDomain(referringUrl) : null;
            if (referringDomain && allowedSites.includes(referringDomain)) {
                res.setHeader('Content-Type', 'text/javascript');

                res.send(code);
            }
            else {
                const chatboxCode = `
                    const chatboxElement = document.createElement('div');

                    chatboxElement.innerHTML = '<p>not allowed</p>';
                    chatboxElement.style.color = 'red';

                    document.body.appendChild(chatboxElement);
                `;

                res.setHeader('Content-Type', 'text/javascript');

                res.send(chatboxCode);
            }

        } else {
            console.log('API key not found');
        }
    } catch (error) {
        console.error('Error finding user by API key:', error);
    }
};

export default embed;