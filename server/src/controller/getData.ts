import express from 'express';
import cors from 'cors';

import sendUserData from '../routes/sendUserData';
import sendApiData from '../routes/sendApiData'

const router = express.Router();

const corsOptions = {
    origin: process.env.ORIGIN || 'http://localhost:3000',
    credentials: true,
};

router.use(cors(corsOptions));

router.get("/get-user-data", sendUserData);
router.post("/get-api-data", sendApiData)

export default router;