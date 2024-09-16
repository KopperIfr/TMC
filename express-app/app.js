
// --- app.js --- //


// Imports
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const postsRouter = require('./src/routes/postsRouter.js');
const userRouter = require('./src/routes/userRouter.js');
const connectDB = require('./src/database/connection.js');

// Making .env variables readable
dotenv.config();

// Initializing const's
const app = express();
const PORT = process.env.PORT || 3000;

// Connecting to database
connectDB();

// Applying global middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: false
}))

// Asigning endpoint's to routes
app.use('/api', postsRouter);
app.use('/api/user', userRouter);


app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});




