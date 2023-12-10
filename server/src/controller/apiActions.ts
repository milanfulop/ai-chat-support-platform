import express from 'express';
import cors from 'cors';

const router = express.Router();

const corsOptions = {
    origin: '*',
    credentials: true,
};

router.use(cors(corsOptions));

//router.post("/signup", signUp);

export default router;