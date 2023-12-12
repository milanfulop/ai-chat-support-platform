require('dotenv').config();
import { Request, Response } from 'express';

import app from './src/configs/app.config';

import userActions from './src/controller/userActions'
import getUserData from './src/controller/getUserData';
import apiActions from './src/controller/apiActions';

app.use('/api', userActions);
app.use('/api', apiActions);
app.use('/api', getUserData)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("app is running on port", port);
});
