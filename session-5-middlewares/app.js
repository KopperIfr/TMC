// --- app.js --- //

// Imports..
import express from "express";
import dotenv from "dotenv";
import session from 'express-session';
import cookieParser from "cookie-parser";
import connectionDB from './database/connection.js';
import userRouter from './routes/user.js';
import isAuth from './utils/middlewares/isAuth.js';

dotenv.config();


// Initializing connection..
connectionDB();

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares..
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(isAuth);


// Using routers..
app.use('/api/users', userRouter);

// Server listening..
app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});