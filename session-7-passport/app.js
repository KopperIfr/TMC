import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import db from './database/database.js';

// ==========================
// This import loads all of our strategies
import './config/passport/passport.js';
//
// ==========================
dotenv.config();

const app = express();


// Middlewares..
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// We need these middleware for passport 
//to work. Without these, it wont.
// ==========================
app.use(passport.initialize());
app.use(passport.session());
// ==========================



// Routes..
app.post('/login', loginValidateMiddleare, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login'
}));

app.post('/api/register', (req, res) => {

})




// Server listening on..
app.listen(3000, () => {console.log('Listening on port 3000..')})