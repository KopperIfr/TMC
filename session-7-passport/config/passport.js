import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import localStrategy from './localStrategy.js';
import googleStrategy from './googleStrategy.js';

export default function(passport) {
    // Estrategia local (email y contraseña)
    localStrategy(passport, User, LocalStrategy);

    // Estrategia de Google OAuth
    googleStrategy(passport, User, GoogleStrategy);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}