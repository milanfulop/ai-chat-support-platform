import passport from 'passport';

import app from './app.config';
import User from './db.config';

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser() as any);
passport.deserializeUser(User.deserializeUser());

export default passport