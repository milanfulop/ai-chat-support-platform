import { Request, Response } from 'express';
import { User } from '../../configs/db.config';

const signUp = (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    User.register(new User({ email }), password, async (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
        }

        try {
            await new Promise<void>((resolve, reject) => {
                req.logIn(user, (loginErr) => {
                    if (loginErr) {
                        reject(loginErr);
                    } else {
                        resolve();
                    }
                });
            });

            req.session.save(() => {
                res.json({ success: true, message: 'Registration and login successful' });
            });
        } catch (loginError) {
            return res.status(500).json({ success: false, message: 'Internal server error during login after registration' });
        }
    });
}

export default signUp