import { Request, Response } from 'express';

const logOut = (req: Request, res: Response) => {
    req.logout(function (err) {
        if (err) { console.log(err); }
        res.json({ success: true, message: 'Logout successful' });
    });
}

export default logOut