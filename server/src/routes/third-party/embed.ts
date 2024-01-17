/*
    This controls the embeddings for the third-party sites.
    Also checks if the current site's domain is allowed. If it isn't, it'll send an error message.
*/

import { Request, Response } from 'express';
import { Bot } from '../../configs/db.config';
import code from './chatboxCode';

const embed = async (req: Request, res: Response) => {
    const botId = req.query.botId;

    try {
        const botRecord = await Bot.findOne({ botKey: botId });

        if (botRecord) {
            const allowedSites = botRecord.allowedSites;

            const url = req.get('Referer');

            //finds the domain of the site
            const domain = url ? getDomain(url) : null;

            if (isAllowed(allowedSites, domain)) {
                res.setHeader('Content-Type', 'text/javascript');
                res.send(code);
            }
            else {
                const errorCode = `
                    const chatboxElement = document.createElement('div');

                    chatboxElement.innerHTML = '<p>not allowed</p>';
                    chatboxElement.style.color = 'red';

                    document.body.appendChild(chatboxElement);
                `;

                res.setHeader('Content-Type', 'text/javascript');
                res.send(errorCode);
            }

        } else {
            console.log('Bot key is not found');
        }
    } catch (error) {
        console.error('Error finding user by BOT key:', error);
    }
};

const getDomain = (url: string) => {
    const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    } else {
        return null;
    }
};

function isAllowed(allowedSites: [string], domain: string | null) {
    return domain && allowedSites.includes(domain)
}

export default embed;