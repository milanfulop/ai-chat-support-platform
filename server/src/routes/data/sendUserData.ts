import { Request, Response } from 'express';

const sendUserData = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    }
}

export default sendUserData