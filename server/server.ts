require('dotenv').config();
import { Request, Response } from 'express';

import app from './src/configs/app.config';
import userActions from './src/controller/userActions'

app.use('/api', userActions);

app.get("/api/check-auth", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
    } else {
        res.json({ isAuthenticated: false, user: null });
    }
});

app.get("/api/get-user-data", (req: Request, res: Response) => {
    console.log("szar")
    if (req.isAuthenticated()) {
        res.json(req.user);
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("app is running on port", port);
});
