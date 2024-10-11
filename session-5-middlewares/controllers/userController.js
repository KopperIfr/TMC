
// --- userController.js --- //

import User from "../models/User.js";
import registerValidation from '../utils/validation/registerSchema.js';
import loginValidation from '../utils/validation/loginSchema.js';
import jwt from 'jsonwebtoken';

const Controller = {

    signIn : async (req, res) => {

        const { error, value } = loginValidation.validate(req.body, {abortEarly: false});

        if(error) return res.status(400).json({
            errors: error.details.map(detail => detail.message)
        });

        const { username, password } = value;

        const user = await User.findOne({username, password});

        if(!user) return res.status(400).json({
            message: 'Invalid credentials!'
        })

        const authToken = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);
        console.log(`Auth token: ${authToken}`);
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        console.log(`Decoded directly from const: ${decoded.id}`);
        res.cookie('authToken', JSON.stringify(authToken), {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        res.status(200).json({
            message: 'User logged in successfully!'
        })
    },

    signUp : async (req, res) => {
        const { error, value } = registerValidation.validate(
            req.body, 
            {abortEarly: false}
        );

        if(error) return res.status(400).json({
            errors: error.details.map(detail => detail.message) 
        });

        const {username, email, password} = value;
        try {

            const user = await User.create({
                username: username, 
                email: email,
                password: password
            });

            res.status(200).json({
                message: 'Signed up successfully!',
                user: user
            })

        } catch (error) {

            if (error.code === 'ER_DUP_ENTRY' || error.message.includes('duplicate key')) {
                return res.status(409).json({ error: 'Username already exists' });
            }

            res.status(500).json({
                message: 'User creation failed!',
                error: error
            });

        }
    },

    signOut: async (req, res) => {
        req.session.destroy((err) => {
            if(err) return res.status(500).json({
                message: 'Error destroting session'
            })
        });
        res.clearCookie('authToken');
        res.status(200).json({
            message: 'User logged out!'
        })
    },

    loggedIn: (req, res) => {
        res.json({
            user: req.session.user
        })
    }
    
}

export default Controller;