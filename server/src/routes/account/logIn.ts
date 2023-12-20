import { Request, Response } from 'express';
import passport from '../../configs/passport.config';

const logIn = (req: Request, res: Response) => {
    try {
        const authenticateUser = (user: any) => {
            return new Promise<void>((resolve, reject) => {
                req.logIn(user, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        };

        const authenticationMiddleware = passport.authenticate('local', async (err: Error, user: any) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Internal server error during authentication' });
            }

            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            try {
                await authenticateUser(user);
                return res.json({ success: true, message: 'Login successful', user });
            } catch (loginError) {
                return res.status(500).json({ success: false, message: 'Internal server error during login' });
            }
        });

        authenticationMiddleware(req, res);

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default logIn