import express from 'express';
import passport from 'passport';
import User from '../models/User.js';
import middleware from '../utils/middleware.js';

const router = express.Router();



/**
 *  ===========================
 *  Signing up a user locally..
 *  ===========================
 */
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        user = await User.create({
            username: username,
            email: email,
            password: password
        });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages });
        }

        res.status(500).json({ message: 'Internal Server error' });

    }
});



/**
 *  ===========================
 *  Dashboard..
 *  ===========================
 */

router.get('/dashboard', (req, res) => {
    if(req.isAuthenticated) {
        console.log(req.user);
        res.json({
            message: 'Dashboard',
            data: req.user
        })
    }
})



/**
 *  ===========================
 *  Signing in a user locally..
 *  ===========================
 */
router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {

            if (err) return res.status(500).json({ message: 'Server error' });
            if (!user) return res.status(400).json({ message: info.message });

            req.logIn(user, (err) => {

                if (err) return res.status(500).json({ message: 'Login failed' });
                res.status(200).json({ message: 'Login successful', user });
            });

        })(req, res, next);
});



/**
 *  ===========================
 *  Google OAuth Login..
 *  ===========================
 */
router.get(
    '/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);




/**
 *  ===========================
 *  Google OAuth Callback..
 *  ===========================
 */
router.get('/google/redirect-url', 
    passport.authenticate('google'), (req, res) => {
        res.status(200).json({
            message: 'User logged in with Google',
            user: req.user
        })
    }
);



/**
 *  ===========================
 *  Logout..
 *  ===========================
 */
router.post('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
