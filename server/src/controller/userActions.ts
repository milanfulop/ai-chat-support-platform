import express, { Request, Response } from 'express';

import signUp from '../routes/signup';
import logIn from '../routes/logIn';
import logOut from '../routes/logOut';

const router = express.Router();

router.post("/signup", signUp)
router.post("/login", logIn)
router.post("/logout", logOut)

export default router;