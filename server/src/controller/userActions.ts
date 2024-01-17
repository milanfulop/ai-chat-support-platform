/*
    Controls the actions that the users can emit.
*/

import express from 'express';

import signUp from '../routes/account/signUp';
import logIn from '../routes/account/logIn';
import logOut from '../routes/account/logOut';
import createNewBot from '../routes/data/createNewBot';
import editBotData from '../routes/data/editBotData';
import editContextData from '../routes/data/editContextData';

import checkAuth from '../routes/account/checkAuth';

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.post("/create-new-bot", createNewBot);

router.post("/edit-bot-data", editBotData);
router.post("/edit-context-data", editContextData);

router.get("/check-auth", checkAuth);

export default router;