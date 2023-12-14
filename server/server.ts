require('dotenv').config();
import { Request, Response } from 'express';

import app from './src/configs/app.config';

import userActions from './src/controller/userActions'
import getData from './src/controller/getData';
import apiActions from './src/controller/apiActions';

app.use('/api', userActions);
app.use('/api', getData)
app.use('/api', apiActions);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("app is running on port", port);
});
