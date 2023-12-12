import express from 'express';
import cors from 'cors';

import embed from '../routes/third-party/embed';

const router = express.Router();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

router.use(cors(corsOptions));

router.get("/get-embed", embed);

export default router;