/*
    Every action from third-parties will be controlled here
*/

import express from 'express';

import embed from '../routes/third-party/embed';
import sendMessage from '../routes/third-party/sendMessage';

const router = express.Router();

router.get("/get-embed", embed);
router.post("/send-chat-message", sendMessage);

export default router;