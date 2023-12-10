import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET || "placeholder",
    resave: false,
    saveUninitialized: false
}));

export default app;