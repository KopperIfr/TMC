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
app.post('/login', (req, res, next) => {
    // Validar los datos con el esquema importado
    const { error } = schema.validate(req.body);
    if (error) {
        // Si hay un error en la validación, devolver un mensaje de error
        return res.status(400).json({ error: error.details[0].message });
    }

    // Si la validación es exitosa, proceder con Passport para la autenticación
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login'
    })(req, res, next);  // Llamar a passport.authenticate
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login'
}));

app.post('/api/register', (req, res) => {

})




// Server listening on..
app.listen(3000, () => {console.log('Listening on port 3000..')})