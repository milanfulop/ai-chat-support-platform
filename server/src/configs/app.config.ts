import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
    origin: process.env.ORIGIN || 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SECRET || "placeholder",
    resave: false,
    saveUninitialized: false
}));

export default app;