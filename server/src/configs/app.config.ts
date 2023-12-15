import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: process.env.ORIGIN || 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET || "placeholder",
    resave: false,
    saveUninitialized: false
}));

export default app;