import { Request, Response } from 'express';

const sendUserData = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        console.log(req.user)
        res.json(req.user);
    }
}

export default sendUserData