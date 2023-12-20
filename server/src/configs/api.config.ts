/*
    This express app is responsible for every call from third parties (clients).
    I've made a new app for this because it uses different cors settings.
*/

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

const api = express();

api.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST',
    credentials: true,
    optionsSuccessStatus: 204,
}));

api.use(cookieParser());

api.use(express.urlencoded({ extended: false }));
api.use(express.json());

api.use(session({
    secret: process.env.SECRET || "placeholder",
    resave: false,
    saveUninitialized: false
}));

export default api;