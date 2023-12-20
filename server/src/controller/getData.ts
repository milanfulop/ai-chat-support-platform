/*
    This controls the requests for data from the dashboard.
*/

import express from 'express';

import sendUserData from '../routes/data/sendUserData';
import sendApiData from '../routes/data/sendApiData'

const router = express.Router();

router.get("/get-user-data", sendUserData);
router.post("/get-api-data", sendApiData)

export default router;