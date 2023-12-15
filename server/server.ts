require('dotenv').config();
import { Request, Response } from 'express';

import app from './src/configs/app.config';
import api from './src/configs/api.config';

import userActions from './src/controller/userActions'
import getData from './src/controller/getData';
import apiActions from './src/controller/apiActions';

app.use('/api', userActions);
app.use('/api', getData)
api.use('/api', apiActions);

const appPort = process.env.APP_PORT || 5000;
app.listen(appPort, () => {
    console.log("app is running on port", appPort);
});

const apiPort = process.env.API_PORT || 5001;
api.listen(5001, () => {
    console.log("api is running on port", apiPort);
})
