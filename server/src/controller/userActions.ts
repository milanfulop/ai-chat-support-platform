import express from 'express';

import signUp from '../routes/signUp';
import logIn from '../routes/logIn';
import logOut from '../routes/logOut';
import createNewApi from '../routes/createNewApi';

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.post("/create-new-api", createNewApi);

export default router;