import localStrategy from './localStrategy.js';
import googleStrategy from './googleStrategy.js';
import facebookStrategy from './facebookStrategy.js';
import User from '../models/User.js';

export default function(passport) {
    localStrategy(passport);
    googleStrategy(passport);
    facebookStrategy(passport);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
