import express from 'express';
import cors from 'cors';

import sendUserData from '../routes/sendUserData';

const router = express.Router();

const corsOptions = {
    origin: process.env.ORIGIN || 'http://localhost:3000',
    credentials: true,
};

router.use(cors(corsOptions));

router.get("/get-user-data", sendUserData);

export default router;